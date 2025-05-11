import axios from "axios";
import Swal from "sweetalert2";

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
    return response.data.departmentName || "Unknown";
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
    return response.data.positionName || "Unknown";
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

const getEmployeeID = async (id) => {
  try {
    const response = await instance.get(`employees/${id}`);
    const emp = response.data;

    if (!emp) {
      console.error(`Không tìm thấy nhân viên với ID ${id}`);
      return null;
    }

    const departmentName = await getDepartmentID(emp.departmentId);
    const positionName = await getPositionID(emp.positionId);

    return {
      id: id, // Explicitly map employeeId to id
      name: emp.fullName,
      phone: emp.phoneNumber,
      email: emp.email,
      departmentId: emp.departmentId,
      departmentName,
      joiningDate: emp.hireDate,
      dateofBirth: emp.dateOfBirth,
      gender: emp.gender,
      positionId: emp.positionId,
      positionName,
      status: emp.status,
    }
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
      status: employeeData.status
    });

    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Thêm nhân viên thành công!',
    });
    return response.data;

  } catch (error) {
    console.error("Lỗi khi thêm nhân viên:", error);
    Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: 'Thêm nhân viên thất bại!',
    });
    return null;
  }
};


const formatDateForServer = (dateStr) => {
  if (!dateStr) return null;

  let date;
  if (typeof dateStr === 'string') {
    // Handle formats like '1999-08-15' or '1999-08-15T00:00:00'
    date = new Date(dateStr.replace('T', ' ').split(' ')[0]);
  } else if (dateStr instanceof Date) {
    date = dateStr;
  } else {
    return null;
  }

  if (isNaN(date.getTime())) return null; // Invalid date

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // Output: yyyy-MM-dd
};

const updateEmployee = async (employeeId, employeeData) => {
  if (!employeeId || isNaN(parseInt(employeeId))) {
    console.error("❌ ID không hợp lệ:", employeeId);
    Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: 'ID nhân viên không hợp lệ.',
    });
    return null;
  }

  try {
    const response = await instance.put(`employees/${employeeId}`, {
      fullName: employeeData.name,
      dateOfBirth: formatDateForServer(employeeData.dateofBirth),
      gender: employeeData.gender,
      phoneNumber: employeeData.phone,
      email: employeeData.email,
      hireDate: formatDateForServer(employeeData.joiningDate),
      departmentId: parseInt(employeeData.departmentId, 10),
      positionId: parseInt(employeeData.positionId, 10),
      status: employeeData.status,
    });

    Swal.fire({
      icon: 'success',
      title: 'Cập nhật thành công!',
      text: 'Thông tin nhân viên đã được cập nhật.',
    });

    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật nhân viên:", error.response?.data || error.message);
    Swal.fire({
      icon: 'error',
      title: 'Cập nhật thất bại!',
      text: error.response?.data?.title || 'Không thể cập nhật thông tin nhân viên.',
    });
    return null;
  }
};


const handleDeleteEmployee = (employeeId, setEmployees) => {
  Swal.fire({
    title: 'Bạn có chắc muốn xoá?',
    text: `Nhân viên có ID: ${employeeId} sẽ bị xoá!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Xoá',
    cancelButtonText: 'Huỷ'
  }).then((result) => {
    if (result.isConfirmed) {
      instance.delete(`employees/${employeeId}`)
        .then(() => {
          Swal.fire(
            'Đã xoá!',
            `Nhân viên với ID: ${employeeId} đã bị xoá khỏi hệ thống.`,
            'success'
          );

          // Cập nhật lại danh sách nhân viên
          setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
        })
        .catch((error) => {
          console.error("❌ Lỗi khi xoá nhân viên:", error);
          Swal.fire(
            'Lỗi!',
            'Không thể xoá nhân viên. Vui lòng thử lại.',
            'error'
          );
        });
    }
  });
};

export { getEmployee, getEmployeeID, addEmployee, updateEmployee, getDepartments, getDepartmentID, getPositions, getPositionID, handleDeleteEmployee };
