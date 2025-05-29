import React from "react";
import ReactDOM from "react-dom";

const SideDrawer = ({ children, show, closeDrawer }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeDrawer}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-md z-50 p-4 overflow-y-auto transition-transform duration-600 ease-in-out transform ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={closeDrawer}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
          aria-label="Close menu"
        >
          ✕
        </button>

        <div className="h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </aside>
    </>,
    document.getElementById("side-drawer")
  );
};

export default SideDrawer;
