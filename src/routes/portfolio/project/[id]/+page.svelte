<script lang="ts">
	import ProjectVisual from '$lib/components/portfolio/ProjectVisual.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const p = $derived(data.project);

	function goBack() {
		if (history.length > 1) history.back();
		else location.assign('/portfolio');
	}
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<title>{p.title} · 송누리 포트폴리오</title>
</svelte:head>

<div class="stage" style="--ac: #21F1A8; --sec: #FF4D9D;">
	<div class="wrap">
		<button class="back" onclick={goBack}>← PROJECTS</button>

		<header class="head">
			{#if p.featured}<span class="badge">★ MAIN QUEST</span>{/if}
			<div class="eyebrow">{p.company} · {p.period}</div>
			<h1 class="title">{p.title}</h1>
			{#if p.role || p.contribution}
				<div class="meta">
					{#if p.role}<span>{p.role}</span>{/if}
					{#if p.contribution}<span class="accent">{p.contribution}</span>{/if}
				</div>
			{/if}
			<div class="tags">
				{#each p.tags as tag (tag)}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		</header>

		<p class="summary">{p.summary}</p>

		{#if data.visual}
			<div class="visual-wrap">
				<ProjectVisual visual={data.visual} />
			</div>
		{/if}

		<div class="stack">
			<span class="stack-label">STACK</span>
			<div class="chips">
				{#each p.stack as tech (tech)}
					<span class="chip">{tech}</span>
				{/each}
			</div>
		</div>

		{#if p.problem}
			<section class="block">
				<h2 class="block-label">문제</h2>
				<p class="block-text">{p.problem}</p>
			</section>
		{/if}
		{#if p.solution}
			<section class="block">
				<h2 class="block-label">해결</h2>
				<p class="block-text">{p.solution}</p>
			</section>
		{/if}
		{#if p.result}
			<section class="block">
				<h2 class="block-label accent-label">성과</h2>
				<p class="block-text">{p.result}</p>
			</section>
		{/if}

		<section class="block">
			<h2 class="block-label">한 일</h2>
			<ul class="did-list">
				{#each p.bullets as b, i (i)}
					<li>{b}</li>
				{/each}
			</ul>
		</section>

		<button class="back back-bottom" onclick={goBack}>← 다른 프로젝트 보기</button>
	</div>
</div>

<style>
	.stage {
		background: #171717;
		color: #eafdf6;
		font-family: 'IBM Plex Sans', sans-serif;
		min-height: 100vh;
		padding: calc(64px + 32px) clamp(24px, 6vw, 96px) 80px;
	}

	.wrap {
		max-width: 760px;
		margin: 0 auto;
	}

	.back {
		background: none;
		border: 1px solid rgba(233, 255, 248, 0.2);
		border-radius: 999px;
		color: rgba(233, 255, 248, 0.7);
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12px;
		padding: 7px 16px;
		cursor: pointer;
		transition:
			color 0.15s,
			border-color 0.15s;
	}

	.back:hover {
		color: #eafdf6;
		border-color: rgba(233, 255, 248, 0.5);
	}

	.head {
		margin: 24px 0 20px;
	}

	.badge {
		display: inline-block;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.12em;
		color: #0b1512;
		background: var(--ac);
		border-radius: 999px;
		padding: 3px 10px;
		margin-bottom: 12px;
		box-shadow: 0 0 12px rgba(33, 241, 168, 0.35);
	}

	.eyebrow {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12px;
		color: var(--ac);
		margin-bottom: 8px;
	}

	.title {
		margin: 0 0 12px;
		font-size: clamp(24px, 4vw, 34px);
		font-weight: 700;
		line-height: 1.25;
		text-wrap: balance;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 14px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12.5px;
		color: rgba(233, 255, 248, 0.65);
		margin-bottom: 12px;
	}

	.meta .accent {
		color: var(--ac);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.tag {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		color: rgba(233, 255, 248, 0.5);
		padding: 2px 9px;
		border: 1px solid rgba(233, 255, 248, 0.14);
		border-radius: 999px;
	}

	.summary {
		margin: 0 0 24px;
		font-size: 15px;
		line-height: 1.65;
		color: rgba(233, 255, 248, 0.85);
	}

	.visual-wrap {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		padding: 20px;
		margin-bottom: 24px;
	}

	.stack {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		margin-bottom: 28px;
	}

	.stack-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.08em;
		color: rgba(233, 255, 248, 0.5);
		padding-top: 4px;
		flex-shrink: 0;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.chip {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		color: rgba(233, 255, 248, 0.75);
		background: rgba(233, 255, 248, 0.06);
		border: 1px solid rgba(233, 255, 248, 0.12);
		border-radius: 999px;
		padding: 4px 10px;
	}

	.block {
		margin-bottom: 22px;
	}

	.block-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(233, 255, 248, 0.55);
		margin: 0 0 8px;
		padding-left: 11px;
		border-left: 2px solid rgba(233, 255, 248, 0.25);
	}

	.block-label.accent-label {
		color: var(--ac);
		border-left-color: var(--ac);
	}

	.block-text {
		margin: 0;
		font-size: 14px;
		line-height: 1.7;
		color: rgba(233, 255, 248, 0.8);
	}

	.did-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.did-list li {
		position: relative;
		padding-left: 16px;
		font-size: 13.5px;
		line-height: 1.65;
		color: rgba(233, 255, 248, 0.78);
	}

	.did-list li::before {
		content: '›';
		position: absolute;
		left: 0;
		color: var(--ac);
	}

	.back-bottom {
		margin-top: 12px;
	}

	@media (prefers-reduced-motion: reduce) {
		.back {
			transition: none;
		}
	}
</style>
