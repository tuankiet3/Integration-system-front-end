import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import home from "../../assets/home.png";
import user from "../../assets/user.png";
import flag from "../../assets/flag.png";
import icon_hrreport from "../../assets/icon_hrreport.png";
import Header from "../Header/Header";
import ModalNotificationsPayroll from "../PayrollManagement/ModalNotifications/ModalNotificationsPayroll";
import useAuthCheck from "../../features/Login/useAuthCheck";
import manage from "../../assets/icon_manage.jpg";
import "./Admin.scss";

const Admin = () => {
  const navigate = useNavigate();
  useAuthCheck();
  const [showDropdown, setShowDropdown] = useState(false);
  const [openSections, setOpenSections] = useState({
    dashboard: true,
    hrManagement: false,
    payrollManagement: false
  });
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

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!user || !user.roles || !user.roles.includes("Admin")) {
      navigate("/error", { state: { error: "401" } });
    }
  }, [navigate]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <Header />
      </div>
      <div className="admin-content">
        <div className="admin-tool">
          {/* Dashboard Section */}
          <div className="tool-section">
            <div className="tool-section-content">
              <div className="tool-section-item" onClick={() => navigate("/")}>
                <img src={home} alt="" />
                Dashboard
              </div>
            </div>
          </div>

          {/* HR Management Section */}
          <div className="tool-section">
            <div className="tool-section-header" onClick={() => toggleSection('hrManagement')}>
              <h3 className="tool-section-title">HR Management</h3>
              <span className={`arrow ${openSections.hrManagement ? 'open' : ''}`}>▼</span>
            </div>
            {openSections.hrManagement && (
              <div className="tool-section-content">
                <div className="tool-section-item" onClick={() => navigate("/EmployeeManagement")}>
                  <img src={user} alt="" />
                  Employee Management
                </div>
                <div className="tool-section-item" onClick={() => navigate("/HRReport")}>
                  <img src={flag} alt="" />
                  HR Reports
                </div>
              </div>
            )}
          </div>

          {/* Payroll Management Section */}
          <div className="tool-section">
            <div className="tool-section-header" onClick={() => toggleSection('payrollManagement')}>
              <h3 className="tool-section-title">Payroll Management</h3>
              <span className={`arrow ${openSections.payrollManagement ? 'open' : ''}`}>▼</span>
            </div>
            {openSections.payrollManagement && (
              <div className="tool-section-content">
                <div className="tool-section-item" onClick={() => navigate("/salary-management")}>
                  <img src={manage} alt="" />
                  Salary Management
                </div>
                <div className="tool-section-item" onClick={() => navigate("/pr-new-employee")}>
                  <img src={user} alt="" />
                  New Employee
                </div>
                <div className="tool-section-item" onClick={() => navigate("/pr-report")}>
                  <img src={flag} alt="" />
                  Salary Reports
                </div>
              </div>
            )}
          </div>

          <div className="tool-section">
            <div className="tool-section-content">
              <div className="tool-section-item" onClick={() => navigate("/salary-history")}>
                  <img src={icon_hrreport} alt="" />
                  Salary History
                </div>
            </div>
          </div>

        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;