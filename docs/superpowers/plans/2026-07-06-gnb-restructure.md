# GNB 구조 개편 (Resume/Portfolio 라우트 인식) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GNB를 라우트 인식형으로 바꿔서 `/resume`·`/portfolio`에서는 `Resume / Portfolio` 링크(+ `/resume`에서만 PDF 버튼)를 보여주고, `/resume/print`에서는 메뉴 없이 light/dark 토글만 보여주며, 기존 섹션 앵커 서브내비는 Resume 페이지 내부로 옮긴다.

**Architecture:** `$app/state`의 `page.url.pathname`으로 레이아웃(`+layout.svelte`)의 GNB를 3가지 모드로 분기한다. print 페이지의 테마 상태는 레이아웃(토글 UI)과 print 페이지(미리보기 렌더링)가 함께 읽고 써야 하므로 Svelte 5 runes 기반 공유 스토어(`src/lib/stores/print-theme.svelte.ts`)로 분리한다. 기존 레이아웃의 섹션 스크롤스파이(`activeSection` + `IntersectionObserver`)는 `resume/+page.svelte` 내부의 sticky 서브내비게이션으로 그대로 이전한다.

**Tech Stack:** SvelteKit 2 (`$app/state`, `$app/paths`), Svelte 5 runes, Vitest (server project, node 환경).

## Global Constraints

- `src/` 이하 타입/ESLint 에러는 근본 원인을 고쳐서 해결한다. `@ts-ignore`, `any` 캐스팅, `eslint-disable` 금지.
- 컴포넌트(`*.svelte`)는 `<script lang="ts">` 사용, `$props()` 타입 명시, `any` 금지.
- 내부 라우트로 이동하는 `href`는 `$app/paths`의 `resolve()`로 감싼다.
- `{#each}`는 항상 키를 지정한다 (이번 플랜에서는 `{#each}`를 사용하지 않으므로 해당 없음).
- 작업 완료 전 `pnpm check`와 `pnpm lint`를 실행해 에러 0건을 확인한다.
- Vitest는 `requireAssertions: true` — 모든 테스트는 최소 1개의 assertion을 포함해야 한다.

---

### Task 1: 공유 테마 스토어 (`print-theme.svelte.ts`)

**Files:**

- Create: `src/lib/stores/print-theme.svelte.ts`
- Test: `src/lib/stores/print-theme.spec.ts`

**Interfaces:**

- Produces: `export class PrintTheme { value: 'light' | 'dark'; hydrate(): void; toggle(): void; }`, `export const printTheme: PrintTheme` — Task 2(print 페이지)와 Task 3(레이아웃)이 `printTheme.value`를 읽고 `printTheme.toggle()` / `printTheme.hydrate()`를 호출한다.

- [ ] **Step 1: 테스트 파일 작성**

```ts
// src/lib/stores/print-theme.spec.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrintTheme } from './print-theme.svelte.ts';

function createLocalStorageStub() {
	const store = new Map<string, string>();
	return {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => {
			store.set(key, value);
		},
		removeItem: (key: string) => {
			store.delete(key);
		}
	};
}

beforeEach(() => {
	vi.stubGlobal('localStorage', createLocalStorageStub());
});

describe('PrintTheme', () => {
	it('저장된 값이 없으면 light를 유지한다', () => {
		const theme = new PrintTheme();
		theme.hydrate();
		expect(theme.value).toBe('light');
	});

	it('localStorage에 저장된 값으로 복원한다', () => {
		localStorage.setItem('resume-print-theme', 'dark');
		const theme = new PrintTheme();
		theme.hydrate();
		expect(theme.value).toBe('dark');
	});

	it('유효하지 않은 저장값은 무시하고 기본값을 유지한다', () => {
		localStorage.setItem('resume-print-theme', 'blue');
		const theme = new PrintTheme();
		theme.hydrate();
		expect(theme.value).toBe('light');
	});

	it('toggle은 light/dark를 번갈아 바꾸고 localStorage에 저장한다', () => {
		const theme = new PrintTheme();

		theme.toggle();
		expect(theme.value).toBe('dark');
		expect(localStorage.getItem('resume-print-theme')).toBe('dark');

		theme.toggle();
		expect(theme.value).toBe('light');
		expect(localStorage.getItem('resume-print-theme')).toBe('light');
	});
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `pnpm vitest run src/lib/stores/print-theme.spec.ts`
Expected: FAIL (`Cannot find module './print-theme.svelte.ts'` 또는 유사한 모듈 없음 에러)

- [ ] **Step 3: 스토어 구현**

```ts
// src/lib/stores/print-theme.svelte.ts
const THEME_STORAGE_KEY = 'resume-print-theme';

