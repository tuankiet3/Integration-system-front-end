import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PayrollManagement from "./components/PayrollManagement/PayrollManagement";
import SalaryManagement from "./components/PayrollManagement/SalaryManagement/SalaryManagement";
import HRManagement from "./components/HRManager/HRManagement";
import DashBoardPayroll from "./components/PayrollManagement/DashBoardPayroll/DashBoardPayroll";
import HistoryPayroll from "./components/PayrollManagement/HistoryPayroll/HistoryPayroll";
import NewEmpPayroll from "./components/PayrollManagement/NewEmp/NewEmpPayroll";
import Admin from "./components/Admin/Admin";
import ReportPayroll from "./components/PayrollManagement/ReportPayroll/ReportPayroll";
import LoginPage from "./components/Login/Login";
import ErrorPage from "./components/Error/ErrorPage";
import DashBoard from "./components/Admin/DashBoard/DashBoard";
import HRDashboard from "./components/HRManager/HRDashboard/HRDashboard";
import EmployeeManagement from "./components/HRManager/EmployeeManagement/EmployeeManagement";
import HRReport from "./components/HRManager/HRReport/HRReport";
import SalaryHistory from "./components/HRManager/SalaryHistory/SalaryHistory";

const App = () => {
  return (
    <Routes>
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Admin />}>
        <Route index element={<DashBoard />} />
        <Route path="/salary-management" element={<SalaryManagement />} />
        <Route path="/salary-history" element={<HistoryPayroll />} />
        <Route path="/pr-new-employee" element={<NewEmpPayroll />} />
        <Route path="/pr-report" element={<ReportPayroll />} />
      </Route>
      <Route path="/payroll" element={<PayrollManagement />}>
        <Route index element={<DashBoardPayroll />} />
        <Route
          path="/payroll/salary-management"
          element={<SalaryManagement />}
        />
        <Route path="/payroll/salary-history" element={<HistoryPayroll />} />
        <Route path="/payroll/pr-new-employee" element={<NewEmpPayroll />} />
        <Route path="/payroll/pr-report" element={<ReportPayroll />} />
      </Route>
      <Route path="/HRManagement" element={<HRManagement />}>
        <Route index element={<HRDashboard />} />
        <Route path="EmployeeManagement" element={<EmployeeManagement />} />
        <Route path="HRReport" element={<HRReport />} />
        <Route path="SalaryHistory" element={<SalaryHistory />} />
      </Route>
    </Routes>
  );
};

export default App;
