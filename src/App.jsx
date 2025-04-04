import { Route, Routes } from "react-router-dom";
import "./App.css";
import PayrollManagement from "./components/PayrollManagement/PayrollManagement";
import React from "react";
import SalaryManagement from "./components/PayrollManagement/SalaryManagement/SalaryManagement";
import HRManagement from "./components/HRManager/HRManagement";
import DashBoardPayroll from "./components/PayrollManagement/DashBoardPayroll/DashBoardPayroll";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PayrollManagement />}>
        <Route index element={<DashBoardPayroll />} />
        <Route path="/salary-management" element={<SalaryManagement />} />
        <Route path="/salary-history" element={<HistoryPayroll />} />
      </Route>
      <Route path="/HRManagement" element={<HRManagement />}>
        <Route index element={<HRDashboard />} />
        <Route
          path="/HRManagement/EmployeeManagement"
          element={<EmployeeManagement />}
        />
      </Route>
    </Routes>
  );
};

export default App;
