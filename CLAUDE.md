# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then build for production
- `npm run lint` — run ESLint over the project
- `npm run preview` — preview the production build locally

There is no test suite configured in this repo. The API base URL is read from `VITE_API_URL` (Vite env var, `.env`).

## Architecture

React 19 + TypeScript + Vite frontend for MisLinks (a Linktree-style link-in-bio app), paired with the `mislinks-backend` Express API.

- **Routing** (`src/router.tsx`): three route groups, each wrapped in its own layout:
  - `/auth/login`, `/auth/register` → `AuthLayout` (public, split-screen auth forms)
  - `/admin` and `/admin/profile` → `AppLayout` (authenticated dashboard)
  - `/:handle` → `HandleLayout` (public profile page for a given user handle)
  - `/` → `HomeView`; `/404` and unmatched paths → `NotFoundView`
- **Auth/session**: there's no auth context/store. `AppLayout` itself calls `getUser()` via React Query (`queryKey: ["user"]`) on every mount; a failed fetch (401) redirects to `/auth/login` via `<Navigate>`. The JWT is stored in `localStorage` under `AUTH_TOKEN` and attached to every request by an axios request interceptor in `src/config/axios.ts` — there's no logout/refresh flow beyond clearing that key.
- **API layer** (`src/api/DevTreeAPI.ts`): all backend calls go through the shared `api` axios instance. Every function follows the same pattern — try the request, and on `isAxiosError` rethrow `error.response.data.error` as a plain `Error` so callers/toasts can show the backend's Spanish error message directly.
- **Data fetching**: TanStack React Query (`QueryClientProvider` set up in `src/main.tsx`) is the only state layer for server data; there's no Redux/Zustand. Mutations typically update the cache directly via `queryClient.setQueryData(["user"], ...)` for optimistic UI (see `MisLinks.tsx`'s drag-reorder handler) rather than always refetching.
- **Links model**: a user's social links are stored backend-side as a JSON *string* on `user.links` (see `types.ts`'s `User.links: string` and `SocialNetwork`/`SocialLinks` types), not a structured array — components must `JSON.parse`/`JSON.stringify` it themselves. `src/data/social.ts` defines the fixed set of supported networks (facebook, github, instagram, x, youtube, tiktok, twitch, linkedin) with icons in `public/social/`.
- **Drag-and-drop reordering**: `MisLinks.tsx` (the authenticated dashboard shell) uses `@dnd-kit/core` + `@dnd-kit/sortable` to reorder only the *enabled* links; on drag end it reassembles the full links array (reordered enabled + untouched disabled) and writes it back into the React Query cache as a JSON string.
- **Theming**: `src/data/themes.ts` defines a fixed palette of named themes (id, name, background/text/button Tailwind classes) used to style a user's public profile page (`HandleView`/`Profileview`); a user's chosen theme is stored as `user.theme`.
- **Styling**: Tailwind CSS (config in `tailwind.config.js`, PostCSS). No component library beyond Headless UI (`@headlessui/react`) and Heroicons.
- Forms use `react-hook-form`; toasts use `sonner` (a `<Toaster>` is mounted per-layout, not globally once).
