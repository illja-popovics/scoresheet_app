import React from "react";
import styles from "./TextInput.module.css";

const TextInput = ({ value, onChange, placeholder, className = "", type = "text" }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
    />
  );
};

export default TextInput;
