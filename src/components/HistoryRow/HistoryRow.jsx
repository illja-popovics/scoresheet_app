import React from "react";
import styles from "./HistoryRow.module.css";

const HistoryRow = ({ entry, onDelete }) => {
  return (
    <tr>
      <td>{new Date(entry.date).toLocaleString()}</td>
      <td>{entry.game}</td>
      <td>{entry.players.map((p) => p.name).join(", ")}</td>
      <td>{entry.totals.join(" / ")}</td>
      <td>
        <button
          onClick={onDelete}
          title="Delete entry"
          className={styles.deleteButton}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default HistoryRow;
