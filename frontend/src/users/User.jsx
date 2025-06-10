import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../shared/formElements/Button";
import { authActions } from "../store/features/authSlicer";
import Modal from "../shared/components/Modal";
import { useMutation } from "@tanstack/react-query";
import { httpRequest, queryClient } from "../../utils/http";
import ErrorModal from "../shared/components/ErrorModal";

const User = () => {
  const [showModal, setShowModal] = useState(false);

  const [errorState, setErrorState] = useState(null);

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.currentUser);

  const token = useSelector((state) => state.auth.token);

  console.log("TOKEN", token);

  const dispatch = useDispatch();

  const { mutate, isError } = useMutation({
    mutationFn: () =>
      httpRequest({
        url: `/user/`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      dispatch(authActions.logout());
      setShowModal(false);
      queryClient.invalidateQueries(["users"]);
      navigate("/");
    },
    onError: (err) => {
      setErrorState(
        err?.response?.data?.message || "Failed to generate summary"
      );
    },
  });

  if (isError || errorState) {
    return (
      <ErrorModal
        message={errorState || "Something went wrong generating summary."}
        onClear={() => setErrorState(null)}
      />
    );
  }

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
              className="btn-sm btn-outline btn-secondary w-full"
            >
              Log out
            </Button>

            <Button
              onClick={() => setShowModal(true)}
              // className="btn btn-outline btn-error w-full"
              className="btn btn-outline btn-sm text-error border-error hover:bg-error hover:text-white w-full"
            >
              Delete Profile
            </Button>
          </div>
          <Modal
            show={showModal}
            onCancel={() => setShowModal(false)}
            header={"Are you sure?"}
            footer={
              <>
                <Button
                  className="btn btn-outline btn-sm text-error border-error hover:bg-error hover:text-white"
                  onClick={() => mutate(user.id)}
                >
                  Yes, Delete
                </Button>
                <Button
                  className="btn-sm btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </>
            }
          >
            <p>Do you really want to delete your profile ?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default User;
