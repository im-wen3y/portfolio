# 이력서 프린트 페이지 다크 테마 지원

## 배경

`/resume/print`는 A4 이력서를 라이트(흰 종이) 테마로만 보여준다. 사이트 자체는 이미 다크 테마(`app.css`의 네온 팔레트)이므로, 사용자가 사이트와 동일한 다크 테마로도 이력서를 미리보고 PDF로 저장할 수 있게 한다.

## 범위

- 대상 파일: `src/routes/resume/print/+page.svelte`
- 같은 페이지에 Light/Dark 토글 버튼 추가 (별도 라우트 없음)
- 화면 미리보기와 `window.print()` 인쇄 모두 현재 선택된 테마를 반영

## 상태 관리

- `let theme = $state<'light' | 'dark'>('light')`
- `onMount`에서 `localStorage.getItem('resume-print-theme')` 값으로 초기화 (없으면 `'light'`)
- 토글 클릭 시 `theme` 갱신 + `localStorage.setItem('resume-print-theme', theme)`
- `<article class="page" class:dark={theme === 'dark'}>` 로 클래스 적용

## 토글 UI

- 기존 `.controls` 바 내 "← 이력서로"와 "PDF로 저장" 버튼 사이에 Light/Dark 전환 버튼 추가
- 인쇄 시 숨김 처리(`@media print`에서 `.controls { display: none }` 기존 규칙 유지)

## 컬러 매핑

다크 팔레트는 새로 만들지 않고 `app.css`에 이미 정의된 사이트 다크 변수를 재사용한다. `.page.dark` 블록 하나에 아래 오버라이드를 추가하고, 기존 라이트 스타일(고정 hex)은 그대로 둔다.

| 용도                             | 라이트(기존 고정값)   | 다크(재사용 변수)           |
| -------------------------------- | --------------------- | --------------------------- |
| 페이지 배경                      | `#ffffff`             | `var(--color-canvas)`       |
| 본문/제목 텍스트                 | `#141413`             | `var(--color-ink)`          |
| 보조 텍스트(날짜, 연락처 등)     | `#6c6a64` / `#3d3d3a` | `var(--color-muted)`        |
| 강조색(섹션 라벨, hover)         | `#cc785c`             | `var(--color-primary)`      |
| 구분선                           | `#e6dfd8`             | `var(--color-hairline)`     |
| 배지 배경 (스킬 배지, 역할 배지) | `#f5f0e8`             | `var(--color-surface-card)` |

## 인쇄 시 배경색 유지

- `.page`에 `print-color-adjust: exact; -webkit-print-color-adjust: exact;` 추가 — 다크 배경/배지색이 인쇄 미리보기·PDF 저장 시 날아가지 않도록 강제.

## 안내 토스트

- "PDF로 저장" 버튼 클릭 시, 현재 테마가 dark이면 화면 중앙 상단에 네이티브 토스트 스타일의 안내 문구를 띄운다: "다크 배경이 보이려면 인쇄 설정에서 '배경 그래픽'을 켜주세요."
- 3초 후 자동으로 사라짐 (fade out).
- 라이트 테마일 때는 토스트 없이 바로 `window.print()` 호출.
- 구현: `let toastVisible = $state(false)`, `setTimeout`으로 3초 뒤 `toastVisible = false`. 토스트와 `window.print()` 호출은 동시에 트리거 (별도 지연 없음).
- 스타일: 화면 상단 중앙에 고정(`position: fixed; top: ...; left: 50%; transform: translateX(-50%)`), 어두운 반투명 배경 + 흰 텍스트의 pill 형태 (OS 네이티브 토스트 느낌), `@media print`에서 숨김.

## 테스트

- 이 변경은 브라우저 인쇄 API(`window.print`)와 `localStorage`, 시각적 스타일에 의존하므로 자동화된 유닛 테스트 대상은 아님. 수동으로 토글 동작·다크 스타일 적용·토스트 표시/자동 소멸을 확인한다.
