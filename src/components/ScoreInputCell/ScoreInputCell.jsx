import React from "react";
import styles from "./ScoreInputCell.module.css";

const ScoreInputCell = ({
  value,
  roundIndex,
  playerIndex,
  onChange,
  inputRefs,
  addRound,
}) => {
  const inputKey = `${roundIndex}_${playerIndex}`;

  return (
    <td>
      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        placeholder="-"
        value={value}
        ref={(el) => {
          if (el) inputRefs.current[inputKey] = el;
        }}
        onChange={(e) =>
          onChange(roundIndex, playerIndex, e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addRound();
            setTimeout(() => {
              const nextKey = `${roundIndex + 1}_0`;
              inputRefs.current[nextKey]?.focus();
            }, 0);
          }
        }}
        className={styles.inputCell}
      />
    </td>
  );
};

export default ScoreInputCell;
