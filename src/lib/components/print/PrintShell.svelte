<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { printTheme } from '$lib/stores/print-theme.svelte';
	import { accentTheme, ACCENT_OPTIONS } from '$lib/stores/accent-theme.svelte';
	import '$lib/styles/resume-print.css';
	import InlineHighlights from './InlineHighlights.svelte';
	import {
		PRINT_CORE_COMPETENCIES,
		PRINT_EDUCATION,
		PRINT_COMPACT_EXPERIENCES,
		PRINT_COMPACT_ORGANIZATION_CONTRIBUTIONS,
		PRINT_HEADER_INTRO,
		PRINT_INTRO_PARAGRAPHS,
		PRINT_ROLE,
		PRINT_SKILLS,
		PRINT_TAGLINE,
		PRINT_TOTAL_EXPERIENCE
	} from './print-profile';

	let floatingMenuOpen = $state(false);
	let toastVisible = $state(false);
	let toastTimeout: ReturnType<typeof setTimeout> | undefined;

	const selectedExperiences = PRINT_COMPACT_EXPERIENCES;
	const selectedContributions = PRINT_COMPACT_ORGANIZATION_CONTRIBUTIONS;
	const controlAccent = $derived(
		ACCENT_OPTIONS.find((option) => option.value === accentTheme.value)?.dot ?? '#0650C0'
	);

	function handlePrint() {
		if (printTheme.value === 'dark') {
			toastVisible = true;
			clearTimeout(toastTimeout);
			toastTimeout = setTimeout(() => {
				toastVisible = false;
			}, 3000);
		}
		window.print();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') floatingMenuOpen = false;
	}

	onMount(() => {
		printTheme.hydrate();
		accentTheme.hydrate();
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>이력서 - 송누리</title>
	<meta name="robots" content="noindex, nofollow, noarchive" />
	<meta name="description" content="송누리의 이력서 PDF 미리보기" />
</svelte:head>

<div class="controls" style="--pr-accent: {controlAccent}">
	<a href={resolve('/portfolio')} class="back-link">← 포트폴리오로</a>
	<div class="document-tools">
		<button type="button" onclick={handlePrint} class="save-btn">PDF 다운로드</button>
	</div>
</div>

<div class="floating-actions" style="--pr-accent: {controlAccent}">
	{#if floatingMenuOpen}
		<div id="print-floating-menu" class="floating-menu" aria-label="문서 설정">
			<div class="floating-palette">
				<p>강조 색상</p>
				<div class="accent-picker" role="radiogroup" aria-label="원티드 브랜드 강조 색상">
					{#each ACCENT_OPTIONS as option (option.value)}
						<button
							type="button"
							class="accent-dot"
							class:selected={accentTheme.value === option.value}
							style="--dot: {option.dot}"
							role="radio"
							aria-checked={accentTheme.value === option.value}
							aria-label={option.label}
							title={option.label}
							onclick={() => accentTheme.set(option.value)}
						></button>
					{/each}
				</div>
			</div>
			<button
				type="button"
				class="floating-action"
				onclick={() => printTheme.toggle()}
				aria-label={printTheme.value === 'dark' ? '라이트 테마로 변경' : '다크 테마로 변경'}
			>
				<span class="floating-action-label">
					{printTheme.value === 'dark' ? '라이트 테마' : '다크 테마'}
				</span>
				<span class="floating-action-icon" aria-hidden="true">
					{#if printTheme.value === 'dark'}
						<svg viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="4"></circle>
							<path
								d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"
							></path>
						</svg>
					{:else}
						<svg viewBox="0 0 24 24">
							<path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"></path>
						</svg>
					{/if}
				</span>
			</button>

			<form method="POST" action={resolve('/owner/logout')}>
				<button type="submit" class="floating-action" aria-label="로그아웃">
					<span class="floating-action-label">로그아웃</span>
					<span class="floating-action-icon" aria-hidden="true">
						<svg viewBox="0 0 24 24">
							<path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 8l4 4-4 4M8 12h10"></path>
						</svg>
					</span>
				</button>
			</form>
		</div>
	{/if}

	<button
		type="button"
		class="floating-trigger"
		class:open={floatingMenuOpen}
		onclick={() => (floatingMenuOpen = !floatingMenuOpen)}
		aria-expanded={floatingMenuOpen}
		aria-controls="print-floating-menu"
		aria-label={floatingMenuOpen ? '문서 설정 닫기' : '문서 설정 열기'}
	>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="12" cy="12" r="3"></circle>
			<path
				d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.1-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.1 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.12.37.34.7.6 1 .3.28.68.42 1.1.4h.09a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.7.6Z"
			></path>
		</svg>
	</button>
</div>

<div
	class="print-toast"
	class:print-toast-visible={toastVisible}
	role="status"
	aria-hidden={!toastVisible}
>
	다크 배경이 보이려면 인쇄 설정에서 '배경 그래픽'을 켜주세요.
</div>

{#snippet documentHeader()}
	<div class="document-header-group">
		<header class="pr-header">
			<h1 class="pr-name">송누리</h1>
			<p class="pr-role">{PRINT_ROLE}</p>
			<div class="pr-contact">
				<a href="tel:010-5108-5493">010-5108-5493</a>
				<span class="pr-sep" aria-hidden="true">·</span>
				<a href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
				<span class="pr-sep" aria-hidden="true">·</span>
				<span>경기도 구리</span>
			</div>
			<a
				class="pr-blog-link"
				href="https://velog.io/@imwen3y/posts"
				target="_blank"
				rel="noopener noreferrer"
			>
				기술 블로그
			</a>
			<p class="pr-tagline">{PRINT_TAGLINE}</p>
			<p class="pr-header-intro">{PRINT_HEADER_INTRO}</p>
		</header>

		<hr class="pr-divider" />
	</div>
{/snippet}

<div class="preview-wrap">
	<article
		class="page resume-document"
		class:dark={printTheme.value === 'dark'}
		data-accent={accentTheme.value}
		data-resume-version="compact"
	>
		<div class="resume-page-one">
			{@render documentHeader()}

			<section class="resume-thesis" aria-labelledby="resume-thesis">
				<h2 id="resume-thesis" class="pr-label">자기소개</h2>
				{#each PRINT_INTRO_PARAGRAPHS as paragraph (paragraph.text)}
					<p>
						<InlineHighlights text={paragraph.text} highlights={paragraph.highlights} />
					</p>
				{/each}
			</section>

			<section
				class="resume-career-history resume-overview"
				aria-labelledby="resume-career-history"
			>
				<h2 id="resume-career-history" class="pr-label">경력 요약</h2>
				<p class="resume-total-experience">
					<strong>총 경력</strong>
					{PRINT_TOTAL_EXPERIENCE}
				</p>
				<table class="resume-summary-table">
					<thead>
						<tr>
							<th scope="col">기간</th>
							<th scope="col">회사</th>
							<th scope="col">역할 및 담당업무</th>
						</tr>
					</thead>
					<tbody>
						{#each selectedExperiences as experience (experience.company)}
							<tr>
								<td class="resume-summary-period">
									{experience.period.replace(' - ', '~')}<br />
									<span class="resume-summary-duration">(총 {experience.duration})</span>
								</td>
								<td><strong>{experience.company}</strong></td>
								<td>
									<strong>{experience.role}</strong>
									<span class="resume-summary-responsibilities">{experience.responsibilities}</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</section>

			<section class="pr-section resume-overview" aria-labelledby="resume-competency">
				<h2 id="resume-competency" class="pr-label">핵심 역량</h2>
				<ul class="resume-competency-list">
					{#each PRINT_CORE_COMPETENCIES as competency (competency.label)}
						<li><strong>{competency.label}</strong>{competency.value}</li>
					{/each}
				</ul>
			</section>

			<section class="pr-section resume-overview" aria-labelledby="resume-skills">
				<h2 id="resume-skills" class="pr-label">핵심 기술</h2>
				<div class="resume-skill-list">
					{#each PRINT_SKILLS as skill (skill.label)}
						<p>
							<strong>{skill.label}</strong><span class="resume-skill-value">{skill.value}</span>
						</p>
					{/each}
				</div>
			</section>
		</div>

		<div class="resume-page-two">
			<section class="resume-selected-work resume-overview" aria-labelledby="resume-selected-work">
				<h2 id="resume-selected-work" class="pr-label">경력 상세</h2>
				<div class="template-company-list">
					{#each selectedExperiences as experience, companyIndex (experience.company)}
						{#if companyIndex === 1}
							<div class="resume-page-break" aria-hidden="true"></div>
						{/if}
						<section class="template-company" aria-labelledby={`company-${experience.company}`}>
							<header class="template-company-header">
								<h3 id={`company-${experience.company}`}>{experience.company}</h3>
								<h4>
									<span class="template-role">{experience.role}</span><span
										class="template-role-separator"
										aria-hidden="true"
									>
										·
									</span><span class="template-role-period">
										{experience.period.replace(' - ', '~')} (총 {experience.duration})
									</span>
								</h4>
							</header>
							<div class="template-company-meta">
								<p>
									<span class="template-work-meta-label">고용 형태</span><span>정규직</span>
								</p>
								<p>
									<span class="template-work-meta-label">회사·서비스</span><span
										>{experience.service}</span
									>
								</p>
							</div>
							<p class="template-company-summary">{experience.summary}</p>
							<div class="resume-work-list">
								{#each experience.works as work (work.id)}
									<article class="resume-work">
										<header class="resume-work-header">
											{#if work.title}
												<p class="template-work-title"><strong>{work.title}</strong></p>
											{/if}
											<div class="template-work-meta">
												{#if work.period !== experience.period}
													<p>
														<span class="template-work-meta-label">프로젝트 기간</span><span
															>{work.period.replace(' - ', '~')}</span
														>
													</p>
												{/if}
												<p>
													<span class="template-work-meta-label">담당범위</span><span
														>{work.scope}</span
													>
												</p>
												<p>
													<span class="template-work-meta-label">기술</span><span
														>{work.stack.join(' · ')}</span
													>
												</p>
											</div>
										</header>
										<p class="template-work-overview">{work.overview}</p>
										<dl class="resume-work-details">
											<div>
												<dt>문제</dt>
												<dd>{work.problem}</dd>
											</div>
											<div>
												<dt>처리</dt>
												<dd>{work.process.join(' ')}</dd>
											</div>
											<div class="resume-work-result">
												<dt>효과</dt>
												<dd>
													<InlineHighlights text={work.effect} highlights={work.effectHighlights} />
												</dd>
											</div>
										</dl>
									</article>
								{/each}
							</div>
						</section>
					{/each}
				</div>
			</section>

			<div class="resume-page-break" aria-hidden="true"></div>

			<section
				class="resume-additional-work resume-overview"
				aria-labelledby="resume-additional-work"
			>
				<h2 id="resume-additional-work" class="pr-label">조직기여</h2>
				<div class="template-contribution-list">
					{#each selectedContributions as contribution (contribution.title)}
						<article class="template-contribution">
							<h3>{contribution.title}</h3>
							<ul class="template-contribution-details">
								<li>{contribution.problem}</li>
								{#each contribution.process as process (process)}
									<li>{process}</li>
								{/each}
								<li>{contribution.effect}</li>
							</ul>
						</article>
					{/each}
				</div>
			</section>

			<section class="resume-overview" aria-labelledby="resume-education">
				<h2 id="resume-education" class="pr-label">학력</h2>
				<div class="template-education-list">
					{#each PRINT_EDUCATION as education (education.title)}
						<article class="template-education">
							<header>
								<h3>{education.title}</h3>
								<span>{education.period}</span>
							</header>
							<ul class="template-contribution-details">
								{#each education.details as detail (detail)}
									<li>{detail}</li>
								{/each}
							</ul>
						</article>
					{/each}
				</div>
			</section>

			<section class="resume-overview" aria-labelledby="resume-links">
				<h2 id="resume-links" class="pr-label">링크</h2>
				<ul class="resume-link-list">
					<li>
						<span class="resume-link-label">GitHub</span>
						<a href="https://github.com/im-wen3y" target="_blank" rel="noopener noreferrer"
							>github.com/im-wen3y</a
						>
					</li>
					<li>
						<span class="resume-link-label">LinkedIn</span>
						<a href="https://www.linkedin.com/in/im-wen3y" target="_blank" rel="noopener noreferrer"
							>linkedin.com/in/im-wen3y</a
						>
					</li>
					<li>
						<span class="resume-link-label">Portfolio</span>
						<a
							href="https://im-wen3yz.vercel.app/portfolio"
							target="_blank"
							rel="noopener noreferrer">https://im-wen3yz.vercel.app/portfolio</a
						>
					</li>
				</ul>
			</section>
		</div>
	</article>
</div>
