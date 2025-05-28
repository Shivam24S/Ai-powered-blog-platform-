import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const links = [
    { to: "blogs", label: "Blogs" },
    !currentUser && { to: "/", label: "Sign In" },
    currentUser && { to: "writeBlog", label: "Write Blog" },
    currentUser && { to: "profile", label: "My Profile" },
  ].filter(Boolean);

  return (
    <ul className="menu menu-horizontal px-1 gap-2 text-white">
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              isActive
                ? "btn btn-sm btn-active btn-primary font-semibold"
                : "btn btn-sm btn-ghost hover:bg-primary hover:text-white"
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
