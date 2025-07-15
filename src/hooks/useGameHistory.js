import { useEffect, useState } from "react";
import { load, save } from "../utils/storage";

const STORAGE_KEY = "gameResults";

export default function useGameHistory() {
  const [history, setHistory] = useState([]);

  const reloadHistory = () => {
    const saved = load(STORAGE_KEY, []);
    setHistory(saved);
  };

  useEffect(() => {
    reloadHistory(); // initial load

    const listener = () => reloadHistory();
    window.addEventListener("gameHistoryUpdated", listener);

    return () => {
      window.removeEventListener("gameHistoryUpdated", listener);
    };
  }, []);

  const deleteHistoryItem = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    save(STORAGE_KEY, updated);
  };

  return {
    history,
    deleteHistoryItem,
    setHistory,
  };
}
