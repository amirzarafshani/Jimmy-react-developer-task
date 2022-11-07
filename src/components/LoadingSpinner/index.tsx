import React from "react";
import "./LoadingSpinner.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">loading</div>
    </div>
  );
};

export default LoadingSpinner;
