import React from "react";
import styles from "./PlayerList.module.css";

const PlayerList = ({ players, selected, onToggle, onDelete }) => (
  <>
    <h4>Previously Used Players:</h4>
    <ul className={styles.playerList}>
      {players.map((p, i) => (
        <li key={i} className={styles.playerItem}>
          <label>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={!!selected.find((sel) => sel.name === p.name)}
              onChange={() => onToggle(p)}
            />
            {p.name}
          </label>
          <button
            onClick={() =>
              window.confirm("Delete this player?") && onDelete(i)
            }
            title="Delete Player"
            className={styles.deleteButton}
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  </>
);

export default PlayerList;
