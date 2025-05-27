import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainNavigation from "./routes/MainNavigation";
import Auth from "./auth/Auth";
import Blogs from "./blogs/Blogs";

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
