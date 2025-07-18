import React, { useState } from "react";
import useGameList from "../../hooks/useGameList";
import { loadTemplate } from "../../utils/gameTemplates"; 
import styles from "./GameSelector.module.css";

const GameSelector = ({ onSelect }) => {
  const { games, addGame, deleteGame } = useGameList();
  const [newGame, setNewGame] = useState("");

  const handleAddGame = () => {
    const result = addGame(newGame);
    if (result) {
      setNewGame("");
      onSelect(result);
    }
  };

  return (
    <div>
      <h2>Select or Create a Game</h2>
      <ul className={styles.gameList}>
        {games.map((g, i) => {
          const hasTemplate = !!loadTemplate(g.name); // Check template

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
    </div>
  );
};

export default GameSelector;
