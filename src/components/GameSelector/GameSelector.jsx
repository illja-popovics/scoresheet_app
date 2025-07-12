import React, { useState, useEffect } from "react";
import { load, save } from "../../utils/storage";

const STORAGE_KEY = "games";

const GameSelector = ({ onSelect }) => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState("");

  useEffect(() => {
    setGames(load(STORAGE_KEY));
  }, []);

  const handleAddGame = () => {
    if (!newGame.trim()) return;

    const newEntry = { name: newGame.trim() };

    const exists = games.some(
      (g) => g.name.toLowerCase() === newEntry.name.toLowerCase()
    );
    if (exists) return;

    const updated = [...games, newEntry];
    save(STORAGE_KEY, updated);
    setGames(updated);
    setNewGame("");
    onSelect(newEntry);
  };

  const deleteGame = (index) => {
    if (window.confirm("Delete this game?")) {
      const updated = [...games];
      updated.splice(index, 1);
      setGames(updated);
      save(STORAGE_KEY, updated);
    }
  };

  return (
    <div>
      <h2>Select or Create a Game</h2>
      <ul>
        {games.map((g, i) => (
          <li key={i}>
            <button onClick={() => onSelect(g)}>{g.name}</button>
            <button
              onClick={() => deleteGame(i)}
              style={{
                marginLeft: "10px",
                color: "red",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              title="Delete Game"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <input
        value={newGame}
        onChange={(e) => setNewGame(e.target.value)}
        placeholder="New game name"
      />
      <button onClick={handleAddGame}>Add Game</button>
    </div>
  );
};

export default GameSelector;
