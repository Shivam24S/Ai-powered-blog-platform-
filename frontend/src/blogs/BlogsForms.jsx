import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import InputField from "../shared/formElements/InputField";
import Button from "../shared/formElements/Button";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import ErrorModal from "../shared/components/ErrorModal";
import { httpRequest, queryClient } from "../../utils/http";

const BlogsFormSchema = Yup.object().shape({
  title: Yup.string().min(1, "Too short").required("Title is required"),
  description: Yup.string()
    .min(5, "Too short")
    .required("Description is required"),
  blogMedia: Yup.mixed().nullable(),
});

const BlogsForms = ({ isEditMode = false, initialData = {} }) => {
  const [errorState, setErrorState] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) =>
      httpRequest({
        url: isEditMode ? `/blog/${initialData?._id}` : "/blog/addBlog",
        method: isEditMode ? "PATCH" : "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      navigate("/blogs");
    },
    onError: (err) => {
      setErrorState(err?.response?.data?.message || "Something went wrong!");
    },
  });

  const handleMediaPreview = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaPreview({ url, type: file.type });
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-base-200 px-4 relative">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6 z-10">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text uppercase tracking-wide">
          {isEditMode ? "Edit Blog" : "Write Blog"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            blogMedia: initialData.blogMedia || "",
            title: initialData?.title || "",
            description: initialData?.description || "",
          }}
          validationSchema={BlogsFormSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const formData = new FormData();
            if (values.blogMedia)
              formData.append("blogMedia", values.blogMedia);
            formData.append("title", values.title);
            formData.append("description", values.description);

            mutate(formData, {
              onError: () => resetForm(),
              onSettled: () => setSubmitting(false),
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-5">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Upload Blog Media (Image or Video)
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("blogMedia", file);
                    handleMediaPreview(file);
                  }}
                  className="file-input file-input-bordered w-full"
                />
                <ErrorMessage
                  name="blogMedia"
                  component="div"
                  className="text-sm text-error mt-1"
                />
              </div>

              {mediaPreview && (
                <div className="w-full border rounded-xl p-2">
                  {mediaPreview.type.startsWith("image") ? (
                    <img
                      src={mediaPreview.url}
                      alt="Preview"
                      className="w-full max-h-64 object-contain rounded"
                    />
                  ) : (
                    <video
                      controls
                      src={mediaPreview.url}
                      className="w-full max-h-64 object-contain rounded"
                    />
                  )}
                </div>
              )}

              <InputField
                label="Title"
                name="title"
                type="text"
                placeholder="Enter blog title"
              />

              <div>
                <label
                  htmlFor="description"
                  className="block font-semibold text-sm text-gray-700"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="5"
                  placeholder="Write your blog content here..."
                  className="textarea textarea-bordered w-full mt-1"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-sm text-error mt-1"
                />
              </div>

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
                    : "Publishing..."
                  : isEditMode
                  ? "Update Blog"
                  : "Publish Blog"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <LoadingSpinner
            loadingText={
              isEditMode ? "Updating blog..." : "Publishing your blog..."
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

export default BlogsForms;
