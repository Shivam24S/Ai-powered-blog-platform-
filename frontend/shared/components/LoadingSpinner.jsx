import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-10 shadow-xl flex flex-col items-center animate-fade-in">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <p className="text-primary text-lg font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
