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
		<a class="back-link" href={resolve('/portfolio')}>← 대표 프로젝트</a>

		<header class="project-hero">
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
					<div class="article-block">
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
					</div>
				</section>
			{/each}
		</div>

		<footer class="project-footer">
			<p>다른 프로젝트의 문제 정의와 해결 과정도 이어서 확인할 수 있습니다.</p>
		</footer>
	</article>
</div>

<style>
	/* Isometric sticker-book art direction — 포트폴리오 목록 페이지와 동일한 토큰 사용 */
	.project-page {
		min-height: calc(100vh - 64px);
		padding: 40px clamp(14px, 4vw, 40px) 72px;
		background:
			linear-gradient(
					color-mix(in srgb, var(--sticker-lilac) 18%, transparent) 1px,
					transparent 1px
				)
				0 0 / 24px 24px,
			linear-gradient(
					90deg,
					color-mix(in srgb, var(--sticker-lilac) 18%, transparent) 1px,
					transparent 1px
				)
				0 0 / 24px 24px,
			var(--sticker-grid);
		color: var(--sticker-ink);
	}

	.project-document {
		display: grid;
		gap: 22px;
		max-width: 840px;
		margin: 0 auto;
	}

	.article-body {
		display: grid;
		gap: 22px;
	}

	.project-hero,
	.article-section,
	.project-footer {
		padding: clamp(24px, 4vw, 40px);
		border: 2px solid var(--sticker-ink);
		border-radius: 18px;
		background: var(--sticker-paper);
		box-shadow: 6px 6px 0 var(--sticker-mint);
	}

	.article-section:nth-of-type(2n) {
		box-shadow: 6px 6px 0 var(--sticker-lilac);
	}

	.article-section:nth-of-type(3n) {
		box-shadow: 6px 6px 0 var(--sticker-coral);
	}

	.back-link {
		display: inline-flex;
		justify-self: start;
		padding: 5px 11px;
		border: 2px solid var(--sticker-ink);
		border-radius: 10px;
		background: var(--sticker-mint-soft);
		box-shadow: 3px 3px 0 var(--sticker-ink);
		font-size: 14px;
		font-weight: 700;
		color: var(--sticker-ink);
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.back-link:hover {
		transform: translate(2px, 2px);
		box-shadow: 1px 1px 0 var(--sticker-ink);
	}

	.project-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
		font-size: 13px;
		font-weight: 700;
		color: var(--color-muted);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		padding: 2px 10px;
		border: 1.5px solid var(--sticker-ink);
		border-radius: 8px;
		box-shadow: 2px 2px 0 var(--sticker-ink);
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
	}

	.pill-primary {
		background: var(--sticker-mint);
		color: var(--sticker-ink);
	}

	.pill-secondary {
		background: var(--sticker-yellow);
		color: var(--sticker-ink);
	}

	h1 {
		margin-bottom: 20px;
		font-family: var(--font-display);
		font-size: clamp(28px, 5vw, 42px);
		font-weight: 800;
		line-height: 1.22;
		letter-spacing: -0.03em;
		color: var(--sticker-ink);
		text-wrap: balance;
	}

	.project-summary {
		font-size: clamp(15px, 2vw, 17px);
		line-height: 1.8;
		text-wrap: pretty;
	}

	.stack-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 26px;
		padding-top: 22px;
		border-top: 2px dashed color-mix(in srgb, var(--sticker-ink) 36%, transparent);
		list-style: none;
	}

	.stack-list li {
		padding: 5px 9px;
		border: 1.5px solid var(--sticker-ink);
		border-radius: 9px;
		background: var(--sticker-paper);
		box-shadow: 2px 2px 0 color-mix(in srgb, var(--sticker-ink) 75%, transparent);
		font-size: 13px;
		font-weight: 650;
	}

	.article-section h2 {
		display: inline-block;
		padding: 3px 10px 5px;
		border: 2px solid var(--sticker-ink);
		border-radius: 8px;
		background: var(--sticker-mint-soft);
		box-shadow: 3px 3px 0 var(--sticker-ink);
		font-family: var(--font-display);
		font-size: clamp(19px, 2.6vw, 23px);
		font-weight: 800;
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--sticker-ink);
		transform: rotate(-1deg);
	}

	.article-section:nth-of-type(2n) h2 {
		background: var(--sticker-lilac-soft);
		transform: rotate(0.8deg);
	}

	.article-section:nth-of-type(3n) h2 {
		background: var(--sticker-yellow-soft);
	}

	/* 라벨 → 구분선 → 콘텐츠: 목록 페이지 섹션 구조와 동일 */
	.article-block {
		margin-top: 22px;
		padding-top: 22px;
		border-top: 2px dashed color-mix(in srgb, var(--sticker-ink) 36%, transparent);
	}

	.article-block p,
	.article-block li {
		font-size: 15px;
		line-height: 1.85;
		word-break: keep-all;
		overflow-wrap: break-word;
	}

	.article-block p {
		text-wrap: pretty;
	}

	.article-block p + p {
		margin-top: 16px;
	}

	.article-block ul {
		display: grid;
		gap: 12px;
		margin-top: 20px;
		padding-left: 22px;
	}

	.article-block li::marker {
		color: var(--sticker-ink);
	}

	.project-footer {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 18px;
		background: var(--sticker-ink);
		box-shadow: 6px 6px 0 var(--sticker-coral);
		color: var(--sticker-paper);
	}

	.project-footer p {
		max-width: 420px;
		font-size: 14px;
		line-height: 1.7;
	}

	.back-link:focus-visible {
		outline: 2px solid currentcolor;
		outline-offset: 4px;
	}

	@media (max-width: 640px) {
		.project-page {
			padding-top: 24px;
			padding-bottom: 56px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.article-section h2,
		.article-section:nth-of-type(2n) h2 {
			transform: none;
		}

		.back-link {
			transition: none;
		}

		.back-link:hover {
			transform: none;
		}
	}
</style>
