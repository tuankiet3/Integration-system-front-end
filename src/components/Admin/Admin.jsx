import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ModalNotificationsPayroll from "../PayrollManagement/ModalNotifications/ModalNotificationsPayroll";
import useAuthCheck from "../../features/Login/useAuthCheck";
import { MdDashboard } from "react-icons/md";
import {
  FaUserTie,
  FaUserPlus,
  FaFileAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import "./Admin.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../features/Login/AuthSlice";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useAuthCheck();
  const [showDropdown, setShowDropdown] = useState(false);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // Lấy và hiển thị role từ localStorage

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!user || !user.roles || !user.roles.includes("Admin")) {
      localStorage.clear();
      dispatch(logout());
      navigate("/login", { replace: true, state: null });
    }
  }, [navigate, dispatch]);

  const handleNewNotification = (count) => {
    setNewNotificationCount(count);
  };

  return (
    <div className="admin-container">
      <div className="payroll-header">
        <Header
          onIconClick={() => setShowDropdown(!showDropdown)}
          newNotificationCount={newNotificationCount}
        />
      </div>

      {showDropdown && (
        <div className="container-dropdown">
          <div className="dropdown-modal" ref={dropdownRef}>
            <div className="dropdown-content">
              <ModalNotificationsPayroll
                onNewNotification={handleNewNotification}
              />
            </div>
          </div>
        </div>
      )}

      <div className="admin-content">
        <div className="admin-tool">
          <div className="admin-tool-box" onClick={() => navigate("/")}>
            <MdDashboard size={24} />
            DashBoard
          </div>
          <div
            className="admin-tool-box"
            onClick={() => navigate("/salary-management")}
          >
            <FaUserTie size={24} />
            Salary Management
          </div>
          <div
            className="admin-tool-box"
            onClick={() => navigate("/EmployeeManagement")}
          >
            <FaUserTie size={24} />
            Employee Management
          </div>
          <div
            className="admin-tool-box"
            onClick={() => navigate("/pr-new-employee")}
          >
            <FaUserPlus size={24} />
            New Employee
          </div>
          <div className="admin-tool-box" onClick={() => navigate("/HRReport")}>
            <FaFileAlt size={24} />
            HR Reports
          </div>
          <div
            className="admin-tool-box"
            onClick={() => navigate("/pr-report")}
          >
            <FaFileAlt size={24} />
            Salary Reports
          </div>
          <div
            className="admin-tool-box"
            onClick={() => navigate("Attendance")}
          >
            <FaCalendarCheck size={24} style={{ marginRight: 8 }} />
            Attendance
          </div>
        </div>
        <div className="admin-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
