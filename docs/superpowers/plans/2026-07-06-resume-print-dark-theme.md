# 이력서 프린트 다크 테마 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/resume/print` 페이지에 Light/Dark 토글을 추가해, 사이트 기존 다크 팔레트로 이력서를 미리보고 인쇄/PDF 저장할 수 있게 한다.

**Architecture:** 단일 컴포넌트(`+page.svelte`) 내에서 Svelte 5 runes(`$state`)로 테마 상태를 관리하고, `localStorage`로 마지막 선택을 유지한다. 다크 스타일은 새 팔레트를 만들지 않고 `app.css`에 이미 정의된 사이트 다크 변수(`--color-canvas`, `--color-ink` 등)를 `.page.dark` 스코프 아래 오버라이드로 재사용한다. 다크 테마로 인쇄 시 배경 그래픽 안내를 3초짜리 토스트로 보여준다.

**Tech Stack:** Svelte 5 (runes mode), 순수 CSS(스코프 스타일), `localStorage`, `window.print()`. 새 의존성 없음.

## Global Constraints

- Svelte 5 runes mode 사용 (`$props()`, `$state()` 등) — `vite.config.ts`에서 강제됨
- 이 변경은 브라우저 인쇄 API/`localStorage`/시각 스타일에 의존하므로 자동화된 유닛 테스트 대상이 아님 (스펙 명시). 각 태스크는 `pnpm check`(svelte-check)로 타입 오류만 검증하고, 나머지는 수동 브라우저 확인으로 검증한다.
- 모든 인터랙티브 요소는 키보드 접근 가능해야 함 (CLAUDE.md a11y 규칙)

---

### Task 1: 테마 상태, localStorage 영속성, 토글 버튼

**Files:**
- Modify: `src/routes/resume/print/+page.svelte:1-15` (script 블록)
- Modify: `src/routes/resume/print/+page.svelte:11-15` (`.controls` 마크업)
- Modify: `src/routes/resume/print/+page.svelte:19` (`<article class="page">` 마크업)
- Modify: `src/routes/resume/print/+page.svelte` 내 `<style>` 블록 (토글 버튼 스타일 추가)

**Interfaces:**
- Produces: `theme` (`$state<'light' | 'dark'>`, 초기값 `'light'`), `toggleTheme()` 함수 — Task 3의 `handlePrint()`가 `theme` 값을 읽어 사용함.

- [ ] **Step 1: script 블록에 테마 상태와 localStorage 로직 추가**

`src/routes/resume/print/+page.svelte`의 기존 스크립트 블록(라인 1-5)을 아래로 교체:

```svelte
<script>
	import { onMount } from 'svelte';

	const THEME_STORAGE_KEY = 'resume-print-theme';

	let theme = $state('light');

	onMount(() => {
		const saved = localStorage.getItem(THEME_STORAGE_KEY);
		if (saved === 'light' || saved === 'dark') {
			theme = saved;
		}
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}

	function handlePrint() {
		window.print();
	}
</script>
```

- [ ] **Step 2: `.controls` 안에 토글 버튼 추가**

기존 (라인 11-15):

```svelte
<!-- 화면 전용 컨트롤 바 -->
<div class="controls">
	<a href="/resume" class="back-link">← 이력서로</a>
	<button onclick={handlePrint} class="save-btn">PDF로 저장</button>
</div>
```

아래로 교체:

```svelte
<!-- 화면 전용 컨트롤 바 -->
<div class="controls">
	<a href="/resume" class="back-link">← 이력서로</a>
	<button
		onclick={toggleTheme}
		class="theme-toggle-btn"
		aria-pressed={theme === 'dark'}
	>
		{theme === 'light' ? '🌙 Dark로 보기' : '☀️ Light로 보기'}
	</button>
	<button onclick={handlePrint} class="save-btn">PDF로 저장</button>
</div>
```

- [ ] **Step 3: `<article class="page">`에 dark 클래스 바인딩**

기존 (라인 19):

```svelte
<article class="page">
```

아래로 교체:

```svelte
<article class="page" class:dark={theme === 'dark'}>
```

- [ ] **Step 4: 토글 버튼 스타일 추가**

`<style>` 블록 내 `.save-btn:active { ... }` 규칙(현재 라인 221-223) 바로 다음에 추가:

```css
.theme-toggle-btn {
	font-family: var(--font-body);
	font-size: 13px;
	font-weight: 500;
	line-height: 1;
	padding: 9px 18px;
	background-color: transparent;
	color: var(--color-ink);
	border: 1px solid var(--color-hairline);
	border-radius: var(--rounded-md);
	cursor: pointer;
	transition:
		background-color 0.15s ease,
		color 0.15s ease;
}

.theme-toggle-btn:hover {
	background-color: var(--color-surface-card);
}
```

그리고 `.controls` 규칙의 `justify-content: space-between;`을 `gap: 12px;`을 추가해 세 요소가 자연스럽게 배치되도록 한다 (기존 라인 183-193):

