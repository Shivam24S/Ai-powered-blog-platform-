import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoginMode: false,
  currentUser: null,
  token: null,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      state.isAuthenticated = true;
      state.currentUser = user;
      state.token = token;
      state.isLoginMode = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.token = null;
    },
    setLoginMode(state, action) {
      state.isLoginMode = action.payload;
    },
  },
});

export const authActions = authSlicer.actions;

export default authSlicer.reducer;
