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

const postAnniversaryNotification = async () => {
  return instance.post("Notifications/anniversary");
};

const postAbsentNotification = async ({ employeeId, month }) => {
  return instance.post(
    `Notifications/absent?employeeId=${employeeId}&month=${month}`
  );
};

const getTotalBudget = async (type, month) => {
  const currentMonth = new Date().getMonth() + 1;
  const selectedMonth = month || currentMonth;

  const data = {
    type,
    month: selectedMonth,
  };

  try {
    const response = await instance.get("Reports/payroll", { params: data });
    return response.data;
  } catch (error) {
    console.error("Error fetching total budget:", error);
    return null;
  }
};

const getAvgSalaryByDept = async (type, month) => {
  const currentMonth = new Date().getMonth() + 1;
  const selectedMonth = month || currentMonth;

  const data = {
    type,
    month: selectedMonth,
  };

  try {
    const response = await instance.get("Reports/payroll", { params: data });
    return response.data;
  } catch (error) {
    console.error("Error fetching average salary by department:", error);
    return null;
  }
};

const getSalaryID = async (salaryID) => {
  try {
    const response = await instance.get(`salaries/employee/${salaryID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching salary by ID:", error);
    return null;
  }
};

const postEmailNotification = async (employeeId) => {
  return instance.post(`email/send-salary-to-employee/${employeeId}`);
};

export {
  getSalary,
  postSalary,
  getSalaryNotification,
  postAnniversaryNotification,
  postAbsentNotification,
  getTotalBudget,
  getAvgSalaryByDept,
  getSalaryID,
  postEmailNotification,
};
