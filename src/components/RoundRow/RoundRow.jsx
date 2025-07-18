import React from "react";
import RoundNameInput from "../RoundNameInput/RoundNameInput";
import ScoreInputCell from "../ScoreInputCell/ScoreInputCell";
import styles from "./RoundRow.module.css";

const RoundRow = ({
  round,
  roundIndex,
  roundType,
//   players,
  updateScore,
  updateRoundName,
  deleteRound,
  inputRefs,
  addRound
}) => {
  const scores = roundType === "named" ? round.scores : round;

  return (
    <tr>
      <td>
        {roundType === "named" ? (
          <RoundNameInput
            value={round.name}
            onChange={(value) => updateRoundName(roundIndex, value)}
            index={roundIndex}
          />
        ) : (
          roundIndex + 1
        )}
        <button
          onClick={() => {
            if (window.confirm("Delete this round?")) deleteRound(roundIndex);
          }}
          className={styles.deleteButton}
          title="Delete round"
        >
          ❌
        </button>
      </td>

      {scores.map((score, playerIndex) => (
        <ScoreInputCell
          key={playerIndex}
          value={score}
          roundIndex={roundIndex}
          playerIndex={playerIndex}
          onChange={updateScore}
          inputRefs={inputRefs}
          addRound={addRound}
        />
      ))}
    </tr>
  );
};

export default RoundRow;
