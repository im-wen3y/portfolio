<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import type { ProjectVisual } from '$lib/portfolio/project-visuals';
	import { renderPixelArt } from '$lib/portfolio/pixel-pet';

	let { project, visual, onOpen }: { project: Project; visual: ProjectVisual; onOpen: () => void } =
		$props();

	let spriteCanvas = $state<HTMLCanvasElement>();

	$effect(() => {
		if (visual.kind === 'sprite') {
			renderPixelArt(spriteCanvas, visual.frame, visual.palette);
		}
	});
</script>

<button class="project-card" onclick={onOpen}>
	<div class="project-eyebrow">
		<span class="project-company">{project.company}</span>
		<span class="project-period">{project.period}</span>
	</div>
	<h3 class="project-title">{project.title}</h3>

	<div class="project-visual">
		{#if visual.kind === 'diagram'}
			<div class="visual-diagram">
				{#each visual.nodes as node, i (node)}
					{#if i > 0}<span class="diagram-arrow">→</span>{/if}
					<span class="diagram-node">{node}</span>
				{/each}
			</div>
		{:else if visual.kind === 'code'}
			<div class="visual-code">
				<div class="code-chrome">
					<span class="code-dot"></span><span class="code-dot"></span><span class="code-dot"></span>
					<span class="code-filename">{visual.filename}</span>
				</div>
				<pre class="code-body">{visual.lines.join('\n')}</pre>
			</div>
		{:else if visual.kind === 'terminal'}
			<pre class="visual-terminal">{visual.lines.join('\n')}</pre>
		{:else if visual.kind === 'sprite'}
			<div class="visual-sprite">
				<canvas bind:this={spriteCanvas} class="sprite-canvas" aria-hidden="true"></canvas>
				<span class="sprite-caption">{visual.caption}</span>
			</div>
		{/if}
	</div>

	<p class="project-summary">{project.summary}</p>

	<div class="project-stack">
		{#each project.stack as tech (tech)}
			<span class="stack-chip">{tech}</span>
		{/each}
	</div>

	<div class="project-tags">
		{#each project.tags as tag (tag)}
			<span class="tag-chip" class:tag-pick={tag === '나의 선택'}>{tag}</span>
		{/each}
	</div>
	<span class="project-view">→ 상세보기</span>
</button>

<style>
	.project-card {
		display: flex;
		flex-direction: column;
		gap: 12px;
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

	.project-card:hover {
		border-color: rgba(33, 241, 168, 0.5);
		transform: translateY(-2px);
	}

	.project-eyebrow {
		display: flex;
		justify-content: space-between;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		color: rgba(233, 255, 248, 0.45);
	}

	.project-title {
		margin: 0;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 15px;
		font-weight: 600;
		line-height: 1.4;
		color: #eafdf6;
	}

	.project-visual {
		min-height: 64px;
		display: flex;
		align-items: center;
	}

	.visual-diagram {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px;
		width: 100%;
	}

	.diagram-node {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10.5px;
		color: rgba(233, 255, 248, 0.85);
		background: rgba(33, 241, 168, 0.07);
		border: 1px solid rgba(33, 241, 168, 0.2);
		border-radius: 8px;
		padding: 5px 8px;
	}

	.diagram-arrow {
		color: var(--ac, #21f1a8);
		font-size: 12px;
	}

	.visual-code {
		width: 100%;
		background: #0c1110;
		border: 1px solid rgba(233, 255, 248, 0.1);
		border-radius: 10px;
		overflow: hidden;
	}

	.code-chrome {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 6px 10px;
		border-bottom: 1px solid rgba(233, 255, 248, 0.08);
	}

	.code-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(233, 255, 248, 0.2);
	}

	.code-filename {
		margin-left: 6px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		color: rgba(233, 255, 248, 0.4);
	}

	.code-body,
	.visual-terminal {
		margin: 0;
		padding: 10px 12px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		line-height: 1.6;
		color: rgba(233, 255, 248, 0.8);
		white-space: pre-wrap;
		overflow-x: auto;
	}

	.visual-terminal {
		width: 100%;
		background: #0c1110;
		border: 1px solid rgba(233, 255, 248, 0.1);
		border-radius: 10px;
		color: var(--ac, #21f1a8);
	}

	.visual-sprite {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.sprite-canvas {
		width: 40px;
		height: 24px;
		image-rendering: pixelated;
	}

	.sprite-caption {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		color: var(--ac, #21f1a8);
	}

	.project-summary {
		margin: 0;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 12.5px;
		line-height: 1.6;
		color: rgba(233, 255, 248, 0.65);
	}

	.project-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
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

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
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

	.project-view {
		margin-top: 2px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.04em;
		color: var(--ac, #21f1a8);
	}
</style>
