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
  variant = "primary",
  size = "md",
}) => {
  const baseClass = `btn btn-${variant} btn-${size}`;

  const combinedClass = `${baseClass} ${
    disabled ? "btn-disabled" : ""
  } ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={combinedClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
