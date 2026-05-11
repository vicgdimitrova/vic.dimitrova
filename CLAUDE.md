# Vico Portfolio

Victoria Dimitrova's graphic design portfolio. React + Vite SPA with multi-page case studies, deployed to GitHub Pages via a custom domain.

## Stack
- React 18, Vite 5, GSAP 3 (SplitText, scroll reveals, elastic hovers)
- Vanilla CSS with CSS custom properties for light/dark theming
- GitHub Actions → GitHub Pages

## File map
| File | What lives here |
|------|----------------|
| `app.jsx` | Entire SPA — Nav, Hero, Marquee, Work grid, About (interactive pills), Contact, Footer |
| `data.js` | **Single source of truth** — all project entries, about pills, socials, bio copy |
| `case.jsx` | Shared React template mounted by every case study page |
| `contact.jsx` | Contact section component |
| `tweaks-panel.jsx` | Dev-only design tweaks panel (theme colors, typography knobs) |
| `SplitText.jsx` | Thin wrapper around GSAP SplitText for animated text reveals |
| `styles.css` | All styles (757 lines) — CSS vars at the top control the full theme |
| `case-styles.css` | Case study page styles |
| `vite.config.js` | Multi-page build — each case study page needs an entry in `pages` |
| `projects/*.html` | Static HTML shells that mount React/case.jsx |
| `public/assets/projects/` | Full-size project images |
| `public/assets/thumbnails/light/` | Grid thumbnails — light theme |
| `public/assets/thumbnails/dark/` | Grid thumbnails — dark theme |

## Dev commands
```bash
npm run dev      # localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build locally
```

## Deployment
Push to `main` → `.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages.
`vite.config.js` uses `base: '/'` — required for the custom domain (not `/repo-name/`).

## Common tasks

### Add a new project
1. Add entry to `VICO_DATA.projects[]` in `data.js`
2. Create `projects/<id>.html` (copy any existing one, just change the title)
3. Register it in `vite.config.js` → `pages` object
4. Add thumbnail images to `public/assets/thumbnails/light/` and `dark/`
5. Add full-size image to `public/assets/projects/`

### Edit content / copy
→ `data.js` only. All text, project metadata, and social links are centralised there.

### Change theme / styles
→ `styles.css` — CSS custom properties at the top of the file control all colors, spacing, and fonts.

### Edit case study layout
→ `case.jsx` + `case-styles.css`

### Change animations
→ `app.jsx` — `useReveal` hook for scroll reveals; GSAP SplitText in the Hero component.

## Gotchas
- Each new case study needs **both** an HTML file and a `vite.config.js` entry or Vite won't include it in the build.
- Thumbnails need both a `light/` and `dark/` variant — filenames must match the project `id` in `data.js`.
- Theme is persisted in `localStorage` under the key `"vico.theme"`.
