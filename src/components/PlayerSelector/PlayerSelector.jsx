import React, { useState } from "react";
import usePlayers from "../../hooks/usePlayers";
import PlayerList from "../PlayerList/PlayerList";
import RoundTypeSelector from "../RoundTypeSelector/RoundTypeSelector";
import TextInput from "../ui/TextInput/TextInput";
import PrimaryButton from "../ui/PrimaryButton/PrimaryButton";

import styles from "./PlayerSelector.module.css";

const PlayerSelector = ({ onConfirm, onBack }) => {
  const {
    savedPlayers,
    selectedPlayers,
    toggleSelection,
    addPlayer,
    deletePlayer,
    validateSelection,
  } = usePlayers();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(""); // future use
  const [roundType, setRoundType] = useState("numbered");

  const handleAdd = () => {
    addPlayer(name, photo);
    setName("");
    setPhoto("");
  };

  const handleConfirm = () => {
    if (!validateSelection()) return;
    onConfirm(selectedPlayers, roundType);
  };

  return (
    <div>
      <h2>Select or Add Players</h2>

      <PlayerList
        players={savedPlayers}
        selected={selectedPlayers}
        onToggle={toggleSelection}
        onDelete={deletePlayer}
      />

      <h4>Add New Player:</h4>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <TextInput
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <PrimaryButton className={styles.addButton} onClick={handleAdd}>Add Player</PrimaryButton>
      </div>

      <hr />

      <RoundTypeSelector
        selected={roundType}
        onChange={setRoundType}
      />

      <div style={{ marginTop: 16 }}>
        <PrimaryButton onClick={handleConfirm}>
          Confirm Players
        </PrimaryButton>
        <PrimaryButton onClick={onBack} style={{ marginLeft: 10 }}>
          ⬅️ Back
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PlayerSelector;
