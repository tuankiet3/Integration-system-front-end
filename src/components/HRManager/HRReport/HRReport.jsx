import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import "./HRReport.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { getEmployeeSummary } from "../../../Services/ReportController";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const HRReport = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [statusCounts, setStatusCounts] = useState({});
  const [departmentCounts, setDepartmentCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { totalEmployees, statusCounts, departmentCounts } =
          await getEmployeeSummary();
        setTotalEmployees(totalEmployees || 0);
        setStatusCounts(statusCounts || {});
        setDepartmentCounts(departmentCounts || {});
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu báo cáo:", error);
      }
    };

    fetchData();
  }, []);

  const doughnutData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Employee Status",
        data: Object.values(statusCounts),
        backgroundColor: ["#198754", "#ffc107", "#dc3545"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: "Employees",
        data: Object.values(departmentCounts),
        backgroundColor: "#B0D4FF",
        borderColor: "#005BFF",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="hrreport-container">
      <div className="hrreport-header">
        <div className="hrh-title">
          <div className="hrh-fc">HR Report</div>
        </div>
      </div>

      <div className="hrreport-content">
        <div className="hrreport-detail">
          <div className="hrreport-top">
            <div className="total-employees">
              <div className="te-number">{totalEmployees}</div>
              <div className="te-name">Total number of employee</div>
            </div>

            <div className="doughnut-chart">
              <Doughnut
                data={doughnutData}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                      },
                    },
                  },
                }}
              />
              <div className="doughnut-status-container">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div key={status} className="doughnut-status">
                    <span>
                      {status} - {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hrreport-bottom" style={{ marginTop: "40px" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRReport;
