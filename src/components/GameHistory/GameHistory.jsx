import React from "react";
import useGameHistory from "../../hooks/useGameHistory";
import styles from "./GameHistory.module.css";

const GameHistory = () => {
  const { history, deleteHistoryItem } = useGameHistory();

  if (history.length === 0) {
    return <p>No saved game history yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h3>Game History</h3>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Game</th>
            <th>Players</th>
            <th>Totals</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, i) => (
            <tr key={i}>
              <td>{new Date(entry.date).toLocaleString()}</td>
              <td>{entry.game}</td>
              <td>{entry.players.map((p) => p.name).join(", ")}</td>
              <td>{entry.totals.join(" / ")}</td>
              <td>
                <button
                  onClick={() => deleteHistoryItem(i)}
                  title="Delete entry"
                  className={styles.deleteButton}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameHistory;
