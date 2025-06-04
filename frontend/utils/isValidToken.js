import { jwtDecode } from "jwt-decode";

export const isValidToken = (token) => {
  if (!token) {
    return false;
  }

  try {
    const { exp } = jwtDecode(token);
    if (!exp) {
      return false;
    }
    const now = Math.floor(Date.now() / 1000);
    console.log("now time", now);
    if (exp < now) {
      localStorage.removeItem("auth");
      return false;
    }
    return true;
  } catch (error) {
    console.log("jwt verification error", error.message);
    localStorage.removeItem("auth");
    return false;
  }
};
