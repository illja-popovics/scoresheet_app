import { load, save } from "./storage";

const STORAGE_KEY = "gameTemplates";

export function saveTemplate(gameName, rounds) {
  const templates = load(STORAGE_KEY, {});
  const roundNames = rounds.map(r => r.name || "");
  templates[gameName] = roundNames;
  save(STORAGE_KEY, templates);
}

export function loadTemplate(gameName) {
  const templates = load(STORAGE_KEY, {});
  return templates[gameName] || null;
}
