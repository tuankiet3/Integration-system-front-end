import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  roles: [], // sửa lại từ role → roles
  id: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.roles = action.payload.roles; // sửa role → roles
      state.id = action.payload.id; // thêm id vào state
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.roles = [];
      state.id = null; // thêm id vào state
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
