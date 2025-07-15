import Papa from "papaparse";
import { save } from "./storage";

const STORAGE_KEY = "gameResults";

export function importGameHistoryFromCSV(file, onImportComplete) {

  const confirmed = window.confirm(
    "Importing this CSV will overwrite all existing saved game history. Do you want to continue?"
  );

  if (!confirmed) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      try {
        const parsed = results.data.map((row) => ({
          date: new Date(row.Date).toISOString(),
          game: row.Game,
          players: row.Players.split(",").map((name) => ({ name: name.trim() })),
          totals: row.Totals.split(",").map((n) => parseFloat(n.trim())),
        }));

        save(STORAGE_KEY, parsed);
        onImportComplete(parsed);
      } catch (err) {
        console.error("CSV import failed:", err);
        alert("Failed to import CSV. Please check formatting.");
      }
    },
    error: (err) => {
      console.error("PapaParse error:", err);
      alert("CSV parsing error. See console for details.");
    },
  });
}
