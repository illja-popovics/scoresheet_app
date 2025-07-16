import { useState, useEffect } from "react";
import { load, save } from "../utils/storage";
import { saveTemplate, loadTemplate } from "../utils/gameTemplates";
import { showError, showSuccess } from "../utils/toast";
import { evaluateExpression } from "../utils/math";

const STORAGE_KEY = "gameResults";

export default function useScorePad(players, gameName, roundType = "numbered") {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    if (roundType === "named") {
      const template = loadTemplate(gameName);
      if (template) {
        const initial = template.map(name => ({
          name,
          scores: Array(players.length).fill(""),
        }));
        setRounds(initial);
        return;
      }
    }

    const initialRound = roundType === "named"
      ? { name: "", scores: Array(players.length).fill("") }
      : Array(players.length).fill("");

    setRounds([initialRound]);
  }, [gameName, players.length, roundType]);

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
      updated[roundIndex].scores[playerIndex] = value;
    } else {
      updated[roundIndex][playerIndex] = value;
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
      const num = typeof val === "string" ? evaluateExpression(val) : val;
      return sum + (typeof num === "number" && !isNaN(num) ? num : 0);
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
      showError("You must enter at least one score before saving.");
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
    showSuccess("Game results saved!");
    window.dispatchEvent(new Event("gameHistoryUpdated"));
  };

  const saveAsTemplate = () => {
    if (roundType !== "named") return;
    const valid = rounds.every((r) => r.name && r.name.trim() !== "");
    if (!valid) {
      showError("Please fill in all round names before saving as template.");
      return;
    }

    saveTemplate(gameName, rounds);
    showSuccess("Template saved for this game.");
  };

  return {
    rounds,
    totals,
    addRound,
    deleteRound,
    updateScore,
    updateRoundName,
    saveResults,
    saveAsTemplate, 
  };
}
