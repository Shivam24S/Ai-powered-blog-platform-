import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = () => {
  const user = useSelector((state) => state.auth.currentUser);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        {/* Profile Image */}
        <figure className="h-64 overflow-hidden bg-base-300">
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* User Info */}
        <div className="card-body text-center">
          <h2 className="text-2xl font-bold text-primary capitalize">
            {user.name}
          </h2>
          <p className="text-base text-base-content/70">{user.email}</p>

          {/* Edit Button */}
          <div className="mt-4">
            <Link
              to="/edit-profile"
              className="btn btn-outline btn-primary w-full"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
