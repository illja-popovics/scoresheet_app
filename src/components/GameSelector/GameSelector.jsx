import React, { useState, useRef } from "react";
import useGameList from "../../hooks/useGameList";
import {
  loadTemplate,
  exportAllTemplates,
  importTemplatesFromJSON,
} from "../../utils/gameTemplates";
import { showSuccess, showError } from "../../utils/toast";

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
      <ul className={styles.gameList}>
        {games.map((g, i) => {
          const template = loadTemplate(g.name);
          const hasTemplate = Array.isArray(template) && template.length > 0;
          
          return (
            <li key={i} className={styles.gameListItem}>
              <button
                onClick={() => onSelect(g)}
                className={styles.gameButton}
                title={hasTemplate ? "Has saved round template" : ""}
              >
                {g.name}
                {hasTemplate && <span style={{ marginLeft: 6 }}>📝</span>}
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Delete this game?")) deleteGame(i);
                }}
                className={styles.deleteButton}
                title="Delete Game"
              >
                🗑️
              </button>
            </li>
          );
        })}
      </ul>

      <input
        value={newGame}
        onChange={(e) => setNewGame(e.target.value)}
        placeholder="New game name"
      />
      <button className={styles.addButton} onClick={handleAddGame}>
        Add Game
      </button>

      <hr style={{ margin: "20px 0" }} />

      <div>
        <button onClick={exportAllTemplates}>📤 Export Games</button>
        <button onClick={() => fileInputRef.current.click()}>📥 Import Games</button>
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
