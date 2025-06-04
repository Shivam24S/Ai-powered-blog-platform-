import { createSlice } from "@reduxjs/toolkit";
import { isValidToken } from "../../../utils/isValidToken";

const savedAuthData = JSON.parse(localStorage.getItem("auth") || "{}");

const ValidToken = isValidToken(savedAuthData.token);

console.log("valid token", ValidToken);

const initialState = {
  isAuthenticated: ValidToken,
  isLoginMode: false,
  currentUser: ValidToken ? savedAuthData.user : null,
  token: ValidToken ? savedAuthData.token : null,
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
      localStorage.setItem("auth", JSON.stringify({ user, token }));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
    setLoginMode(state, action) {
      state.isLoginMode = action.payload;
    },
  },
});

export const authActions = authSlicer.actions;

export default authSlicer.reducer;
