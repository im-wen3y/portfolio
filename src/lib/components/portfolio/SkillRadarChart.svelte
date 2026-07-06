<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	type RadarPoint = { label: string; value: number };

	let { data, max = 100 }: { data: RadarPoint[]; max?: number } = $props();

	const SIZE = 300;
	const CENTER = SIZE / 2;
	const RADIUS = 92;
	const LABEL_RADIUS = RADIUS * 1.38;
	const START_ANGLE = -Math.PI / 2;
	const GRID_LEVELS = [0.25, 0.5, 0.75, 1];

	function angleAt(i: number) {
		return START_ANGLE + i * ((2 * Math.PI) / data.length);
	}

	function pointAt(i: number, r: number) {
		const angle = angleAt(i);
		return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) };
	}

	function toPolygon(points: { x: number; y: number }[]) {
		return points.map((p) => `${p.x},${p.y}`).join(' ');
	}

	function anchorFor(x: number): 'start' | 'end' | 'middle' {
		const dx = x - CENTER;
		if (Math.abs(dx) < 6) return 'middle';
		return dx > 0 ? 'start' : 'end';
	}

	const gridPolygons = $derived(
		GRID_LEVELS.map((level) => toPolygon(data.map((_, i) => pointAt(i, RADIUS * level))))
	);
	const axisEndpoints = $derived(data.map((_, i) => pointAt(i, RADIUS)));
	const dataPoints = $derived(
		data.map((d, i) => pointAt(i, (RADIUS * Math.max(0, Math.min(d.value, max))) / max))
	);
	const dataPolygon = $derived(toPolygon(dataPoints));
	const labelPoints = $derived(data.map((_, i) => pointAt(i, LABEL_RADIUS)));
</script>

<div class="radar-wrap" use:reveal>
	<svg
		viewBox="0 0 {SIZE} {SIZE}"
		class="radar-svg"
		role="img"
		aria-label="스킬 역량 레이더 차트: {data.map((d) => `${d.label} ${d.value}`).join(', ')}"
	>
		{#each gridPolygons as poly (poly)}
			<polygon points={poly} class="radar-grid" />
		{/each}
		{#each axisEndpoints as p, i (i)}
			<line x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} class="radar-axis" />
		{/each}
		<polygon points={dataPolygon} class="radar-fill" />
		<polygon points={dataPolygon} class="radar-stroke" />
		{#each dataPoints as p, i (i)}
			<circle cx={p.x} cy={p.y} r="6" class="radar-dot-ring" />
			<circle cx={p.x} cy={p.y} r="4" class="radar-dot" />
		{/each}
		{#each labelPoints as p, i (i)}
			<text x={p.x} y={p.y} text-anchor={anchorFor(p.x)} class="radar-label">{data[i].label}</text>
			<text x={p.x} y={p.y + 15} text-anchor={anchorFor(p.x)} class="radar-value"
				>{data[i].value}</text
			>
		{/each}
	</svg>
</div>

<style>
	.radar-wrap {
		display: flex;
		justify-content: center;
		padding: 20px 60px;
	}

	.radar-svg {
		width: 100%;
		max-width: 380px;
		overflow: visible;
	}

	.radar-grid {
		fill: none;
		stroke: rgba(233, 255, 248, 0.12);
		stroke-width: 1;
	}

	.radar-axis {
		stroke: rgba(233, 255, 248, 0.14);
		stroke-width: 1;
	}

	.radar-fill,
	.radar-stroke,
	.radar-dot,
	.radar-dot-ring {
		transform-box: fill-box;
		transform-origin: center;
		transform: scale(0.05);
		opacity: 0;
		transition:
			transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.5s ease;
	}

	.radar-wrap:global(.in-view) .radar-fill,
	.radar-wrap:global(.in-view) .radar-stroke {
		transform: scale(1);
		opacity: 1;
	}

	.radar-wrap:global(.in-view) .radar-dot,
	.radar-wrap:global(.in-view) .radar-dot-ring {
		transform: scale(1);
		opacity: 1;
		transition-delay: 0.15s;
	}

	@media (prefers-reduced-motion: reduce) {
		.radar-fill,
		.radar-stroke,
		.radar-dot,
		.radar-dot-ring {
			transform: none;
			opacity: 1;
			transition: none;
		}
	}

	.radar-fill {
		fill: rgba(33, 241, 168, 0.14);
		stroke: none;
	}

	.radar-stroke {
		fill: none;
		stroke: var(--ac, #21f1a8);
		stroke-width: 2;
		stroke-linejoin: round;
	}

	.radar-dot-ring {
		fill: #171717;
	}

	.radar-dot {
		fill: var(--ac, #21f1a8);
	}

	.radar-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10.5px;
		fill: rgba(233, 255, 248, 0.82);
	}

	.radar-value {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		font-weight: 600;
		fill: var(--ac, #21f1a8);
	}
</style>
