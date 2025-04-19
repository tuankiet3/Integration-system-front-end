import { Route, Routes } from "react-router-dom";
import "./App.css";
import PayrollManagement from "./components/PayrollManagement/PayrollManagement";
import React from "react";
import SalaryManagement from "./components/PayrollManagement/SalaryManagement/SalaryManagement";
import HRManagement from "./components/HRManager/HRManagement";
import DashBoardPayroll from "./components/PayrollManagement/DashBoardPayroll/DashBoardPayroll";
<<<<<<< HEAD
import HRDashboard from "./components/HRManager/HRDashboard/HRDashboard";
import EmployeeManagement from "./components/HRManager/EmployeeManagement/EmployeeManagement";
import HistoryPayroll from "./components/PayrollManagement/HistoryPayroll/HistoryPayroll";
import HRReport from "./components/HRManager/HRReport/HRReport";
import NewEmpPayroll from "./components/PayrollManagement/NewEmp/NewEmpPayroll";
import AlertPayroll from "./components/PayrollManagement/Alert/AlertPayroll";
import SalaryHistory from "./components/HRManager/SalaryHistory/SalaryHistory";
=======
import HistoryPayroll from "./components/PayrollManagement/HistoryPayroll/HistoryPayroll";
import NewEmpPayroll from "./components/PayrollManagement/NewEmp/NewEmpPayroll";
import AlertPayroll from "./components/PayrollManagement/Alert/AlertPayroll";
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c

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
<<<<<<< HEAD
      <Route path="/HRManagement" element={<HRManagement />} >
        <Route index element={<HRDashboard />} />
        <Route path="EmployeeManagement" element={<EmployeeManagement />} />
        <Route path="HRReport" element={<HRReport />} />
        <Route path="SalaryHistory" element={<SalaryHistory />} />
      </Route>
=======
      <Route path="/HRManagement" element={<HRManagement />} />
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
    </Routes>
  );
};

export default App;
