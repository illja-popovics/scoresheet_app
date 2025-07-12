import React, { useState } from "react";
import GameSelector from "./components/GameSelector/GameSelector";
import PlayerSelector from "./components/PlayerSelector/PlayerSelector";
import ScorePad from "./components/ScorePad/ScorePad";
import GameHistory from "./components/GameHistory/GameHistory";
import useGameFlow from "./hooks/useGameFlow";
import Toaster from "./components/Toast/Toaster";


import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {
    step,
    game,
    players,
    roundType,
    goBack,
    handleSelectGame,
    handleConfirmPlayers,
  } = useGameFlow();

  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="app-container">
      {step === "game" && <GameSelector onSelect={handleSelectGame} />}
      {step === "players" && (
        <PlayerSelector onConfirm={handleConfirmPlayers} onBack={goBack} />
      )}
      {step === "score" && (
        <ScorePad
          game={game}
          players={players}
          roundType={roundType}
          onBack={goBack}
        />
      )}

      <div className="history-toggle">
        <button onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "Hide" : "View"} Game History
        </button>
        {showHistory && <GameHistory />}
        <Toaster />
      </div>
    </div>
  );
}

export default App;
