import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLogin: true,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    toggleForm(state) {
      state.isAuthenticated = !state.isLogin;
    },
  },
});

export const authActions = authSlicer.actions;

export default authSlicer.reducer;
