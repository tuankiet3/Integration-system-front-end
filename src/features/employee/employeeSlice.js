import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployee } from "./employeeAPI";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const [employeeRes, departmentRes] = await Promise.all([
      getEmployee(),
      getDepartmentID(),
    ]);

    const departmentMap = {};
    departmentRes.data.forEach((dept) => {
    departmentMap[dept.departmentId] = dept.departmentName;
    });

    return employeeRes.data
        .map((emp) => ({
        ...emp,
        departmentName: departmentMap[emp.departmentId] || "Unknown",
        }));    
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
    loading: false,
    error: null,
    currentPage: 0,
    itemsPerPage: 5,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch emp departmentdepartment pending: bat dau loading, fulfilled: luu dl vào state, rejected:luu loi
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload; //state.salaries = action.payload: lưu dữ liệu từ server vào state.(action.payload chính là danh sách nhân viên hoặc lương trả về từ API.)
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setCurrentPage} = employeeSlice.actions;

export const selectCurrentPageEmp = (state) => {
    const { currentPage, itemsPerPage } = state.employee;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return state.employee.slice(startIndex, endIndex);
}

// Selectors
