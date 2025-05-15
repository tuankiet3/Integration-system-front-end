import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ModalNotificationsPayroll from "../PayrollManagement/ModalNotifications/ModalNotificationsPayroll";
import useAuthCheck from "../../features/Login/useAuthCheck";
import { MdDashboard } from "react-icons/md";
import { FaUserTie, FaUserPlus, FaFileAlt } from "react-icons/fa";

const Admin = () => {
  const navigate = useNavigate();
  useAuthCheck();
  const [showDropdown, setShowDropdown] = useState(false);
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
      navigate("/error", { state: { error: "401" } });
    }
  }, [navigate]);

  return (
    <div className="payroll-container">
      <div className="payroll-header">
        <Header onIconClick={() => setShowDropdown(!showDropdown)} />
      </div>
      {showDropdown && (
        <div className="container-dropdown">
          <div className="dropdown-modal" ref={dropdownRef}>
            <div className="dropdown-content">
              <ModalNotificationsPayroll />
            </div>
          </div>
        </div>
      )}
      <div className="payroll-content">
        <div className="payroll-tool">
          <div className="payroll-tool-box" onClick={() => navigate("/")}>
            <MdDashboard size={24} style={{ marginRight: 8 }} />
            DashBoard
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/salary-management")}
          >
            <FaUserTie size={24} style={{ marginRight: 8 }} />
            Salary Management
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/EmployeeManagement")}
          >
            <FaUserTie size={24} style={{ marginRight: 8 }} />
            Employee Management
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/pr-new-employee")}
          >
            <FaUserPlus size={24} style={{ marginRight: 8 }} />
            New Employee
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/HRReport")}
          >
            <FaFileAlt size={24} style={{ marginRight: 8 }} />
            HR reports
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/pr-report")}
          >
            <FaFileAlt size={24} style={{ marginRight: 8 }} />
            Salary reports
          </div>
        </div>
        <div className="payroll-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
