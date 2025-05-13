import axios from "axios";
import { getDepartmentID, getPositionID } from "./EmployeeController";

const instance = axios.create({
  baseURL: "https://localhost:7280/api/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const getEmployeeSummary = async () => {
  try {
    const response = await instance.get("employees");
    const employees = response.data;

    const enrichedEmployees = await Promise.all(
      employees.map(async (employee) => {
        const departmentName = await getDepartmentID(employee.departmentId);
        const positionName = await getPositionID(employee.positionId);
        return {
          id: employee.employeeId,
          name: employee.fullName,
          phone: employee.phoneNumber,
          email: employee.email,
          department: departmentName,
          joiningDate: employee.hireDate,
          dateofBirth: employee.dateofBirth,
          gender: employee.gender,
          position: positionName,
          status: employee.status
        };
      })
    );

    const totalEmployees = enrichedEmployees.length;

    const statusCounts = enrichedEmployees.reduce((acc, emp) => {
      acc[emp.status] = (acc[emp.status] || 0) + 1;
      return acc;
    }, {});

    const departmentCounts = enrichedEmployees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});

    return {
      totalEmployees,
      statusCounts,
      departmentCounts,
      employees: enrichedEmployees // nếu bạn vẫn cần danh sách chi tiết
    };

  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
    return {
      totalEmployees: 0,
      statusCounts: {},
      departmentCounts: {},
      employees: []
    };
  }
};

export { getEmployeeSummary };