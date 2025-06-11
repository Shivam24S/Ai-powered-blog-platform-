import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../shared/formElements/Button";
import InputField from "../shared/formElements/InputField";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import ErrorModal from "../shared/components/ErrorModal";
import { httpRequest, queryClient } from "../../utils/http";
import { authActions } from "../store/features/authSlicer";
import FileUpload from "../shared/formElements/FileUpload";

const UserFormSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Too short")
    .when("isEditMode", {
      is: false,
      then: (schema) => schema.required("Password is required"),
    }),
});

const UserForm = ({ isEditMode = false }) => {
  const [errorState, setErrorState] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser: user, token } = useSelector((state) => state.auth);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) =>
      httpRequest({
        url: isEditMode ? "/user" : "/user/registerUser",
        method: isEditMode ? "PATCH" : "POST",
        body: formData,
        headers: isEditMode ? { Authorization: `Bearer ${token}` } : {},
      }),
    onSuccess: (responseData) => {
      if (isEditMode) {
        queryClient.invalidateQueries("users");
      }
      dispatch(
        authActions.login({
          user: responseData.user,
          token: responseData.token,
        })
      );
      setTimeout(() => {
        navigate(isEditMode ? "/profile" : "/blogs");
      }, 300);
    },
    onError: (err) => {
      setErrorState(err?.response?.data?.message || "Something went wrong!");
    },
  });

  return (
    <section className="flex justify-center items-center min-h-screen bg-base-200 px-4 relative">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 z-10">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text uppercase tracking-wide">
          {isEditMode ? "Edit Profile" : "Sign Up"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            profilePic: null,
            name: isEditMode && user ? user.name : "",
            email: isEditMode && user ? user.email : "",
            password: "",
          }}
          validationSchema={UserFormSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const formData = new FormData();
            if (values.profilePic)
              formData.append("profilePic", values.profilePic);
            formData.append("name", values.name);
            formData.append("email", values.email);
            if (!isEditMode) formData.append("password", values.password);

            mutate(formData, {
              onError: () => resetForm(),
              onSettled: () => setSubmitting(false),
              onSuccess: () => {
                navigate("/blogs");
              },
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              <div className="flex justify-center">
                <FileUpload
                  name="profilePic"
                  id="profilePic"
                  placeholder="Click to upload profile picture"
                  previewUrl={isEditMode ? user?.profilePic : null}
                  onFileSelect={(file) => setFieldValue("profilePic", file)}
                />
              </div>
              <ErrorMessage
                name="profilePic"
                component="div"
                className="text-sm text-error mt-1 text-center"
              />

              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />

              {!isEditMode && (
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              )}

              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  {isPending
                    ? isEditMode
                      ? "Updating..."
                      : "Signing up..."
                    : isEditMode
                    ? "Update Profile"
                    : "Sign Up"}
                </Button>

                {!isPending && !isEditMode && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    className="w-full"
                    onClick={() => dispatch(authActions.setLoginMode(true))}
                  >
                    Switch to Log in
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <LoadingSpinner
            loadingText={
              isEditMode ? "Updating profile..." : "Creating your account..."
            }
          />
        </div>
      )}

      {errorState && (
        <ErrorModal error={errorState} onClear={() => setErrorState(null)} />
      )}
    </section>
  );
};

export default UserForm;
