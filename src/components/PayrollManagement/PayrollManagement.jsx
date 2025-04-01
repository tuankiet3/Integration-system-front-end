import React from "react";
import Header from "../Header/Header";
import "./PayrollManagement.scss";
import { Outlet, useNavigate } from "react-router-dom";

const PayrollManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="payroll-container">
      <div className="payroll-header">
        <Header />
      </div>
      <div className="payroll-content">
        <div className="payroll-tool">
          <div className="payroll-tool-box">DashBoard</div>
          <div className="payroll-tool-box">Tiểu Tam</div>
          <div
            className="payroll-tool-box"
            onClick={() => navigate("/salary-management")}
          >
            Salary Management
          </div>
          <div className="payroll-tool-box">Salary reports</div>
          <div className="payroll-tool-box">Salary History</div>
          <div className="payroll-tool-box">Setting</div>
        </div>
        <div className="payroll-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;