```css
.controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding: 12px 24px;
	background-color: var(--color-surface-soft);
	border-bottom: 1px solid var(--color-hairline);
	position: sticky;
	top: 64px;
	z-index: 10;
}
```

- [ ] **Step 5: 타입 검증**

Run: `pnpm check`
Expected: 에러 없음 (`0 errors`)

- [ ] **Step 6: 수동 확인**

Run: `pnpm dev` (이미 실행 중이 아니면)
- 브라우저에서 `http://localhost:5173/resume/print` 접속
- "🌙 Dark로 보기" 버튼 클릭 → 텍스트가 "☀️ Light로 보기"로 바뀌는지 확인 (스타일은 아직 라이트 그대로, Task 2에서 적용)
- 브라우저 devtools > Application > Local Storage에서 `resume-print-theme` 키가 `dark`로 저장되는지 확인
- 페이지 새로고침 후에도 다크 상태(버튼 텍스트 "☀️ Light로 보기")가 유지되는지 확인

- [ ] **Step 7: 커밋**

```bash
git add src/routes/resume/print/+page.svelte
git commit -m "feat(print): 다크 테마 토글 상태 및 localStorage 영속성 추가"
```

---

### Task 2: 다크 팔레트 오버라이드 + 인쇄 배경색 유지

**Files:**
- Modify: `src/routes/resume/print/+page.svelte` 내 `<style>` 블록 (`.page` 규칙, 새 `.page.dark` 규칙 블록 추가)

**Interfaces:**
- Consumes: Task 1에서 만든 `class:dark={theme === 'dark'}` 바인딩 (CSS만으로 소비, `.page.dark` 셀렉터)

- [ ] **Step 1: `.page` 규칙에 인쇄 배경색 유지 속성 추가**

기존 (`/* A4 종이 카드 */` 아래):

```css
.page {
	width: 210mm;
	min-height: 297mm;
	padding: 15mm;
	background: #ffffff;
	box-shadow:
		0 4px 6px rgba(20, 20, 19, 0.06),
		0 10px 40px rgba(20, 20, 19, 0.12);
	font-family: 'IBM Plex Sans KR', 'Inter', sans-serif;
	color: #141413;
}
```

아래로 교체:

```css
.page {
	width: 210mm;
	min-height: 297mm;
	padding: 15mm;
	background: #ffffff;
	box-shadow:
		0 4px 6px rgba(20, 20, 19, 0.06),
		0 10px 40px rgba(20, 20, 19, 0.12);
	font-family: 'IBM Plex Sans KR', 'Inter', sans-serif;
	color: #141413;
	print-color-adjust: exact;
	-webkit-print-color-adjust: exact;
}
```

- [ ] **Step 2: `.page.dark` 오버라이드 블록 추가**

`.page` 규칙 닫는 중괄호 바로 다음에 추가:

```css
/* ── 다크 테마 오버라이드 (사이트 기존 다크 변수 재사용) ── */
.page.dark {
	background: var(--color-canvas);
	color: var(--color-ink);
}

.page.dark .pr-name,
.page.dark .pr-sublabel,
.page.dark .pr-company,
.page.dark .pr-proj {
	color: var(--color-ink);
}

.page.dark .pr-role-line,
.page.dark .pr-contact,
.page.dark .pr-contact a,
.page.dark .pr-muted,
.page.dark .pr-badge {
	color: var(--color-muted);
}

.page.dark .pr-contact a:hover {
	color: var(--color-primary);
}

.page.dark .pr-label {
	color: var(--color-primary);
}

.page.dark .pr-divider,
.page.dark .pr-exp {
	border-top-color: var(--color-hairline);
}

.page.dark .pr-right {
	border-left-color: var(--color-hairline);
}

.page.dark .pr-about,
.page.dark .pr-list li,
.page.dark .pr-edu-sub,
.page.dark .pr-skill-badge {
	color: var(--color-body);
}

.page.dark .pr-list li::before {
	color: var(--color-muted-soft);
}

.page.dark .pr-skill-badge,
.page.dark .pr-badge {
	background-color: var(--color-surface-card);
}
```

- [ ] **Step 3: 타입 검증**

Run: `pnpm check`
Expected: 에러 없음 (`0 errors`)

- [ ] **Step 4: 수동 확인**

- `http://localhost:5173/resume/print`에서 "🌙 Dark로 보기" 클릭
- A4 페이지 배경이 `#171717`(사이트 캔버스 색)로 바뀌고, 이름/제목은 밝은 색(`--color-ink`), 보조 텍스트는 회녹색(`--color-muted`), 섹션 라벨(EXPERIENCE, SKILLS 등)과 hover 링크는 네온 민트(`--color-primary`)로 바뀌는지 확인
- 구분선과 스킬 배지 배경이 다크 톤으로 바뀌는지 확인
- 브라우저 인쇄 미리보기(Cmd+P)를 열어 다크 배경/배지 색이 미리보기에 그대로 나오는지 확인 (안 나오면 "배경 그래픽" 인쇄 옵션 체크 후 재확인 — Task 3에서 이 안내를 토스트로 띄움)
- Light 모드로 되돌려도 기존 라이트 스타일이 그대로인지 확인 (회귀 없음)

