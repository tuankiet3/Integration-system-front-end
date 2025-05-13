import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7280/api/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm lấy lịch sử lương của 1 nhân viên theo ID
const getSalaryHistoryByEmployeeID = async (employeeID) => {
  try {
    const response = await instance.get(`salaries/employee/${employeeID}`);
    return response.data; // có thể là mảng hoặc object tùy API backend
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử lương:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
};

export { getSalaryHistoryByEmployeeID };
