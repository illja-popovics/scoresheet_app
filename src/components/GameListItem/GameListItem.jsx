import React from "react";
import styles from "./GameListItem.module.css";

const GameListItem = ({ game, index, onSelect, onDelete, hasTemplate }) => (
  <li className={styles.gameListItem}>
    <button
      onClick={() => onSelect(game)}
      className={styles.gameButton}
      title={hasTemplate ? "Has saved round template" : ""}
    >
      {game.name}
      {hasTemplate && <span style={{ marginLeft: 6 }}>📝</span>}
    </button>
    <button
      onClick={() => {
        if (window.confirm("Delete this game?")) onDelete(index);
      }}
      className={styles.deleteButton}
      title="Delete Game"
    >
      🗑️
    </button>
  </li>
);

export default GameListItem;
