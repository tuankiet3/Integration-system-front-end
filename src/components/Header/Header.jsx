import React, { useEffect, useState } from "react";
import "./Header.scss";
import bell from "../../assets/bell.png";
import logo from "../../assets/logo.png";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/Login/AuthSlice";
import { useNavigate } from "react-router-dom";
import { fetchNotificationSalary } from "../../features/salary/salarySlice";

const Header = ({ onIconClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [currentNotificationCount, setCurrentNotificationCount] = useState(0);
  const notifications = useSelector((state) => state.salary.notificationSalary);
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userId = user ? Number(user.id) : null;
  const userRole = user ? user.roles : [];

  // Hàm lấy số lượng thông báo theo role
  const getNotificationCountByRole = () => {
    if (!notifications) return 0;

    // Nếu là Admin, Hr hoặc PayrollManagement thì trả về tổng số thông báo
    if (
      userRole.includes("Admin") ||
      userRole.includes("Hr") ||
      userRole.includes("PayrollManagement")
    ) {
      return notifications.length;
    }

    // Nếu là Employee thì chỉ đếm thông báo liên quan đến họ
    return notifications.filter((noti) => noti.employeeId === userId).length;
  };

  // Hàm fetch thông báo
  const fetchNotifications = async () => {
    try {
      await dispatch(fetchNotificationSalary()).unwrap();

      // Lấy số lượng thông báo hiện tại theo role
      const currentCount = getNotificationCountByRole();

      // Cập nhật số lượng thông báo mới
      if (currentCount > currentNotificationCount) {
        const newCount = currentCount - currentNotificationCount;
        setUnreadNotifications((prev) => prev + newCount);
        setCurrentNotificationCount(currentCount);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Fetch thông báo khi component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch thông báo liên tục mỗi 0.5 giây
  useEffect(() => {
    const interval = setInterval(fetchNotifications, 500);
    return () => clearInterval(interval);
  }, [currentNotificationCount, notifications]);

  const handleNotificationClick = () => {
    setUnreadNotifications(0);
    setCurrentNotificationCount(notifications?.length || 0);
    onIconClick();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("Id");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <img src={logo} alt="" />
          <div className="logo-text">HMD</div>
        </div>
        <div className="header-tool">
          <div className="header-notification">
            <div className="header-notification-img">
              <img src={bell} alt="???" onClick={handleNotificationClick} />
              {unreadNotifications > 0 && (
                <div
                  className="notification-badge"
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    minWidth: "18px",
                    textAlign: "center",
                  }}
                >
                  {unreadNotifications}
                </div>
              )}
            </div>
          </div>
          <div className="header-logout" onClick={handleLogout}>
            <CiLogout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
