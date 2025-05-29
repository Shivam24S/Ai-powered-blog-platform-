import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../shared/formElements/Button";
import InputField from "../../shared/formElements/InputField";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";
import { httpRequest } from "../../utils/http";
import { authActions } from "../store/features/authSlicer";

// Validation Schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(null);

  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) =>
      httpRequest({
        url: "/user/registerUser",
        method: "POST",
        body: formData,
        isMultipart: true,
      }),
    onSuccess: (data) => {
      dispatch(authActions.setCurrentUser(data.user));
      setTimeout(() => {
        navigate("/profile");
      }, 300);
    },
    onError: (err) => {
      console.log(err.message);
      setErrorState(err?.response?.data?.message || "Something went wrong!");
    },
  });

  return (
    <section className="flex justify-center items-center min-h-screen bg-base-200 px-4 relative">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 z-10">
        <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text uppercase tracking-wide">
          Sign Up
        </h2>

        <Formik
          initialValues={{
            profilePic: null,
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const formData = new FormData();

            if (values.profilePic) {
              formData.append("profilePic", values.profilePic);
            }

            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);

            mutate(formData, {
              onError: () => {
                resetForm();
              },
              onSettled: () => {
                setSubmitting(false);
              },
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {/* Profile Picture */}
              <div className="form-control w-full">
                <label htmlFor="profilePic" className="label">
                  <span className="label-text font-semibold">
                    Profile Picture
                  </span>
                </label>
                <input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("profilePic", event.currentTarget.files[0]);
                  }}
                  className="file-input file-input-bordered w-full"
                />
                <ErrorMessage
                  name="profilePic"
                  component="div"
                  className="text-sm text-error mt-1"
                />
              </div>

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

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />

              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  {isPending ? "Signing up..." : "Sign Up"}
                </Button>

                {!isPending && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    className="w-full"
                    to="/"
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
          <LoadingSpinner loadingText="Creating your account..." />
        </div>
      )}

      {errorState && (
        <ErrorModal error={errorState} onClear={() => setErrorState(null)} />
      )}
    </section>
  );
};

export default Signup;
