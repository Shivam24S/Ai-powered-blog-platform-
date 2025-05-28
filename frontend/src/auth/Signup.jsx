import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../shared/formElements/Button";
import InputField from "../../shared/formElements/InputField";

// Validation Schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-6">
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
          onSubmit={(values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("profilePic", values.profilePic);
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);

            console.log("Form Data:", values);

            // Submit formData via fetch or axios here
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Profile Picture */}
              <div className="form-control w-full">
                <label htmlFor="profilePic" className="label">
                  <span className="label-text">Profile Picture</span>
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
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Name */}
              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
              />

              {/* Email */}
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />

              {/* Password */}
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="md"
                className="w-full mt-2"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="w-full"
                to="/"
              >
                Switch to Log in
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Signup;
