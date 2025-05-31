import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../shared/formElements/Button";
import InputField from "../shared/formElements/InputField";
import { httpRequest } from "../../utils/http";
import { authActions } from "../store/features/authSlicer";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import ErrorModal from "../shared/components/ErrorModal";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorState, setErrorState] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationKey: ["users"],
    mutationFn: (data) =>
      httpRequest({ url: "/user/login", method: "POST", body: data }),
    onSuccess: (responseData) => {
      dispatch(
        authActions.login({
          user: responseData.user,
          token: responseData.token,
        })
      );
      navigate("/blogs");
    },
    onError: (err) => {
      setErrorState(err?.response?.data?.message || "Something went wrong!");
    },
  });

  return (
    <section className="flex justify-center items-center min-h-screen bg-base-200 px-4 relative">
      <div className="card w-full max-w-md bg-base-100 shadow-lg p-6 z-10">
        <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text uppercase tracking-wide">
          LOG IN
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={(values, { resetForm }) => {
            mutate(values, {
              onError: () => resetForm(),
            });
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

              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !!errorState}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>

                {!isPending && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    className="w-full"
                    onClick={() => dispatch(authActions.setLoginMode(false))}
                  >
                    Switch to Sign Up
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
          <LoadingSpinner
            loadingText={"Verifying credentials, please wait..."}
          />
        </div>
      )}

      {errorState && (
        <ErrorModal error={errorState} onClear={() => setErrorState(null)} />
      )}
    </section>
  );
};

export default SignIn;
