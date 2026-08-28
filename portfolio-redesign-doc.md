# Portfolio Redesign — Project Documentation

**Owner:** Hafizh Alexander
**Current site:** https://fengch4mi.github.io/
**Current stack:** Next.js (React)
**Goal:** Redesign portfolio into an interactive, game-inspired experience, built over summer

---

## 1. Background & Direction

The current site is clean but static — a resume-style landing page with a hero intro, one featured project (StuPlan, an Android study planner), and About/Portfolio pages, hosted via GitHub Pages.

Given the site owner's stated interest — *"UI/UX exploring interface design for Game Development"* — the chosen direction leans into that identity rather than generic portfolio polish.

**Direction selected:** **Interactive / Game-like Project Showcase**
Treat the portfolio like a UI *inside* a game: project cards behave like inventory/character-sheet items, hover/touch interactions use spring-like motion, and navigation borrows conventions from game menus (HUD bar, "level select" project grid, loading-screen-style page transitions).

Two other directions were considered and rejected as primary (but can be borrowed from):
- *Polished & Ambient* — safer, ambient cursor/scroll motion only, no strong signature moment.
- *Full 3D Signature Hero* — one big 3D centerpiece, rest of site stays plain.

---

## 2. Design System (Token Plan)

### Color
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#14161f` | Base background |
| `--ink-2` | `#1c1f2c` | Secondary panel bg |
| `--ink-3` | `#262a3a` | Tertiary/borders |
| `--paper` | `#f3eedf` | Card surface (light) |
| `--paper-2` | `#e8e1cc` | Card surface shade |
| `--accent` | `#ff6b4a` | Primary CTA / active state (coral) |
| `--accent-2` | `#6fe3c2` | Secondary tag / status (mint) |
| `--text-hi` | `#f3eedf` | Headings on dark |
| `--text-lo` | `#8b8f9e` | Muted text on dark |
| `--text-ink` | `#14161f` | Text on paper cards |

### Typography
- **Display:** Space Grotesk (headlines, card titles) — geometric, blocky, used with restraint
- **Body:** Inter — readable, neutral
- **Utility/Mono:** IBM Plex Mono — HUD labels, stat blocks, tags, nav (ties directly to the "interface" identity)

### Layout Concept
- **HUD header** — mono-type identity bar instead of standard nav
- **Hero** — large display headline, single accent color, one clear CTA ("Select Project ▸")
- **Project deck** — grid of tiltable "character sheet" cards (see Signature Element)
- Structure encodes real information: card index numbers correspond to actual project order, not decorative

### Signature Element
**Tilt cards** — each project renders as a cream "character sheet" card with printed corner brackets and a mono stat block (`ROLE` / `TOOLS` / `YEAR`). Cards tilt in 3D toward the cursor (desktop) or finger (touch), with a coral scan-line "OPEN PROJECT" reveal on hover/focus. Respects `prefers-reduced-motion`.

A working HTML/CSS/JS prototype of this pattern was built and delivered separately (`portfolio-concept.html`) — includes the hero, HUD bar, and 3 project cards (1 real: StuPlan, 2 placeholders using the same pattern).

---

## 3. Tech Stack

Since the project already runs on **Next.js**, the stack builds on that rather than migrating away.

### Core
- **Next.js** — App Router recommended (better pairing with Server Components + streaming)
- **@gsap/react** — official GSAP hook (`useGSAP()`), replaces manual `useEffect` + cleanup for animations
- **GSAP + ScrollTrigger** — scroll-based reveals, pinning, timeline sequencing (GSAP is now 100% free including all plugins, following Webflow's acquisition — no licensing cost)

### 3D (optional, for later phases)
- **Three.js** — underlying WebGL engine
- **React Three Fiber (R3F) + drei** — React-idiomatic way to build 3D scenes (e.g., a rotatable phone mockup displaying StuPlan's UI)
- **Spline** — visual 3D scene builder (Figma-like), good fit given a design-first background; can export directly for embedding without hand-coding geometry

### Feel Layer
- **Lenis** — smooth scroll, pairs with ScrollTrigger
- **Framer Motion** *(optional)* — useful specifically for React mount/unmount transitions

### Page Transitions (see Section 5)
- **GSAP-based custom transition** — primary, cross-browser reliable
- **React `<ViewTransition>` + Next.js `experimental.viewTransition`** — native browser API, progressive enhancement layer on top of GSAP (Chrome/Edge best support as of 2026; Next.js docs still mark this experimental, not yet recommended solely for production)

### Install list
```bash
npm install gsap @gsap/react
npm install three @react-three/fiber @react-three/drei
npm install lenis
```

### Deployment
Next.js benefits from **Vercel** (built by the same team, zero-config, free tier) over GitHub Pages, which requires static export and loses server features (image optimization, dynamic routes without full pre-generation). Not a hard requirement, but recommended if not tied to GitHub Pages specifically.

---

## 4. Architecture Recommendation

**Not a full SPA — Next.js App Router's hybrid model is the right fit.**

- Each route remains independently server-rendered (good SEO, fast first paint, resilient if JS fails) — like an MPA.
- Once hydrated, navigation via `next/link` swaps content client-side without full reloads — feels like an SPA.
- **Action item:** confirm all internal navigation uses `<Link>`, not plain `<a>` tags, to get this behavior.

This avoids the downsides of a true SPA (heavier initial bundle, extra SEO work) while still achieving the seamless, continuous feel the game-menu concept needs.

---

## 5. Page Transitions Plan

| Layer | Role | Status |
|---|---|---|
| GSAP timeline (in `template.tsx`) | Primary transition — reliable across all browsers | Build first |
| React `<ViewTransition>` + `next.config.js` `experimental.viewTransition: true` | Progressive enhancement — native morph transitions (e.g., project card image "flying" into detail page) | Layer in after core UX works; Chrome/Edge only reliably for now |

---

## 6. Open Decisions (Not Yet Finalized)

- [ ] Clicking a project card: open an **inline case-study panel**, or **navigate to a full project page**?
- [ ] Tilt intensity on cards: keep as prototyped, or make more subtle/premium?
- [ ] Hero section: add a small 3D element (e.g., rotating phone mockup of StuPlan), or keep it flat/clean?
- [ ] Full route/page structure for the rebuilt site (Home / About / Portfolio index / Project detail — not yet mapped)

---

## 7. Deliverables So Far

- `portfolio-concept.html` — standalone interactive prototype demonstrating the HUD header, hero, and tiltable project cards (touch + mouse + keyboard accessible, reduced-motion safe)
- This document

---

## 8. Suggested Next Steps

1. Decide on the open items in Section 6.
2. Map full route/page structure.
3. Rebuild the tilt-card prototype as an actual Next.js component using `@gsap/react`.
4. Build page-transition system (GSAP first, View Transitions layered after).
5. Decide on 3D scope (none / Spline embed / full R3F scene) for the hero.
