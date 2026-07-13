<script lang="ts">
	import type { ProjectVisual } from '$lib/portfolio/project-visuals';
	import { renderPixelArt } from '$lib/portfolio/pixel-pet';

	let { visual }: { visual: ProjectVisual } = $props();

	let spriteCanvas = $state<HTMLCanvasElement>();

	$effect(() => {
		if (visual.kind === 'sprite') {
			renderPixelArt(spriteCanvas, visual.frame, visual.palette);
		}
	});
</script>

<div class="visual">
	{#if visual.kind === 'diagram'}
		<div class="v-diagram">
			{#each visual.nodes as node, i (node)}
				{#if i > 0}<span class="v-arrow">→</span>{/if}
				<span class="v-node">{node}</span>
			{/each}
		</div>
	{:else if visual.kind === 'code'}
		<div class="v-code">
			<div class="v-chrome">
				<span class="v-dot"></span><span class="v-dot"></span><span class="v-dot"></span>
				<span class="v-filename">{visual.filename}</span>
			</div>
			<pre class="v-body">{visual.lines.join('\n')}</pre>
		</div>
	{:else if visual.kind === 'terminal'}
		<pre class="v-terminal">{visual.lines.join('\n')}</pre>
	{:else if visual.kind === 'sprite'}
		<div class="v-sprite">
			<canvas bind:this={spriteCanvas} class="v-canvas" aria-hidden="true"></canvas>
			<span class="v-caption">{visual.caption}</span>
		</div>
	{/if}
</div>

<style>
	.visual {
		display: flex;
		align-items: center;
		min-height: 64px;
	}

	.v-diagram {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px;
		width: 100%;
	}

	.v-node {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10.5px;
		color: rgba(233, 255, 248, 0.85);
		background: rgba(33, 241, 168, 0.07);
		border: 1px solid rgba(33, 241, 168, 0.2);
		border-radius: 8px;
		padding: 5px 8px;
	}

	.v-arrow {
		color: var(--ac, #21f1a8);
		font-size: 12px;
	}

	.v-code {
		width: 100%;
		background: #0c1110;
		border: 1px solid rgba(233, 255, 248, 0.1);
		border-radius: 10px;
		overflow: hidden;
	}

	.v-chrome {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 6px 10px;
		border-bottom: 1px solid rgba(233, 255, 248, 0.08);
	}

	.v-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(233, 255, 248, 0.2);
	}

	.v-filename {
		margin-left: 6px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		color: rgba(233, 255, 248, 0.4);
	}

	.v-body,
	.v-terminal {
		margin: 0;
		padding: 10px 12px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		line-height: 1.6;
		color: rgba(233, 255, 248, 0.8);
		white-space: pre-wrap;
		overflow-x: auto;
	}

	.v-terminal {
		width: 100%;
		background: #0c1110;
		border: 1px solid rgba(233, 255, 248, 0.1);
		border-radius: 10px;
		color: var(--ac, #21f1a8);
	}

	.v-sprite {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.v-canvas {
		width: 40px;
		height: 24px;
		image-rendering: pixelated;
	}

	.v-caption {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		color: var(--ac, #21f1a8);
	}
</style>