- [ ] **Step 5: 커밋**

```bash
git add src/routes/resume/print/+page.svelte
git commit -m "feat(print): 다크 테마 컬러 오버라이드 및 인쇄 배경색 유지 속성 추가"
```

---

### Task 3: 인쇄 안내 토스트 (다크 테마에서 저장 클릭 시)

**Files:**
- Modify: `src/routes/resume/print/+page.svelte` 내 script 블록 (`handlePrint` 수정, `toastVisible` 상태 추가)
- Modify: `src/routes/resume/print/+page.svelte` 마크업 (`.controls` div 다음에 토스트 엘리먼트 추가)
- Modify: `src/routes/resume/print/+page.svelte` 내 `<style>` 블록 (`.print-toast` 스타일 및 `@media print` 규칙 추가)

**Interfaces:**
- Consumes: Task 1의 `theme` 상태 (`'light' | 'dark'`)
- Produces: 없음 (최종 태스크)

- [ ] **Step 1: `toastVisible` 상태와 `handlePrint` 수정**

Task 1에서 만든 script 블록의 `handlePrint` 함수를 아래로 교체 (전체 script 블록):

```svelte
<script>
	import { onMount } from 'svelte';

	const THEME_STORAGE_KEY = 'resume-print-theme';

	let theme = $state('light');
	let toastVisible = $state(false);
	let toastTimeout;

	onMount(() => {
		const saved = localStorage.getItem(THEME_STORAGE_KEY);
		if (saved === 'light' || saved === 'dark') {
			theme = saved;
		}
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}

	function handlePrint() {
		if (theme === 'dark') {
			toastVisible = true;
			clearTimeout(toastTimeout);
			toastTimeout = setTimeout(() => {
				toastVisible = false;
			}, 3000);
		}
		window.print();
	}
</script>
```

- [ ] **Step 2: 토스트 마크업 추가**

`.controls` div (Task 1에서 만든 마크업) 바로 다음에 추가:

```svelte
{#if toastVisible}
	<div class="print-toast" role="status">
		다크 배경이 보이려면 인쇄 설정에서 '배경 그래픽'을 켜주세요
	</div>
{/if}
```

- [ ] **Step 3: 토스트 스타일 추가**

`<style>` 블록의 `.theme-toggle-btn:hover { ... }` 규칙(Task 1에서 추가) 바로 다음에 추가:

```css
.print-toast {
	position: fixed;
	top: 84px;
	left: 50%;
	transform: translate(-50%, 0);
	z-index: 50;
	padding: 10px 20px;
	background-color: rgba(20, 20, 19, 0.9);
	color: #ffffff;
	font-family: var(--font-body);
	font-size: 13px;
	font-weight: 500;
	border-radius: var(--rounded-pill);
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
	white-space: nowrap;
	pointer-events: none;
	animation: print-toast-fade 3s ease forwards;
}

@keyframes print-toast-fade {
	0% {
		opacity: 0;
		transform: translate(-50%, -8px);
	}
	10% {
		opacity: 1;
		transform: translate(-50%, 0);
	}
	85% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
```

`@media print` 블록(파일 하단) 안, `.preview-wrap { display: contents; }` 다음에 추가:

```css
.print-toast {
	display: none;
}
```

- [ ] **Step 4: 타입 검증**

Run: `pnpm check`
Expected: 에러 없음 (`0 errors`)

- [ ] **Step 5: 수동 확인**

- `http://localhost:5173/resume/print`에서 Dark로 전환 후 "PDF로 저장" 클릭
- 화면 중앙 상단에 안내 토스트가 나타나고, 약 3초 후 자동으로 사라지는지 확인
- 인쇄 대화상자가 함께 열리는지 확인 (기존 동작 유지)
- Light 상태에서 "PDF로 저장" 클릭 시 토스트가 뜨지 않고 바로 인쇄 대화상자만 열리는지 확인
- 인쇄 미리보기 화면에는 토스트가 보이지 않는지 확인 (`@media print`로 숨김 처리됨)

- [ ] **Step 6: 커밋**

```bash
git add src/routes/resume/print/+page.svelte
git commit -m "feat(print): 다크 테마 인쇄 시 배경 그래픽 안내 토스트 추가"
```

---

## Post-Implementation

- [ ] `pnpm lint` 실행해 포맷/린트 통과 확인
- [ ] `docs/superpowers/specs/2026-07-06-resume-print-dark-theme-design.md`의 각 섹션이 Task 1-3에서 모두 구현됐는지 최종 확인
