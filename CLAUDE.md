# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

- 경력/이력 관련 데이터가 필요하면 `~/career-wiki` (https://github.com/im-wen3y/career-wiki) 를 참조한다.

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

## Type/Lint Errors

`src/` 이하에서 타입 에러나 ESLint 에러가 보이면 절대 우회하지 말고 근본 원인을 고쳐서 해결한다. 자세한 규칙은 아래를 따른다:

@rules/code-style.md
@rules/component-style.md

## Code Quality

코드를 새로 쓰거나 고칠 때의 판단 기준(가독성·예측 가능성·응집도·결합도, 추상화/공통화 여부,
선언 레벨 선택)은 `code-quality` 스킬을 따른다. 기계적으로 검증 가능한 항목은
`eslint.config.js`에 규칙으로 들어가 있다.
