import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationSalary } from "../../../../src/features/salary/salarySlice";
import "./ModalNotificationsPayroll.scss";
import {
  postAbsentNotification,
  postAnniversaryNotification,
} from "../../../features/salary/salaryAPI";
import { getEmployee } from "../../../features/employee/employeeAPI";
import { format } from "date-fns";

const ModalNotificationsPayroll = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.salary.notificationSalary);
  const { loading, error } = useSelector((state) => state.salary.loading);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await postAnniversaryNotification();
      console.log("Anniversary notification sent", res);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userId = user ? Number(user.id) : null; // Ép kiểu number cho userId
  const userRole = user ? user.roles : []; // Mặc định mảng rỗng tránh lỗi

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
            console.log("Absent notification sent for current user", res);
          } catch (err) {
            console.error("Error sending absent notification", err);
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
            console.log(`Absent notification sent for ${emp.employeeId}`, res);
          }
        } catch (err) {
          console.error(
            "Error fetching employees or sending notifications",
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

  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotificationSalary());
    }
  }, [dispatch, notifications.length]);

  const reversedNotifications = useMemo(() => {
    return [...notifications].reverse();
  }, [notifications]);

  if (loading && !notifications.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="noti-payroll">
      <div className="noti-content">
        {notifications.length === 0 ? (
          <div>No notifications available</div>
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
              return noti.employeeId === userId; // So sánh đúng kiểu number
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
