# HI Ibiza Development Rules

## Scope

- This is a React + Vite + TypeScript single-page menu.
- `CLAUDE.md` points to this file; this file is the operational source of truth.
- Keep the current scope focused on the public menu. Do not add authentication,
  payments, cart or admin screens without an explicit request.

## Architecture

- Keep domain types in `src/domain/` and catalog data in `src/data/`.
- Access catalog data through `src/lib/menu-repository.ts` so a future API can replace
  the local implementation without changing UI components.
- Keep reusable UI in `src/components/`; keep page composition in `src/App.tsx`.
- Use named exports and the `@/` alias for imports.
- Prefer small components with one responsibility. Avoid files over 300 lines.
- Do not add a state library for local UI state. Use React state first.

## Content And Assets

- Never invent prices, ingredients, locations or opening hours.
- Keep user-facing menu content in data files, not JSX literals.
- Store optimized assets under `public/images/` with lowercase kebab-case filenames.
- Use accessible alternative text for meaningful images. Decorative images use empty alt text.

## Quality

- TypeScript strict mode is required; do not use `any`.
- Do not use `console.log`, `debugger` or ignored TypeScript errors.
- Use semantic HTML, visible focus states and keyboard-accessible controls.
- Prefer accessible queries in tests (`getByRole`, `getByLabelText`, visible names).
- Run `bun run quality-check` before considering a change complete.
- Do not commit generated `dist/`, coverage or local environment files.

## Git And Safety

- Do not commit, push, create a PR or deploy unless explicitly requested.
- Do not delete or overwrite user-provided images without confirmation.
- Keep changes focused and explain any intentional tradeoff in the final response.
