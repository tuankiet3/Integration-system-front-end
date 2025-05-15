import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationSalary,
  fetchAnniversaryNotification,
  fetchAbsentNotification,
} from "../../../../src/features/salary/salarySlice";
import "./ModalNotificationsPayroll.scss";

const ModalNotificationsPayroll = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.salary.notificationSalary);
  const listEmp = useSelector((state) => state.salary.listEmp); // Lấy danh sách nhân viên
  const { loading, error } = useSelector((state) => state.salary.loading);

  // Lấy thông tin từ localStorage với key "user"
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = userData.roles ? userData.roles[0] : null; // Lấy role đầu tiên từ mảng roles
  const userEmployeeId = userData.id || null; // Lấy id từ user

  // Gọi API GET khi component mount lần đầu và định kỳ
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchNotificationSalary()); // Gọi lại GET /api/Notifications/list để cập nhật danh sách
    }, 30000); // Gọi mỗi 30 giây

    // Gọi lần đầu khi mount
    if (!notifications.length) {
      dispatch(fetchNotificationSalary());
    }

    // Clear interval khi component unmount
    return () => clearInterval(interval);
  }, [dispatch, notifications.length]);

  // Gọi API POST định kỳ để tạo thông báo mới
  useEffect(() => {
    const interval = setInterval(() => {
      // Gọi API POST anniversary để tạo thông báo mới
      dispatch(fetchAnniversaryNotification());

      console.log("Role: ", userRole);
      console.log("Employee ID: ", userEmployeeId);
      // Gọi API POST absent chỉ nếu không phải Admin hoặc PayrollManagement
      if (userRole !== "Admin" || userRole !== "PayrollManagement") {
        // Lọc danh sách nhân viên dựa trên employeeId của người dùng hiện tại
        const currentEmployee = listEmp.find(
          (emp) => emp.employeeId === userEmployeeId
        );
        if (currentEmployee) {
          const currentMonth = new Date().getMonth() + 1; // Tháng hiện tại (1-12)
          dispatch(
            fetchAbsentNotification({
              employeeId: currentEmployee.employeeId,
              month: currentMonth,
            })
          );
        }
      } else {
        // Nếu là Admin hoặc PayrollManagement, gọi cho tất cả nhân viên
        const currentMonth = new Date().getMonth() + 1;
        listEmp.forEach((employee) => {
          dispatch(
            fetchAbsentNotification({
              employeeId: employee.employeeId,
              month: currentMonth,
            })
          );
        });
      }
    }, 30000); // Gọi mỗi 30 giây

    // Clear interval khi component unmount
    return () => clearInterval(interval);
  }, [dispatch, listEmp, userRole, userEmployeeId]);

  // Sử dụng useMemo để đảo ngược danh sách thông báo
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
              <div className="noti-message">{noti.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ModalNotificationsPayroll;
