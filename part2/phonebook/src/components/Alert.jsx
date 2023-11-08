import React from "react";

const Alert = ({ successMessage, errorMessage }) => {
  if (!successMessage && !errorMessage) {
    return null;
  }

  return (
    <div className={`message ${successMessage ? "success" : "error"}`}>
      {successMessage ? successMessage : errorMessage}
    </div>
  );
};

export default Alert;