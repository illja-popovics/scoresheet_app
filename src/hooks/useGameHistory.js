import { useEffect, useState } from "react";
import { load, save } from "../utils/storage";

const STORAGE_KEY = "gameResults";

export default function useGameHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = load(STORAGE_KEY, []);
    setHistory(saved);
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
  };
}
