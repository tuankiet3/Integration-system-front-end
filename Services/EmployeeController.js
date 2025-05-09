import axios from "axios";
import Swal from "sweetalert2";

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
};

const getPositions = async () => {
  try {
    const response = await instance.get("positions"); // API positions cần trả về danh sách
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách vị trí:", error);
    return [];
  }
};

const getPositionID = async (id) => {
  try {
    const response = await instance.get(`positions/${id}`);
    return response.data.positionName;
  } catch (error) {
    console.error(`Lỗi khi lấy position ID ${id}:`, error);
    return "Unknown";
  }
};

const getEmployee = async () => {
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
          status: employee.status,
        };
      })
    );
    return enrichedEmployees;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhân viên:", error);
    return [];
  }
};

const getEmployeeID = async (id) => {
  try {
    const response = await instance.get(`employees/${id}`);
    const emp = response.data;

    if (!emp) {
      console.error(`Không tìm thấy nhân viên với ID ${id}`);
      return null;
    }

    const department = (await getDepartmentID(emp.departmentId)) || {};
    const position = (await getPositionID(emp.positionId)) || {};

    return {
      name: emp.fullName,
      phone: emp.phoneNumber,
      email: emp.email,
      departmentId: emp.departmentId,
      departmentName: department.departmentName || "",
      joiningDate: emp.hireDate,
      dateofBirth: emp.dateofBirth,
      gender: emp.gender,
      positionId: emp.positionId,
      positionName: position.positionName || "",
      status: emp.status,
    };
  } catch (error) {
    console.error(`❌ Lỗi khi lấy employee ID ${id}:`, error);
    return null;
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
      status: employeeData.status,
    });

    Swal.fire({
      icon: "success",
      title: "Thành công!",
      text: "Thêm nhân viên thành công!",
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm nhân viên:", error);
    Swal.fire({
      icon: "error",
      title: "Lỗi!",
      text: "Thêm nhân viên thất bại!",
    });
    return null;
  }
};

const updateEmployee = async (employeeData) => {
  try {
    const response = await instance.put(`employees/${employeeData.id}`, {
      fullName: employeeData.name,
      dateofBirth: employeeData.dateOfBirth,
      gender: employeeData.gender,
      phoneNumber: employeeData.phone,
      email: employeeData.email,
      hireDate: employeeData.joiningDate,
      departmentId: employeeData.departmentId,
      positionId: employeeData.positionId,
      status: employeeData.status,
    });
    Swal.fire({
      icon: "success",
      title: "Thành công!",
      text: "Cập nhật nhân viên thành công!",
    });
    console.log("Cập nhật nhân viên thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật nhân viên:", error);
    Swal.fire({
      icon: "error",
      title: "Lỗi!",
      text: "Cập nhật nhân viên thất bại!",
    });
    return null;
  }
};

export {
  getEmployee,
  getEmployeeID,
  addEmployee,
  updateEmployee,
  getDepartments,
  getDepartmentID,
  getPositions,
  getPositionID,
};
