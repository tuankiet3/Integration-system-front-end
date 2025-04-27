import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import home from "../../assets/home.png";
import user from "../../assets/user.png";
import flag from "../../assets/flag.png";
import icon_hrreport from "../../assets/icon_hrreport.png";
import Header from "../Header/Header";
import ModalNotificationsPayroll from "../PayrollManagement/ModalNotifications/ModalNotificationsPayroll";

const Admin = () => {
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
  const userData = localStorage.getItem("user");

  useEffect(() => {
    if (!userData || !userData.includes("Admin")) {
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
          <div className="payroll-tool-box" onClick={() => navigate("/")}>
            <img src={home} alt="" />
            DashBoard
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/salary-management")}
          >
            <img src={user} alt="" />
            Salary Management
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/pr-new-employee")}
          >
            <img src={icon_hrreport} alt="" />
            New Employee
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/salary-history")}
          >
            <img src={icon_hrreport} alt="" />
            Salary History
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/pr-report")}
          >
            <img src={flag} alt="" />
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
