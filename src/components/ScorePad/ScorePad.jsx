import React, { useRef } from "react";
import useScorePad from "../../hooks/useScorePad";
import RoundRow from "../RoundRow/RoundRow";
import PrimaryButton from "../ui/PrimaryButton/PrimaryButton";

import styles from "./ScorePad.module.css";

const ScorePad = ({ game, players, roundType, onBack }) => {
  const {
    rounds,
    totals,
    addRound,
    deleteRound,
    updateScore,
    updateRoundName,
    saveResults,
    saveAsTemplate,
  } = useScorePad(players, game.name, roundType);

  const inputRefs = useRef({});

  return (
    <div>
      <h2>Game: {game.name}</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>{roundType === "named" ? "Round Name" : "Round"}</th>
            {players.map((p, i) => (
              <th key={i}>{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rounds.map((round, roundIndex) => (
            <RoundRow
              key={roundIndex}
              round={round}
              roundIndex={roundIndex}
              roundType={roundType}
              players={players}
              updateScore={updateScore}
              updateRoundName={updateRoundName}
              deleteRound={deleteRound}
              inputRefs={inputRefs}
              addRound={addRound}
            />
          ))}
          <tr>
            <td><strong>Total</strong></td>
            {totals.map((t, i) => (
              <td key={i}><strong>{t}</strong></td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className={styles.controls}>
        <PrimaryButton onClick={addRound}>➕ Add Round</PrimaryButton>

        {roundType === "named" && (
          <PrimaryButton onClick={saveAsTemplate}>
            💾 Save Round Template
          </PrimaryButton>
        )}

        <PrimaryButton onClick={saveResults}>✅ Save Game Results</PrimaryButton>

        <PrimaryButton
          className={styles.backButton}
          onClick={() => {
            if (
              window.confirm("Are you sure you want to go back? Unsaved scores will be lost.")
            ) {
              onBack();
            }
          }}
        >
          ⬅️ Back
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ScorePad;
