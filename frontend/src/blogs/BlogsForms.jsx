import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import InputField from "../shared/formElements/InputField";
import Button from "../shared/formElements/Button";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import ErrorModal from "../shared/components/ErrorModal";
import ImageUpload from "../shared/formElements/FileUpload"; // your component
import { httpRequest, queryClient } from "../../utils/http";

const BlogsFormSchema = Yup.object().shape({
  title: Yup.string().min(1, "Too short").required("Title is required"),
  description: Yup.string()
    .min(5, "Too short")
    .required("Description is required"),
  blogMedia: Yup.mixed().nullable(),
});

const BlogsForms = ({ isEditMode = false }) => {
  const [errorState, setErrorState] = useState(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState(null);

  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const { data: initialData, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => httpRequest({ url: `/blog/${blogId}` }),
    enabled: isEditMode && !!blogId,
    onError: (err) => {
      setErrorState(err?.response?.data?.message || "Something went wrong!");
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) =>
      httpRequest({
        url: isEditMode ? `/blog/${blogId}` : "/blog/addBlog",
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

  useEffect(() => {
    if (isEditMode && initialData?.blogMedia) {
      setMediaPreviewUrl(initialData.blogMedia);
    }
  }, [initialData, isEditMode]);

  if (isEditMode && isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner loadingText="Loading blog details..." />
      </div>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-base-200 px-4 relative">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6 z-10">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text uppercase tracking-wide">
          {isEditMode ? "Edit Blog" : "Write Blog"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            blogMedia: "",
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
              onError: () => {
                if (!isEditMode) resetForm();
              },
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
                <ImageUpload
                  name="blogMedia"
                  id="blogMedia"
                  placeholder="Click to upload image or video"
                  onFileSelect={(file) => {
                    setFieldValue("blogMedia", file);

                    if (file) setMediaPreviewUrl(null);
                  }}
                  previewUrl={isEditMode ? mediaPreviewUrl : null}
                />
                <ErrorMessage
                  name="blogMedia"
                  component="div"
                  className="text-sm text-error mt-1"
                />
              </div>

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
        <ErrorModal message={errorState} onClear={() => setErrorState(null)} />
      )}
    </section>
  );
};

export default BlogsForms;
