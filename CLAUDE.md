# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`stellar-site` is a freshly scaffolded SvelteKit 3 app (Svelte 5, Vite 8, TypeScript 6). It is currently a stub: one route (`src/routes/+page.svelte`) showing an "under construction" heading, plus a root layout that sets the favicon. There are no tests and no linter/formatter configured.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`); `.npmrc` sets `engine-strict=true`.

- `pnpm dev` — Vite dev server
- `pnpm build` / `pnpm preview` — production build / serve it locally
- `pnpm check` — `svelte-kit sync` + `svelte-check` type check (`check:watch` for watch mode). This is the only verification step available; there is no test runner.

## Architecture notes

- **Runes mode is forced project-wide** in `vite.config.ts` (except for `node_modules`). Use Svelte 5 runes (`$props`, `$state`, `$derived`, …) and `{@render children()}`; legacy `export let` / `$:` syntax will fail to compile.
- **The adapter is configured inside `vite.config.ts`** (passed to the `sveltekit()` plugin), and there is no `svelte.config.js`. Change adapter/compiler options there. `adapter-auto` is a placeholder; switch to a concrete adapter for a specific deploy target.
- **`#lib` import alias** comes from `package.json` `"imports"` (`#lib` → `src/lib/index.ts`, `#lib/*` → `src/lib/*`), not the usual SvelteKit `$lib`. Use `#lib/...` in imports, as the layout does for the favicon.
- Route prop types come from generated `./$types` (e.g. `LayoutProps`); run `pnpm check` or `pnpm prepare` (`svelte-kit sync`) to regenerate if they're missing.
