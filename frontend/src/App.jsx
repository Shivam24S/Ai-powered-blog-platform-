import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainNavigation from "./routes/MainNavigation";
import Auth from "./auth/Auth";
import Blogs from "./blogs/Blogs";
import Signup from "./auth/Signup";

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
      <RouterProvider router={router} />
    </>
  );
};

export default App;
