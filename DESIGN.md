# HI Ibiza Visual System

## Direction

HI Ibiza is a late-night cocktail bar. The visual language is a near-black violet
canvas, electric magenta accents and editorial product photography. The layout follows
a narrow central composition with generous black margins.

## Color Tokens

| Token              | Value                   | Use                                     |
| ------------------ | ----------------------- | --------------------------------------- |
| `background`       | `oklch(9.5% .018 315)`  | Page canvas                             |
| `surface`          | `oklch(12.5% .025 315)` | Footer and hover rows                   |
| `card`             | `oklch(14.5% .025 315)` | Product photography cards               |
| `border`           | `oklch(27% .055 315)`   | Dividers and outlines                   |
| `primary`          | `oklch(69% .29 332)`    | Magenta labels, prices and active state |
| `foreground`       | `oklch(99% 0 0)`        | Main text                               |
| `muted-foreground` | `oklch(75% .02 315)`    | Descriptions                            |

## Typography

- Display: `Sora`, with an `Inter` fallback.
- Body: `Inter`, with a system sans-serif fallback.
- Category labels and section headings are uppercase.
- Product names are sentence case in rows and uppercase inside image cards.

## Layout

- Hero width: `960px`.
- Menu and navigation width: `900px`.
- Mobile page gutters: `20px`.
- Sections use editorial rows by default.
- Products with approved photography use a `4 / 3` image card.
- The first signature product in a section can use the larger featured card pattern.

## Interaction

- Category navigation is sticky after the hero and uses a compact two-row grid on small screens.
- Active category uses a magenta underline and readable text, never color alone.
- All interactive elements have a visible focus ring.
- Motion is limited to small opacity and transform transitions.
- `prefers-reduced-motion` disables non-essential movement.

## Content Rules

- Prices are rendered as Colombian pesos with no decimal places.
- Menu and business copy comes from `src/data/` files, never from JSX.
- Product images are optional. A missing image must not leave an empty broken-image box.
- Meaningful product images receive descriptive alt text.
