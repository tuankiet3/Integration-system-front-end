// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getEmployee } from "./employeeAPI";

// export const fetchEmployees = createAsyncThunk(
//   "employee/fetchEmployees",
//   async () => {
//     const response = await getEmployee();
//     return response;
//   }
// );

// const employeeSlice = createSlice({
//   name: "employee",
//   initialState: {
//     employee: [],
//     loading: false,
//     error: null,
//     currentPage: 0,
//     itemsPerPage: 5,
//   },
//   reducers: {
//     setCurrentPage: (state, action) => {
//       state.currentPage = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       //fetch emp
//       .addcase(fetchEmployees.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addcase(fetchEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.salaries = action.payload;
//       })
//       .addcase(fetchEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// // export const { set }
