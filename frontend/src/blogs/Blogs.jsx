import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { httpRequest } from "../../utils/http";
import BlogsList from "./BlogsList";
import ErrorModal from "../shared/components/ErrorModal";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import Button from "../shared/formElements/Button";

const Blogs = ({ userBlog = false }) => {
  const [errorState, setErrorState] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: ["blog", userBlog],
    queryFn: () =>
      httpRequest({
        url: userBlog
          ? "/blog/userBlogs"
          : isAuthenticated
          ? "/blog/allBlogs"
          : "/blog/blogs",
        method: "GET",
        headers: {
          Authorization: userBlog || isAuthenticated ? `Bearer ${token}` : "",
        },
      }),
    enabled: userBlog ? !!token : true,
    onError: (err) => {
      setErrorState(err?.response?.data?.message || "Something went wrong!");
    },
  });

  let content;

  if (isLoading) {
    content = <LoadingSpinner loadingText="Loading Blogs..." />;
  } else if (errorState) {
    content = <ErrorModal message={errorState} />;
  } else if (data) {
    content = <BlogsList blogs={data.blogs || []} userBlog={userBlog} />;
  }

  console.log("data", data);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">
        {userBlog ? "My Blogs" : "Latest Blogs"}{" "}
      </h1>

      {!data?.blogs && !isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="bg-base-200 text-base-content p-6 rounded-xl shadow-md text-center w-full max-w-md">
            <h2 className="text-lg font-semibold">No Blogs Found</h2>
            <p className="text-sm text-gray-500 mt-2">
              Looks like there are no blogs available right now.
            </p>
          </div>
        </div>
      ) : (
        content
      )}

      {!isAuthenticated && !isLoading && (
        <div className="flex justify-center items-center mt-8 px-4">
          <Button
            className="w-full max-w-xs sm:max-w-sm md:max-w-md px-6 py-3 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
            type="button"
            to="/"
          >
            Explore More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
