## Design rules
- For any UI/design work use the `design-director` skill.
- `DESIGN.md` is the design source of truth; token values live only in `:root` of `styles.css`.
- Use only tokens for color, font size, weight, spacing, radius, motion. No raw hex / px / font-family outside `:root` (layout dimensions like breakpoints, image/column widths and hit-target min-heights are the only allowed exceptions).
- Need a new value? Update `DESIGN.md` and `:root` first, in the same change.
- Every interactive element has hover, focus-visible and active states.
- Before finishing UI work: screenshot at 1280 and 390 px and check against `DESIGN.md`.
