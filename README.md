# Param Parikh — Portfolio v2

**Live:** https://paramportfolio.vercel.app

One combined portfolio for **AI/ML, Generative AI and Data Science** roles, with
full-stack software engineering alongside. One resume (`public/Param-Parikh-Resume.pdf`)
is downloadable from the nav, the hero and the contact section.

## Highlights

- **Morphing hero field.** 140 particles move between a live neural network (with signals propagating)
  and a GitHub-style contribution heatmap as the headline cycles. Plain Canvas 2D, no libraries.
- **Live project illustrations.** An incident pipeline for OpsPilot AI, a RAG retrieval demo for MedIntel,
  a speaker-diarised waveform for the meeting summarizer, and browser mockups for client sites.
- **`git log --graph` experience timeline.**
- **Periodic table of skills.** Core AI/ML, GenAI and Data Science elements glow.
- **⌘K / Ctrl+K command palette**, plus a working terminal in the contact section
  (`help`, `whoami`, `projects`, `skills`, `resume`, …).
- Respects `prefers-reduced-motion`, fully responsive, ~59 KB of JS gzipped.

## Editing content

Everything lives in [`src/data.js`](src/data.js). To update the resume, replace `public/Param-Parikh-Resume.pdf` (keep the same file name).

## Run locally

```bash
npm install
npm start      # dev server
npm run build  # production build
```

Built with React 18 (Create React App), hand-written CSS and Canvas 2D.
