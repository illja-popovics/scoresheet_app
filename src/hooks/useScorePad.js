import { useState } from "react";
import { load, save } from "../utils/storage";
import { toast } from "react-toastify";

const STORAGE_KEY = "gameResults";

export default function useScorePad(players, gameName, roundType = "numbered") {
  // Initialize based on round type
  const initialRound = roundType === "named"
    ? { name: "", scores: Array(players.length).fill("") }
    : Array(players.length).fill("");

  const [rounds, setRounds] = useState([initialRound]);

  const addRound = () => {
    const newRound = roundType === "named"
      ? { name: "", scores: Array(players.length).fill("") }
      : Array(players.length).fill("");
    setRounds(prev => [...prev, newRound]);
  };

  const deleteRound = (index) => {
    const updated = [...rounds];
    updated.splice(index, 1);
    setRounds(updated);
  };

  const updateScore = (roundIndex, playerIndex, value) => {
    const updated = [...rounds];
    if (roundType === "named") {
      updated[roundIndex].scores[playerIndex] = value === "" ? "" : parseInt(value);
    } else {
      updated[roundIndex][playerIndex] = value === "" ? "" : parseInt(value);
    }
    setRounds(updated);
  };

  const updateRoundName = (roundIndex, newName) => {
    if (roundType !== "named") return;
    const updated = [...rounds];
    updated[roundIndex].name = newName;
    setRounds(updated);
  };

  const totals = players.map((_, i) =>
    rounds.reduce((sum, round) => {
      const val = roundType === "named" ? round.scores[i] : round[i];
      return sum + (typeof val === "number" ? val : 0);
    }, 0)
  );

  const saveResults = () => {
    const isEmpty = rounds.every(round =>
      (roundType === "named"
        ? round.scores
        : round
      ).every(cell => cell === "" || isNaN(cell))
    );

    if (isEmpty) {
      toast.error("You must enter at least one score before saving.");
      return;
    }

    const entry = {
      game: gameName,
      players,
      rounds,
      totals,
      roundType,
      date: new Date().toISOString(),
    };

    const existing = load(STORAGE_KEY, []);
    save(STORAGE_KEY, [...existing, entry]);
    toast.success("Game results saved!");
  };

  return {
    rounds,
    totals,
    addRound,
    deleteRound,
    updateScore,
    updateRoundName,
    saveResults,
  };
}
