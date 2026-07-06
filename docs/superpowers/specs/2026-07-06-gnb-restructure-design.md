# GNB 구조 개편 — Resume/Portfolio 라우트 인식 내비게이션

## 배경

현재 `+layout.svelte`의 GNB(top-nav)는 `/resume` 페이지의 섹션 앵커(Home/About/Experience/Skills/Contact)를 스크롤스파이로 보여주는 구조다. 하지만 사이트에는 이제 `/portfolio`라는 별도 페이지가 있고, `/resume/print`(PDF 다운로드용) 페이지도 있어 라우트별로 GNB 요구사항이 다르다.

- **Resume/Portfolio 페이지**: 두 페이지를 오가는 GNB (`Resume` / `Portfolio`)가 필요하고, 기존 섹션 앵커는 Resume 페이지 내부 서브내비게이션으로 남아야 한다.
- **PDF 다운로드(print) 페이지**: 메뉴 없이 light/dark 토글만 GNB에 있어야 하고, 토글은 지금 print 페이지 자체 `.controls` 바에 있는 걸 GNB로 옮긴다. 남은 `.controls` 바(뒤로가기/저장 버튼)는 GNB와 동일한 backdrop-filter 처리를 적용한다.

## 범위

- `src/routes/+layout.svelte` — GNB/드로어 라우트 분기, 섹션 앵커 로직 제거, 테마 토글 UI 추가
- `src/routes/resume/+page.svelte` — 섹션 앵커 서브내비게이션 신설 (레이아웃에서 이전)
- `src/routes/resume/print/+page.svelte` — 로컬 테마 상태를 공유 스토어로 교체, `.controls` 바 축소 및 backdrop-filter 적용
- 신규: `src/lib/stores/print-theme.svelte.ts` — 레이아웃과 print 페이지가 공유하는 테마 상태

`src/routes/portfolio/+page.svelte`의 내부 콘텐츠는 변경하지 않는다.

## GNB 라우트별 동작

`$app/state`의 `page.url.pathname`으로 판단한다.

| 라우트 | nav-links | PDF 버튼 | 테마 토글 | 햄버거/드로어 |
|---|---|---|---|---|
| `/resume` | Resume(active) / Portfolio | 노출 | 없음 | 노출 (Resume/Portfolio + PDF 퀵링크) |
| `/portfolio` | Resume / Portfolio(active) | 없음 | 없음 | 노출 (Resume/Portfolio, PDF 없음) |
| `/resume/print` | 없음 (전부 숨김) | 없음 | 노출 | 숨김 (열 게 없으므로 버튼 자체 미표시) |

- Portfolio 활성 판정: `page.url.pathname === '/portfolio'`
- Resume 활성 판정: `page.url.pathname.startsWith('/resume')` (print 하위 포함되지만 print에서는 nav-links 자체가 안 보이므로 무해)
- print 판정: `page.url.pathname === '/resume/print'`

기존 `activeSection` state와 `IntersectionObserver` 스크롤스파이 `$effect`는 레이아웃에서 완전히 제거한다.

## 공유 테마 스토어

```ts
// src/lib/stores/print-theme.svelte.ts
const THEME_STORAGE_KEY = 'resume-print-theme';

class PrintTheme {
	value = $state<'light' | 'dark'>('light');

	hydrate() {
		const saved = localStorage.getItem(THEME_STORAGE_KEY);
		if (saved === 'light' || saved === 'dark') this.value = saved;
	}

	toggle() {
		this.value = this.value === 'light' ? 'dark' : 'light';
		localStorage.setItem(THEME_STORAGE_KEY, this.value);
	}
}

export const printTheme = new PrintTheme();
```

