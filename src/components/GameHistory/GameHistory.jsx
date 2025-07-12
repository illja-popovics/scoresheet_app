// src/components/GameHistory/GameHistory.jsx
import React, { useState, useEffect } from "react";
import { load, save } from "../../utils/storage";

const STORAGE_KEY = "gameResults";

const GameHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = load(STORAGE_KEY, []);
    setHistory(saved.reverse()); // newest first
  }, []);

  const deleteHistoryItem = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    save(STORAGE_KEY, [...updated].reverse()); // reverse back before saving
    setHistory(updated);
  };

  if (history.length === 0) {
    return <p>No saved game history yet.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
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
                  style={{
                    color: "red",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
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
