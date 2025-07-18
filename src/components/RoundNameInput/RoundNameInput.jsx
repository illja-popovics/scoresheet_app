import React from "react";
import styles from "./RoundNameInput.module.css";

const RoundNameInput = ({ value, onChange, index }) => (
  <input
    type="text"
    placeholder={`Round ${index + 1}`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={styles.roundNameInput}
  />
);

export default RoundNameInput;
