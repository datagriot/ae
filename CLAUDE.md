# CLAUDE.md — aE Survey Application

## Project Overview

**aE** ("AfroTech Empathy") is a static, single-page survey web application built for AfroTech 11 2024 in Houston, TX. Its purpose is to measure and visualize empathy across three dimensions: personal wellbeing (Me), event experience (AfroTech), and team collaboration (Us).

**Domain**: `datagriot.io` (GitHub Pages via `CNAME`)
**License**: MIT (Copyright 2024 datagriot)

---

## Repository Structure

```
ae/
├── index.html          # Main HTML entry point
├── script.js           # All survey logic (vanilla JS)
├── styles.css          # Application styles
├── aeSURVEYhtml        # Alternate/backup self-contained HTML version
├── aeSURVEYcss         # Alternate/backup CSS version
├── CNAME               # GitHub Pages domain config (datagriot.io)
├── LICENSE             # MIT License
└── README.md           # Minimal project description
```

**Assets expected but not committed** (referenced in `index.html`):
- `assets/celebration.gif` — displayed on survey submission
- `assets/celebration-sound.mp3` — audio played on submission

---

## Technology Stack

- **Pure vanilla HTML5, CSS3, JavaScript (ES5+)** — no frameworks, no build tools, no package manager
- **No dependencies**: nothing to install; files are served directly as static assets
- **Browser APIs used**: `navigator.mediaDevices.getUserMedia()` (camera), `<audio>`, `<canvas>`, DOM manipulation
- **Google Apps Script** (partially integrated): a `doPost()` function is embedded in `script.js` (lines 146–162) intended to run as a Google Apps Script endpoint writing survey responses to a Google Sheet named `Responses_2024_11_AFROTECH_`. This is not wired up end-to-end in the current client-side code.

---

## Architecture

### How the App Works

1. User selects a survey type from a `<select>` dropdown (`#survey-option`).
2. `script.js` listens for `change` on that dropdown and dynamically injects HTML questions into `#survey-questions`.
3. On submit, survey data is collected from the DOM and either logged to console, or triggers a side effect (camera, redirect).
4. A celebration animation and sound plays on every submission.

### Three Survey Modes

| Mode | Key Fields | Submit Behavior |
|------|-----------|-----------------|
| **Me** | Feel (range 0–2), Photo permission (select) | Triggers camera (`Yes`), redirects to `data-visualization.html` (`No`), or alert (`Maybe`) + celebration |
| **AfroTech** | Session interest (select), Event feedback (textarea) | `console.log` of values + celebration |
| **Us** | Team collaboration (range 0–2), Improvement suggestions (textarea) | `console.log` of values + celebration |

### Global Functions (exposed on `window`)

These are called via inline `oninput` attributes in dynamically-injected HTML and must remain globally scoped:

- `window.updateFeelLabel(value)` — updates `#feel-label` emoji display (0=💙, 1=❤️, 2=⚠️)
- `window.updateCollaborationLabel(value)` — updates `#collaboration-label` emoji display (0=🤝, 1=👍, 2=🚀)

**Important**: Do not wrap these in closures or modules without also updating the `oninput` attributes in the HTML template strings inside `script.js`.

---

## Development Workflow

### Running Locally

No build step. Serve the files with any static HTTP server. Examples:

```bash
# Python 3
python3 -m http.server 8080

# Node.js (if available)
npx serve .

# VS Code Live Server extension also works
```

Then open `http://localhost:8080` in a browser.

**Camera access** requires either `localhost` or HTTPS — it will not work over plain HTTP on non-localhost origins.

### Making Changes

- **HTML structure**: Edit `index.html` for page shell, meta, and static content.
- **Survey logic and questions**: Edit `script.js`. Questions are injected as template literal strings inside `displayMeQuestions()`, `displayAfroTechQuestions()`, `displayUsQuestions()`.
- **Styling**: Edit `styles.css`. The layout is a centered card (`max-width: 600px`) with responsive breakpoint at 600px.

### No Tests, No Linter, No CI

There is no automated testing, linting, or CI pipeline. Verify changes manually in a browser. For changes involving camera access, test in Chrome or Firefox on localhost or HTTPS.

---

## Known Issues / Incomplete Features

1. **Google Apps Script not wired up**: The `doPost()` function (lines 146–162 in `script.js`) is Google Apps Script server-side code — it cannot run in the browser. It needs to be deployed separately as a Google Apps Script Web App and called via `fetch()` from the client. Currently, AfroTech and Us survey data is only `console.log`'d and never persisted.

2. **Me survey data not sent**: The `feel` value and camera photo are not submitted to any backend. The `triggerDataVisualization()` function redirects to `data-visualization.html` which does not exist in the repo.

3. **Missing assets**: `assets/celebration.gif` and `assets/celebration-sound.mp3` are referenced but not in the repo — the celebration overlay will appear but show a broken image and fail to play audio.

4. **`doPost()` placement bug**: The Google Apps Script `doPost()` function at lines 146–162 is placed inside the browser JS file outside the `DOMContentLoaded` closure but inside the file. This is a structural artifact — it does not execute in the browser but is not cleanly separated.

---

## Conventions

- **No build pipeline**: Do not introduce one without clear reason. Keep it static.
- **Vanilla JS**: Do not add frameworks (React, Vue, etc.) without explicit project decision.
- **Inline event handlers in injected HTML**: The dynamically injected question HTML uses `oninput="updateFeelLabel(this.value)"` style handlers that require globally scoped functions. This is intentional for simplicity.
- **Google Apps Script code**: If extending the data persistence layer, the `doPost()` function should be moved to a separate `.gs` file or a clearly marked block, not left inside `script.js`.
- **No `.env` or secrets**: This is a fully public static app. No API keys or credentials should be committed.

---

## Deployment

The application is deployed via **GitHub Pages** using the `CNAME` file pointing to `datagriot.io`. Any push to the default/main branch that GitHub Pages is configured to serve will automatically update the live site. There is no manual deploy step.
