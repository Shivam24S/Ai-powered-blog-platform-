import React from "react";
import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div>
      <p>name:{user.name}</p>
    </div>
  );
};

export default User;
