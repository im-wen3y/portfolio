<script lang="ts">
	import { fly } from 'svelte/transition';
	import { dialogue, ACCENT, SECONDARY } from '$lib/portfolio/content';

	let open = $state(false);
</script>

<div class="chat-fab-wrap">
	{#if open}
		<div class="chat-panel" transition:fly={{ y: 16, duration: 200 }}>
			<div class="chat-panel-header">
				<span class="chat-panel-title">송누리와의 대화</span>
				<button class="chat-panel-close" onclick={() => (open = false)} aria-label="채팅 닫기"
					>✕</button
				>
			</div>
			<div class="chat-body">
				{#each dialogue as line, i (i)}
					<div class="chat-bubble" style="animation-delay: {i * 120}ms">
						<span
							class="chat-bubble-name"
							style="background: {line.name === 'SYSTEM' ? SECONDARY : ACCENT}">{line.name}</span
						>
						<p class="chat-bubble-text">{line.text}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<button
		class="chat-fab"
		onclick={() => (open = !open)}
		aria-label={open ? '채팅 닫기' : '송누리와 대화하기'}
		aria-expanded={open}
	>
		{#if open}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="6" y1="6" x2="18" y2="18" />
				<line x1="18" y1="6" x2="6" y2="18" />
			</svg>
		{:else}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path
					d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H9l-4 4v-4H5.5C4.67 16 4 15.33 4 14.5v-9Z"
				/>
			</svg>
		{/if}
	</button>
</div>

<style>
	.chat-fab-wrap {
		position: fixed;
		right: 20px;
		bottom: 24px;
		z-index: 70;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 12px;
	}

	.chat-fab {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--ac, #21f1a8);
		border: none;
		color: #0b1512;
		cursor: pointer;
		box-shadow: 0 8px 24px rgba(33, 241, 168, 0.4);
		transition:
			transform 0.15s,
			box-shadow 0.15s;
	}

	.chat-fab:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 28px rgba(33, 241, 168, 0.5);
	}

	.chat-fab svg {
		width: 22px;
		height: 22px;
	}

	.chat-panel {
		width: min(320px, calc(100vw - 40px));
		max-height: min(420px, calc(100vh - 140px));
		display: flex;
		flex-direction: column;
		background: linear-gradient(
			155deg,
			rgba(255, 255, 255, 0.12) 0%,
			rgba(255, 255, 255, 0.03) 40%,
			rgba(20, 24, 23, 0.55) 100%
		);
		backdrop-filter: blur(28px) saturate(180%);
		-webkit-backdrop-filter: blur(28px) saturate(180%);
		border: 1px solid rgba(255, 255, 248, 0.22);
		border-radius: 20px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.28),
			0 20px 60px rgba(0, 0, 0, 0.4);
		overflow: hidden;
	}

	.chat-panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px;
		border-bottom: 1px solid rgba(233, 255, 248, 0.12);
	}

	.chat-panel-title {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12px;
		letter-spacing: 0.06em;
		color: #eafdf6;
	}

	.chat-panel-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 1px solid rgba(233, 255, 248, 0.2);
		background: none;
		color: rgba(233, 255, 248, 0.6);
		cursor: pointer;
		font-size: 11px;
	}

	.chat-panel-close:hover {
		color: #eafdf6;
		border-color: rgba(233, 255, 248, 0.5);
	}

	.chat-body {
		padding: 16px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.chat-bubble {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
		opacity: 0;
		animation: chat-bubble-in 0.4s ease forwards;
	}

	@keyframes chat-bubble-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.chat-bubble-name {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: #0b1512;
		padding: 2px 8px;
		border-radius: 999px;
	}

	.chat-bubble-text {
		margin: 0;
		max-width: 90%;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 13.5px;
		line-height: 1.6;
		color: #eafdf6;
		background: rgba(233, 255, 248, 0.08);
		border: 1px solid rgba(233, 255, 248, 0.14);
		border-radius: 14px;
		padding: 10px 12px;
	}

	@media (prefers-reduced-motion: reduce) {
		.chat-bubble {
			opacity: 1;
			animation: none;
		}
	}
</style>
