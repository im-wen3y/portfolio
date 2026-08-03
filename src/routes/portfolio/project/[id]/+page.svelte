<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let project = $derived(data.project);
</script>

<svelte:head>
	<title>{project.title} · 송누리</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<div class="project-page">
	<article class="project-document">
		<header class="project-hero">
			<a class="back-link" href={resolve('/portfolio')}>← 대표 프로젝트</a>

			<div class="project-meta">
				<span>{project.meta}</span>
				{#if project.badge}
					<span class="pill pill-{project.badge.tone}">{project.badge.label}</span>
				{/if}
			</div>

			<h1>{project.title}</h1>
			<p class="project-summary">{project.summary}</p>

			<ul class="stack-list" aria-label="사용 기술과 핵심 주제">
				{#each project.stack as tech (tech)}
					<li>{tech}</li>
				{/each}
			</ul>
		</header>

		<div class="article-body">
			{#each project.detail as block (block.title)}
				<section class="article-section">
					<h2>{block.title}</h2>
					{#if block.paragraphs}
						{#each block.paragraphs as paragraph (paragraph)}
							<p>{paragraph}</p>
						{/each}
					{/if}
					{#if block.bullets}
						<ul>
							{#each block.bullets as bullet (bullet)}
								<li>{bullet}</li>
							{/each}
						</ul>
					{/if}
				</section>
			{/each}
		</div>

		<footer class="project-footer">
			<p>다른 프로젝트의 문제 정의와 해결 과정도 이어서 확인할 수 있습니다.</p>
			<a href={resolve('/portfolio')}>대표 프로젝트 목록으로 <span aria-hidden="true">→</span></a>
		</footer>
	</article>
</div>

<style>
	.project-page {
		min-height: calc(100vh - 64px);
		padding: 72px clamp(20px, 6vw, 72px) 112px;
		background: var(--color-canvas);
		color: var(--text-body);
	}

	.project-document {
		max-width: 840px;
		margin: 0 auto;
	}

	.project-hero {
		padding-bottom: 48px;
		border-bottom: 1px solid var(--border-default);
	}

	.back-link {
		display: inline-flex;
		margin-bottom: 48px;
		font-size: 14px;
		font-weight: 700;
		color: var(--color-muted);
		transition: color 0.15s ease;
	}

	.back-link:hover {
		color: var(--color-primary-strong);
	}

	.project-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		margin-bottom: 18px;
		font-size: 13px;
		font-weight: 700;
		color: var(--color-muted);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		padding: 2px 10px;
		border-radius: var(--radius-full);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.pill-primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.pill-secondary {
		background: var(--color-secondary);
		color: var(--color-ink);
	}

	h1 {
		max-width: 820px;
		margin-bottom: 24px;
		font-family: var(--font-display);
		font-size: clamp(34px, 6vw, 58px);
		font-weight: 800;
		line-height: 1.18;
		letter-spacing: -0.03em;
		color: var(--text-heading);
		text-wrap: balance;
	}

	.project-summary {
		max-width: 760px;
		font-size: clamp(17px, 2.3vw, 20px);
		line-height: 1.75;
		text-wrap: pretty;
	}

	.stack-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 32px;
		list-style: none;
	}

	.stack-list li {
		padding: 6px 12px;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-default);
		background: var(--surface-recessed);
		font-size: 13px;
		font-weight: 650;
		color: var(--text-heading);
	}

	.article-body {
		padding: 20px 0 64px;
	}

	.article-section {
		padding: 52px 0;
	}

	.article-section h2 {
		margin-bottom: 24px;
		font-family: var(--font-display);
		font-size: clamp(22px, 3vw, 28px);
		font-weight: 800;
		line-height: 1.35;
		letter-spacing: -0.02em;
		color: var(--text-heading);
	}

	.article-section p,
	.article-section li {
		font-size: clamp(16px, 2vw, 18px);
		line-height: 1.9;
		word-break: keep-all;
		overflow-wrap: break-word;
	}

	.article-section p {
		text-wrap: pretty;
	}

	.article-section p + p {
		margin-top: 18px;
	}

	.article-section ul {
		display: grid;
		gap: 14px;
		margin-top: 24px;
		padding-left: 24px;
	}

	.article-section li::marker {
		color: var(--color-primary-strong);
	}

	.project-footer {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
		padding-top: 32px;
		border-top: 1px solid var(--border-default);
	}

	.project-footer p {
		max-width: 520px;
		font-size: 14px;
		color: var(--color-muted);
	}

	.project-footer a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		flex: 0 0 auto;
		font-size: 15px;
		font-weight: 700;
		color: var(--link-color);
	}

	.project-footer a:hover {
		color: var(--link-color-hover);
	}

	.back-link:focus-visible,
	.project-footer a:focus-visible {
		outline: 2px solid var(--color-ink);
		outline-offset: 4px;
	}

	@media (max-width: 640px) {
		.project-page {
			padding-top: 48px;
			padding-bottom: 80px;
		}

		.back-link {
			margin-bottom: 36px;
		}

		.project-hero {
			padding-bottom: 36px;
		}

		.article-body {
			padding-bottom: 48px;
		}

		.article-section {
			padding: 40px 0;
		}

		.project-footer {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
