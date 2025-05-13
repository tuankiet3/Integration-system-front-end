import React, { useEffect, useState } from "react";
import "./Header.scss";
import user from "../../assets/hue.jpg";
import bell from "../../assets/bell.png";
import logo from "../../assets/logo.png";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { logout } from "../../features/Login/AuthSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ onIconClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [lastNotificationData, setLastNotificationData] = useState(null);

  useEffect(() => {
    const handleNewSalaryNotification = (event) => {
      if (event.detail && event.detail.type === "salary_update") {
        const currentData = event.detail.data;
        if (
          !lastNotificationData ||
          JSON.stringify(currentData) !== JSON.stringify(lastNotificationData)
        ) {
          setUnreadNotifications((prev) => prev + 1);
          setLastNotificationData(currentData);
        }
      }
    };

    window.addEventListener(
      "newSalaryNotification",
      handleNewSalaryNotification
    );

    return () => {
      window.removeEventListener(
        "newSalaryNotification",
        handleNewSalaryNotification
      );
    };
  }, [lastNotificationData]);

  const handleNotificationClick = () => {
    setUnreadNotifications(0);
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
                <div className="notification-badge">{unreadNotifications}</div>
              )}
            </div>
          </div>
          <div className="header-user">
            <div className="header-user-img">
              <img src={user} alt="" />
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
