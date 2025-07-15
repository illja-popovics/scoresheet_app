https://illja-popovics.github.io/scoresheet_app/

# Score Tracker App

A clean and responsive React app to create custom games, add players, and track scores over multiple rounds. Supports both **numbered** and **named** rounds. All data is stored in your browser using `localStorage`.

---

## Features

- Create and delete custom games
- Add, select, or remove players
- Numbered or  Named round types (Named rounds can be saved as a template for each game)
- Save and persist scores locally
- View complete game history
- Export and Import game history in .csv format


---

## Installation

```bash
git clone https://github.com/your-username/score-tracker.git
npm install
npm start
```

---

## Scripts

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `npm run dev`    | Create production build                   |
| `npm run deploy` | Deploy via GitHub Pages _(if configured)_ |

---

## Customization Tips

-  Update the `roundType` default in `useScorePad.js` if you'd prefer named rounds by default.
-  Add tests with `React Testing Library` for future-proofing.
-  Want cloud storage? Add Firebase or Supabase integration.

---

## Deployment (Optional)

```bash
npm install gh-pages --save-dev
```

In `package.json`:

```json
"homepage": "https://your-username.github.io/score-tracker",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

To deploy:

```bash
npm run deploy
```

---

## License

MIT – use it freely, modify as needed, and enjoy!

---
