import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSalary,
  getSalaryID,
  getSalaryNotification,
  postSalary,
  postAnniversaryNotification,
  postAbsentNotification,
} from "./salaryAPI";
import { getDepartmentID } from "../department/departmentAPI";
import { getEmployee } from "../employee/employeeAPI";

// Async thunks
export const fetchSalaries = createAsyncThunk(
  "salary/fetchSalaries",
  async () => {
    const [salaryRes, employeeRes] = await Promise.all([
      getSalary(),
      getEmployee(),
    ]);

    const employeeMap = {};
    employeeRes.data.forEach((emp) => {
      employeeMap[emp.employeeId] = emp.fullName;
    });

    return salaryRes.data
      .sort((a, b) => new Date(b.salaryMonth) - new Date(a.salaryMonth))
      .map((s) => ({
        ...s,
        fullName: employeeMap[s.employeeId] || "Unknown",
      }));
  }
);

export const fetchNotificationSalary = createAsyncThunk(
  "salary/fetchSalaryNotification",
  async () => {
    const notiRes = await getSalaryNotification();
    console.log("notiRes", notiRes.data);
    return notiRes.data; // Trả về trực tiếp dữ liệu từ API Notifications/list
  }
);

export const fetchEmployeeSalary = createAsyncThunk(
  "salary/fetchEmployeeSalary",
  async () => {
    const [salaryRes, employeeRes] = await Promise.all([
      getSalary(),
      getEmployee(),
    ]);
    const emp = employeeRes.data.filter(
      (list) =>
        !salaryRes.data.some((sal) => sal.employeeId === list.employeeId)
    );

    const empWithDept = await Promise.all(
      emp.map(async (employee) => {
        const departmentRes = await getDepartmentID(employee.departmentId);
        return {
          ...employee,
          departmentId: departmentRes.data.departmentName,
        };
      })
    );

    return empWithDept;
  }
);

export const createEmployeeSalary = createAsyncThunk(
  "salary/createEmployeeSalary",
  async (data, { dispatch }) => {
    const res = await postSalary(data);

    await dispatch(fetchEmployeeSalary());
    return res.data;
  }
);

export const createSalary = createAsyncThunk(
  "salary/createSalary",
  async (salaryData, { dispatch }) => {
    const response = await postSalary(salaryData);
    await dispatch(fetchSalaries());
    return response.data;
  }
);

export const fetchUserSalary = createAsyncThunk(
  "salary/fetchUserSalary",
  async (userId) => {
    const response = await getSalaryID(userId);
    console.log("IDDDDDD", userId);
    return response;
  }
);

// Thunk cho POST anniversary notification
export const fetchAnniversaryNotification = createAsyncThunk(
  "salary/fetchAnniversaryNotification",
  async () => {
    const response = await postAnniversaryNotification();
    return response.data;
  }
);

// Thunk cho POST absent notification
export const fetchAbsentNotification = createAsyncThunk(
  "salary/fetchAbsentNotification",
  async ({ employeeId, month }) => {
    const response = await postAbsentNotification({ employeeId, month });
    return response.data;
  }
);

const salarySlice = createSlice({
  name: "salary",
  initialState: {
    salaries: [],
    listEmp: [],
    notificationSalary: [],
    userSalary: null,
    loading: false,
    error: null,
    currentPage: 0,
    itemsPerPage: 5,
    searchTerm: "",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch salaries
      .addCase(fetchSalaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalaries.fulfilled, (state, action) => {
        state.loading = false;
        state.salaries = action.payload;
      })
      .addCase(fetchSalaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create salary
      .addCase(createSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSalary.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Employee Salary
      .addCase(fetchEmployeeSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeSalary.fulfilled, (state, action) => {
        state.loading = false;
        state.listEmp = action.payload;
      })
      .addCase(fetchEmployeeSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Employee Salary
      .addCase(createEmployeeSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployeeSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch notification salary
      .addCase(fetchNotificationSalary.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNotificationSalary.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationSalary = action.payload;
      })
      .addCase(fetchNotificationSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch user salary
      .addCase(fetchUserSalary.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserSalary.fulfilled, (state, action) => {
        state.loading = false;
        state.userSalary = action.payload;
      })
      .addCase(fetchUserSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch anniversary notification
      .addCase(fetchAnniversaryNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnniversaryNotification.fulfilled, (state, action) => {
        if (action.payload) {
          state.notificationSalary.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchAnniversaryNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch absent notification
      .addCase(fetchAbsentNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbsentNotification.fulfilled, (state, action) => {
        if (action.payload) {
          state.notificationSalary.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchAbsentNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setSearchTerm } = salarySlice.actions;

// Selectors
export const selectFilteredSalaries = (state) => {
  const { salaries, searchTerm } = state.salary;
  return salaries.filter((salary) =>
    salary.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const selectCurrentPageSalaries = (state) => {
  const { currentPage, itemsPerPage } = state.salary;
  const filteredSalaries = selectFilteredSalaries(state);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredSalaries.slice(startIndex, endIndex);
};

export const selectTotalPages = (state) => {
  const { itemsPerPage } = state.salary;
  const filteredSalaries = selectFilteredSalaries(state);
  return Math.ceil(filteredSalaries.length / itemsPerPage);
};

// New Emp
export const selectTotalPagesEmp = (state) => {
  const { listEmp, itemsPerPage } = state.salary;
  return Math.ceil(listEmp.length / itemsPerPage);
};

export const selectCurrentPageSalariesEmp = (state) => {
  const { listEmp, currentPage, itemsPerPage } = state.salary;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listEmp.slice(startIndex, endIndex);
};

export const selectUserSalary = (state) => state.salary.userSalary;

export default salarySlice.reducer;
