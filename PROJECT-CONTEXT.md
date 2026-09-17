# HI Ibiza Menu: Project Context

## Repository and Branches

- The active working branch is `dev`.
- `dev` tracks `origin/dev`.
- `origin/dev` and `origin/main` currently point to commit `ee34838`.
- The previous menu navigation work was merged through pull request #1.
- Do not work directly on `main` for new changes. Use `dev` and verify the diff before committing.

## Working Tree Note

- `.gitignore` has an existing uncommitted change adding `.vercel`.
- This change was preserved when switching to `dev` and must not be discarded without confirmation.
- The current navigation fix changes `src/styles/globals.css`.

## Current Application

- React 19, TypeScript, Vite and Bun.
- Frontend-only public menu with local catalog data.
- Catalog access goes through `src/lib/menu-repository.ts`.
- The deployed site is `https://hi-ibiza-menu.vercel.app`.
- The deployment previously returned HTTP 200 and had no required environment variables.
- Cloudflare Pages is the planned future host. Recommended settings are
  `bun install --frozen-lockfile && bun run build`, output directory `dist`,
  and Bun `1.3.8`. Keep the Vercel deployment until Cloudflare is validated.

## Mobile Navigation Issue

### Symptom

On mobile, the category options could be dragged horizontally with a finger. The category bar also exposed a horizontal scrollbar and clipped category names.

### Root Cause

The previous navigation update changed the mobile layout in `src/styles/globals.css`:

- `.category-nav` used `overflow-x: auto`.
- `.category-nav-inner` used `display: flex` and `min-width: max-content`.
- Category links used fixed-width flex items.

That combination intentionally created a horizontally scrollable strip, which caused the unwanted touch-drag behavior.

### Fix Applied

The mobile navigation was restored to a fixed three-column grid:

- `.category-nav` uses `overflow: hidden`.
- `.category-nav-inner` uses `display: grid` with three equal columns and `min-width: 0`.
- Category links no longer use fixed flex sizing.
- The existing desktop breakpoint keeps six columns from `640px` upward.

The result shows all categories without allowing the options bar to be dragged sideways on mobile.

## Validation

Run the project checks in this order before considering the change complete:

```bash
bun run typecheck
bun run lint
bun run format:check
bun run test
```

At the time this file was written, `bun run typecheck` and `bun run lint` had passed. The format check and tests still need to run after the latest CSS and documentation changes.

## Project Rules

Read `AGENTS.md` before editing. In particular:

- Keep menu content in data files and do not invent prices or ingredients.
- Keep reusable UI in `src/components/` and page composition in `src/App.tsx`.
- Use strict TypeScript and accessible semantic controls.
- Run `bun run quality-check` before declaring frontend work complete.
- Do not commit `dist/`, coverage or local environment files.
