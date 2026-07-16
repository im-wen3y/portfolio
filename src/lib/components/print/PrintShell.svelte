<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { printTheme } from '$lib/stores/print-theme.svelte';
	import { accentTheme, ACCENT_OPTIONS } from '$lib/stores/accent-theme.svelte';
	import { projects } from '$lib/data/projects';
	import '$lib/styles/resume-print.css';
	import {
		PRINT_EDUCATION,
		PRINT_EXPERIENCES,
		PRINT_SKILLS,
		PRINT_WORK_PRINCIPLES,
		type PrintProfileConfig
	} from './print-profile';

	let { company }: { company: PrintProfileConfig } = $props();

	let view = $state<'resume' | 'portfolio'>('resume');
	let floatingMenuOpen = $state(false);

	const featured = $derived(
		company.featuredProjectIds
			.map((id) => projects.find((project) => project.id === id))
			.filter((project): project is (typeof projects)[number] => project !== undefined)
	);

	let toastVisible = $state(false);
	let toastTimeout: ReturnType<typeof setTimeout> | undefined;
	const controlAccent = $derived(
		ACCENT_OPTIONS.find((option) => option.value === accentTheme.value)?.dot ?? '#cc785c'
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
	<title>{view === 'resume' ? '이력서' : '포트폴리오'} — 송누리 ({company.companyLabel})</title>
	<meta name="robots" content="noindex, nofollow, noarchive" />
	<meta
		name="description"
		content="송누리의 {company.companyLabel} 지원용 {view === 'resume'
			? '이력서'
			: '포트폴리오'} PDF 미리보기"
	/>
</svelte:head>

<div class="controls" style="--pr-accent: {controlAccent}">
	<a href={resolve('/resume')} class="back-link">← 이력서로</a>
	<div class="view-toggle" role="radiogroup" aria-label="문서 종류">
		<span class="view-toggle-thumb" class:is-portfolio={view === 'portfolio'} aria-hidden="true"
		></span>
		<button
			type="button"
			role="radio"
			aria-checked={view === 'resume'}
			class="view-toggle-btn"
			class:active={view === 'resume'}
			onclick={() => (view = 'resume')}
		>
			이력서
		</button>
		<button
			type="button"
			role="radio"
			aria-checked={view === 'portfolio'}
			class="view-toggle-btn"
			class:active={view === 'portfolio'}
			onclick={() => (view = 'portfolio')}
		>
			포트폴리오
		</button>
	</div>
	<div class="document-tools">
		<div class="accent-picker" role="radiogroup" aria-label="문서 강조 색상">
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
		<button onclick={handlePrint} class="save-btn">PDF 다운로드</button>
	</div>
</div>

