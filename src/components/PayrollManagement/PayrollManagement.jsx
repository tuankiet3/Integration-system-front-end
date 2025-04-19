<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect, useRef, useState } from "react";
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
import Header from "../Header/Header";
import "./PayrollManagement.scss";
import { Outlet, useNavigate } from "react-router-dom";
import home from "../../assets/home.png";
import user from "../../assets/user.png";
import flag from "../../assets/flag.png";
import icon_hrreport from "../../assets/icon_hrreport.png";
<<<<<<< HEAD
const PayrollManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="payroll-container">
      <div className="payroll-header">
        <Header />
      </div>
=======
import ModalNotificationsPayroll from "./ModalNotifications/ModalNotificationsPayroll";
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
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
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
<<<<<<< HEAD
          <div className="payroll-tool-box">
            <img src={flag} alt="" />
            Salary reports
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/salary-history")}
          >
            <img src={icon_hrreport} alt="" />
            Salary History
          </div>
=======
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/pr-new-employee")}
          >
            <img src={icon_hrreport} alt="" />
            New Employee
          </div>
          <div
            className="payroll-tool-box"
<<<<<<< HEAD
            onClick={() => navigate("/pr-alert-salary")}
          >
            <img src={icon_hrreport} alt="" />
            Alert
          </div>
          {/* <div className="payroll-tool-box">Setting</div> */}
=======
            onClick={() => navigate("/salary-history")}
          >
            <img src={icon_hrreport} alt="" />
            Salary History
          </div>
          <div className="payroll-tool-box">
            <img src={flag} alt="" />
            Salary reports
          </div>
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
        </div>
        <div className="payroll-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;
