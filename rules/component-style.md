# Component Style — 컴포넌트 타입 컨벤션

[code-style.md](./code-style.md)의 "타입 에러는 반드시 근본 원인을 고쳐서 해결한다" 원칙을 컴포넌트(`*.svelte`) 작성에 적용할 때의 세부 규칙.

## Props

- 모든 컴포넌트는 `<script lang="ts">`를 사용한다.
- `$props()`의 타입은 인라인 타입 또는 `$lib`의 타입을 import해서 명시한다. `any`로 선언하지 않는다.

```svelte
<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project, onclose }: { project: Project; onclose: () => void } = $props();
</script>
```

- optional prop은 `?`와 기본값으로 표현하고, 필수 prop을 옵셔널로 완화해서 타입 에러를 피하지 않는다.

## 상태 타입

- `$state<T>()`의 제네릭이 추론되지 않는 경우(초기값이 `null`인 경우 등) 제네릭을 명시한다. 예: `$state<Project | null>(null)`.

## 리스트 렌더링

- `{#each}`는 항상 키를 지정한다. 키 선택 우선순위: 고유 id 필드 > 값 자체(원시 타입이며 중복 없는 경우) > 인덱스(최후의 수단, 목록 순서/구성이 절대 바뀌지 않을 때만).

## 내비게이션

- 컴포넌트 내부에서 앱 라우트로 이동하는 링크는 `$app/paths`의 `resolve()`를 사용한다. 정적 문자열 `href="/xxx"`를 그대로 쓰지 않는다.

## 동적 마크업

- 사용자에게 보여줄 마크업은 `{@html}` 대신 Svelte 템플릿(조건문/each/컴포넌트)으로 표현한다. `{@html}`이 꼭 필요하면 왜 필요한지, 입력이 신뢰할 수 있는 출처인지 주석으로 남긴다.

## 금지 사항

[code-style.md](./code-style.md)와 동일하게 `@ts-ignore`, `any` 캐스팅, `eslint-disable`로 컴포넌트의 타입/린트 에러를 우회하지 않는다.
