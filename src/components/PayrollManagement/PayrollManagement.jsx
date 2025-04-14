import React from "react";
import Header from "../Header/Header";
import "./PayrollManagement.scss";
import { Outlet, useNavigate } from "react-router-dom";
import home from "../../assets/home.png";
import user from "../../assets/user.png";
import flag from "../../assets/flag.png";
import icon_hrreport from "../../assets/icon_hrreport.png";
const PayrollManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="payroll-container">
      <div className="payroll-header">
        <Header />
      </div>
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
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/pr-new-employee")}
          >
            <img src={icon_hrreport} alt="" />
            New Employee
          </div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/pr-alert-salary")}
          >
            <img src={icon_hrreport} alt="" />
            Alert
          </div>
          {/* <div className="payroll-tool-box">Setting</div> */}
        </div>
        <div className="payroll-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;
