import React, { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import "./HRManagement.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserTie, FaFileAlt, FaHistory } from "react-icons/fa";
import ModalNotificationsPayroll from "../PayrollManagement/ModalNotifications/ModalNotificationsPayroll";

const HRManagement = () => {
  const navigate = useNavigate();
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

  return (
    <div className="hr-container">
      <div className="hr-header">
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
      <div className="hr-content">
        <div className="hr-tool">
          <div
            className="hr-tool-box"
            onClick={() => navigate("/HRManagement")}
          >
            <MdDashboard size={24} style={{ marginRight: 8 }} />
            DashBoard
          </div>
          <div
            className="hr-tool-box"
            onClick={() => navigate("/HRManagement/EmployeeManagement")}
          >
            <FaUserTie size={24} style={{ marginRight: 8 }} />
            Employee Management
          </div>
          <div
            className="hr-tool-box"
            onClick={() => navigate("/HRManagement/HRReport")}
          >
            <FaFileAlt size={24} style={{ marginRight: 8 }} />
            HR Reports
          </div>
          <div
            className="hr-tool-box"
            onClick={() => navigate("/HRManagement/SalaryHistory")}
          >
            <FaHistory size={24} style={{ marginRight: 8 }} />
            Salary History
          </div>
        </div>
        <div className="hr-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HRManagement;
