import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationSalary } from "../../../../src/features/salary/salarySlice";
import "./ModalNotificationsPayroll.scss";
import {
  postAbsentNotification,
  postAnniversaryNotification,
} from "../../../features/salary/salaryAPI";
import { getEmployee } from "../../../features/employee/employeeAPI";
import { format } from "date-fns";

const ModalNotificationsPayroll = ({ onNewNotification }) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.salary.notificationSalary);
  const { loading, error } = useSelector((state) => state.salary.loading);
  const [lastNotificationCount, setLastNotificationCount] = useState(0);
  const [isPolling, setIsPolling] = useState(false);

  // Hàm fetch thông báo
  const fetchNotifications = async () => {
    if (isPolling) return;

    try {
      setIsPolling(true);
      await dispatch(fetchNotificationSalary()).unwrap();

      // Cập nhật số lượng thông báo mới
      if (notifications.length > lastNotificationCount) {
        const newCount = notifications.length - lastNotificationCount;
        if (onNewNotification) {
          onNewNotification(newCount);
          // Reset số lượng thông báo mới sau 1 giây
          setTimeout(() => {
            onNewNotification(0);
          }, 1000);
        }
      }
      setLastNotificationCount(notifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsPolling(false);
    }
  };

  // Lắng nghe sự kiện thông báo mới từ XHR
  useEffect(() => {
    const handleNewNotification = (event) => {
      if (event.detail && event.detail.type === "newNotificationReceived") {
        fetchNotifications();
      }
    };

    window.addEventListener("newNotificationReceived", handleNewNotification);
    return () =>
      window.removeEventListener(
        "newNotificationReceived",
        handleNewNotification
      );
  }, []);

  // Fetch thông báo ban đầu và thiết lập polling
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [dispatch, notifications.length, lastNotificationCount]);

  // Xử lý thông báo kỷ niệm
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await postAnniversaryNotification();
        if (res) {
          fetchNotifications();
        }
      } catch (error) {
        console.error("Error sending anniversary notification:", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userId = user ? Number(user.id) : null;
  const userRole = user ? user.roles : [];

  // Xử lý thông báo vắng mặt
  useEffect(() => {
    let interval;

    const fetchAbsent = async () => {
      if (
        !userRole.includes("Admin") &&
        !userRole.includes("Hr") &&
        !userRole.includes("PayrollManagement")
      ) {
        interval = setInterval(async () => {
          try {
            const res = await postAbsentNotification({
              employeeId: userId,
              month: new Date().getMonth() + 1,
            });
            if (res) {
              fetchNotifications();
            }
          } catch (err) {
            console.error("Error sending absent notification:", err);
          }
        }, 3000);
      } else {
        try {
          const list = await getEmployee();
          for (const emp of list) {
            const res = await postAbsentNotification({
              employeeId: emp.employeeId,
              month: new Date().getMonth() + 1,
            });
            if (res) {
              fetchNotifications();
            }
          }
        } catch (err) {
          console.error(
            "Error fetching employees or sending notifications:",
            err
          );
        }
      }
    };

    fetchAbsent();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [userRole, userId]);

  const reversedNotifications = useMemo(() => {
    return [...notifications].reverse();
  }, [notifications]);

  if (loading && !notifications.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="noti-payroll">
      <div className="noti-content">
        {notifications.length === 0 ? (
          <div>Không có thông báo mới</div>
        ) : (
          reversedNotifications
            .filter((noti) => {
              if (
                userRole.includes("Admin") ||
                userRole.includes("Hr") ||
                userRole.includes("PayrollManagement")
              ) {
                return true;
              }
              return noti.employeeId === userId;
            })
            .map((noti) => {
              const formattedDate = format(
                new Date(noti.createdAt),
                "dd/MM/yyyy HH:mm"
              );
              return (
                <div
                  className="noti-item"
                  key={`${noti.employeeId}-${noti.createdAt}`}
                >
                  <div className="noti-message">{noti.message}</div>
                  <div className="noti-date">{formattedDate}</div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default ModalNotificationsPayroll;
