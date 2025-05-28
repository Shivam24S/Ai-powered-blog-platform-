import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  href,
  to,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "inline-block px-5 py-2 rounded-md font-medium text-sm sm:text-base transition duration-200 ease-in-out";

  const disabledStyles = "bg-gray-400 text-white cursor-not-allowed";

  const finalClassName = `${baseStyles} ${
    disabled ? disabledStyles : ""
  } ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={finalClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={finalClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={finalClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
