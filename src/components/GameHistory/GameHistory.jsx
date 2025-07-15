import React, { useRef } from "react";
import useGameHistory from "../../hooks/useGameHistory";
import { exportGameHistoryToCSV } from "../../utils/csvExport";
import { importGameHistoryFromCSV } from "../../utils/csvImport";
import styles from "./GameHistory.module.css";

const GameHistory = () => {
  const { history, deleteHistoryItem, setHistory } = useGameHistory();
  const fileInputRef = useRef();

  const handleExport = () => {
    exportGameHistoryToCSV(history);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importGameHistoryFromCSV(file, (importedData) => {
        setHistory(importedData);
      });
    }
  };

  return (
    <div className={styles.container}>
      <h3>Game History</h3>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleExport} disabled={history.length === 0}>
          Export CSV
        </button>
        <button onClick={() => fileInputRef.current.click()}>
          Import CSV
        </button>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleImport}
          style={{ display: "none" }}
        />
      </div>

      {history.length === 0 ? (
        <p>No saved game history yet.</p>
      ) : (
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
              <tr key={entry.date}>
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
      )}
    </div>
  );
};

export default GameHistory;
