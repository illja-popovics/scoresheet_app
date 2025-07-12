import React, { useState } from "react";
import GameSelector from "./components/GameSelector/GameSelector";
import PlayerSelector from "./components/PlayerSelector/PlayerSelector";
import ScorePad from "./components/ScorePad/ScorePad";
import GameHistory from "./components/GameHistory/GameHistory";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [step, setStep] = useState("game");
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [roundType, setRoundType] = useState("numbered"); // ✅ added
  const [showHistory, setShowHistory] = useState(false);

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
    setRoundType(selectedRoundType); // ✅ store round type
    setStep("score");
  };

  return (
    <div style={{ marginLeft: "30px", padding: "20px", fontFamily: "sans-serif" }}>
      {step === "game" && <GameSelector onSelect={handleSelectGame} />}
      {step === "players" && (
        <PlayerSelector onConfirm={handleConfirmPlayers} onBack={goBack} />
      )}
      {step === "score" && (
        <ScorePad
          game={game}
          players={players}
          roundType={roundType} // ✅ pass to ScorePad
          onBack={goBack}
        />
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "Hide" : "View"} Game History
        </button>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {showHistory && <GameHistory />}
      </div>
    </div>
  );
}

export default App;
