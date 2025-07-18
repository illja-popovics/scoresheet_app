import { load, save } from "./storage";

const TEMPLATE_KEY = "roundTemplates";
const GAMES_KEY = "games";

export function saveTemplate(gameName, rounds) {
  const all = load(TEMPLATE_KEY, {});
  all[gameName] = rounds.map(r => r.name);
  save(TEMPLATE_KEY, all);
}

export function loadTemplate(gameName) {
  const all = load(TEMPLATE_KEY, {});
  return all[gameName] || null;
}

export function exportAllTemplates() {
  const games = load(GAMES_KEY, []);
  const templates = load(TEMPLATE_KEY, {});

  const dataToExport = games.reduce((acc, game) => {
    acc[game.name] = templates[game.name] || [];
    return acc;
  }, {});

  const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "game_templates.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function importTemplatesFromJSON(file, onSuccess, onError) {
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const importedTemplates = JSON.parse(e.target.result);

      // Save templates
      save(TEMPLATE_KEY, importedTemplates);

      // Merge games
      const existingGames = load(GAMES_KEY, []);
      const existingNames = existingGames.map((g) => g.name.toLowerCase());

      const importedGameNames = Object.keys(importedTemplates);
      const newGames = importedGameNames
        .filter((name) => !existingNames.includes(name.toLowerCase()))
        .map((name) => ({ name }));

      if (newGames.length > 0) {
        const updatedGames = [...existingGames, ...newGames];
        save(GAMES_KEY, updatedGames);
      }

      onSuccess?.();
    } catch (err) {
      console.error("Import error:", err);
      onError?.("Invalid JSON format.");
    }
    
  };

  reader.onerror = () => {
    onError?.("Failed to read the file.");
  };

  reader.readAsText(file);
}