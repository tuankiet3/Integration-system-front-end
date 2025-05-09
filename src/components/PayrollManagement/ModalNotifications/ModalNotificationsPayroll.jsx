import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationSalary } from "../../../../src/features/salary/salarySlice";
import "./ModalNotificationsPayroll.scss";

const ModalNotificationsPayroll = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.salary.notificationSalary);
  const { loading, error } = useSelector((state) => state.salary.loading);

  // Chỉ gọi API khi component được mount lần đầu
  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotificationSalary());
    }
  }, [dispatch, notifications.length]);

  // Sử dụng useMemo để tránh tính toán lại không cần thiết
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
          reversedNotifications.map((noti) => (
            <div key={noti.employeeId} className="noti-item">
              <div className="noti-employee">{noti.fullName}</div>
              <div className="noti-message">{noti.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ModalNotificationsPayroll;
