import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../shared/formElements/Button";
import { authActions } from "../store/features/authSlicer";

const User = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <figure className="h-64 bg-base-300 overflow-hidden rounded-t-xl">
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body items-center text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary capitalize">
            {user.name}
          </h2>
          <p className="text-sm text-base-content/70">{user.email}</p>

          <div className="w-full space-y-2">
            <Button
              className="btn btn-outline btn-primary w-full"
              to="/editProfile"
            >
              Edit Profile
            </Button>

            <Button
              onClick={() => dispatch(authActions.logout())}
              className="btn btn-outline btn-error w-full"
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
