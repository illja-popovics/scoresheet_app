import React from "react";
import useScorePad from "../../hooks/useScorePad";
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
  } = useScorePad(players, game.name, roundType);

  const renderScoreCells = (round, roundIndex) => {
    const scores = roundType === "named" ? round.scores : round;

    return scores.map((score, playerIndex) => (
      <td key={playerIndex}>
        <input
          type="number"
          value={score}
          placeholder="-"
          onChange={(e) =>
            updateScore(roundIndex, playerIndex, e.target.value)
          }
          className={styles.inputCell}
        />
      </td>
    ));
  };

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
            <tr key={roundIndex}>
              <td>
                {roundType === "named" ? (
                  <input
                    type="text"
                    value={round.name}
                    onChange={(e) =>
                      updateRoundName(roundIndex, e.target.value)
                    }
                    placeholder={`Round ${roundIndex + 1}`}
                    className={styles.roundNameInput}
                  />
                ) : (
                  roundIndex + 1
                )}
                <button
                  onClick={() => {
                    if (window.confirm("Delete this round?")) {
                      deleteRound(roundIndex);
                    }
                  }}
                  title="Delete round"
                  className={styles.deleteButton}
                >
                  ❌
                </button>
              </td>
              {renderScoreCells(round, roundIndex)}
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            {totals.map((t, i) => (
              <td key={i}>
                <strong>{t}</strong>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className={styles.controls}>
        <button onClick={addRound} className={styles.buttonSpacing}>
          Add Round
        </button>
        <button onClick={saveResults}>Save Game Results</button>
        <button
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to go back? Unsaved scores will be lost."
              )
            ) {
              onBack();
            }
          }}
          className={styles.backButton}
        >
          ⬅️ Back
        </button>
      </div>
    </div>
  );
};

export default ScorePad;
