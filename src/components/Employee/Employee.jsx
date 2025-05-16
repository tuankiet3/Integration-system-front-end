import React, { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import ModalNotificationsPayroll from "../PayrollManagement/ModalNotifications/ModalNotificationsPayroll";
import { MdDashboard } from "react-icons/md";
import { FaHistory, FaCalendarCheck, FaUserCog  } from "react-icons/fa";

const Employee = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userData = localStorage.getItem("user");
  useEffect(() => {
    if (!userData) {
      navigate("/error", { state: { error: "401" } });
    }
  }, [userData, navigate]);
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
          <div className="hr-tool-box" onClick={() => navigate("/Employee")}>
            <MdDashboard size={24} style={{ marginRight: 8 }} />
            DashBoard
          </div>
          <div
            className="hr-tool-box"
            onClick={() => navigate("/Employee/Salaryhistory")}
          >
            <FaHistory size={24} style={{ marginRight: 8 }} />
            Salary history
          </div>
          <div
            className="hr-tool-box"
            onClick={() => navigate("/Employee/AttendanceEmp")}
          >
            <FaCalendarCheck size={24} style={{ marginRight: 8 }} />
            Attendance
          </div>
        </div>
        <div className="hr-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Employee;
