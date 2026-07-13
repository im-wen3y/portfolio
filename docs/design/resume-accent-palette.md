# 이력서 액센트 팔레트

`/print` 문서의 액센트 색 시안. 섹션 라벨·강점 태그·연락처 링크 hover 등 **강조 요소에만** 얇게 쓰는 색이라, 배경/본문은 흑백 그대로 두고 성격만 얹는 용도다.

각 색은 라이트/다크 배경용 **두 값**을 쌍으로 가진다 (다크는 배경 대비를 위해 밝게).

| 이름            | value        | 라이트    | 다크      | 성격                                                                |
| --------------- | ------------ | --------- | --------- | ------------------------------------------------------------------- |
| 테라코타 (기본) | `terracotta` | `#cc785c` | `#e0a88f` | AI 기본값 계열. 무난하지만 개성은 약함                              |
| 딥 틸           | `teal`       | `#0f766e` | `#2dd4bf` | 차분·기술적·신뢰                                                    |
| 토스 블루       | `toss`       | `#0064FF` | `#83B4F9` | 핀테크·신뢰감 있는 원색 블루. 토스 공식 브랜드 컬러(Pantone 2175 C) |
| 배민 민트       | `baemin`     | `#2AC1BC` | `#0CEFD3` | 우아한형제들 공식 민트(기존/2.0)                                    |
| 오베르진        | `aubergine`  | `#6e2a5b` | `#c77db0` | 에디토리얼·서적 느낌(문헌정보학 배경과 연결). 기억에 남는 리스크    |
| 포레스트        | `forest`     | `#2f6b4f` | `#6bbf92` | 성숙·자연. 흔한 acid green 기본값 회피                              |

다크 값 `#83B4F9`는 `#0064FF`를 흰색과 50% 섞은 값(`#80B2FF`)과 거의 일치해 그대로 유지한다.

## 인쇄용 종이 중립색 (참고)

액센트를 얹는 바탕. 이력서는 사이트 다크 테마와 별개로 흰 종이/검정 잉크 기준이다.

| 역할             | 라이트                | 다크                              |
| ---------------- | --------------------- | --------------------------------- |
| 종이 배경        | `#ffffff`             | `var(--color-canvas)` (`#171717`) |
| 잉크(제목)       | `#141413`             | `var(--color-ink)`                |
| 본문             | `#3d3d3a`             | `var(--color-body)`               |
| muted(날짜·부가) | `#6c6a64`             | `var(--color-muted)`              |
| hairline(구분선) | `rgba(20,20,19,0.08)` | `var(--color-hairline-soft)`      |

## 어떻게 연결돼 있나

- **스토어** `src/lib/stores/accent-theme.svelte.ts` — 선택값을 localStorage(`resume-print-accent`)에 저장. 옵션 목록은 `ACCENT_OPTIONS`로 export.
- **적용** `src/lib/components/print/PrintShell.svelte` — `<article class="page" data-accent={accentTheme.value}>`, CSS에서 `.page[data-accent='...']`(라이트)와 `.page.dark[data-accent='...']`(다크)가 `--pr-accent`를 정의. 모든 강조 요소는 `var(--pr-accent)`만 참조.
- **선택 UI** `/print` 문서 컨트롤 바의 색상 팔레트 라디오 그룹.

### 색 추가하는 법

1. `ACCENTS` 배열 + `ACCENT_OPTIONS`에 항목 추가 (`value`, `label`, `dot`).
2. `+page.svelte` CSS에 `.page[data-accent='새값']`(라이트)과 `.page.dark[data-accent='새값']`(다크) 두 줄 추가.

### 단일 값으로 고정해서 쓰고 싶을 때 (예: JD 맞춤 이력서)

지원 회사별 문서도 `/print/[company]`에서 같은 팔레트를 공유한다. 회사별 기본색을 추가하려면 프로필 설정과 `accentTheme`의 초기값을 함께 검토한다.

```css
.page {
	--pr-accent: #1c95a2;
}
.page.dark {
	--pr-accent: #26c7d9;
}
```
