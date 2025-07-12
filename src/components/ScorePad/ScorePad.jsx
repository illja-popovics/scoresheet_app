import React, { useState } from "react";

const ScorePad = ({ game, players }) => {
  const [rounds, setRounds] = useState([Array(players.length).fill("")]);

  const addRound = () => {
    setRounds([...rounds, Array(players.length).fill("")]);
  };

  const deleteRound = (index) => {
    const updated = [...rounds];
    updated.splice(index, 1);
    setRounds(updated);
  };

  const updateScore = (roundIndex, playerIndex, value) => {
    const updated = [...rounds];
    updated[roundIndex][playerIndex] = value === "" ? "" : parseInt(value);
    setRounds(updated);
  };

  const totals = players.map((_, i) =>
    rounds.reduce((sum, round) => {
      const val = round[i];
      return sum + (typeof val === "number" ? val : 0);
    }, 0)
  );

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
                {roundIndex + 1}{" "}
                <button
                  onClick={() => deleteRound(roundIndex)}
                  title="Delete round"
                  style={{
                    marginLeft: "6px",
                    color: "red",
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    fontSize: "14px",
                  }}
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
                    style={{ width: "60px" }}
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            {totals.map((t, i) => (
              <td key={i}><strong>{t}</strong></td>
            ))}
          </tr>
        </tbody>
      </table>
      <button onClick={addRound}>Add Round</button>
    </div>
  );
};

export default ScorePad;
