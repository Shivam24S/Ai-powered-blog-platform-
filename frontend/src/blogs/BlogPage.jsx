import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { httpRequest } from "../../utils/http";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import ErrorModal from "../shared/components/ErrorModal";
import { isVideo } from "../../utils/isVideo";
import Button from "../shared/formElements/Button";
import SummaryComponent from "./SummaryComponent";

const BlogDetails = () => {
  const [errorState, setErrorState] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const { id } = useParams();

  const {
    data: blog,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () =>
      httpRequest({
        url: `/blog/${id}`,
      }),
    onError: (err) => {
      setErrorState(err?.response?.data?.message || "Something went wrong");
    },
  });

  if (isPending) {
    return <LoadingSpinner loadingText="Loading Blog Details..." />;
  }

  if (isError || errorState) {
    return (
      <ErrorModal message={errorState || "Failed to load blog details."} />
    );
  }

  if (!blog) {
    return <p className="text-center text-red-500 mt-10">Blog not found.</p>;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-6">
          <h2 className="text-4xl font-bold text-primary">
            {blog?.title || "Untitled Blog"}
          </h2>

          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={
                    blog.author?.avatar ||
                    "https://ui-avatars.com/api/?name=Anonymous"
                  }
                  alt={blog.author?.name || "Anonymous"}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              By {blog.user?.name || "Unknown Author"}
            </p>
          </div>

          {blog.blogMedia && (
            <div className="w-full max-h-[500px] overflow-hidden rounded-lg border border-base-300">
              {isVideo(blog.blogMedia) ? (
                <video
                  controls
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full"
                >
                  <source src={blog.blogMedia} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={blog.blogMedia}
                  alt="Blog Media"
                  className="w-full object-cover "
                />
              )}
            </div>
          )}

          <div>
            <Button
              className="btn btn-secondary"
              onClick={() => setShowSummary((prev) => !prev)}
            >
              {showSummary ? "Show Full Description" : "Summarize Blog"}
            </Button>
          </div>

          {/* Description or Summary */}
          <div className="prose max-w-none">
            {showSummary ? (
              <SummaryComponent blogId={id} />
            ) : (
              <p>{blog?.description || "No description provided."}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
