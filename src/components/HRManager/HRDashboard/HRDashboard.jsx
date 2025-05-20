import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../../../features/employee/employeeAPI";

const HRDashboard = () => {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("Id");
  useEffect(() => {
    const fetchData = async () => {
      const res = await getEmployeeById(userId);
      setData(res.data);
    };
    fetchData();
  }, [userId]);

  if (!data) {
    return <div className="loading">Loading employee data...</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No data";
    const d = new Date(dateString);
    return isNaN(d) ? "Invalid date" : d.toLocaleDateString("en-GB");
  };

  const InfoRow = ({ label, value }) => (
    <div className="info-row">
      <span className="label">{label}:</span>
      <span className="value">{value}</span>
    </div>
  );

  return (
    <div className="home-page">
      <div className="card">
        <h2 className="title">Employee Information</h2>
        <div className="info-list">
          <InfoRow label="ID" value={userId} />
          <InfoRow label="Full Name" value={data.fullName} />
          <InfoRow label="Gender" value={data.gender} />
          <InfoRow label="Email" value={data.email} />
          <InfoRow label="Phone Number" value={data.phoneNumber} />
          <InfoRow label="Date of Birth" value={formatDate(data.dateOfBirth)} />
          <InfoRow label="Hire Date" value={formatDate(data.hireDate)} />
          <InfoRow label="Department (ID)" value={data.departmentId} />
          <InfoRow label="Position (ID)" value={data.positionId} />
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
