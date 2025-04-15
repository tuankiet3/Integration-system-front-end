import React from "react";
import Header from "../Header/Header";
import "./HRManagement.scss";
import { Outlet, useNavigate } from "react-router-dom";
import home from "../../assets/home.png";
import user from "../../assets/user.png"; 
import flag from "../../assets/flag.png";
import icon_hrreport from "../../assets/icon_hrreport.png";

const HRManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="hr-container">
      <div className="hr-header">
        <Header />
      </div>
      <div className="hr-content">
        <div className="hr-tool">
          <div className="hr-tool-box">
            <img src={home} alt="" />
            DashBoard</div>
          <div className="hr-tool-box" onClick={() => navigate("/HRManagement/EmployeeManagement")}>
            <img src={user} alt="" />
            Employee Management</div>
          <div className="hr-tool-box" onClick={() => navigate("/HRManagement/HRReport")}>
            <img src={flag} alt="" />
            HR Reports</div>
          <div className="hr-tool-box">
            <img src={icon_hrreport} alt="" />
            Salary History</div>
        </div>
        <div className="hr-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HRManagement;
