import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7280/api/",
});

const getSalary = async () => {
  return instance.get("salaries");
};

const postSalary = async (salaryData) => {
  return instance.post("salaries", salaryData);
};

const getSalaryNotification = async () => {
  return instance.get("Notifications/notifications");
};

export { getSalary, postSalary, getSalaryNotification };
