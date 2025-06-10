import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../shared/formElements/Button";
import { isVideo } from "../../utils/isVideo";
import { useSelector } from "react-redux";
import Modal from "../shared/components/Modal";
import { useMutation } from "@tanstack/react-query";
import { httpRequest, queryClient } from "../../utils/http";
import ErrorModal from "../shared/components/ErrorModal";

const BlogsItem = ({ id, title, description, blogMedia, user, userBlog }) => {
  const [showModal, setShowModal] = useState(false);

  const [errorState, setErrorState] = useState(null);
  const navigate = useNavigate();

  const { currentUser, token } = useSelector((state) => state.auth);

  const { mutate, isError } = useMutation({
    mutationFn: () =>
      httpRequest({
        url: `/blog/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", userBlog]);
      setShowModal(false);
      navigate("/auth");
    },
    onError: (err) => {
      setErrorState(
        err?.response?.data?.message || "Failed to generate summary"
      );
    },
  });

  if (!id) {
    console.warn("BlogItem missing `id` — skipping render.");
    return null;
  }

  if (isError || errorState) {
    return (
      <ErrorModal
        message={errorState || "Something went wrong generating summary."}
        onClear={() => setErrorState(null)}
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-xl overflow-hidden">
      {blogMedia && (
        <div className="w-full h-48 lg:w-[200px] lg:h-[200px] mx-auto lg:mx-0 flex-shrink-0 overflow-hidden">
          {isVideo(blogMedia) ? (
            <video
              src={blogMedia}
              type="video/mp4"
              controls
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={blogMedia}
              alt="Blog Media"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
              }}
            />
          )}
        </div>
      )}

      <div className="p-4 lg:p-6 flex flex-col justify-between w-full">
        <div>
          <Link to={`/blogDetails/${id}`}>
            <h2 className="text-lg md:text-xl font-semibold text-primary hover:underline">
              {title || "Untitled Blog"}
            </h2>
          </Link>

          <p className="text-gray-700 mt-2 line-clamp-3">
            {description || "No description available."}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4 flex-wrap">
          {!userBlog && currentUser?.id !== user?.id && (
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user?.profilePic ||
                      "https://ui-avatars.com/api/?name=Anonymous&background=random"
                    }
                    alt={user?.name || "Anonymous"}
                  />
                </div>
              </div>
              <span className="text-sm text-gray-500">
                By {user?.name || "Anonymous"}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2 lg:mt-0 ml-auto">
            <Button to={`/blogDetails/${id}`} className="btn-sm">
              Read More
            </Button>
            {userBlog && currentUser.id === user && (
              <>
                <Button
                  to={`/editBlog/${id}`}
                  className="btn-sm btn-outline btn-secondary"
                >
                  Edit Blog
                </Button>
                <Button
                  className="btn btn-outline btn-sm text-error border-error hover:bg-error hover:text-white"
                  onClick={() => setShowModal(true)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
          <Modal
            show={showModal}
            header={"Are you sure ?"}
            onCancel={() => setShowModal(false)}
            footer={
              <>
                <Button
                  className="btn btn-outline btn-sm text-error border-error hover:bg-error hover:text-white"
                  onClick={() => mutate(id)}
                >
                  Yes, Delete
                </Button>
                <Button
                  className="btn-sm btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </>
            }
          >
            <p>Do you really want to delete this blog ?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default BlogsItem;
