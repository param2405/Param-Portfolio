# Param Parikh — Portfolio v2

**Live:** https://paramportfolio.vercel.app

One portfolio, two modes. A switch at the top flips the whole site between a
**Software Engineer** view and an **AI / ML Engineer** view: accent colour, headline,
stats, project order, experience bullets, highlighted skills and the downloadable resume.

Share a specific view with a link:

- Software: https://paramportfolio.vercel.app/?mode=sde
- AI / ML: https://paramportfolio.vercel.app/?mode=ai

## Highlights

- **Morphing hero field.** 140 particles form a GitHub-style contribution heatmap in Software
  mode and re-arrange into a live neural network (with signals propagating) in AI/ML mode. Plain Canvas 2D, no libraries.
- **Live project illustrations.** An incident pipeline for OpsPilot AI, a RAG retrieval demo for MedIntel,
  a speaker-diarised waveform for the meeting summarizer, and browser mockups for client sites.
- **`git log --graph` experience timeline.**
- **Periodic table of skills.** Elements glow based on the current mode.
- **⌘K / Ctrl+K command palette**, plus a working terminal in the contact section
  (`help`, `whoami`, `projects`, `resume`, `mode ai`, …).
- Respects `prefers-reduced-motion`, fully responsive, ~59 KB of JS gzipped.

## Editing content

Everything lives in [`src/data.js`](src/data.js). Resumes are in `public/`.

## Run locally

```bash
npm install
npm start      # dev server
npm run build  # production build
```

Built with React 18 (Create React App), hand-written CSS and Canvas 2D.
