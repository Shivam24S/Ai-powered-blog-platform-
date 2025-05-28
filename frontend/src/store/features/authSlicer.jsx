import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLogin: true,
  currentUser: null,
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
      state.currentUser = null;
    },

    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const authActions = authSlicer.actions;

export default authSlicer.reducer;
