import React from "react";
import HistoryRow from "../HistoryRow/HistoryRow";

const HistoryTable = ({ history, onDelete }) => {
  return (
    <table border="1" cellPadding="6" cellSpacing="0">
      <thead>
        <tr>
          <th>Date</th>
          <th>Game</th>
          <th>Players</th>
          <th>Totals</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {history.map((entry, i) => (
          <HistoryRow
            key={entry.date}
            entry={entry}
            onDelete={() => onDelete(i)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default HistoryTable;