<div class="floating-actions" style="--pr-accent: {controlAccent}">
	{#if floatingMenuOpen}
		<div id="print-floating-menu" class="floating-menu" aria-label="문서 설정">
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

<div class="preview-wrap">
	<article
		class="page"
		class:dark={printTheme.value === 'dark'}
		class:resume-document={view === 'resume'}
		class:portfolio-document={view === 'portfolio'}
		class:theme-miricanvas={company.theme === 'miricanvas'}
		data-accent={accentTheme.value}
	>
		<header class="pr-header">
			{#if company.theme === 'miricanvas'}
				<div class="miricanvas-document-mark" aria-hidden="true">
					<span>WORKING CANVAS</span>
					<span>{view === 'resume' ? 'PROFILE' : 'SELECTED WORK'}</span>
				</div>
			{/if}
			<h1 class="pr-name">송누리</h1>
			<p class="pr-role-line">{company.roleLine}</p>
			<div class="pr-contact">
				<a href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
				<span class="pr-sep" aria-hidden="true">·</span>
				<a href="https://www.linkedin.com/in/im-wen3y" target="_blank" rel="noopener noreferrer"
					>linkedin.com/in/im-wen3y</a
				>
				<span class="pr-sep" aria-hidden="true">·</span>
				<a href="https://velog.io/@imwen3y" target="_blank" rel="noopener noreferrer"
					>velog.io/@imwen3y</a
				>
			</div>
		</header>

		<hr class="pr-divider" />

		{#if view === 'resume'}
			<section class="pr-section resume-intro" aria-labelledby="resume-about">
				<h2 id="resume-about" class="pr-label">ABOUT</h2>
				<p class="pr-about">{company.resumeAbout}</p>
			</section>

			<section class="pr-section resume-strengths" aria-labelledby="resume-strengths">
				<h2 id="resume-strengths" class="pr-label">CORE STRENGTHS</h2>
				<div class="pr-strength-grid">
					{#each company.strengths as strength (strength.title)}
						<article class="pr-strength-card">
							<span class="pr-strength-tag">{strength.tag}</span>
							<h3 class="pr-strength-title">{strength.title}</h3>
							<p class="pr-strength-desc">{strength.description}</p>
						</article>
					{/each}
				</div>
			</section>

			<section class="pr-section resume-experience" aria-labelledby="resume-experience">
				<h2 id="resume-experience" class="pr-label">SELECTED IMPACT</h2>
				<div class="resume-project-list">
					{#each featured as project (project.id)}
						<article class="resume-project">
							<div class="resume-project-head">
								<h3>{project.title}</h3>
								<span>{project.period}</span>
							</div>
							{#if project.resumeImpact}
								<p class="resume-impact">
									<strong>{project.resumeImpact.label}</strong>
									<span>{project.resumeImpact.detail}</span>
								</p>
							{:else}
								<p>{project.result ?? project.bullets.at(-1)}</p>
							{/if}
						</article>
					{/each}
				</div>
			</section>

			<section class="pr-section resume-career" aria-labelledby="resume-career">
				<h2 id="resume-career" class="pr-label">CAREER SNAPSHOT</h2>
				<div class="resume-career-grid">
					{#each PRINT_EXPERIENCES as experience (experience.company)}
						<article class="resume-career-item">
							<h3 class="pr-company">{experience.company}</h3>
							<p class="resume-role-title">{experience.role}</p>
							<p class="pr-muted">{experience.period}</p>
						</article>
					{/each}
				</div>
			</section>

			<section class="resume-page-two" aria-label="개발 방식과 상세 경력">
				<header class="resume-continuation-header">
					<p>송누리 · Frontend Developer · 7년차</p>
					<p>Engineering Practice · Experience Details</p>
				</header>

				<section class="pr-section resume-detail-section" aria-labelledby="resume-principles">
					<h2 id="resume-principles" class="pr-label">
						{company.workHighlights ? 'WHAT I BUILT' : 'HOW I WORK'}
					</h2>
					<p class="resume-section-lead">
						{company.workHighlights
							? '직접 개발하거나 기술 의사결정을 맡은 업무를 역할과 결과 중심으로 정리했습니다.'
							: '기술은 코드를 작성하는 방식뿐 아니라 문제를 이해하고, 팀과 결정하고, 다음 변경을 준비하는 방식이라고 생각합니다.'}
					</p>
					<div class="resume-principle-list">
						{#if company.workHighlights}
							{#each company.workHighlights as highlight (highlight.title)}
								<article class="resume-principle">
									<div class="resume-principle-head">
										<span>{highlight.tag}</span>
										<h3>{highlight.title}</h3>
									</div>
									<div class="resume-principle-body">
										<p>{highlight.description}</p>
										<p class="resume-principle-evidence">
											<strong>결과</strong>{highlight.result}
										</p>
									</div>
								</article>
							{/each}
						{:else}
							{#each PRINT_WORK_PRINCIPLES as principle (principle.title)}
								<article class="resume-principle">
									<div class="resume-principle-head">
										<span>{principle.tag}</span>
										<h3>{principle.title}</h3>
									</div>
									<div class="resume-principle-body">
										<p>{principle.description}</p>
										<p class="resume-principle-evidence">
											<strong>실제 근거</strong>{principle.evidence}
										</p>
									</div>
								</article>
							{/each}
						{/if}
					</div>
				</section>

				<section
					class="pr-section resume-detail-section"
					aria-labelledby="resume-experience-details"
				>
					<h2 id="resume-experience-details" class="pr-label">EXPERIENCE DETAILS</h2>
					<div class="resume-detail-role-list">
						{#each PRINT_EXPERIENCES as experience (experience.company)}
							<article class="resume-detail-role">
								<div class="resume-role-head">
									<div>
										<h3 class="pr-company">{experience.company}</h3>
										<p class="resume-role-title">{experience.role}</p>
									</div>
									<span class="pr-muted">{experience.period}</span>
								</div>
								<ul class="pr-list">
									{#each experience.highlights as highlight (highlight)}
										<li>{highlight}</li>
									{/each}
								</ul>
							</article>
						{/each}
					</div>
				</section>

				<section class="resume-footer-grid" aria-label="기술 및 학력">
					<section class="pr-section" aria-labelledby="resume-skills">
						<h2 id="resume-skills" class="pr-label">SKILLS</h2>
						<div class="resume-skill-list">
							{#each PRINT_SKILLS as skill (skill.label)}
								<p><strong>{skill.label}</strong><span>{skill.value}</span></p>
							{/each}
						</div>
					</section>
					<section class="pr-section" aria-labelledby="resume-education">
						<h2 id="resume-education" class="pr-label">EDUCATION</h2>
						<h3 class="pr-company">{PRINT_EDUCATION.school}</h3>
						<p class="pr-edu-sub">{PRINT_EDUCATION.major}</p>
						<p class="pr-muted">{PRINT_EDUCATION.period}</p>
					</section>
				</section>
			</section>
		{:else}
			<section class="pr-section portfolio-intro" aria-labelledby="portfolio-about">
				<h2 id="portfolio-about" class="pr-label">SELECTED WORK</h2>
				<p class="portfolio-lead">{company.portfolioAbout}</p>
			</section>

			<section class="pr-section pf-projects" aria-label="대표 프로젝트 사례">
				{#each featured as project (project.id)}
					<article class="pf-case-study">
						<header class="pf-project-head">
							<div>
								<p class="pf-project-company">{project.company}</p>
								<h3 class="pf-project-title">{project.title}</h3>
							</div>
							<span class="pf-project-meta">{project.period}</span>
						</header>
						<p class="pf-project-summary">{project.summary}</p>
						<p class="pr-stack">{project.stack.join(' · ')}</p>

						<dl class="pf-evidence">
							<div class="scope">
								<dt>역할·범위</dt>
								<dd>
									{[project.role, project.contribution].filter(Boolean).join(' · ')}
								</dd>
							</div>
							<div>
								<dt>문제</dt>
								<dd>{project.problem ?? project.summary}</dd>
							</div>
							<div>
								<dt>판단·해결</dt>
								<dd>{project.solution ?? project.bullets[0]}</dd>
							</div>
							<div class="implementation">
								<dt>핵심 구현</dt>
								<dd>
									<ul class="pf-detail-list">
										{#each project.bullets as detail (detail)}
											<li>{detail}</li>
										{/each}
									</ul>
								</dd>
							</div>
							<div class="result">
								<dt>결과</dt>
								<dd>{project.result ?? project.bullets.at(-1)}</dd>
							</div>
						</dl>
					</article>
				{/each}
			</section>

			<footer class="portfolio-footer-grid">
				<section aria-labelledby="portfolio-skills">
					<h2 id="portfolio-skills" class="pr-label">CAPABILITIES</h2>
					<div class="resume-skill-list">
						{#each PRINT_SKILLS as skill (skill.label)}
							<p><strong>{skill.label}</strong><span>{skill.value}</span></p>
						{/each}
					</div>
				</section>
				<section aria-labelledby="portfolio-education">
					<h2 id="portfolio-education" class="pr-label">EDUCATION</h2>
					<h3 class="pr-company">{PRINT_EDUCATION.school}</h3>
					<p class="pr-edu-sub">{PRINT_EDUCATION.major}</p>
					<p class="pr-muted">{PRINT_EDUCATION.period}</p>
				</section>
			</footer>
		{/if}
	</article>
</div>