export class PrintTheme {
	value = $state<'light' | 'dark'>('light');

	hydrate() {
		const saved = localStorage.getItem(THEME_STORAGE_KEY);
		if (saved === 'light' || saved === 'dark') {
			this.value = saved;
		}
	}

	toggle() {
		this.value = this.value === 'light' ? 'dark' : 'light';
		localStorage.setItem(THEME_STORAGE_KEY, this.value);
	}
}

export const printTheme = new PrintTheme();
```

- [ ] **Step 4: 테스트 실행 → 통과 확인**

Run: `pnpm vitest run src/lib/stores/print-theme.spec.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/lib/stores/print-theme.svelte.ts src/lib/stores/print-theme.spec.ts
git commit -m "feat: print 테마를 레이아웃과 공유하는 PrintTheme 스토어 추가"
```

---

### Task 2: Print 페이지가 공유 스토어를 사용하도록 변경 + `.controls` 바 정리

**Files:**

- Modify: `src/routes/resume/print/+page.svelte`

**Interfaces:**

- Consumes: `printTheme` (Task 1의 `src/lib/stores/print-theme.svelte.ts`) — `printTheme.value: 'light' | 'dark'`, `printTheme.toggle()` (이 페이지에서는 호출하지 않음, 읽기만 함).

- [ ] **Step 1: 스크립트 블록 교체**

`src/routes/resume/print/+page.svelte`의 1~32번 줄(스크립트 블록 전체)을 아래로 교체한다.

Before:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	const THEME_STORAGE_KEY = 'resume-print-theme';

	let theme = $state<'light' | 'dark'>('light');
	let toastVisible = $state(false);
	let toastTimeout: ReturnType<typeof setTimeout> | undefined;

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

After:

```svelte
<script lang="ts">
	import { resolve } from '$app/paths';
	import { printTheme } from '$lib/stores/print-theme.svelte.ts';

	let toastVisible = $state(false);
	let toastTimeout: ReturnType<typeof setTimeout> | undefined;

	function handlePrint() {
		if (printTheme.value === 'dark') {
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

- [ ] **Step 2: `.controls` 바에서 테마 스위치 마크업 제거**

39~77번 줄의 `<div class="controls">` 블록을 아래로 교체한다 (뒤로가기 링크와 저장 버튼만 남김).

Before:

```svelte
<!-- 화면 전용 컨트롤 바 -->
<div class="controls">
	<a href={resolve('/resume')} class="back-link">← 이력서로</a>
	<button
		type="button"
		class="theme-switch"
		onclick={toggleTheme}
		role="switch"
		aria-checked={theme === 'dark'}
	>
		<span class="theme-switch-track" class:is-dark={theme === 'dark'}>
			<span class="theme-switch-thumb">
				{#if theme === 'dark'}
					<svg class="theme-switch-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
						<path
							d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a.5.5 0 0 0-.65-.62A6.5 6.5 0 1 0 14.12 10.15a.5.5 0 0 0-.62-.65Z"
						/>
					</svg>
				{:else}
					<svg class="theme-switch-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
						<circle cx="8" cy="8" r="3.2" />
						<g stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
							<line x1="8" y1="0.8" x2="8" y2="2.4" />
							<line x1="8" y1="13.6" x2="8" y2="15.2" />
							<line x1="0.8" y1="8" x2="2.4" y2="8" />
							<line x1="13.6" y1="8" x2="15.2" y2="8" />
							<line x1="2.7" y1="2.7" x2="3.8" y2="3.8" />
							<line x1="12.2" y1="12.2" x2="13.3" y2="13.3" />
							<line x1="2.7" y1="13.3" x2="3.8" y2="12.2" />
							<line x1="12.2" y1="3.8" x2="13.3" y2="2.7" />
						</g>
					</svg>
				{/if}
			</span>
		</span>
		<span class="theme-switch-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
	</button>
	<button onclick={handlePrint} class="save-btn">PDF로 저장</button>
</div>
```

After:

```svelte
<!-- 화면 전용 컨트롤 바 -->
<div class="controls">
	<a href={resolve('/resume')} class="back-link">← 이력서로</a>
	<button onclick={handlePrint} class="save-btn">PDF로 저장</button>
</div>
```

- [ ] **Step 3: `class:dark` 바인딩을 스토어 참조로 변경**

Before (기존 90번 줄 부근):

```svelte
<article class="page" class:dark={theme === 'dark'}>
```

After:

```svelte
<article class="page" class:dark={printTheme.value === 'dark'}>
```

- [ ] **Step 4: `.controls` 배경을 backdrop-filter 처리로 변경**

Before:

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

After:

```css
.controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding: 12px 24px;
	background-color: color-mix(in srgb, var(--color-surface-soft) 72%, transparent);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border-bottom: 1px solid var(--color-hairline);
	position: sticky;
	top: 64px;
	z-index: 10;
}
```

- [ ] **Step 5: 테마 스위치 관련 CSS 규칙 삭제**

아래 규칙들을 `<style>` 블록에서 전부 삭제한다 (`.theme-switch`, `.theme-switch-track`, `.theme-switch-track.is-dark`, `.theme-switch-thumb`, `.theme-switch-track.is-dark .theme-switch-thumb`, `.theme-switch-icon`, `.theme-switch-label`, `.theme-switch:hover .theme-switch-label`):

```css
.theme-switch {
	display: flex;
	align-items: center;
	gap: 8px;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	font-family: var(--font-body);
}

.theme-switch-track {
	display: flex;
	align-items: center;
	width: 44px;
	height: 24px;
	padding: 2px;
	border-radius: var(--rounded-pill);
	background-color: color-mix(in srgb, var(--color-accent-amber) 30%, transparent);
	transition: background-color 0.2s ease;
}

.theme-switch-track.is-dark {
	background-color: var(--color-surface-dark);
}

.theme-switch-thumb {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: var(--color-accent-amber);
	color: var(--color-on-primary);
	transform: translateX(0);
	transition:
		transform 0.2s ease,
		background-color 0.2s ease;
}

.theme-switch-track.is-dark .theme-switch-thumb {
	background-color: var(--color-primary);
	transform: translateX(20px);
}

.theme-switch-icon {
	width: 12px;
	height: 12px;
}

.theme-switch-label {
	font-size: 13px;
	font-weight: 500;
	color: var(--color-muted);
	transition: color 0.15s ease;
}

.theme-switch:hover .theme-switch-label {
	color: var(--color-ink);
}
```

(이 CSS는 Task 3에서 `+layout.svelte`로 그대로 옮겨간다.)

- [ ] **Step 6: 타입/린트 확인**

Run: `pnpm check && pnpm lint`
Expected: 에러 0건 (미사용 CSS 선택자 관련 경고가 뜨면 Step 5에서 규칙이 전부 삭제됐는지 다시 확인)

- [ ] **Step 7: 커밋**

```bash
git add src/routes/resume/print/+page.svelte
git commit -m "refactor(print): 테마 상태를 공유 스토어로 이전하고 controls 바에 backdrop-filter 적용"
```

---

### Task 3: 레이아웃 GNB 라우트 분기 + 섹션 서브내비를 Resume 페이지로 이전

**Files:**

- Modify: `src/routes/+layout.svelte`
- Modify: `src/routes/resume/+page.svelte`

**Interfaces:**

- Consumes: `printTheme` (Task 1), `page` from `$app/state` (SvelteKit 내장, `page.url.pathname: string`).

- [ ] **Step 1: 레이아웃 스크립트 블록 교체**

`src/routes/+layout.svelte`의 1~39번 줄을 아래로 교체한다.

Before:

```svelte
<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import iconDownload from '$lib/assets/icon-download.png';
	import { resolve } from '$app/paths';
	import '../app.css';

	let { children } = $props();

	let scrolled = $state(false);
	let menuOpen = $state(false);
	let activeSection = $state('hero');

	function handleScroll() {
		scrolled = window.scrollY > 10;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') menuOpen = false;
	}

	function closeMenu() {
		menuOpen = false;
	}

	$effect(() => {
		const sections = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				}
			},
			{ threshold: 0.3 }
		);
		sections.forEach((s) => observer.observe(s));
		return () => observer.disconnect();
	});
</script>
```

After:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import iconDownload from '$lib/assets/icon-download.png';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { printTheme } from '$lib/stores/print-theme.svelte.ts';
	import '../app.css';

	let { children } = $props();

	let scrolled = $state(false);
	let menuOpen = $state(false);

	let isPrintPage = $derived(page.url.pathname === '/resume/print');
	let isResumeActive = $derived(page.url.pathname.startsWith('/resume'));
	let isPortfolioActive = $derived(page.url.pathname === '/portfolio');
	let showPdfButton = $derived(page.url.pathname === '/resume');

	function handleScroll() {
		scrolled = window.scrollY > 10;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') menuOpen = false;
	}

	function closeMenu() {
		menuOpen = false;
	}

	onMount(() => {
		printTheme.hydrate();
	});
</script>
```

- [ ] **Step 2: `.nav-inner` 마크업을 라우트 분기 구조로 교체**

기존 55~92번 줄(`<nav class="top-nav" ...>` 내부의 `.nav-inner` 블록, 햄버거 버튼 포함)을 아래로 교체한다.

Before:

```svelte
<nav class="top-nav" class:scrolled>
	<div class="nav-inner">
		<a href={resolve('/resume')} class="wordmark">im-wen3y</a>
		<ul class="nav-links">
			<li><a href={resolve('/resume#hero')} class:active={activeSection === 'hero'}>Home</a></li>
			<li>
				<a href={resolve('/resume#about')} class:active={activeSection === 'about'}>About</a>
			</li>
			<li>
				<a href={resolve('/resume#experience')} class:active={activeSection === 'experience'}
					>Experience</a
				>
			</li>
			<li>
				<a href={resolve('/resume#skills')} class:active={activeSection === 'skills'}>Skills</a>
			</li>
			<li>
				<a href={resolve('/resume#contact')} class:active={activeSection === 'contact'}>Contact</a>
			</li>
			<li>
				<a href={resolve('/resume/print')} target="_blank" class="nav-pdf">
					<img src={iconDownload} alt="PDF 다운로드" class="nav-pdf-icon" />
					PDF
				</a>
			</li>
		</ul>
		<button
			class="hamburger"
			onclick={() => (menuOpen = !menuOpen)}
			aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
			aria-expanded={menuOpen}
		>
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
		</button>
	</div>
</nav>
```

After:

```svelte
<nav class="top-nav" class:scrolled>
	<div class="nav-inner">
		<a href={resolve('/resume')} class="wordmark">im-wen3y</a>
		{#if isPrintPage}
			<button
				type="button"
				class="theme-switch"
				onclick={() => printTheme.toggle()}
				role="switch"
				aria-checked={printTheme.value === 'dark'}
			>
				<span class="theme-switch-track" class:is-dark={printTheme.value === 'dark'}>
					<span class="theme-switch-thumb">
						{#if printTheme.value === 'dark'}
							<svg
								class="theme-switch-icon"
								viewBox="0 0 16 16"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a.5.5 0 0 0-.65-.62A6.5 6.5 0 1 0 14.12 10.15a.5.5 0 0 0-.62-.65Z"
								/>
							</svg>
						{:else}
							<svg
								class="theme-switch-icon"
								viewBox="0 0 16 16"
								fill="currentColor"
								aria-hidden="true"
							>
								<circle cx="8" cy="8" r="3.2" />
								<g stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
									<line x1="8" y1="0.8" x2="8" y2="2.4" />
									<line x1="8" y1="13.6" x2="8" y2="15.2" />
									<line x1="0.8" y1="8" x2="2.4" y2="8" />
									<line x1="13.6" y1="8" x2="15.2" y2="8" />
									<line x1="2.7" y1="2.7" x2="3.8" y2="3.8" />
									<line x1="12.2" y1="12.2" x2="13.3" y2="13.3" />
									<line x1="2.7" y1="13.3" x2="3.8" y2="12.2" />
									<line x1="12.2" y1="3.8" x2="13.3" y2="2.7" />
								</g>
							</svg>
						{/if}
					</span>
				</span>
				<span class="theme-switch-label">{printTheme.value === 'dark' ? 'Dark' : 'Light'}</span>
			</button>
		{:else}
			<ul class="nav-links">
				<li><a href={resolve('/resume')} class:active={isResumeActive}>Resume</a></li>
				<li><a href={resolve('/portfolio')} class:active={isPortfolioActive}>Portfolio</a></li>
				{#if showPdfButton}
					<li>
						<a href={resolve('/resume/print')} target="_blank" class="nav-pdf">
							<img src={iconDownload} alt="PDF 다운로드" class="nav-pdf-icon" />
							PDF
						</a>
					</li>
				{/if}
			</ul>
			<button
				class="hamburger"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
				aria-expanded={menuOpen}
			>
				<span class="bar" class:open={menuOpen}></span>
				<span class="bar" class:open={menuOpen}></span>
				<span class="bar" class:open={menuOpen}></span>
			</button>
		{/if}
	</div>
</nav>
```

- [ ] **Step 3: 드로어를 라우트 분기 + Resume/Portfolio 항목으로 교체**

기존 94~173번 줄(`{#if menuOpen}` 오버레이부터 드로어 PDF 버튼까지)을 아래로 교체한다.

Before:

```svelte
{#if menuOpen}
	<div class="drawer-overlay" onclick={closeMenu} aria-hidden="true"></div>
{/if}

<div class="drawer" class:drawer-open={menuOpen} aria-hidden={!menuOpen}>
	<button class="drawer-close" onclick={closeMenu} aria-label="메뉴 닫기">
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<line
				x1="1"
				y1="1"
				x2="17"
				y2="17"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
			/>
			<line
				x1="17"
				y1="1"
				x2="1"
				y2="17"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
			/>
		</svg>
	</button>
	<ul class="drawer-links">
		<li>
			<a href={resolve('/resume#hero')} onclick={closeMenu} class:active={activeSection === 'hero'}>
				<span class="drawer-en">Home</span>
				<span class="drawer-ko">홈</span>
			</a>
		</li>
		<li>
			<a
				href={resolve('/resume#about')}
				onclick={closeMenu}
				class:active={activeSection === 'about'}
			>
				<span class="drawer-en">About</span>
				<span class="drawer-ko">소개</span>
			</a>
		</li>
		<li>
			<a
				href={resolve('/resume#experience')}
				onclick={closeMenu}
				class:active={activeSection === 'experience'}
			>
				<span class="drawer-en">Experience</span>
				<span class="drawer-ko">경험</span>
			</a>
		</li>
		<li>
			<a
				href={resolve('/resume#skills')}
				onclick={closeMenu}
				class:active={activeSection === 'skills'}
			>
				<span class="drawer-en">Skills</span>
				<span class="drawer-ko">기술</span>
			</a>
		</li>
		<li>
			<a
				href={resolve('/resume#contact')}
				onclick={closeMenu}
				class:active={activeSection === 'contact'}
			>
				<span class="drawer-en">Contact</span>
				<span class="drawer-ko">연락하기</span>
			</a>
		</li>
	</ul>
	<a href={resolve('/resume/print')} target="_blank" onclick={closeMenu} class="drawer-pdf-btn">
		<img src={iconDownload} alt="" class="nav-pdf-icon" />
		이력서 저장
	</a>
</div>
```

After:

```svelte
{#if !isPrintPage}
	{#if menuOpen}
		<div class="drawer-overlay" onclick={closeMenu} aria-hidden="true"></div>
	{/if}

	<div class="drawer" class:drawer-open={menuOpen} aria-hidden={!menuOpen}>
		<button class="drawer-close" onclick={closeMenu} aria-label="메뉴 닫기">
			<svg
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<line
					x1="1"
					y1="1"
					x2="17"
					y2="17"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
				<line
					x1="17"
					y1="1"
					x2="1"
					y2="17"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
		</button>
		<ul class="drawer-links">
			<li>
				<a href={resolve('/resume')} onclick={closeMenu} class:active={isResumeActive}>
					<span class="drawer-en">Resume</span>
					<span class="drawer-ko">이력서</span>
				</a>
			</li>
			<li>
				<a href={resolve('/portfolio')} onclick={closeMenu} class:active={isPortfolioActive}>
					<span class="drawer-en">Portfolio</span>
					<span class="drawer-ko">포트폴리오</span>
				</a>
			</li>
		</ul>
		{#if showPdfButton}
			<a href={resolve('/resume/print')} target="_blank" onclick={closeMenu} class="drawer-pdf-btn">
				<img src={iconDownload} alt="" class="nav-pdf-icon" />
				이력서 저장
			</a>
		{/if}
	</div>
{/if}
```

- [ ] **Step 4: 테마 스위치 CSS를 레이아웃 `<style>`에 추가**

`.hamburger` 규칙 앞(현재 277번 줄 `/* Hamburger */` 주석 앞)에 아래 블록을 추가한다 (Task 2 Step 5에서 print 페이지로부터 삭제한 것과 동일한 내용):

```css
.theme-switch {
	display: flex;
	align-items: center;
	gap: 8px;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	font-family: var(--font-body);
}

.theme-switch-track {
	display: flex;
	align-items: center;
	width: 44px;
	height: 24px;
	padding: 2px;
	border-radius: var(--rounded-pill);
	background-color: color-mix(in srgb, var(--color-accent-amber) 30%, transparent);
	transition: background-color 0.2s ease;
}

.theme-switch-track.is-dark {
	background-color: var(--color-surface-dark);
}

.theme-switch-thumb {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: var(--color-accent-amber);
	color: var(--color-on-primary);
	transform: translateX(0);
	transition:
		transform 0.2s ease,
		background-color 0.2s ease;
}

.theme-switch-track.is-dark .theme-switch-thumb {
	background-color: var(--color-primary);
	transform: translateX(20px);
}

.theme-switch-icon {
	width: 12px;
	height: 12px;
}

.theme-switch-label {
	font-size: 13px;
	font-weight: 500;
	color: var(--color-muted);
	transition: color 0.15s ease;
}

.theme-switch:hover .theme-switch-label {
	color: var(--color-ink);
}
```

- [ ] **Step 5: Resume 페이지에 섹션 서브내비 스크립트 추가**

`src/routes/resume/+page.svelte`의 스크립트 블록(현재 1~4번 줄, import 직후)에 아래를 추가한다.

Before:

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { resolve } from '$app/paths';

	const HERO_LINE_1 = '안녕하세요,';
```

After:

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { resolve } from '$app/paths';

	let activeSection = $state('hero');

	$effect(() => {
		const sections = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				}
			},
			{ threshold: 0.3 }
		);
		sections.forEach((s) => observer.observe(s));
		return () => observer.disconnect();
	});

	const HERO_LINE_1 = '안녕하세요,';
```

- [ ] **Step 6: Resume 페이지에 서브내비 마크업 추가**

`src/routes/resume/+page.svelte`의 `<section id="hero" ...>` (현재 42번 줄) 바로 앞에 아래 블록을 추가한다.

```svelte
<nav class="section-nav" aria-label="이력서 섹션 이동">
	<ul class="section-nav-links">
		<li>
			<a href={resolve('/resume#hero')} class:active={activeSection === 'hero'}>Home</a>
		</li>
		<li>
			<a href={resolve('/resume#about')} class:active={activeSection === 'about'}>About</a>
		</li>
		<li>
			<a href={resolve('/resume#experience')} class:active={activeSection === 'experience'}
				>Experience</a
			>
		</li>
		<li>
			<a href={resolve('/resume#skills')} class:active={activeSection === 'skills'}>Skills</a>
		</li>
		<li>
			<a href={resolve('/resume#contact')} class:active={activeSection === 'contact'}>Contact</a>
		</li>
	</ul>
</nav>
```

- [ ] **Step 7: 서브내비 CSS 추가**

`src/routes/resume/+page.svelte`의 `<style>` 블록 맨 앞(현재 373번 줄 `.reveal {` 앞)에 추가한다.

```css
.section-nav {
	position: sticky;
	top: 64px;
	z-index: 90;
	background-color: var(--color-surface-soft);
	border-bottom: 1px solid var(--color-hairline-soft);
}

.section-nav-links {
	max-width: 1028px;
	margin: 0 auto;
	padding: 0 var(--space-lg);
	display: flex;
	gap: var(--space-xl);
	list-style: none;
}

.section-nav-links a {
	display: inline-block;
	padding: 12px 0;
	font-family: var(--font-body);
	font-size: 14px;
	font-weight: 500;
	color: var(--color-muted);
	transition: color 0.2s ease;
}

.section-nav-links a:hover {
	color: var(--color-ink);
}

.section-nav-links a.active {
	color: var(--color-primary);
}

@media (max-width: 768px) {
	.section-nav {
		display: none;
	}
}
```

- [ ] **Step 8: 타입/린트 확인**

Run: `pnpm check && pnpm lint`
Expected: 에러 0건. `activeSection`/`isPrintPage` 등 미사용 변수 경고가 나오면 해당 파일에서 실제로 참조되고 있는지 다시 확인한다.

- [ ] **Step 9: 커밋**

```bash
git add src/routes/+layout.svelte src/routes/resume/+page.svelte
git commit -m "feat(nav): GNB를 Resume/Portfolio 라우트 분기 구조로 변경하고 섹션 서브내비를 Resume 페이지로 이전"
```

---

### Task 4: 전체 검증

**Files:** 없음 (검증 전용 태스크)

- [ ] **Step 1: 전체 타입/린트/테스트 실행**

Run: `pnpm check && pnpm lint && pnpm test`
Expected: 모두 에러 0건 / 전체 테스트 통과

- [ ] **Step 2: 개발 서버로 수동 확인**

Run: `pnpm dev`

아래 항목을 브라우저에서 직접 확인한다:

- `/resume` → GNB에 `Resume`(active) / `Portfolio` / `PDF` 버튼이 보이는지
- `/resume` 화면에서 스크롤 시 GNB 바로 아래 서브내비(Home/About/Experience/Skills/Contact)가 sticky로 붙고, 섹션 진입에 따라 active 상태가 바뀌는지
- `/portfolio` → GNB에 `Resume` / `Portfolio`(active)만 보이고 PDF 버튼은 없는지
- `/resume/print` → GNB에 메뉴가 전혀 없고 워드마크 옆에 light/dark 토글만 보이는지, 토글 클릭 시 미리보기 배경이 즉시 바뀌는지
- `/resume/print`에서 다크로 전환 후 인쇄(Cmd+P) 시 다크 배경 안내 토스트가 뜨는지 (기존 기능 회귀 없음)
- `/resume/print`의 `.controls` 바(← 이력서로 / PDF로 저장)에 GNB와 같은 블러 처리된 반투명 배경이 보이는지, 스크롤해도 겹치는 콘텐츠가 블러 처리되는지
- 모바일 뷰포트(예: 375px)에서 `/resume/print`는 햄버거 버튼이 아예 안 보이고, `/resume`·`/portfolio`는 햄버거로 드로어가 열리며 드로어 안에 `Resume`/`Portfolio` 항목과(＝`/resume`에서만) PDF 퀵링크가 보이는지

- [ ] **Step 3: 문제 발견 시 수정 후 재검증**

Step 1~2에서 이슈가 발견되면 해당 태스크로 돌아가 수정하고, Step 1부터 다시 실행한다.
