<script lang="ts">
	import type { Exp } from '$lib/portfolio/content';

	let { exp, onclose }: { exp: Exp; onclose: () => void } = $props();
</script>

<div class="detail-overlay">
	<button class="detail-backdrop" onclick={onclose} aria-label="상세 정보 닫기"></button>
	<div class="detail-modal">
		<div class="detail-header">
			<div class="detail-period">{exp.period} · {exp.dur}</div>
			<h2 class="detail-company">{exp.company}</h2>
			<div class="detail-role">{exp.role}</div>
			<p class="detail-summary">{exp.summary}</p>
			<button class="btn-close" onclick={onclose} aria-label="닫기">✕</button>
		</div>
		<div class="detail-body">
			{#each exp.groups as group (group.title)}
				<div class="detail-group">
					<div class="detail-group-header">
						<span class="detail-dot"></span>
						<h3 class="detail-group-title">{group.title}</h3>
					</div>
					<ul class="detail-list">
						{#each group.items as item, i (i)}
							<li class="detail-list-item"><span class="detail-arrow">›</span>{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.detail-overlay {
		position: fixed;
		inset: 0;
		z-index: 400;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
	}

	.detail-backdrop {
		position: absolute;
		inset: 0;
		background: rgba(6, 8, 7, 0.6);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border: none;
		cursor: pointer;
	}

	.detail-modal {
		position: relative;
		width: 100%;
		max-width: 620px;
		max-height: 84vh;
		overflow-y: auto;
		background: linear-gradient(
			155deg,
			rgba(255, 255, 255, 0.12) 0%,
			rgba(255, 255, 255, 0.03) 40%,
			rgba(15, 19, 18, 0.55) 100%
		);
		backdrop-filter: blur(32px) saturate(180%);
		-webkit-backdrop-filter: blur(32px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.22);
		border-radius: 24px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.28),
			0 0 40px rgba(33, 241, 168, 0.25);
	}

	.detail-header {
		position: relative;
		padding: 28px 28px 20px;
		background: linear-gradient(rgba(33, 241, 168, 0.06), transparent);
		border-bottom: 1px solid rgba(233, 255, 248, 0.12);
	}

	.detail-period {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12px;
		color: var(--ac, #21f1a8);
		margin-bottom: 6px;
	}

	.detail-company {
		margin: 0 0 4px;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 22px;
		font-weight: 700;
		color: #eafdf6;
	}

	.detail-role {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12px;
		color: rgba(233, 255, 248, 0.6);
		margin-bottom: 14px;
	}

	.detail-summary {
		margin: 0;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 13.5px;
		line-height: 1.6;
		color: rgba(233, 255, 248, 0.75);
	}

	.btn-close {
		position: absolute;
		top: 20px;
		right: 20px;
		background: transparent;
		border: 1px solid rgba(233, 255, 248, 0.25);
		border-radius: 50%;
		color: rgba(233, 255, 248, 0.7);
		width: 28px;
		height: 28px;
		cursor: pointer;
		font-size: 12px;
	}

	.btn-close:hover {
		color: #eafdf6;
		border-color: #eafdf6;
	}

	.detail-body {
		padding: 24px 28px 28px;
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.detail-group-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 10px;
	}

	.detail-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--ac, #21f1a8);
		box-shadow: 0 0 8px var(--ac, #21f1a8);
		flex-shrink: 0;
	}

	.detail-group-title {
		margin: 0;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12.5px;
		font-weight: 600;
		letter-spacing: 0.03em;
		color: #eafdf6;
	}

	.detail-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.detail-list-item {
		display: flex;
		gap: 8px;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 13px;
		line-height: 1.6;
		color: rgba(233, 255, 248, 0.75);
	}

	.detail-arrow {
		color: var(--ac, #21f1a8);
		flex-shrink: 0;
	}
</style>
