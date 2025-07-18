import React from "react";
import styles from "./RoundTypeSelector.module.css";

const RoundTypeSelector = ({ selected, onChange }) => (
  <div>
    <h4>Round Label Type:</h4>
    <div className={styles.radioGroup}>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          className={styles.radioInput}
          value="numbered"
          checked={selected === "numbered"}
          onChange={() => onChange("numbered")}
        />
        Numbered Rounds
      </label>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          className={styles.radioInput}
          value="named"
          checked={selected === "named"}
          onChange={() => onChange("named")}
        />
        Named Rounds
      </label>
    </div>
  </div>
);

export default RoundTypeSelector;
