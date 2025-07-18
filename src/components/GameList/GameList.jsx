import React from "react";
import GameListItem from "../GameListItem/GameListItem";
import { loadTemplate } from "../../utils/gameTemplates";
import styles from "./GameList.module.css";

const GameList = ({ games, onSelect, onDelete }) => (
  <ul className={styles.gameList}>
    {games.map((game, index) => {
      const template = loadTemplate(game.name);
      const hasTemplate = Array.isArray(template) && template.length > 0;

      return (
        <GameListItem
          key={index}
          game={game}
          index={index}
          onSelect={onSelect}
          onDelete={onDelete}
          hasTemplate={hasTemplate}
        />
      );
    })}
  </ul>
);

export default GameList;
