import React, { useState, useEffect } from "react";
import { load, save } from "../../utils/storage";

const LOCAL_STORAGE_KEY = "players";

const PlayerSelector = ({ onConfirm }) => {
  const [savedPlayers, setSavedPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  // Load saved players on mount
  useEffect(() => {
    setSavedPlayers(load(LOCAL_STORAGE_KEY));
  }, []);

  const togglePlayerSelection = (player) => {
    const exists = selectedPlayers.find(p => p.name === player.name);
    if (exists) {
      setSelectedPlayers(selectedPlayers.filter(p => p.name !== player.name));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const addPlayer = () => {
    if (!name.trim()) return;
    const newPlayer = { name, photo };

    // Avoid duplicates
    const exists = savedPlayers.some(p => p.name === name);
    const updatedSaved = exists ? savedPlayers : [...savedPlayers, newPlayer];

    save(LOCAL_STORAGE_KEY, updatedSaved);
    setSavedPlayers(updatedSaved);
    setSelectedPlayers([...selectedPlayers, newPlayer]);
    setName("");
    setPhoto("");
  };

  return (
    <div>
      <h2>Select or Add Players</h2>

      {/* Saved players list */}
      <h4>Previously Used Players:</h4>
      <ul>
        {savedPlayers.map((p, i) => (
          <li key={i}>
            <label>
              <input
                type="checkbox"
                checked={!!selectedPlayers.find(sel => sel.name === p.name)}
                onChange={() => togglePlayerSelection(p)}
              />
              {p.name}
            </label>
          </li>
        ))}
      </ul>

      {/* New player form */}
      <h4>Add New Player:</h4>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Photo URL (optional)"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <button onClick={addPlayer}>Add Player</button>

      <hr />
      <button
        onClick={() => onConfirm(selectedPlayers)}
        disabled={selectedPlayers.length === 0}
      >
        Confirm Players
      </button>
    </div>
  );
};

export default PlayerSelector;
