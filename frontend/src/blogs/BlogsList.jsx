import React from "react";
import BlogsItem from "./BlogsItem";

const BlogsList = ({ blogs }) => {
  return blogs.length > 0 ? (
    <div className="grid gap-6">
      {blogs.map((blog) => (
        <BlogsItem
          key={blog._id}
          id={blog._id}
          title={blog.title}
          description={blog.description}
          author={blog.user}
          blogMedia={blog.blogMedia}
        />
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500 mt-10">No blogs found.</p>
  );
};

export default BlogsList;
