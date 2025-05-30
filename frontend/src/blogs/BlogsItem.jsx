import React from "react";
import { Link } from "react-router-dom";
import Button from "../shared/formElements/Button";
import { isVideo } from "../../utils/isVideo";

const BlogsItem = ({ id, title, description, author, blogMedia }) => {
  return (
    <div className="flex flex-col lg:flex-row bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-xl overflow-hidden">
      {/* Fixed Size Media */}
      {blogMedia && (
        <div className="w-full h-48 lg:w-[200px] lg:h-[200px] mx-auto lg:mx-0 flex-shrink-0 overflow-hidden">
          {isVideo(blogMedia) ? (
            <video
              src={blogMedia}
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
            />
          )}
        </div>
      )}

      {/* Text Content */}
      <div className="p-4 lg:p-6 flex flex-col justify-between w-full">
        <div>
          <Link to={`/blogs/${id}`}>
            <h2 className="text-lg md:text-xl font-semibold text-primary hover:underline">
              {title}
            </h2>
          </Link>

          <p className="text-gray-700 mt-2 line-clamp-3">{description}</p>
        </div>

        <div className="flex justify-between items-center mt-4 flex-wrap">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    author?.image ||
                    "https://ui-avatars.com/api/?name=Anonymous&background=random"
                  }
                  alt={author?.name || "Anonymous"}
                />
              </div>
            </div>
            <span className="text-sm text-gray-500">
              By {author?.name || "Anonymous"}
            </span>
          </div>

          {/* Read More */}
          {/* <Link className="btn btn-sm btn-outline btn-primary mt-2 lg:mt-0"></Link> */}

          <Button to={`/blogs/${id}`}> Read More</Button>
        </div>
      </div>
    </div>
  );
};

export default BlogsItem;
