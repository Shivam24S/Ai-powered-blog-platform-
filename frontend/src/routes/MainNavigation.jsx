import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import { useState } from "react";
import SideDrawer from "./SideDrawer";

const MainNavigation = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <MainHeader>
        {/* Mobile hamburger menu - shown only on mobile */}
        <div className="md:hidden">
          <button
            className="btn btn-ghost btn-square"
            aria-label="Open navigation menu"
            onClick={() => setShowDrawer(true)}
          >
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

          <SideDrawer
            show={showDrawer}
            closeDrawer={() => setShowDrawer(false)}
          >
            <NavLinks onLinkClick={() => setShowDrawer(false)} />
          </SideDrawer>
        </div>

        {/* Logo / App Title */}
        <h1 className="text-xl font-bold text-white">QuickReads.AI</h1>

        <nav className="hidden md:flex ml-auto gap-4">
          <NavLinks />
        </nav>
      </MainHeader>

      <main className="mt-16 px-4 w-full max-w-6xl mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default MainNavigation;
