import { useState } from "react";

export default function useGameFlow() {
  const [step, setStep] = useState("game");
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [roundType, setRoundType] = useState("numbered");

  const goBack = () => {
    if (step === "players") {
      setStep("game");
      setGame(null);
    } else if (step === "score") {
      setStep("players");
      setPlayers([]);
    }
  };

  const handleSelectGame = (selectedGame) => {
    setGame(selectedGame);
    setStep("players");
  };

  const handleConfirmPlayers = (selectedPlayers, selectedRoundType) => {
    setPlayers(selectedPlayers);
    setRoundType(selectedRoundType);
    setStep("score");
  };

  return {
    step,
    game,
    players,
    roundType,
    goBack,
    handleSelectGame,
    handleConfirmPlayers,
  };
}
