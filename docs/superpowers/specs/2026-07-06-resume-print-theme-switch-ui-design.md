# 이력서 프린트 페이지 테마 토글 UI 개선 (스위치 스타일)

## 배경

`/resume/print`의 Light/Dark 토글이 현재는 테두리 버튼(`.theme-toggle-btn`) + 이모지 텍스트("🌙 Dark로 보기") 형태다. 사용자가 참고 이미지로 제시한 iOS 스타일 스위치(트랙 + 슬라이딩 원 + 해/달 아이콘 + 옆에 텍스트 라벨) 형태로 교체한다.

## 범위

- 대상 파일: `src/routes/resume/print/+page.svelte`
- `.theme-toggle-btn` 버튼 마크업/스타일을 스위치 마크업/스타일로 교체
- `theme` 상태, `toggleTheme()` 로직은 기존 그대로 재사용 (변경 없음)

## 마크업

```svelte
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
					<path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a.5.5 0 0 0-.65-.62A6.5 6.5 0 1 0 14.12 10.15a.5.5 0 0 0-.62-.65Z" />
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
```

`role="switch"` + `aria-checked`는 네이티브 `<button>` 위에 얹으므로 키보드(Enter/Space) 동작은 그대로 유지된다. `aria-pressed`(기존 Task 1의 속성)는 스위치 시맨틱에서는 `aria-checked`로 대체한다.

## 색상 & 스타일 (사이트 기존 팔레트 재사용, 새 색상 없음)

| 요소 | Light 상태 | Dark 상태 |
|---|---|---|
| 트랙 배경 | `--color-accent-amber` 옅은 틴트 (`color-mix(in srgb, var(--color-accent-amber) 30%, transparent)`) | `--color-surface-dark` |
| Thumb 배경 | `--color-accent-amber` 솔리드 | `--color-primary` |
| 아이콘 색 | thumb 위에서 잘 보이는 어두운 톤 (`--color-on-primary`) | `--color-on-primary` |
| 라벨 텍스트 | `--color-muted` (평상시) / `--color-ink` (hover) | 동일 |

- 트랙: `width: 44px; height: 24px; border-radius: 999px; padding: 2px;`
- Thumb: `width: 20px; height: 20px; border-radius: 50%;` — `is-dark` 클래스일 때 `transform: translateX(20px)`, 아닐 때 `translateX(0)`. `transition: transform 0.2s ease, background-color 0.2s ease;`
- 아이콘: 12px 인라인 SVG, thumb 안에 중앙 정렬
- 라벨: 스위치 오른쪽에 8px 간격, `theme === 'dark' ? 'Dark' : 'Light'` 텍스트

## 제거되는 것

- 기존 `.theme-toggle-btn` 스타일 규칙과 이모지 텍스트("🌙 Dark로 보기" / "☀️ Light로 보기") 완전히 대체 (제거)

## 테스트

- CSS/시각 변경이므로 자동화 테스트 대상 아님. `pnpm check`로 타입/템플릿 오류만 검증하고, 나머지는 수동 브라우저 확인(스위치 클릭 시 thumb 이동, 트랙/아이콘 색 전환, 라벨 텍스트 변경, 키보드 Tab+Enter로 토글 가능 여부)으로 확인한다.
