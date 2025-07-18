import React, { useState, useRef } from "react";
import useGameList from "../../hooks/useGameList";
import {
  exportAllTemplates,
  importTemplatesFromJSON,
  loadTemplate,
} from "../../utils/gameTemplates";
import { showSuccess, showError } from "../../utils/toast";

import GameList from "../GameList/GameList";
import PrimaryButton from "../ui/PrimaryButton/PrimaryButton";
import TextInput from "../ui/TextInput/TextInput";

import styles from "./GameSelector.module.css";

const GameSelector = ({ onSelect }) => {
  const { games, addGame, deleteGame, reloadGames } = useGameList();
  const [newGame, setNewGame] = useState("");
  const fileInputRef = useRef();

  const handleAddGame = () => {
    const result = addGame(newGame);
    if (result) {
      setNewGame("");
      onSelect(result);
    }
  };

  const handleImportTemplates = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    importTemplatesFromJSON(
      file,
      () => {
        showSuccess("Templates imported successfully!");
        reloadGames();
      },
      (err) => showError(err)
    );
  };

  return (
    <div>
      <h2>Select or Create a Game</h2>

      <GameList games={games} onSelect={onSelect} onDelete={deleteGame} />

      <div style={{ marginTop: 10 }}>
        <TextInput
          value={newGame}
          onChange={(e) => setNewGame(e.target.value)}
          placeholder="New game name"
        />
        <PrimaryButton onClick={handleAddGame}>Add Game</PrimaryButton>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <div>
        <PrimaryButton onClick={exportAllTemplates}>📤 Export Games</PrimaryButton>
        <PrimaryButton onClick={() => fileInputRef.current.click()}>
          📥 Import Games
        </PrimaryButton>

        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImportTemplates}
        />
      </div>
    </div>
  );
};

export default GameSelector;
