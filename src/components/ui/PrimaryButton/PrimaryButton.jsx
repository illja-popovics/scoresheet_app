import React from "react";
import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({ children, onClick, title, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
