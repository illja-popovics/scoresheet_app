import { useState } from "react";
import { load, save } from "../utils/storage";
import { toast } from "react-toastify";

const STORAGE_KEY = "gameResults";

export default function useScorePad(players, gameName) {
  const [rounds, setRounds] = useState([Array(players.length).fill("")]);

  const addRound = () => {
    setRounds((prev) => [...prev, Array(players.length).fill("")]);
  };

  const deleteRound = (index) => {
    const updated = [...rounds];
    updated.splice(index, 1);
    setRounds(updated);
  };

  const updateScore = (roundIndex, playerIndex, value) => {
    const updated = [...rounds];
    updated[roundIndex][playerIndex] = value === "" ? "" : parseInt(value);
    setRounds(updated);
  };

  const totals = players.map((_, i) =>
    rounds.reduce((sum, round) => {
      const val = round[i];
      return sum + (typeof val === "number" ? val : 0);
    }, 0)
  );

  const saveResults = () => {
    const isEmpty = rounds.every((round) =>
      round.every((cell) => cell === "" || isNaN(cell))
    );

    if (isEmpty) {
      toast.error("You must enter at least one score before saving.");
      return;
    }

    const existing = load(STORAGE_KEY, []);
    const entry = {
      game: gameName,
      players,
      rounds,
      totals,
      date: new Date().toISOString(),
    };

    save(STORAGE_KEY, [...existing, entry]);
    toast.success("Game results saved!");
  };

  return {
    rounds,
    totals,
    addRound,
    deleteRound,
    updateScore,
    saveResults,
  };
}
