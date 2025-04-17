import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import salaryReducer from "../features/salary/salarySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    salary: salaryReducer,
  },
});
