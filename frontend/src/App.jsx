import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./routes/MainNavigation";
import Auth from "./auth/Auth";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainNavigation />,
      children: [
        {
          path: "",
          element: <Auth />,
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
