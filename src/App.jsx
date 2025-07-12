import React, { useState } from "react";
import GameSelector from "./components/GameSelector/GameSelector";
import PlayerSelector from "./components/PlayerSelector/PlayerSelector";
import ScorePad from "./components/ScorePad/ScorePad";
import GameHistory from "./components/GameHistory/GameHistory";

function App() {
  const [step, setStep] = useState("game");
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // ✅ new

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

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "Hide" : "View"} Game History
        </button>
        {showHistory && <GameHistory />}
      </div>
    </div>
  );
}

export default App;
