# Component Style — 컴포넌트 타입 컨벤션

[code-style.md](./code-style.md)의 "타입 에러는 반드시 근본 원인을 고쳐서 해결한다" 원칙을 컴포넌트(`*.tsx`) 작성에 적용할 때의 세부 규칙.

## Props

- props 타입은 인라인 타입 또는 `@/data`·`@/lib`의 타입을 import해서 명시한다. `any`로 선언하지 않는다.

```tsx
import type { PrintTargetResume } from '@/data/print-profile';

export function TargetResumePages({
	profile,
	dark
}: {
	profile: PrintTargetResume;
	dark: boolean;
}) {
	/* ... */
}
```

- optional prop은 `?`와 기본값으로 표현하고, 필수 prop을 옵셔널로 완화해서 타입 에러를 피하지 않는다.

## 서버 · 클라이언트 경계

- 기본은 서버 컴포넌트다. **상태·이벤트·브라우저 API가 필요할 때만** 파일 맨 위에 `'use client'`를 둔다.
- `'use client'`는 되도록 잎(leaf)에 둔다. 레이아웃이나 페이지에 붙이면 그 아래 전체가 클라이언트로 넘어간다.
  예: `print-shell.tsx`만 클라이언트이고, 문서 페이지 컴포넌트들은 그 안에서 마크업만 담당한다.
- 서버 전용 모듈(`next/headers`, `node:fs` 등을 쓰는 것)은 `import 'server-only'`로 못을 박는다.
- `'use server'` 파일은 **모든 export가 async 함수여야 한다.** 순수 헬퍼는 별도 모듈로 뺀다.

## 상태 타입

- `useState`의 제네릭이 추론되지 않는 경우(초기값이 `null`인 경우 등) 제네릭을 명시한다.
  예: `useState<Project | null>(null)`.
- localStorage처럼 서버에 없는 값은 초기 렌더에 기본값을 쓰고 `useEffect`에서 읽는다
  (하이드레이션 불일치 방지). `lib/use-print-theme.ts` 참고.

## 리스트 렌더링

- `.map()`에는 항상 `key`를 지정한다. 키 선택 우선순위: 고유 id 필드 > 값 자체(원시 타입이며 중복 없는 경우) > 인덱스(최후의 수단, 목록 순서/구성이 절대 바뀌지 않을 때만).

## 내비게이션

- 앱 내부 이동은 `next/link`의 `<Link>`를 쓴다. `mailto:`, 외부 URL은 `<a>`를 그대로 쓴다.
- `trailingSlash: true` 설정이라 내부 경로는 슬래시가 붙은 형태로 정규화된다.

## 스타일

- CSS는 영역별로 분리돼 있다. 새 화면 스타일을 `styles/base.css`나 루트 레이아웃에 넣지 않는다.
  포트폴리오는 `styles/portfolio.css`, 인쇄 문서는 `styles/resume-print.css`.
- 전역 CSS라 셀렉터가 새기 쉽다. `h1`, `form`, `input` 같은 일반 셀렉터를 쓸 때는
  해당 화면의 루트 클래스 아래로 중첩한다 (`styles/owner.css` 참고).

## 동적 마크업

- 사용자에게 보여줄 마크업은 `dangerouslySetInnerHTML` 대신 JSX(조건부 렌더/`.map()`/컴포넌트)로 표현한다.
  꼭 필요하면 왜 필요한지, 입력이 신뢰할 수 있는 출처인지 주석으로 남긴다.

## 금지 사항

[code-style.md](./code-style.md)와 동일하게 `@ts-ignore`, `any` 캐스팅, `eslint-disable`로 컴포넌트의 타입/린트 에러를 우회하지 않는다.
