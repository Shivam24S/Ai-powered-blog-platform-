import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { httpRequest } from "../../utils/http";
import BlogsList from "./BlogsList";
import ErrorModal from "../shared/components/ErrorModal";
import LoadingSpinner from "../shared/components/LoadingSpinner";

const Blogs = ({ userBlog = false }) => {
  const [errorState, setErrorState] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: ["blog", userBlog],
    queryFn: () =>
      httpRequest({
        url: userBlog ? "/blog/userBlogs" : "/blog/blogs",
        method: "GET",
        headers: {
          Authorization: userBlog ? `Bearer ${token}` : "",
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
    content = <BlogsList blogs={data.blogs || []} />;
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">
        {userBlog ? "My Blogs" : "Latest Blogs"}{" "}
      </h1>
      {content}
    </div>
  );
};

export default Blogs;
