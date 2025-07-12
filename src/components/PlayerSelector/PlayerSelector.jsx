import React, { useState } from "react";
import usePlayers from "../../hooks/usePlayers";
import styles from "./PlayerSelector.module.css";

const PlayerSelector = ({ onConfirm, onBack }) => {
  const {
    savedPlayers,
    selectedPlayers,
    toggleSelection,
    addPlayer,
    deletePlayer,
    setSelectedPlayers
  } = usePlayers();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const handleAdd = () => {
    addPlayer(name, photo);
    setName("");
    setPhoto("");
  };

  return (
    <div>
      <h2>Select or Add Players</h2>

      <h4>Previously Used Players:</h4>
      <ul className={styles.playerList}>
        {savedPlayers.map((p, i) => (
          <li key={i} className={styles.playerItem}>
            <label>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={!!selectedPlayers.find((sel) => sel.name === p.name)}
                onChange={() => toggleSelection(p)}
              />
              {p.name}
            </label>
            <button
              onClick={() => {
                if (window.confirm("Delete this player?")) deletePlayer(i);
              }}
              title="Delete Player"
              className={styles.deleteButton}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <h4>Add New Player:</h4>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* <input
        placeholder="Photo URL (optional)"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      /> */}
      <button onClick={handleAdd}>Add Player</button>

      <hr />
      <button
        onClick={() => onConfirm(selectedPlayers)}
        disabled={selectedPlayers.length === 0}
      >
        Confirm Players
      </button>
      <button onClick={onBack} style={{ marginLeft: "10px" }}>
        ⬅️ Back
      </button>
    </div>
  );
};

export default PlayerSelector;
