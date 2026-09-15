# HI Ibiza Cocktails

This project is a portfolio-quality public menu for HI Ibiza Cocktails.

Read `AGENTS.md` before editing. It contains the architecture, content, accessibility,
quality and safety rules for this project.

Useful commands:

```bash
bun install
bun run dev
bun run quality-check
```

The current application is intentionally frontend-only. The catalog is local today and
is accessed through `src/lib/menu-repository.ts` so a future CRUD/API implementation can
replace the data source without coupling it to the presentation layer.
