import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

const MainNavigation = () => {
  return (
    <>
      <MainHeader>
        {/* Mobile hamburger menu - shown only on mobile */}
        <div className="md:hidden">
          <button className="btn btn-ghost btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo / App Title */}
        <h1 className="text-xl font-bold text-white">AI Blog</h1>

        {/* Nav links - shown only on md+ screens */}
        <nav className="hidden md:flex ml-auto gap-4">
          <NavLinks />
        </nav>
      </MainHeader>

      {/* Main content below the fixed header */}
      <main className="mt-16 px-4 w-full max-w-6xl mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default MainNavigation;
