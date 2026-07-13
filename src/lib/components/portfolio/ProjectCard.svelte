<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import type { ProjectVisual as PV } from '$lib/portfolio/project-visuals';
	import ProjectVisual from './ProjectVisual.svelte';

	let { project, visual, onOpen }: { project: Project; visual: PV; onOpen: () => void } = $props();

	const shownStack = $derived(project.stack.slice(0, 4));
	const extraStack = $derived(Math.max(0, project.stack.length - 4));
</script>

<button class="card" class:featured={project.featured} onclick={onOpen}>
	{#if project.featured}<span class="badge">★ MAIN QUEST</span>{/if}

	<div class="eyebrow">
		<span class="company">{project.company}</span>
		<span class="period">{project.period}</span>
	</div>

	<h3 class="title">{project.title}</h3>

	<ProjectVisual {visual} />

	<p class="summary">{project.summary}</p>

	{#if project.role || project.contribution}
		<div class="meta">
			{#if project.role}<span class="meta-item">{project.role}</span>{/if}
			{#if project.contribution}<span class="meta-item accent">{project.contribution}</span>{/if}
		</div>
	{/if}

	<div class="stack">
		{#each shownStack as tech (tech)}
			<span class="chip">{tech}</span>
		{/each}
		{#if extraStack > 0}<span class="chip more">+{extraStack}</span>{/if}
	</div>

	<span class="view">상세보기 →</span>
</button>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 11px;
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
		padding: 20px;
		font-family: inherit;
		color: inherit;
		cursor: pointer;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
		transition:
			border-color 0.15s,
			transform 0.15s;
	}

	.card:hover {
		border-color: rgba(33, 241, 168, 0.5);
		transform: translateY(-3px);
	}

	.card:focus-visible {
		outline: 2px solid var(--ac, #21f1a8);
		outline-offset: 2px;
	}

	.card.featured {
		border-color: rgba(33, 241, 168, 0.4);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.22),
			0 0 24px rgba(33, 241, 168, 0.12);
	}

	.badge {
		align-self: flex-start;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 9.5px;
		font-weight: 600;
		letter-spacing: 0.12em;
		color: #0b1512;
		background: var(--ac, #21f1a8);
		border-radius: 999px;
		padding: 3px 9px;
		box-shadow: 0 0 12px rgba(33, 241, 168, 0.35);
	}

	.eyebrow {
		display: flex;
		justify-content: space-between;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		color: rgba(233, 255, 248, 0.45);
	}

	.title {
		margin: 0;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 15px;
		font-weight: 600;
		line-height: 1.4;
		color: #eafdf6;
	}

	.summary {
		margin: 0;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 12.5px;
		line-height: 1.6;
		color: rgba(233, 255, 248, 0.65);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 5px 10px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10.5px;
		color: rgba(233, 255, 248, 0.6);
	}

	.meta-item.accent {
		color: var(--ac, #21f1a8);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}

	.chip {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		color: rgba(233, 255, 248, 0.7);
		background: rgba(233, 255, 248, 0.06);
		border: 1px solid rgba(233, 255, 248, 0.12);
		border-radius: 999px;
		padding: 3px 9px;
	}

	.chip.more {
		color: rgba(233, 255, 248, 0.45);
	}

	.view {
		margin-top: 2px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.04em;
		color: var(--ac, #21f1a8);
	}
</style>
