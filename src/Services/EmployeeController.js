import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7280/api/",
});

const getDepartmentID = async (id) => {
  try {
    const response = await instance.get(`departments/${id}`);
    return response.data.departmentName;
  } catch (error) {
    console.error(`Lỗi khi lấy department ID ${id}:`, error);
    return "Unknown";
  }
}

const getEmployee = async () => {
  try {
    const response = await instance.get("employees");
    const employees = response.data;

    const enrichedEmployees = await Promise.all(
      employees.map(async (employee) => {
        const departmentName = await getDepartmentID(employee.departmentId);
        return {
          id: employee.employeeId,
          name: employee.fullName,
          phone: employee.phoneNumber,
          email: employee.email,
          department: departmentName,
          joiningDate: employee.hireDate,
          status: employee.status
        };
      })
    );
    return enrichedEmployees;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhân viên:", error);
    return [];
  }
};

export { getEmployee };
