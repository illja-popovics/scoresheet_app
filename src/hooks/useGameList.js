import { useEffect, useState } from "react";
import { load, save } from "../utils/storage";
import { showError, showSuccess } from "../utils/toast";

const STORAGE_KEY = "games";

export default function useGameList() {
  const [games, setGames] = useState([]);

  const reloadGames = () => {
    const loaded = load(STORAGE_KEY, []);
    setGames(Array.isArray(loaded) ? loaded : []);
  };

  useEffect(() => {
    reloadGames();
  }, []);

  const addGame = (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
      showError("Game name cannot be empty.");
      return null;
    }

    const exists = games.some(
      (g) => g.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      showError("This game already exists.");
      return null;
    }

    const newEntry = { name: trimmed };
    const updated = [...games, newEntry];
    save(STORAGE_KEY, updated);
    setGames(updated);
    showSuccess(`Game "${trimmed}" added.`);
    return newEntry;
  };

  const deleteGame = (index) => {
    const updated = [...games];
    const removed = updated.splice(index, 1)[0];
    save(STORAGE_KEY, updated);
    setGames(updated);
    showSuccess(`Game "${removed.name}" deleted.`);
  };

  // Optional: allow manual update from outside
  const setGamesManually = (newGames) => {
    save(STORAGE_KEY, newGames);
    setGames(newGames);
  };

  return {
    games,
    addGame,
    deleteGame,
    reloadGames,
    setGamesManually,
  };
}
