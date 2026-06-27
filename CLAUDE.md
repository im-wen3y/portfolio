# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm vitest run src/lib/some-file.spec.ts` — run a single test file

## Architecture

- **Svelte 5 runes mode** is enforced project-wide via `vite.config.ts` (use `$props()`, `$state()`, `$derived()`, etc.)
- `$lib` alias maps to `src/lib/`

## Accessibility (a11y)

- 모든 인터랙티브 요소(`<a>`, `<button>` 등)에 키보드 접근 가능하도록 구현
- 시맨틱 HTML 사용 — 의미 없는 `<div>` 클릭 핸들러 대신 적절한 요소 선택
- 이미지에 `alt` 속성 필수, 장식용 이미지는 `alt=""`
- ARIA 속성은 네이티브 HTML로 해결 불가능한 경우에만 사용
- 색상만으로 정보를 전달하지 않도록 주의

## Testing

- Vitest with `requireAssertions: true` — every test must contain at least one assertion
- Server-side tests: `src/**/*.{test,spec}.{js,ts}`
- Component tests excluded from server project (`.svelte.{test,spec}` files)
