# HI Ibiza Menu

Public digital menu for HI Ibiza Cocktails.

## Stack

- React 19
- TypeScript with strict mode
- Vite
- Bun
- Vitest

## Development

Install dependencies and start the local server:

```bash
bun install
bun run dev
```

Run the full validation suite:

```bash
bun run quality-check
bun run build
```

## Structure

- `src/domain/`: menu domain types
- `src/data/`: local menu catalog
- `src/lib/`: repository and shared utilities
- `src/components/`: reusable interface components
- `src/styles/`: responsive visual system
- `public/images/`: optimized menu assets

The catalog is accessed through `src/lib/menu-repository.ts` so a future API can
replace the local data without coupling it to the presentation layer.
