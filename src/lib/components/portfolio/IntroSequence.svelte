<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { bootLines } from '$lib/portfolio/content';

	let { onDone }: { onDone: () => void } = $props();

	// 로딩 오버레이: 3초간 떠 있다가 페이드아웃되며 자동으로 사라짐 (버튼 없음)
	const TOTAL = 3000; // 총 노출 시간(ms)
	const FILL = 2400; // 진행률이 100%까지 차는 시간(ms)
	const FADE = 350; // 페이드아웃 시간(ms)

	let progress = $state(0);
	let leaving = $state(false);

	let progressTimer: ReturnType<typeof setInterval> | undefined;
	let doneTimer: ReturnType<typeof setTimeout> | undefined;
	let fadeTimer: ReturnType<typeof setTimeout> | undefined;

	const loaded = $derived(progress >= 100);
	const bootLine = $derived(
		loaded
			? '> render complete ✓'
			: bootLines[Math.min(bootLines.length - 1, Math.floor(progress / (100 / bootLines.length)))]
	);

	onMount(() => {
		const start = performance.now();
		progressTimer = setInterval(() => {
			const p = Math.min(100, ((performance.now() - start) / FILL) * 100);
			progress = p;
			if (p >= 100) clearInterval(progressTimer);
		}, 40);

		doneTimer = setTimeout(() => {
			leaving = true;
			fadeTimer = setTimeout(onDone, FADE);
		}, TOTAL);
	});

	onDestroy(() => {
		clearInterval(progressTimer);
		clearTimeout(doneTimer);
		clearTimeout(fadeTimer);
	});
</script>

<div class="intro-overlay" class:leaving aria-busy={!loaded} aria-live="polite">
	<div class="intro-loading">
		<div class="intro-boot-label">SYSTEM BOOT</div>
		<div class="intro-progress-row">
			{#if loaded}
				<span class="intro-status intro-status-ready">READY</span>
			{:else}
				<span class="intro-status">LOADING<span class="intro-blink">...</span></span>
			{/if}
			<span class="intro-percent">{Math.floor(progress)}%</span>
		</div>
		<div class="intro-track">
			<div class="intro-fill" style="width: {progress}%"></div>
		</div>
		<div class="intro-boot-line">{bootLine}</div>
	</div>
</div>

<style>
	.intro-overlay {
		position: fixed;
		inset: 0;
		z-index: 500;
		background: #171717;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		padding: 24px;
		transition: opacity 0.35s ease;
	}

	.intro-overlay.leaving {
		opacity: 0;
		pointer-events: none;
	}

	.intro-loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		width: 100%;
		max-width: 360px;
	}

	.intro-boot-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12px;
		letter-spacing: 0.14em;
		color: var(--ac, #21f1a8);
	}

	.intro-progress-row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12px;
		color: rgba(233, 255, 248, 0.7);
	}

	.intro-status-ready {
		color: var(--ac, #21f1a8);
	}

	.intro-blink {
		animation: intro-blink 1s steps(1) infinite;
	}

	@keyframes intro-blink {
		50% {
			opacity: 0;
		}
	}

	.intro-track {
		width: 100%;
		height: 4px;
		background: rgba(233, 255, 248, 0.12);
	}

	.intro-fill {
		height: 100%;
		background: var(--ac, #21f1a8);
		box-shadow: 0 0 8px var(--ac, #21f1a8);
		transition: width 0.1s linear;
	}

	.intro-boot-line {
		width: 100%;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		color: rgba(233, 255, 248, 0.45);
	}

	@media (prefers-reduced-motion: reduce) {
		.intro-blink {
			animation: none;
		}
	}
</style>
