import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  role: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  roles: [],
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.roles = action.payload.role;
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
