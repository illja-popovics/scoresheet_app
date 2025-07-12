import { useEffect, useState } from "react";
import { load, save } from "../utils/storage";

const STORAGE_KEY = "games";

export default function useGameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    setGames(load(STORAGE_KEY));
  }, []);

  const addGame = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return false;

    const exists = games.some((g) => g.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) return false;

    const newEntry = { name: trimmed };
    const updated = [...games, newEntry];
    save(STORAGE_KEY, updated);
    setGames(updated);
    return newEntry;
  };

  const deleteGame = (index) => {
    const updated = [...games];
    updated.splice(index, 1);
    save(STORAGE_KEY, updated);
    setGames(updated);
  };

  return {
    games,
    addGame,
    deleteGame,
  };
}
