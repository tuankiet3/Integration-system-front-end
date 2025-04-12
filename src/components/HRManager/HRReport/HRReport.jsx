import React from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { Bar, Doughnut } from 'react-chartjs-2';
import './HRReport.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const initialEmployees = [
  { id: "AOBTNC028", name: "Jeremy", department: "Support", status: "Working" },
  { id: "AOBTNC088", name: "Annette", department: "QA", status: "Working" },
  { id: "AOBTNC025", name: "Theresa", department: "People Ops", status: "Quit" },
  { id: "AOBTNC044", name: "Kathryn", department: "IT", status: "Temporary" },
  { id: "AOBTNC099", name: "Courtney", department: "Customer Success", status: "Working" },
  { id: "AOBTNC095", name: "Jane", department: "Product", status: "Quit" },
  { id: "AOBTNC027", name: "Theresa", department: "People Ops", status: "Working" },
  { id: "AOBTNC040", name: "Kathryn", department: "IT", status: "Temporary" },
  { id: "AOBTNC098", name: "Courtney", department: "Customer Success", status: "Working" },
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
    <div  className="hrreport-container">
        <div className="hrreport-header">
            <div className="hrh-title">
                <div className="hrh-user">Hue <FaAngleRight /> </div>
                <div className="hrh-fc">HR Report</div>
            </div>
        </div>
        <div className="hrreport-content">
            <div className="hrreport-detail">
                <div className="hrreport-top">
                    <div className="total-employees" /*style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}*/>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', justifyContent: 'center' }}>{totalEmployees}</div>
                        <div style={{ fontSize: '18px' }}>Total number of employee</div>
                    </div>

                    <div className="doughnut-chart" style={{ width: '300px' }}>
                        <Doughnut data={doughnutData} />
                        <div style={{ marginTop: '10px' }}>
                        {Object.entries(statusCounts).map(([status, count], idx) => (
                            <div key={status} /*style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}*/>
                            <div /*style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: doughnutData.datasets[0].backgroundColor[idx],
                                marginRight: '8px'
                            }}*/></div>
                            <span>{status} - {count}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

                <div className="hrreport-bottom" style={{ marginTop: '40px' }}>
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HRReport