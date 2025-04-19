import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationSalary } from "../../../features/salary/salarySlice";
import "./ModalNotificationsPayroll.scss";
const ModalNotificationsPayroll = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.salary.notificationSalary);
  const { loading, error } = useSelector((state) => state.salary.loading);

  useEffect(() => {
    dispatch(fetchNotificationSalary());
  }, [dispatch]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="noti-payroll">
      <div className="noti-content">
        {loading ? (
          <div>Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div>No notifications available</div>
        ) : (
          [...notifications].reverse().map((noti) => (
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
