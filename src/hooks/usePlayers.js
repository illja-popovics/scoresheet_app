import { useEffect, useState } from "react";
import { load, save } from "../utils/storage";
import { showError, showSuccess } from "../utils/toast";

const STORAGE_KEY = "players";

export default function usePlayers() {
  const [savedPlayers, setSavedPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    setSavedPlayers(load(STORAGE_KEY));
  }, []);

  const toggleSelection = (player) => {
    const exists = selectedPlayers.some((p) => p.name === player.name);
    if (exists) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.name !== player.name));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const addPlayer = (name, photo = "") => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const exists = savedPlayers.some(
      (p) => p.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      showError("Player already exists.");
      return;
    }

    const newPlayer = { name: trimmed, photo };
    const updatedSaved = [...savedPlayers, newPlayer];

    save(STORAGE_KEY, updatedSaved);
    setSavedPlayers(updatedSaved);
    setSelectedPlayers([...selectedPlayers, newPlayer]);
    showSuccess("Player added!");
  };

  const deletePlayer = (index) => {
    const updated = [...savedPlayers];
    const removed = updated.splice(index, 1)[0];
    save(STORAGE_KEY, updated);
    setSavedPlayers(updated);
    setSelectedPlayers(
      selectedPlayers.filter((p) => p.name !== removed.name)
    );
  };

  const validateSelection = () => {
    if (selectedPlayers.length === 0) {
      showError("You must select at least one player.");
      return false;
    }
    return true;
  };

  return {
    savedPlayers,
    selectedPlayers,
    toggleSelection,
    addPlayer,
    deletePlayer,
    setSelectedPlayers,
    validateSelection,
  };
}
