# im-books-front

## Tech Stack

- **Framework**: SvelteKit + Svelte 5 (runes mode)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm
- **Build Tool**: Vite
- **Testing**: Vitest
- **Linting**: ESLint (typescript-eslint + eslint-plugin-svelte)
- **Formatting**: Prettier (prettier-plugin-svelte)
- **Adapter**: @sveltejs/adapter-auto

## Prerequisites

- Node.js v22+
- pnpm v10+

## Getting Started

```bash
# install dependencies
pnpm install

# start dev server
pnpm dev
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm check` | TypeScript / Svelte type checking |
| `pnpm lint` | Run prettier + eslint checks |
| `pnpm format` | Auto-format with prettier |
| `pnpm test` | Run all tests once |
| `pnpm test:unit` | Run vitest in watch mode |

## Project Structure

```
src/
  app.html          # HTML template
  app.d.ts          # Global type declarations
  lib/              # Shared code & components ($lib alias)
    assets/         # Static assets imported by components
    index.ts        # Library entry point
  routes/           # SvelteKit file-based routing
    +layout.svelte  # Root layout
    +page.svelte    # Home page
static/             # Public static files (served as-is)
```

## Code Style

- Tabs for indentation
- Single quotes
- No trailing commas
- 100 character print width
- Svelte files use `<script lang="ts">` with runes syntax (`$props()`, `$state()`, `$derived()`, etc.)

## License

[MIT](LICENSE)
