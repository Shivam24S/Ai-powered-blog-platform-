import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../shared/formElements/Button";

// Validation schema using Yup
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-primary-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-primary-700 text-center mb-4">
          Log in Required
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
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-sm"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 font-medium text-sm"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="mt-6 space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-black "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
                <Button
                  type="button"
                  className="w-full bg-secondary-500 hover:bg-secondary-600 text-black"
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
