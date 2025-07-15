function escapeCSVField(field) {
    const str = String(field);
    const escaped = str.replace(/"/g, '""'); // Escape internal quotes
    return `"${escaped}"`;
  }
  
  export function exportGameHistoryToCSV(history) {
    const headers = ["Date", "Game", "Players", "Totals"];
    const rows = history.map((entry) => [
      new Date(entry.date).toISOString(),
      entry.game,
      entry.players.map((p) => p.name).join(", "),
      entry.totals.join(", "),
    ]);
  
    const csvContent =
      [headers, ...rows]
        .map((row) => row.map(escapeCSVField).join(","))
        .join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "game-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  