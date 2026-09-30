# Design

Visual world: **Sunday Plan, Coastal** (brand kit C4, chosen September 2026).
The site borrows the fridge whiteboard and sticky notes of a Sunday meal-planning session, in sea-mist, ocean-teal and coral colours.

## Colour

| Token | Hex | Role |
|---|---|---|
| `--ink` | #10262E | Text, footer background |
| `--ink-soft` | #3D5660 | Secondary text |
| `--mist` | #EEF4F6 | Page background |
| `--card` | #FFFFFF | Cards, board, inputs |
| `--line` | #D2E0E4 | Borders |
| `--teal` / `--teal-deep` | #0E6A7A / #0A4F5B | Primary buttons, links, handwritten accents |
| `--teal-wash` | #DCECEF | Selected options, best-match background |
| `--coral` / `--coral-deep` | #F26B5B / #C7483A | "Best match" pill, logo magnet; deal text uses the deep shade for contrast |
| `--sun` / `--sun-edge` | #FFD66B / #E8BD4A | Sticky notes, picked days, star icons |

The site is light-only by choice: it's used for quick daytime decisions, and the sticky-note world reads as paper.

## Type

- **Instrument Sans** (variable, self-hosted via `@fontsource-variable/instrument-sans`) for everything.
- **Caveat 700** (self-hosted via `@fontsource/caveat`) for one handwritten accent per screen: a headline word, a sticky-note heading, or step numbers.
- Prices and ratings use tabular numbers.

## Components and rules

- **Sticky note** (`.note`): sun yellow, rotated about 1°, soft shadow. Used for the one "helpful aside" per screen (a best pick, an email sign-up, a coming-soon message).
- **Week board**: seven day cells; picked days turn sun yellow and tilt slightly. It's the signature element on the home page and quiz results.
- **Code button** (`.code`): dashed teal outline, copies on tap.
- Buttons: teal fill, 12px radius; quiet buttons are outlined.
- No eyebrow labels above headings, no emoji icons (icons are inline SVG in `components/Icons.js`), no gradient text.
- Advertiser disclosure stays in the top bar on every page.
