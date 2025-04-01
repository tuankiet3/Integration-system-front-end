import { Route, Routes } from "react-router-dom";
import "./App.css";
import PayrollManagement from "./components/PayrollManagement/PayrollManagement";
import React from "react";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PayrollManagement />} />
    </Routes>
  );
};

export default App;
