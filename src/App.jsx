import React, { useState } from "react";
import GameSelector from "./components/GameSelector/GameSelector";
import PlayerSelector from "./components/PlayerSelector/PlayerSelector";
import ScorePad from "./components/ScorePad/ScorePad";

function App() {
  const [step, setStep] = useState("game"); // 'game' | 'players' | 'score'
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);

  const handleSelectGame = (selectedGame) => {
    setGame(selectedGame);
    setStep("players");
  };

  const handleConfirmPlayers = (selectedPlayers) => {
    setPlayers(selectedPlayers);
    setStep("score");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {step === "game" && <GameSelector onSelect={handleSelectGame} />}
      {step === "players" && <PlayerSelector onConfirm={handleConfirmPlayers} />}
      {step === "score" && <ScorePad game={game} players={players} />}
    </div>
  );
}

export default App;
