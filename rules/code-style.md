# Code Style — 타입/린트 에러 처리 규칙

## 원칙

`src/` 이하에서 타입 에러(빨간줄) 또는 ESLint 에러가 발생하면 **반드시 근본 원인을 고쳐서 해결**한다.
아래 방법으로 에러를 숨기고 넘어가는 것은 금지한다:

- `@ts-ignore`, `@ts-expect-error`
- `any` 타입으로 캐스팅(`as any`, `: any`) 하거나 타입을 느슨하게 바꿔서 우회
- `eslint-disable`, `eslint-disable-next-line` 등 규칙 비활성화 주석
- `tsconfig.json`/`eslint.config.js`의 규칙을 완화해서 특정 에러를 안 보이게 만드는 것
- 문제되는 코드/마크업을 통째로 지워서 에러를 없애는 것 (기능이 필요한 경우)

규칙 자체가 이 프로젝트에 맞지 않다고 판단되면, 임의로 우회하지 말고 사용자에게 먼저 확인한다.

## 작업 완료 전 확인

코드를 수정한 뒤에는 아래 명령을 실행해서 에러가 0건인지 확인하고 나서 작업을 마친다.

```bash
pnpm check   # tsc --noEmit — 타입 에러 확인
pnpm lint    # prettier + eslint
```

## 자주 발생하는 케이스와 올바른 처리 방법

- **`react/jsx-key` 계열 누락** — `.map()`으로 만든 요소에 안정적인 키를 추가한다. 값이 고유하면 값 자체를 키로 사용하고, 중복 가능성이 있으면 고유 id 필드를 사용한다. 인덱스를 키로 쓰는 것은 최후의 수단이다.
- **`no-nested-ternary`** — 중첩 삼항 대신 조기 반환하는 함수로 푼다. 함께 바뀌는 값이 여러 개면 한 함수에서 같이 결정한다 (`print-shell.tsx`의 `resolveDocumentId()` 참고).
- **`complexity` / `max-depth` / `max-params`** — 한 번에 들고 있어야 하는 맥락이 많다는 신호다. 조건에 이름을 붙이거나 함수를 쪼갠다.
- **`@typescript-eslint/no-shadow`** — 바깥 스코프와 같은 이름을 다시 선언하지 않는다. 이름을 구체적으로 바꾼다.
- **서버 컴포넌트에서 클라이언트 훅 사용** — `'use client'`를 페이지 전체에 붙여 해결하지 말고, 훅이 필요한 부분만 별도 클라이언트 컴포넌트로 분리한다.

## 관련 문서

- [component-style.md](./component-style.md) — 컴포넌트 작성 시 타입 관련 컨벤션
