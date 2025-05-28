import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../shared/formElements/Button";
import InputField from "../../shared/formElements/InputField";

// Validation schema using Yup
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-6">
        <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text uppercase tracking-wide">
          LOG IN
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Form Submitted:", values);
            setSubmitting(false);
            // handle your login logic here
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
    </section>
  );
};

export default SignIn;
