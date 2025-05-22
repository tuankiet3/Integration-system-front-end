import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import "./ReportPayroll.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalaries } from "../../../../src/features/salary/salarySlice";
import {
  getAvgSalaryByDept,
  getTotalBudget,
} from "../../../features/salary/salaryAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const ReportPayroll = () => {
  const dispatch = useDispatch();
  const [budgetList, setBudgetList] = useState([]);
  const [currentAvg, setCurrentAvg] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null); // Thêm state để lưu tháng được chọn

  useEffect(() => {
    dispatch(fetchSalaries());
    fetchTotalBudgetForMonths();
    // Gọi fetAvgSalaryByDept với tháng hiện tại khi component mount
    const currentMonth = new Date().getMonth() + 1;
    setSelectedMonth(currentMonth);
  }, [dispatch]);

  // Hàm lấy dữ liệu lương trung bình theo phòng ban
  const fetAvgSalaryByDept = async (month) => {
    const type = "avg_salary_by_dept";
    const result = await getAvgSalaryByDept(type, month);
    if (result && result.data) {
      setCurrentAvg(result.data);
      // console.log(`Dữ liệu tháng ${month}:`, result.data);
    } else {
      console.log(`Dữ liệu không hợp lệ cho tháng ${month}`);
      setCurrentAvg([]);
    }
  };

  // Hàm lấy tổng ngân sách cho 5 tháng gần nhất
  const fetchTotalBudgetForMonths = async () => {
    const type = "total_budget";
    const currentMonth = new Date().getMonth() + 2; // Tháng tiếp theo
    const currentYear = new Date().getFullYear(); // Năm hiện tại

    const months = [];
    for (let i = 4; i >= 0; i--) {
      let month = currentMonth - i;
      let year = currentYear;
      if (month <= 0) {
        month = 12 + month;
        year -= 1;
      }
      months.push({ month, year });
    }

    try {
      const budgetData = [];
      for (let { month, year } of months) {
        const result = await getTotalBudget(type, month, year);
        if (result && result.data) {
          budgetData.push({ month, year, budget: result.data });
        } else {
          console.log(`Dữ liệu không hợp lệ cho tháng ${month}/${year}`);
        }
      }

      // Sắp xếp theo thứ tự từ tháng xa nhất đến tháng gần nhất
      setBudgetList(budgetData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Gọi fetAvgSalaryByDept khi selectedMonth thay đổi
  useEffect(() => {
    if (selectedMonth) {
      fetAvgSalaryByDept(selectedMonth);
    }
  }, [selectedMonth]);

  const empSalary = useSelector((state) => state.salary.salaries);
  const totalSalary = empSalary.length;

  const barData = {
    labels: budgetList.map((item) => `Tháng ${item.month}/${item.year % 100}`),
    datasets: [
      {
        label: "Total Budget",
        data: budgetList.map((item) => item.budget.totalNetSalary),
        backgroundColor: "#B0D4FF",
        borderColor: "#005BFF",
        borderWidth: 1,
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
        ticks: { stepSize: 10000 },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const selected = budgetList[index];
        setSelectedMonth(selected.month); // Cập nhật tháng được chọn
      }
    },
  };

  const doughnutData = {
    labels:
      currentAvg?.map(
        (dept) => `${dept.departmentName} (ID: ${dept.departmentId})`
      ) || [],
    datasets: [
      {
        label: "Average Salary by Department",
        data: currentAvg?.map((item) => item.averageNetSalary) || [],
        backgroundColor: [
          "#0066FF",
          "#FF6384",
          "#8532b4",
          "#FFC107",
          "#c13434",
          "#36387742",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="hrreport-container">
      <div className="hrreport-header">
        <div className="hrh-title">
          <div className="hrh-fc">Payroll Report</div>
        </div>
      </div>
      <div className="hrreport-content">
        <div className="hrreport-detail">
          <div className="hrreport-top">
            <div className="total-employees">
              <div className="te-number">{totalSalary}</div>
              <div className="te-name">Total payroll runs for employees</div>
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
                Tháng {selectedMonth}
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

export default ReportPayroll;
