import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const initialEmployees = [
  { id: "AOBTNC028", name: "Jeremy", department: "Support", status: "Working" },
  { id: "AOBTNC088", name: "Annette", department: "QA", status: "Working" },
  {
    id: "AOBTNC025",
    name: "Theresa",
    department: "People Ops",
    status: "Quit",
  },
  { id: "AOBTNC044", name: "Kathryn", department: "IT", status: "Temporary" },
  {
    id: "AOBTNC099",
    name: "Courtney",
    department: "Customer Success",
    status: "Working",
  },
  { id: "AOBTNC095", name: "Jane", department: "IT", status: "Quit" },
  {
    id: "AOBTNC027",
    name: "Theresa",
    department: "People Ops",
    status: "Working",
  },
  { id: "AOBTNC040", name: "Kathryn", department: "IT", status: "Temporary" },
  { id: "AOBTNC098", name: "Courtney", department: "IT", status: "Working" },
  { id: "AOBTNC090", name: "Jane", department: "Product", status: "Working" },
];

const HRReport = () => {
  const totalEmployees = initialEmployees.length;

  // Group by department
  const departmentCounts = initialEmployees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

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
    maintainAspectRatio: false, // Quan trọng để chiều cao không bị ép theo tỉ lệ mặc định
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

  // Group by status for Doughnut
  const statusCounts = initialEmployees.reduce((acc, emp) => {
    acc[emp.status] = (acc[emp.status] || 0) + 1;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Employee Status",
        data: Object.values(statusCounts),
        backgroundColor: ["#0066FF", "#FFC107", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="hrreport-container">
      <div className="hrreport-header">
        <div className="hrh-title">
          <div className="hrh-user">
            Hue <FaAngleRight />{" "}
          </div>
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
                      position: "bottom", // <-- thêm dòng này
                      labels: {
                        usePointStyle: true, // hiển thị dạng hình tròn thay vì ô vuông nếu muốn
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
