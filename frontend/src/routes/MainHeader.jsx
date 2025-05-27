import React from "react";

const MainHeader = ({ children }) => {
  return (
    <header className="w-full h-16 fixed top-0 left-0 bg-primary-600 shadow-md px-4 z-50">
      <div className="flex items-center justify-between h-full">{children}</div>
    </header>
  );
};

export default MainHeader;
