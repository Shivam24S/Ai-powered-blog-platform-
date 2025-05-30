import { useSelector } from "react-redux";
import SignIn from "./SignIn";
import UserForm from "./UserForm"; //

const Auth = () => {
  const isLoginMode = useSelector((state) => state.auth.isLoginMode);

  return <>{isLoginMode === true ? <SignIn /> : <UserForm />}</>;
};

export default Auth;
