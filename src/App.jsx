import { Route, Routes } from "react-router-dom";
import "./App.css";
import PayrollManagement from "./components/PayrollManagement/PayrollManagement";
import React from "react";
import SalaryManagement from "./components/PayrollManagement/SalaryManagement/SalaryManagement";
import HRManagement from "./components/HRManager/HRManagement";
import DashBoardPayroll from "./components/PayrollManagement/DashBoardPayroll/DashBoardPayroll";
import HRDashboard from "./components/HRManager/HRDashboard/HRDashboard";
import EmployeeManagement from "./components/HRManager/EmployeeManagement/EmployeeManagement";
import HistoryPayroll from "./components/PayrollManagement/HistoryPayroll/HistoryPayroll";
import HRReport from "./components/HRManager/HRReport/HRReport";
import NewEmpPayroll from "./components/PayrollManagement/NewEmp/NewEmpPayroll";
import AlertPayroll from "./components/PayrollManagement/Alert/AlertPayroll";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PayrollManagement />}>
        <Route index element={<DashBoardPayroll />} />
        <Route path="/salary-management" element={<SalaryManagement />} />
        <Route path="/salary-history" element={<HistoryPayroll />} />
        <Route path="/pr-new-employee" element={<NewEmpPayroll />} />
        <Route path="/pr-alert-salary" element={<AlertPayroll />} />
      </Route>
      <Route path="/HRManagement" element={<HRManagement />} >
        <Route index element={<HRDashboard />} />
        <Route path="EmployeeManagement" element={<EmployeeManagement />} />
        <Route path="HRReport" element={<HRReport />} />
      </Route>
    </Routes>
  );
};

export default App;
