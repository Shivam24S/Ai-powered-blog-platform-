import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

const MainNavigation = () => {
  return (
    <>
      <MainHeader>
        {/* Mobile menu button - hidden on large screens */}
        <button className="flex flex-col gap-1 md:hidden">
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>

        {/* Logo or title */}
        <h1 className="text-black text-xl font-bold ml-4">App Title</h1>

        {/* Navigation links - hidden on small screens */}
        <nav className="hidden md:block ml-auto">
          <NavLinks />
        </nav>
      </MainHeader>

      {/* Page content below the fixed header */}
      <main className="mt-16 px-4 w-full">
        <Outlet />
      </main>
    </>
  );
};

export default MainNavigation;
