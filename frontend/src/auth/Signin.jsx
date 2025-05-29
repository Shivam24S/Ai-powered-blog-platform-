import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../shared/formElements/Button";
import InputField from "../../shared/formElements/InputField";
import { httpRequest } from "../../utils/http";
import { authActions } from "../store/features/authSlicer";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

// Validation schema using Yup
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: (data) =>
      httpRequest({ url: "/user/login", method: "POST", body: data }),
    onSuccess: (data) => {
      console.log("user logged in");
      dispatch(authActions.login());
      dispatch(authActions.setCurrentUser(data.user));
      navigate("/profile");
    },
  });

  let content;

  if (isPending) {
    content = <LoadingSpinner />;
  }

  if (isError) {
    content = (
      <h4 className="text-red-500 text-center mt-4">
        {error?.message || "Something went wrong"}
      </h4>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-6">
        <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text uppercase tracking-wide">
          LOG IN
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            console.log("Form Submitted:", values);
            mutate(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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

              {/* Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="w-full"
                  to="/signup"
                >
                  Switch to Sign Up
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {content}
    </section>
  );
};

export default SignIn;
