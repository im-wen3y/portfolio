<script lang="ts">
	import type { Exp } from '$lib/portfolio/content';

	let { exp, onOpen }: { exp: Exp; onOpen: () => void } = $props();
</script>

<button class="quest-card" onclick={onOpen}>
	<div class="quest-top">
		<span class="quest-badge">{exp.flagship.badge}</span>
		<span class="quest-period">{exp.period} · {exp.dur}</span>
	</div>
	<div class="quest-company-row">
		<span class="quest-company">{exp.company}</span>
		<span class="quest-role">{exp.role}</span>
	</div>
	<h3 class="quest-title">{exp.flagship.title}</h3>
	<p class="quest-narrative">{exp.flagship.narrative}</p>
	<span class="quest-view">→ 전체 퀘스트 로그 보기</span>
</button>

<style>
	.quest-card {
		display: flex;
		flex-direction: column;
		gap: 10px;
		text-align: left;
		width: 100%;
		background: linear-gradient(
			155deg,
			rgba(255, 255, 255, 0.1) 0%,
			rgba(255, 255, 255, 0.03) 40%,
			rgba(20, 24, 23, 0.3) 100%
		);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 20px;
		padding: 20px 22px;
		font-family: inherit;
		color: inherit;
		cursor: pointer;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
		transition:
			border-color 0.15s,
			transform 0.15s;
	}

	.quest-card:hover {
		border-color: var(--ac, #21f1a8);
		transform: translateX(3px);
	}

	.quest-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.quest-badge {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: var(--ac, #21f1a8);
	}

	.quest-period {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		color: rgba(233, 255, 248, 0.45);
	}

	.quest-company-row {
		display: flex;
		align-items: baseline;
		gap: 8px;
		flex-wrap: wrap;
	}

	.quest-company {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 13px;
		font-weight: 600;
		color: #eafdf6;
	}

	.quest-role {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		color: rgba(233, 255, 248, 0.5);
	}

	.quest-title {
		margin: 0;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 17px;
		font-weight: 600;
		color: #eafdf6;
	}

	.quest-narrative {
		margin: 0;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 13.5px;
		line-height: 1.65;
		color: rgba(233, 255, 248, 0.72);
	}

	.quest-view {
		margin-top: 4px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.04em;
		color: var(--ac, #21f1a8);
	}
</style>
