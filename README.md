# Portfolio Website

A modern, animated, interactive developer portfolio built as a single self-contained HTML file — dark editor/terminal-themed design with a live projects section, a profile photo, and an owner-only admin panel.

**Live version (with full database + admin panel):**
https://claude.ai/artifact/DRAson2DFC8KN44CjkFNFS

**Static version (GitHub Pages):**
https://abdulsandhu123.github.io/portfolio/

---

## Features

- Dark, terminal/editor-inspired design with a monospace + sans-serif type pairing
- Animated hero section — typing effect that cycles through role titles
- Interactive profile photo card — 3D tilt-on-hover, cursor-follow glow, idle floating animation, gradient border
- Scroll-triggered reveal animations for each section
- Animated skill bars
- Projects section that lists your work as code-file-style cards
- Fully responsive — works on mobile and desktop
- Admin panel (password + owner-gated) to edit:
  - Name, tagline, and role titles
  - About/bio text
  - Profile photo
  - Email, WhatsApp number, GitHub and LinkedIn links
  - Add / delete portfolio projects

## Tech stack

- Plain HTML, CSS, and vanilla JavaScript — no build step, no frameworks
- Google Fonts: JetBrains Mono + Inter
- Data storage: Claude's built-in artifact database (`window.claude.use('db')`), available only when this page is opened as a published Claude artifact

## ⚠️ Important: database limitation on GitHub Pages

This project was originally built as a Claude artifact, where a real backend database powers the login and edit features.

When hosted as a **static site** (GitHub Pages, Netlify, plain hosting, etc.), the site displays perfectly — same design, same animations, same photo — but the **admin panel, login, and "add project" features will not work**, because they depend on Claude's hosted database which only exists inside the artifact runtime.

If you want the admin/database features to work outside of Claude, the JavaScript needs to be rewritten to use a real backend (e.g. Firebase, Supabase, or a small custom API) instead of `window.claude.use('db')`.

## Local / GitHub Pages setup

```bash
git clone https://github.com/abdulsandhu123/portfolio.git
cd portfolio
# open index.html directly in a browser, or push to GitHub and enable Pages:
# Settings → Pages → Branch: main → folder: / (root) → Save
```

## File structure

```
portfolio/
└── index.html   # everything — markup, styles, and script — in one file
```

## License

Free to use and modify for personal portfolio purposes.
