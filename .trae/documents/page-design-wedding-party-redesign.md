# Wedding Party Page — Redesign Spec (Desktop-first)

## Layout
- Primary system: **CSS Grid + Flex hybrid** via Tailwind.
- Page container: `max-w-6xl mx-auto px-6 lg:px-10` (match existing).
- Spacing: section padding `py-10~20`, consistent vertical rhythm (`gap-3/4/6`).
- Responsive behavior:
  - Desktop (≥1024px): 12-column grid for the groomsmen section.
  - Tablet/mobile: collapse to 1 column stacked cards.

## Meta Information
- Title: `The Wedding Party | [Couple Names]`
- Description: `Meet the wedding party — the people closest to us.`
- Open Graph: `og:title`, `og:description`, `og:type=website`.

## Global Styles (tokens to keep consistent)
- Background: `white` for hero/bridesmaids; `#f7f6f2` for groomsmen.
- Text: primary `#0F0F0F`, muted `#0F0F0F/50~55`.
- Accent: `#2D4C3B` (small caps labels).
- Typography: `font-display` for headings; body 12.5–14px with ~1.8 line-height.
- Image treatment: grayscale by default; hover `scale-105` with smooth transition.

## Page Structure
1. Global Navbar (unchanged; provided by Layout)
2. Hero (unchanged)
3. Bridesmaids section (unchanged)
4. **Groomsmen section (redesign target)**
5. Global Footer (unchanged; provided by Layout)

## Sections & Components

### 1) Navbar / Footer (keep)
- Do not change structure, links, or styling.
- Page content must remain wrapped with the existing `Layout` component.

### 2) Groomsmen Section (Redesign)
**Goal:** make the groomsmen presentation feel aligned, intentional, and easier to scan.

#### Desktop layout (12-col grid)
- Use a single grid container: `grid grid-cols-12 gap-6 items-start`.
- **Featured “Best Man” card** (David): `col-span-6`.
  - Large image with fixed height (e.g., `h-[460px]`) to match the visual weight.
  - Role label (Best Man), name, bio; consistent text spacing.
- **Standard groomsmen cards** (Marcus, Julian): each `col-span-3`.
  - Image fixed height aligned between cards (e.g., `h-[280px]`).
  - Name + bio below; ensure equal top alignment.
- If more groomsmen are added later: wrap remaining cards in a secondary grid row using the same `col-span-3` pattern.

#### Mobile/tablet behavior
- Collapse to `flex flex-col` or `grid-cols-1`.
- Featured card appears first, then standard cards.
- Images reduce height (e.g., `h-[320px]` featured; `h-52` standard).

#### Component spec
- `SectionTitle`: keep existing styling.
- `FeaturedPersonCard`:
  - Props: `name`, `role`, `imageSrc`, `bio`.
  - Optional name/role overlay allowed, but must not reduce readability.
- `PersonCard`:
  - Props: `name`, `imageSrc`, `bio`.
  - Consistent spacing and typography.

#### Interaction states
- Card hover: image scales (`transition-transform duration-700`), keep grayscale treatment consistent with the rest of the page.
- Focus: visible outline for keyboard navigation on interactive wrappers (if clickable).

### 3) Remove Ring Bearer / Children section
- Do not render this section at all (no header, no cards, no empty spacing).
- Ensure no references remain in the page flow or navigation anchors.

## Acceptance Criteria
- Navbar and Footer remain visually and functionally unchanged.
- Groomsmen section uses a consistent, aligned grid on desktop with one featured “Best Man” card.
- No Ring Bearer / Children section is present anywhere on the Wedding Party page.
- No major layout regressions on mobile (stacked cards with readable text and images).