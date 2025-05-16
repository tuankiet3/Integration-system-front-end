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

const getAllAttendance = async () => {
  try {
    const [attendanceRes, employeesRes] = await Promise.all([
      instance.get("Attendances"),
      instance.get("employees"),
    ]);

    const attendanceList = attendanceRes.data;
    const employeeList = employeesRes.data;

    // Tạo một Map để tra nhanh tên theo employeeId
    const employeeMap = new Map();
    employeeList.forEach(emp => {
      employeeMap.set(emp.employeeId, emp.fullName);
    });

    // Gắn fullName vào từng bản ghi attendance
    const combined = attendanceList.map(att => ({
      ...att,
      fullName: employeeMap.get(att.employeeId) || "Unknown",
    }));

    return combined;

  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu điểm danh/lương hoặc thông tin nhân viên:", error);
    return [];
  }
};

const getAttendanceByID = async (employeeID) => {
  try {
    const response = await instance.get(`Attendances/employee/${employeeID}`); // Không cần employeeID
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách điểm danh:", error);
    return [];
  }
};

export { getAllAttendance, getAttendanceByID };