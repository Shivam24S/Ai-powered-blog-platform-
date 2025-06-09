import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../shared/formElements/Button";
import { isVideo } from "../../utils/isVideo";
import { useSelector } from "react-redux";
import Modal from "../shared/components/Modal";

const BlogsItem = ({ id, title, description, blogMedia, user, userBlog }) => {
  const [showModal, setShowModal] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);

  if (!id) {
    console.warn("BlogItem missing `id` — skipping render.");
    return null;
  }

  console.log("userBlog", userBlog);

  console.log("current user", currentUser);

  console.log("blog user", user);

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
                <Button onClick={() => setShowModal(true)}>Delete</Button>
              </>
            )}
          </div>
          <Modal
            show={showModal}
            header={"are you sure ?"}
            onCancel={() => setShowModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsItem;
