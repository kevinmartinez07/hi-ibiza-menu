# Contributing

## Development

Install Bun, then run:

```bash
bun install --frozen-lockfile
bun run dev
```

Before opening a pull request, run `bun run quality-check`,
`bun run test:coverage`, and `bun run build`.

## Menu content

Keep domain types in `src/domain/`, catalog content in `src/data/`, and access
the catalog through `src/lib/menu-repository.ts`. Do not invent prices,
ingredients, opening hours, locations, or image mappings.

## Pull requests

Use a focused branch, describe the user-facing effect, and include responsive
testing notes when changing the interface.
