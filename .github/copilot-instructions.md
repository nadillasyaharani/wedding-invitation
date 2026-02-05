# Copilot Instructions for AI Agents

## Project Overview
This is a modern React (TypeScript) web app for a digital wedding invitation, built with Vite. The app is single-page and highly visual, with custom components for RSVP, guestbook, countdown, story timeline, and more. All UI logic is in the main `App.tsx` file and the `components/` directory.

## Architecture & Data Flow
- **Entry Point:** `index.tsx` renders `App.tsx`.
- **Component Structure:** Major features are split into files in `components/` (e.g., `RSVPForm.tsx`, `Guestbook.tsx`, `StoryTimeline.tsx`).
- **Styling:** Uses Tailwind CSS utility classes and custom inline styles. Some stylistic effects use Framer Motion for animation.
- **Assets:** Images, music, and SVGs are stored in `public/` and referenced with `/img/...`, `/music/...`, `/ornaments/...` paths.
- **State Management:** Local React state only; no Redux or context API.
- **External Services:** `supabaseClient.ts` is present for backend integration (e.g., guestbook, RSVP), but not all features may be wired up.

## Developer Workflows
- **Build:** Use `npm run build` (see `package.json`).
- **Dev Server:** Use `npm run dev` to start Vite locally.
- **No Tests:** There are no test files or test commands.
- **Debugging:** Use browser dev tools and Vite's hot reload. No custom debug scripts.

## Project-Specific Patterns
- **Animations:** Framer Motion is used for entrance/exit and UI effects (see `App.tsx`, `InkSpreadTitle`).
- **Responsive Design:** Tailwind breakpoints and `clamp()` CSS for sizing.
- **SVG/Images:** SVGs are used for decorative elements; referenced directly in JSX.
- **Custom Fonts:** Font families are set in global styles within `App.tsx`.
- **No Routing:** All content is rendered conditionally in a single page.

## Integration Points
- **Supabase:** If adding features that require backend (e.g., RSVP, guestbook), use `supabaseClient.ts` for API calls.
- **Component Communication:** Pass props for data and callbacks; avoid global state.

## Examples
- To add a new section, create a component in `components/` and import/use it in `App.tsx`.
- For new assets, place them in `public/` and reference with `/img/...` or `/ornaments/...`.
- For backend features, use Supabase client and follow patterns in `Guestbook.tsx` or `RSVPForm.tsx`.

## Key Files
- `App.tsx`: Main UI logic and layout
- `components/`: Feature components
- `supabaseClient.ts`: Backend integration
- `public/`: Static assets

---
If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.