<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { bootLines } from '$lib/portfolio/content';

	let { onDone }: { onDone: () => void } = $props();

	let progress = $state(0);
	let loaded = $state(false);

	let progressTimer: ReturnType<typeof setInterval> | undefined;

	const bootLine = $derived(
		loaded
			? '> render complete ✓'
			: bootLines[Math.min(bootLines.length - 1, Math.floor(progress / (100 / bootLines.length)))]
	);

	function startProgress() {
		clearInterval(progressTimer);
		progressTimer = setInterval(() => {
			if (loaded) return;
			const next = Math.min(100, progress + 6 + Math.random() * 6);
			progress = next;
			if (next >= 100) {
				clearInterval(progressTimer);
				loaded = true;
			}
		}, 90);
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.code === 'Space' || e.code === 'Enter') && loaded) {
			e.preventDefault();
			onDone();
		}
	}

	onMount(() => {
		startProgress();
	});

	onDestroy(() => {
		clearInterval(progressTimer);
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="intro-overlay">
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
		{#if loaded}
			<button class="intro-btn-start" onclick={onDone}>▶ START</button>
		{:else}
			<button class="intro-btn-start" disabled>▶ START</button>
		{/if}
	</div>

	<button class="intro-btn-skip" onclick={onDone}>SKIP ▶▶</button>
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

	.intro-btn-start {
		margin-top: 6px;
		padding: 10px 28px;
		background: transparent;
		border: 1px solid var(--ac, #21f1a8);
		color: var(--ac, #21f1a8);
		font-family: 'IBM Plex Mono', monospace;
		font-size: 13px;
		letter-spacing: 0.08em;
		cursor: pointer;
		transition: background-color 0.15s;
	}

	.intro-btn-start:not(:disabled):hover {
		background: rgba(33, 241, 168, 0.12);
	}

	.intro-btn-start:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.intro-btn-skip {
		position: absolute;
		top: 20px;
		right: 20px;
		background: transparent;
		border: 1px solid rgba(233, 255, 248, 0.2);
		color: rgba(233, 255, 248, 0.6);
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		padding: 6px 12px;
		cursor: pointer;
		transition:
			color 0.15s,
			border-color 0.15s;
	}

	.intro-btn-skip:hover {
		color: #eafdf6;
		border-color: rgba(233, 255, 248, 0.5);
	}
</style>
