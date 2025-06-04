import { useDispatch, useSelector } from "react-redux";
import { isValidToken } from "../../utils/isValidToken";
import { Navigate } from "react-router-dom";
import { authActions } from "../store/features/authSlicer";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const validToken = isValidToken(token);

  if (!validToken) {
    dispatch(authActions.logout());
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
