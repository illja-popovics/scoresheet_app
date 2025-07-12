// src/components/GameSelector.jsx
import React, { useState, useEffect } from "react";
import { load, save } from "../../utils/storage"; // 

const STORAGE_KEY = "games";

const GameSelector = ({ onSelect }) => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState("");

  // Load saved games on mount
  useEffect(() => {
    setGames(load(STORAGE_KEY));
  }, []);

  const handleAddGame = () => {
    if (!newGame.trim()) return;

    const newEntry = { name: newGame };

    // Prevent duplicates (optional)
    const exists = games.some((g) => g.name === newEntry.name);
    if (exists) return;

    const updated = [...games, newEntry];
    save(STORAGE_KEY, updated);
    setGames(updated);
    setNewGame("");
    onSelect(newEntry);
  };

  return (
    <div>
      <h2>Select or Create a Game</h2>
      <ul>
        {games.map((g, i) => (
          <li key={i}>
            <button onClick={() => onSelect(g)}>{g.name}</button>
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
