# HI Ibiza Menu

Public digital menu for HI Ibiza Cocktails.

Production: <https://hi-ibiza-menu.vercel.app/>

This is a responsive, frontend-only menu. It presents the local catalog and
links visitors to the venue's public locations and Instagram profile. It does
not include authentication, payments, ordering, or customer data collection.

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
bun run test:coverage
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

## Content updates

Products and prices live in `src/data/menu.ts`. Business-facing labels and
links live in `src/data/site.ts`. Keep all product details backed by an
approved source and verify every referenced image under `public/images/`.

## Deployment

The `main` branch is connected to Vercel. Pull requests should pass CI before
merging. A production deployment should be checked at the responsive sizes
listed in `CONTRIBUTING.md` before it is shared publicly.

## License

The source code is available under the MIT License. The HI Ibiza name, logo,
photography, and menu content are brand and content assets and are not licensed
for reuse by the MIT license.
