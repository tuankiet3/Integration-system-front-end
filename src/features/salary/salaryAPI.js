import instance from "../../app/instance";

const getSalary = async () => {
  return instance.get("salaries");
};

const postSalary = async (salaryData) => {
  return instance.post("salaries", salaryData);
};

const getSalaryNotification = async () => {
  return instance.get("Notifications/list");
};

const getTotalBudget = async (type, month) => {
  const currentMonth = new Date().getMonth() + 1; // getMonth() trả về 0 - 11
  const selectedMonth = month || currentMonth;

  const data = {
    type, // "total_budget"
    month: selectedMonth,
  };

  try {
    const response = await instance.get("Reports/payroll", { params: data });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching total budget:", error);
    return null; // Trả về null nếu có lỗi
  }
};

const getAvgSalaryByDept = async (type, month) => {
  const currentMonth = new Date().getMonth() + 1; // getMonth() trả về 0 - 11
  const selectedMonth = month || currentMonth;

  const data = {
    type, // "avg_salary_by_dept"
    month: selectedMonth,
  };

  try {
    const response = await instance.get("Reports/payroll", { params: data });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching average salary by department:", error);
    return null; // Trả về null nếu có lỗi
  }
};

export {
  getSalary,
  postSalary,
  getSalaryNotification,
  getTotalBudget,
  getAvgSalaryByDept,
};
