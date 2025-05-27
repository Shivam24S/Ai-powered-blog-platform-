import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <ul className="flex gap-6 items-center text-black">
      <li>
        <NavLink
          to="blogs"
          className={({ isActive }) =>
            isActive
              ? "text-accent-500 font-semibold border-b-2 border-accent-500 pb-1"
              : "hover:text-accent-500 transition-colors duration-200"
          }
        >
          Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-accent-500 font-semibold border-b-2 border-accent-500 pb-1"
              : "hover:text-accent-500 transition-colors duration-200"
          }
        >
          Sign In
        </NavLink>
      </li>
      <li>
        <NavLink
          to="writeBlog"
          className={({ isActive }) =>
            isActive
              ? "text-accent-500 font-semibold border-b-2 border-accent-500 pb-1"
              : "hover:text-accent-500 transition-colors duration-200"
          }
        >
          Write Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "text-accent-500 font-semibold border-b-2 border-accent-500 pb-1"
              : "hover:text-accent-500 transition-colors duration-200"
          }
        >
          My Profile
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
