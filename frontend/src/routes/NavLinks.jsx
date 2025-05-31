import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks = ({ onLinkClick }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const links = [
    { to: "blogs", label: "Blogs" },
    !isAuthenticated && { to: "/", label: "Sign In" },
    isAuthenticated && { to: "writeBlog", label: "Write Blog" },
    isAuthenticated && { to: "myBlogs", label: "My Blogs" },
    isAuthenticated && { to: "profile", label: "My Profile" },
  ].filter(Boolean);

  return (
    <ul
      className="
        flex flex-col items-center justify-center gap-4 p-4 w-full 
        md:menu md:menu-horizontal md:px-1 md:gap-2 md:bg-transparent md:text-white
      "
    >
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            onClick={onLinkClick}
            className={({ isActive }) =>
              [
                "btn btn-sm w-40 md:w-auto",
                isActive
                  ? "btn-active btn-primary font-semibold"
                  : "btn-ghost hover:bg-primary hover:text-white",
              ].join(" ")
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
