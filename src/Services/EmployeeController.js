import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7280/api/",
});

// Lấy danh sách tất cả phòng ban
const getDepartments = async () => {
  try {
    const response = await instance.get("departments");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng ban:", error);
    return [];
  }
};

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

const addEmployee = async (employeeData) => {
  try {
    const response = await instance.post("employees", {
      fullName: employeeData.name,
      dateofBirth: employeeData.dateOfBirth,
      gender: employeeData.gender,
      phoneNumber: employeeData.phone,
      email: employeeData.email,
      hireDate: employeeData.joiningDate,
      departmentId: employeeData.departmentId,
      positionId: employeeData.positionId,
      status: employeeData.status
    });

    console.log("Thêm nhân viên thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm nhân viên:", error);
    return null;
  }
};

export { getEmployee, addEmployee, getDepartments, getDepartmentID };
