import React from "react";
import "./LoadingSpinner.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container" data-testid="loading-spinner">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
