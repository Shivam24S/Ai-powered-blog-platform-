import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import MainNavigation from "./routes/MainNavigation";
import Auth from "./auth/Auth";
import Blogs from "./blogs/Blogs";
import UserForm from "./auth/UserForm";
import { queryClient } from "../utils/http";
import User from "./users/User";
import ProtectedRoute from "./routes/ProtectedRoutes";
import ErrorElement from "./routes/ErrorElement";
import BlogDetails from "./blogs/BlogPage";
import BlogsForms from "./blogs/BlogsForms";
import UsersBlogs from "./users/UsersBlogs";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainNavigation />,
      errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <Auth />,
        },
        {
          path: "blogs",
          element: <Blogs />,
        },
        {
          path: "signup",
          element: <UserForm />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          ),
        },
        {
          path: "editProfile",
          element: (
            <ProtectedRoute>
              <UserForm isEditMode={true} />
            </ProtectedRoute>
          ),
        },
        {
          path: "blogDetails/:id",
          element: <BlogDetails />,
        },
        {
          path: "writeBlog",
          element: <BlogsForms />,
        },
        {
          path: "myBlogs",
          element: <UsersBlogs />,
        },
        // {
        //   path: "editBlog",
        //   element: <BlogsForms isEditMode={true} initialData={blogData} />,
        // },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
};

export default App;
