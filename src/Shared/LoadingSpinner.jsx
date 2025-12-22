import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-250px)]">
      <div className="flex flex-col items-center space-y-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-xl font-medium">Loading StyleDecor...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
