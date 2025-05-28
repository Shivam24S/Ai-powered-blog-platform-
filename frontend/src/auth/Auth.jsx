import { useSelector } from "react-redux";
import SignIn from "./SignIn";
import Signup from "./Signup"; //

const Auth = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return <>{isLogin ? <SignIn /> : <Signup />}</>;
};

export default Auth;
