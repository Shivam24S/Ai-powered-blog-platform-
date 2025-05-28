import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import MainNavigation from "./routes/MainNavigation";
import Auth from "./auth/Auth";
import Blogs from "./blogs/Blogs";
import Signup from "./auth/Signup";
import { queryClient } from "../utils/http";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainNavigation />,
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
          element: <Signup />,
        },
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
