# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

- 경력/이력 관련 데이터가 필요하면 `~/career-wiki` (https://github.com/im-wen3y/career-wiki) 를 참조한다.

## Commands

- `pnpm vitest run src/lib/some-file.spec.ts` — run a single test file

## Architecture

- **Next.js 16 App Router** (React 19, TypeScript). `@/*` alias maps to `src/*`
- `src/app/(portfolio)/` → `/`, `/project/[id]` · `src/app/print/` → 인쇄 문서 · `src/app/owner/` → 소유자 로그인
- `src/proxy.ts` 가 `/print/*` 를 소유자 인증으로 보호한다 (Next 16에서 middleware → proxy)
- **CSS는 영역별로 분리한다.** `styles/base.css`(토큰·리셋)만 공유하고,
  `styles/portfolio.css` 와 `styles/resume-print.css` 는 각 레이아웃에서만 import 한다.
  화면 스타일을 루트 레이아웃에 두면 인쇄 문서로 샌다.
- PDF는 `src/server-assets/` 에 둔다. `public/` 에 두면 공개 URL이 되어 인증이 무의미해진다

## Accessibility (a11y)

- 모든 인터랙티브 요소(`<a>`, `<button>` 등)에 키보드 접근 가능하도록 구현
- 시맨틱 HTML 사용 — 의미 없는 `<div>` 클릭 핸들러 대신 적절한 요소 선택
- 이미지에 `alt` 속성 필수, 장식용 이미지는 `alt=""`
- ARIA 속성은 네이티브 HTML로 해결 불가능한 경우에만 사용
- 색상만으로 정보를 전달하지 않도록 주의

## Testing

- Vitest with `requireAssertions: true` — every test must contain at least one assertion
- `src/**/*.{test,spec}.{js,ts}` — Node 환경. 컴포넌트가 아니라 순수 로직을 테스트한다
  (예: `lib/owner-auth.ts`, `lib/print-theme.ts` — React 밖에 있어 훅 없이 검증된다)

## Type/Lint Errors

`src/` 이하에서 타입 에러나 ESLint 에러가 보이면 절대 우회하지 말고 근본 원인을 고쳐서 해결한다. 자세한 규칙은 아래를 따른다:

@rules/code-style.md
@rules/component-style.md

## Code Quality

코드를 새로 쓰거나 고칠 때의 판단 기준(가독성·예측 가능성·응집도·결합도, 추상화/공통화 여부,
선언 레벨 선택)은 `code-quality` 스킬을 따른다. 기계적으로 검증 가능한 항목은
`eslint.config.js`에 규칙으로 들어가 있다.
