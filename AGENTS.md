# Project Overview

A modern React + TypeScript frontend template with best practices and common tools.
Core features include form validation (React Hook Form + Zod), data fetching
(TanStack Query), state management (Zustand), i18n support, and dark mode.

**Tech Stack:**
- React 18 + TypeScript + Vite
- TanStack Query for data fetching
- Zustand for state management
- React Hook Form + Zod for forms
- Tailwind CSS + shadcn/ui for styling
- Biome for linting/formatting
- Vitest for testing
- Bun as package manager

## Repository Structure

- `src/` — Main source code
  - `src/components/` — Reusable React components
  - `src/components/ui/` — shadcn/ui components
  - `src/hooks/` — Custom React hooks
  - `src/lib/` — Utility libraries and validations
  - `src/pages/` — Page components (Home, Dashboard, Login, etc.)
  - `src/stores/` — Zustand state stores
  - `src/types/` — TypeScript type definitions
  - `src/utils/` — Utility functions (request, storage, date)
- `public/` — Static assets
  - `public/locales/` — i18n translation files (en, zh)
- `dist/` — Production build output

## Setup & Dev Commands

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Generate API client from OpenAPI spec
bun run gen:apis
```

## Testing Instructions

**Framework:** Vitest + Testing Library

**Test files location:** `src/**/*.test.ts` or `src/**/*.test.tsx`

```bash
# Run all tests
bun run test

# Run tests once (CI mode)
bun run test:run

# Run tests with coverage
bun run test:coverage

# Run specific test file
bunx vitest run src/lib/validations.test.ts

# Run tests in watch mode
bun run test
```

**Test utilities:**
- `@testing-library/react` for component testing
- `@testing-library/user-event` for user interaction simulation
- `jsdom` for DOM environment

## Code Style & Conventions

**Tools:**
- Biome for linting and formatting (replaces ESLint + Prettier)
- TypeScript strict mode enabled

```bash
# Check and fix code style
bun run check

# Format code only
bun run format

# Lint only (no fix)
bun run lint
```

**Key Rules:**
- Single quotes for strings
- Semicolons required
- 2-space indentation
- 120 character line width
- `noExplicitAny: warn` — avoid `any`, use `unknown` instead
- `useConst: error` — prefer `const` over `let`

**Naming Conventions:**
- Components: PascalCase (`UserProfile.tsx`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)
- Utils: camelCase (`formatDate.ts`)
- Types: PascalCase (`User`, `AuthState`)
- Constants: SCREAMING_SNAKE_CASE (`STORAGE_KEYS`)

**Good Example:**
```tsx
// ✅ Good: typed, uses unknown, descriptive names
export function useApiQuery<TData = unknown>(
  queryKey: readonly unknown[],
  url: string,
  options?: UseQueryOptions<TData>
) { ... }
```

**Bad Example:**
```tsx
// ❌ Bad: uses any, no types, unclear naming
export function useApi(key: any, url: any, opts?: any) { ... }
```

## PR & Git Workflow

**Branch Naming:**
- `feat/description` — new features
- `fix/description` — bug fixes
- `refactor/description` — code refactoring
- `docs/description` — documentation updates

**Commit Message Format:**
Use conventional commits with emoji:
```
✨ feat: 新功能描述
🐛 fix: Bug 修复描述
📝 docs: 文档修改
♻️ refactor: 代码重构
🎨 style: 代码格式调整
⚡️ perf: 性能优化
✅ test: 测试相关
🗑️ chore: 删除文件或代码
```

**Required Checks Before Merge:**
1. `bun run check` — Biome lint passes
2. `bunx tsc --noEmit` — TypeScript compiles
3. `bun run test:run` — All tests pass

**PR Guidelines:**
- Keep PRs focused and small
- Include description of changes
- Reference related issues

## Security & Guardrails

**Secrets Management:**
- Never commit secrets to the repository
- Use environment variables via `.env` files
- `.env` is gitignored; use `.env.example` as template

**Environment Variables:**
- `VITE_API_BASE_URL` — Backend API base URL
- `VITE_BASE_PATH` — App base path for routing

**AI Agent Boundaries:**

✅ **Allowed:**
- Read and modify source code in `src/`
- Run dev commands (`bun run dev`, `bun run test`)
- Install dependencies (`bun add <package>`)
- Create/modify tests
- Update configuration files

⚠️ **Ask Before:**
- Modifying `package.json` dependencies significantly
- Changing authentication/security logic
- Deleting existing features or files
- Making git commits (follow commit rules above)

🚫 **Prohibited:**
- Committing secrets or API keys
- Modifying `.gitignore` to expose secrets
- Running destructive commands on production
- Pushing directly to main branch

## Further Reading

- [README.md](./README.md) — Project introduction and quick start
- [biome.json](./biome.json) — Linting and formatting configuration
- [tsconfig.json](./tsconfig.json) — TypeScript configuration
- [vite.config.ts](./vite.config.ts) — Vite build configuration