- `+layout.svelte`의 최상위 `$effect`(또는 `onMount`)에서 `printTheme.hydrate()`를 1회 호출한다. SSR 시 기본값은 `'light'`이므로 하이드레이션 이전 깜빡임은 현재 print 페이지 동작과 동일한 수준으로 유지된다(기존에도 `onMount`에서 복원).
- GNB의 토글 버튼은 `printTheme.value`를 읽고 클릭 시 `printTheme.toggle()`을 호출한다. 마크업/스타일은 기존 `resume/print/+page.svelte`의 `.theme-switch` 그대로 재사용한다 (트랙+thumb+아이콘+라벨).
- `resume/print/+page.svelte`는 로컬 `theme` state와 `toggleTheme()`, `onMount` 복원 로직을 제거하고 `printTheme.value`를 직접 참조한다 (`.page` 클래스 바인딩, `handlePrint()`의 다크 토스트 조건 등).

## Resume 페이지 서브내비게이션

`resume/+page.svelte` 최상단에 섹션 앵커 바를 신설한다.

- `activeSection` state + 기존 레이아웃에 있던 `IntersectionObserver` `$effect`를 그대로 이 파일로 이전한다.
- 마크업: Home/About/Experience/Skills/Contact 앵커 목록 (기존 레이아웃의 `.nav-links` 마크업과 동일한 항목·href, `#hero` 등 앵커는 그대로).
- 배치: `position: sticky; top: 64px;` (메인 GNB 높이 64px 바로 아래에 고정), z-index는 top-nav(100)보다 낮게.
- 스타일은 기존 `.nav-links a` 스타일(색상/active 상태)을 재사용하되, 배경은 `--color-surface-soft` 기반의 옅은 바 형태로 구성한다.
- 모바일 규격(`max-width: 768px`)에서는 `display: none`으로 숨긴다 — 기존 레이아웃의 `.nav-links` 모바일 처리와 동일한 방식이다. 드로어에는 섹션 링크를 넣지 않으므로(드로어는 Resume/Portfolio 전용), 모바일에서 섹션 이동은 페이지 스크롤로만 가능하다.

## Print 페이지 `.controls` 바

- `.theme-switch` 관련 마크업·스타일을 이 파일에서 삭제 (GNB로 이전 완료).
- 남는 요소: `← 이력서로` back-link, `PDF로 저장` save-btn. `justify-content: space-between`으로 좌우 배치 유지.
- 배경을 `--color-surface-soft` 기반 반투명 처리로 변경: `background-color: color-mix(in srgb, var(--color-surface-soft) 72%, transparent); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);` (GNB의 `rgba(23,23,23,0.72)` 대신 사이트 테마 변수를 사용해 톤을 맞추되, 값 자체는 GNB와 동일한 불투명도(72%)·블러(12px)를 사용해 시각적으로 "동일 처리"임을 보장).
- `@media print`에서 `.controls { display: none; }`은 기존 그대로 유지.

## 에러 처리 / 엣지 케이스

- `localStorage` 접근은 `hydrate()`/`toggle()` 모두 브라우저 컨텍스트에서만 호출되므로(레이아웃 `onMount`, 클릭 핸들러) SSR 가드가 별도로 필요 없다 (기존 print 페이지 패턴과 동일).
- print 페이지가 아닌 곳에서는 GNB에 토글이 렌더링되지 않으므로 `printTheme`을 건드릴 UI가 없다 — 상태는 유지되지만 영향 없음.
- 라우트 전환 시 레이아웃은 리마운트되지 않으므로 `hydrate()`는 앱 로드당 1회만 실행되면 충분하다.

## 테스트

- 자동화 테스트 대상 아님 (현재 프로젝트에 컴포넌트 테스트 인프라 없음, RRD.md 회고에서도 확인됨). `pnpm check`, `pnpm lint`로 타입/린트 검증.
- 수동 확인 항목:
  - `/resume` → `/portfolio` → `/resume/print` 이동하며 GNB 구성이 표 대로 바뀌는지
  - Resume 페이지 서브내비 스크롤스파이가 정상 동작하는지 (섹션 진입 시 active 표시)
  - print 페이지에서 GNB 토글로 light/dark 전환 시 미리보기 영역과 인쇄 시 다크 토스트가 정상 동작하는지 (기존 기능 회귀 없음)
  - 모바일 뷰포트에서 print 페이지는 햄버거가 아예 안 보이는지, Resume/Portfolio 페이지 드로어는 정상 동작하는지
