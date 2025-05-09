import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  roles: [], // sửa lại từ role → roles
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
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.roles = [];
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
