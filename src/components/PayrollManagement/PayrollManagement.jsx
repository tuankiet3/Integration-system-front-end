import React, { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import "./PayrollManagement.scss";
import { Outlet, useNavigate } from "react-router-dom";
import ModalNotificationsPayroll from "./ModalNotifications/ModalNotificationsPayroll";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import {
  FaUserTie,
  FaUserPlus,
  FaHistory,
  FaFileAlt,
  FaMoneyCheckAlt,
  FaCalendarCheck,
} from "react-icons/fa";

const PayrollManagement = () => {
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

  const { error } = useSelector((state) => state.salary);
  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
      navigate("/error", { state: { error } });
    }
  }, [error, navigate]);
  const userData = localStorage.getItem("user");
  // console.log(userData);
  useEffect(() => {
    if (!userData || !userData.includes("PayrollManagement")) {
      navigate("/error", { state: { error: "401" } });
    }
  }, [userData, navigate]);
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
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/payroll")}
          >
            <MdDashboard size={24} style={{ marginRight: 8 }} />
            DashBoard
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/payroll/salary-management")}
          >
            <FaUserTie size={24} style={{ marginRight: 8 }} />
            Salary Management
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/payroll/pr-new-employee")}
          >
            <FaUserPlus size={24} style={{ marginRight: 8 }} />
            New Employee
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/payroll/pr-report")}
          >
            <FaFileAlt size={24} style={{ marginRight: 8 }} />
            Salary reports
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/payroll/my-salary")}
          >
            <FaMoneyCheckAlt size={24} style={{ marginRight: 8 }} />
            Salary History
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/payroll/AttendancePR")}
          >
            <FaCalendarCheck size={24} style={{ marginRight: 8 }} />
            Attendance
          </div>
        </div>
        <div className="payroll-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;
