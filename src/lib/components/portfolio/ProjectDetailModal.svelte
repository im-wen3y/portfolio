<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project, onclose }: { project: Project; onclose: () => void } = $props();
</script>

<div class="detail-overlay">
	<button class="detail-backdrop" onclick={onclose} aria-label="상세 정보 닫기"></button>
	<div class="detail-modal">
		<div class="detail-header">
			<div class="detail-period">{project.company} · {project.period}</div>
			<h2 class="detail-title">{project.title}</h2>
			<div class="detail-tags">
				{#each project.tags as tag (tag)}
					<span class="tag-chip" class:tag-pick={tag === '나의 선택'}>{tag}</span>
				{/each}
			</div>
			<p class="detail-summary">{project.summary}</p>
			<button class="btn-close" onclick={onclose} aria-label="닫기">✕</button>
		</div>
		<div class="detail-body">
			<div class="detail-stack">
				<span class="detail-stack-label">STACK</span>
				<div class="detail-stack-list">
					{#each project.stack as tech (tech)}
						<span class="stack-chip">{tech}</span>
					{/each}
				</div>
			</div>
			<ul class="detail-list">
				{#each project.bullets as bullet, i (i)}
					<li class="detail-list-item"><span class="detail-arrow">›</span>{bullet}</li>
				{/each}
			</ul>
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
		max-width: 560px;
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

	.detail-title {
		margin: 0 0 12px;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 20px;
		font-weight: 700;
		line-height: 1.35;
		color: #eafdf6;
	}

	.detail-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 14px;
	}

	.tag-chip {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		color: rgba(233, 255, 248, 0.5);
		padding: 2px 8px;
		border: 1px solid rgba(233, 255, 248, 0.14);
		border-radius: 999px;
	}

	.tag-pick {
		color: #171717;
		background: var(--ac, #21f1a8);
		border-color: var(--ac, #21f1a8);
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
		gap: 20px;
	}

	.detail-stack {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.detail-stack-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.08em;
		color: rgba(233, 255, 248, 0.5);
		padding-top: 4px;
		flex-shrink: 0;
	}

	.detail-stack-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.stack-chip {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		color: rgba(233, 255, 248, 0.7);
		background: rgba(233, 255, 248, 0.06);
		border: 1px solid rgba(233, 255, 248, 0.12);
		border-radius: 999px;
		padding: 3px 9px;
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
