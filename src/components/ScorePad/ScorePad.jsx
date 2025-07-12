import React from "react";
import useScorePad from "../../hooks/useScorePad";
import styles from "./ScorePad.module.css";

const ScorePad = ({ game, players, onBack }) => {
  const {
    rounds,
    totals,
    addRound,
    deleteRound,
    updateScore,
    saveResults,
  } = useScorePad(players, game.name);

  return (
    <div>
      <h2>Game: {game.name}</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Round</th>
            {players.map((p, i) => (
              <th key={i}>{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rounds.map((round, roundIndex) => (
            <tr key={roundIndex}>
              <td>
                {roundIndex + 1}
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
              {round.map((score, playerIndex) => (
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
              ))}
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
        <button onClick={onBack} className={styles.backButton}>
          ⬅️ Back
        </button>
      </div>
    </div>
  );
};

export default ScorePad;
