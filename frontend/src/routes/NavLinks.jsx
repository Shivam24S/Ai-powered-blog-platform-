import { NavLink } from "react-router-dom";

const links = [
  { to: "blogs", label: "Blogs" },
  { to: "/", label: "Sign In" },
  { to: "writeBlog", label: "Write Blog" },
  { to: "profile", label: "My Profile" },
];

const NavLinks = () => {
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
