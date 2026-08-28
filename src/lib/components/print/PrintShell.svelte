<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { printTheme } from '$lib/stores/print-theme.svelte';
	import '$lib/styles/resume-print.css';
	import InlineHighlights from './InlineHighlights.svelte';
	import {
		PRINT_CORE_COMPETENCIES,
		PRINT_EDUCATION,
		PRINT_COMPACT_EXPERIENCES,
		PRINT_COMPACT_ORGANIZATION_CONTRIBUTIONS,
		PRINT_PORTFOLIO_COLLABORATION,
		PRINT_PORTFOLIO_EXPERIENCES,
		PRINT_PORTFOLIO_INTRO,
		PRINT_PORTFOLIO_STACK,
		PRINT_RESUME_SUMMARY,
		PRINT_ROLE,
		PRINT_SKILLS,
		PRINT_TARGET_RESUMES,
		PRINT_TOTAL_EXPERIENCE
	} from './print-profile';
	import type {
		PrintExperience,
		PrintPortfolioExperience,
		PrintTargetResume,
		PrintTargetResumeId,
		PrintWork
	} from './print-profile';

	type PrintVariant = 'v1' | 'career' | 'portfolio' | PrintTargetResumeId;
	type TargetWork = { experience: PrintExperience; work: PrintWork };

	let { variant = 'v1' }: { variant?: PrintVariant } = $props();

	// resolve()는 라우트 리터럴마다 호출해야 타입이 좁혀진다
	const DOCUMENTS = [
		{ label: '이력서', id: 'resume', href: resolve('/print') },
		{ label: '경력기술서', id: 'career', href: resolve('/print/career') },
		{ label: '포트폴리오', id: 'portfolio', href: resolve('/print/portfolio') },
		{ label: '지원용', id: 'target', href: resolve('/print/senior') }
	];
	const TARGET_DOCUMENTS = [
		{ ...PRINT_TARGET_RESUMES.senior, href: resolve('/print/senior') },
		{ ...PRINT_TARGET_RESUMES.lead, href: resolve('/print/lead') },
		{ ...PRINT_TARGET_RESUMES.product, href: resolve('/print/product') }
	];
	const targetResume = $derived(
		variant === 'senior' || variant === 'lead' || variant === 'product'
			? PRINT_TARGET_RESUMES[variant]
			: undefined
	);
	// 탭 활성화 id와 문서 제목은 항상 같이 바뀌므로 한 곳에서 함께 결정한다
	function resolveDocument(): { id: string; title: string } {
		if (targetResume) return { id: 'target', title: `${targetResume.label} 이력서` };
		if (variant === 'career') return { id: 'career', title: '경력기술서' };
		if (variant === 'portfolio') return { id: 'portfolio', title: '포트폴리오' };
		return { id: 'resume', title: '이력서' };
	}
	const currentDocument = $derived(resolveDocument());

	let floatingMenuOpen = $state(false);
	let toastVisible = $state(false);
	let toastTimeout: ReturnType<typeof setTimeout> | undefined;

	const selectedExperiences = PRINT_COMPACT_EXPERIENCES;
	const selectedContributions = PRINT_COMPACT_ORGANIZATION_CONTRIBUTIONS;
	function getTargetWorks(profile: PrintTargetResume): TargetWork[] {
		return profile.workIds.flatMap((workId) => {
			for (const experience of selectedExperiences) {
				const work = experience.works.find((item) => item.id === workId);
				if (work) return [{ experience, work }];
			}
			return [];
		});
	}
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
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>{currentDocument.title} - 송누리</title>
	<meta name="robots" content="noindex, nofollow, noarchive" />
	<meta name="description" content={`송누리의 ${currentDocument.title} PDF 미리보기`} />
</svelte:head>

<div class="controls">
	<a href="https://im-wen3yz.vercel.app/portfolio" class="back-link">← 포트폴리오로</a>
	<nav class="doc-switch" aria-label="문서 종류">
		{#each DOCUMENTS as doc (doc.id)}
			<a
				href={doc.href}
				class="doc-switch-item"
				class:active={doc.id === currentDocument.id}
				aria-current={doc.id === currentDocument.id ? 'page' : undefined}
			>
				{doc.label}
			</a>
		{/each}
	</nav>
	{#if targetResume}
		<nav class="target-doc-switch" aria-label="지원용 이력서 버전">
			{#each TARGET_DOCUMENTS as doc (doc.id)}
				<a
					href={doc.href}
					class:active={doc.id === targetResume.id}
					aria-current={doc.id === targetResume.id ? 'page' : undefined}
				>
					{doc.label}
				</a>
			{/each}
		</nav>
	{/if}
	<div class="document-tools">
		<button type="button" onclick={handlePrint} class="save-btn">PDF 다운로드</button>
	</div>
</div>

<div class="floating-actions">
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

{#snippet documentHeader()}
	<div class="document-header-group">
		<header class="pr-header">
			<h1 class="pr-name">송누리</h1>
			<p class="pr-role">{PRINT_ROLE}</p>
			<div class="pr-contact">
				<a href="tel:010-5108-5493">010-5108-5493</a>
				<span class="pr-sep" aria-hidden="true">·</span>
				<a href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
			</div>
		</header>

		<hr class="pr-divider" />
	</div>
{/snippet}

{#snippet sheetMeta(page: string, total: string, section: string)}
	<header class="resume-sheet-meta" aria-label={`문서 ${page}페이지, ${section}`}>
		<span>Song Nuri · Frontend Engineer</span>
		<span>{page} / {total}</span>
	</header>
{/snippet}

{#snippet careerPages(
	pageA: string,
	pageB: string,
	pageC: string,
	pageD: string,
	total: string,
	withResumeInfo = false
)}
	<article
		class="page resume-document resume-sheet"
		class:dark={printTheme.value === 'dark'}
		data-resume-version="compact"
		id="career-detail"
	>
		{@render sheetMeta(pageA, total, '팀 리드와 최근 경력')}

		<section class="resume-additional-work resume-overview" aria-labelledby="career-contributions">
			<h2 id="career-contributions" class="pr-label">팀 리드</h2>
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

		<section class="resume-selected-work resume-overview" aria-labelledby="career-recent">
			<h2 id="career-recent" class="pr-label">경력 상세</h2>
			<div class="template-company-list">
				{@render companySection(selectedExperiences[0], selectedExperiences[0].works.slice(0, 1))}
			</div>
		</section>
	</article>

	<article
		class="page resume-document resume-sheet"
		class:dark={printTheme.value === 'dark'}
		data-resume-version="compact"
	>
		{@render sheetMeta(pageB, total, '최근 경력 상세')}
		<section
			class="resume-selected-work resume-overview resume-page-lead"
			aria-label="최근 경력 상세 계속"
		>
			<div class="template-company-list">
				{@render companySection(
					selectedExperiences[0],
					selectedExperiences[0].works.slice(1, 4),
					false
				)}
			</div>
		</section>
	</article>

	<article
		class="page resume-document resume-sheet"
		class:dark={printTheme.value === 'dark'}
		data-resume-version="compact"
	>
		{@render sheetMeta(pageC, total, '최근 경력과 이전 경력')}
		<section
			class="resume-selected-work resume-overview resume-page-lead"
			aria-label="최근 경력 상세 계속"
		>
			<div class="template-company-list">
				{@render companySection(
					selectedExperiences[0],
					selectedExperiences[0].works.slice(4),
					false
				)}
			</div>
		</section>

		<section class="resume-selected-work resume-overview" aria-label="이전 경력">
			<div class="template-company-list">
				{@render companySection(selectedExperiences[1], selectedExperiences[1].works.slice(0, 2))}
			</div>
		</section>
	</article>

	<article
		class="page resume-document resume-sheet"
		class:dark={printTheme.value === 'dark'}
		data-resume-version="compact"
	>
		{@render sheetMeta(pageD, total, '이전 경력과 기본 정보')}
		<section
			class="resume-selected-work resume-overview resume-page-lead"
			aria-label="이전 경력 계속"
		>
			<div class="template-company-list">
				{@render companySection(
					selectedExperiences[1],
					selectedExperiences[1].works.slice(2),
					false
				)}
				{#each selectedExperiences.slice(2) as experience (experience.company)}
					{@render companySection(experience, experience.works)}
				{/each}
			</div>
		</section>
		{#if withResumeInfo}
			<div class="resume-fact-grid">
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
							<a
								href="https://www.linkedin.com/in/im-wen3y"
								target="_blank"
								rel="noopener noreferrer">linkedin.com/in/im-wen3y</a
							>
						</li>
						<li>
							<span class="resume-link-label">Portfolio</span>
							<a
								href="https://im-wen3yz.vercel.app/portfolio"
								target="_blank"
								rel="noopener noreferrer">im-wen3yz.vercel.app/portfolio</a
							>
						</li>
					</ul>
				</section>
			</div>
		{/if}
	</article>
{/snippet}

{#snippet companySection(experience: PrintExperience, works: PrintWork[], showHeader = true)}
	<section class="template-company" aria-labelledby={`company-${experience.company}`}>
		{#if showHeader}
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
			<p class="template-company-summary">{experience.summary}</p>
		{/if}
		<div class="resume-work-list">
			{#each works as work (work.id)}
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
							{#if work.team}
								<p>
									<span class="template-work-meta-label">팀 구성</span><span>{work.team}</span>
								</p>
							{/if}
							<p>
								<span class="template-work-meta-label">역할</span><span>{work.role}</span>
							</p>
							<p>
								<span class="template-work-meta-label">담당 업무</span><span>{work.scope}</span>
							</p>
						</div>
					</header>
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
					<p class="resume-work-stack">{work.stack.join(' · ')}</p>
				</article>
			{/each}
		</div>
	</section>
{/snippet}

{#snippet targetWorkCard(item: TargetWork)}
	<article class="target-resume-work">
		<header>
			<div>
				<h3>{item.work.title}</h3>
				<p>{item.experience.company} · {item.work.role}</p>
			</div>
			<span>{item.work.period}</span>
		</header>
		<dl>
			<div>
				<dt>문제</dt>
				<dd>{item.work.problem}</dd>
			</div>
			<div>
				<dt>해결</dt>
				<dd>{item.work.process[0]}</dd>
			</div>
			<div>
				<dt>결과</dt>
				<dd>
					<InlineHighlights text={item.work.effect} highlights={item.work.effectHighlights} />
				</dd>
			</div>
		</dl>
		<p class="resume-work-stack">{item.work.stack.join(' · ')}</p>
	</article>
{/snippet}

{#snippet targetedResumePages(profile: PrintTargetResume)}
	<article
		class="page resume-document resume-sheet target-resume-sheet"
		class:dark={printTheme.value === 'dark'}
		data-resume-version="compact"
	>
		{@render sheetMeta('01', '02', profile.label)}
		{@render documentHeader()}

		<section class="target-resume-intro" aria-labelledby={`target-title-${profile.id}`}>
			<h2 id={`target-title-${profile.id}`}>{profile.headline}</h2>
			<p>{profile.intro}</p>
		</section>

		<section class="resume-overview" aria-labelledby={`target-strengths-${profile.id}`}>
			<h2 id={`target-strengths-${profile.id}`} class="pr-label">핵심 강점</h2>
			<ul class="target-strength-list">
				{#each profile.strengths as strength (strength)}
					<li>{strength}</li>
				{/each}
			</ul>
		</section>

		<section
			class="resume-overview target-work-section"
			aria-labelledby={`target-work-${profile.id}`}
		>
			<h2 id={`target-work-${profile.id}`} class="pr-label">대표 경험</h2>
			{#each getTargetWorks(profile).slice(0, Math.ceil(profile.workIds.length / 2)) as item (item.work.id)}
				{@render targetWorkCard(item)}
			{/each}
		</section>
	</article>

	<article
		class="page resume-document resume-sheet target-resume-sheet"
		class:dark={printTheme.value === 'dark'}
		data-resume-version="compact"
	>
		{@render sheetMeta('02', '02', `${profile.label} 대표 경험과 기본 정보`)}

		<section
			class="resume-overview target-work-section target-page-lead"
			aria-label="대표 경험 계속"
		>
			{#each getTargetWorks(profile).slice(Math.ceil(profile.workIds.length / 2)) as item (item.work.id)}
				{@render targetWorkCard(item)}
			{/each}
		</section>

		<section
			class="resume-overview target-career-summary"
			aria-labelledby={`target-career-${profile.id}`}
		>
			<h2 id={`target-career-${profile.id}`} class="pr-label">경력</h2>
			{#each selectedExperiences as experience (experience.company)}
				<article>
					<strong>{experience.company}</strong>
					<span>{experience.period.replace(' - ', '~')} · {experience.role}</span>
				</article>
			{/each}
		</section>

		<div class="target-resume-facts">
			<section class="resume-overview" aria-labelledby={`target-skills-${profile.id}`}>
				<h2 id={`target-skills-${profile.id}`} class="pr-label">기술</h2>
				<div class="resume-skill-list">
					{#each PRINT_SKILLS as skill (skill.label)}
						<p>
							<strong>{skill.label}</strong><span class="resume-skill-value">{skill.value}</span>
						</p>
					{/each}
				</div>
			</section>

			<section class="resume-overview" aria-labelledby={`target-education-${profile.id}`}>
				<h2 id={`target-education-${profile.id}`} class="pr-label">학력</h2>
				{#each PRINT_EDUCATION as education (education.title)}
					<p><strong>{education.title}</strong> · {education.details.join(' · ')}</p>
				{/each}
			</section>
		</div>
	</article>
{/snippet}

{#snippet portfolioExperience(experience: PrintPortfolioExperience)}
	<article class="portfolio-summary-company">
		<header>
			<div>
				<h3>{experience.company}</h3>
				<p>{experience.role}</p>
			</div>
			<span>{experience.period}</span>
		</header>
		<p class="portfolio-company-summary">{experience.summary}</p>
		<div class="portfolio-project-list">
			{#each experience.projects as project (project.title)}
				<section>
					<h4>{project.title}</h4>
					<ul>
						{#each project.details as detail (detail)}
							<li>{detail}</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>
	</article>
{/snippet}

{#snippet portfolioPages()}
	<article
		class="page resume-document resume-sheet portfolio-resume-sheet"
		class:dark={printTheme.value === 'dark'}
		data-resume-version="compact"
	>
		{@render sheetMeta('01', '02', '소개와 최근 경력')}
		{@render documentHeader()}

		<section class="portfolio-resume-intro" aria-label="소개">
			<h2>안녕하세요. 7년 차 프론트엔드 개발자 송누리입니다.</h2>
			{#each PRINT_PORTFOLIO_INTRO as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
			<p class="portfolio-stack-line">{PRINT_PORTFOLIO_STACK.join(' · ')}</p>
		</section>

		<section
			class="resume-overview portfolio-project-summary"
			aria-labelledby="portfolio-career-recent"
		>
			<h2 id="portfolio-career-recent" class="pr-label">경험</h2>
			<p class="resume-total-experience"><strong>총 경력</strong>{PRINT_TOTAL_EXPERIENCE}</p>
			{@render portfolioExperience(PRINT_PORTFOLIO_EXPERIENCES[0])}
		</section>
	</article>

	<article
		class="page resume-document resume-sheet portfolio-resume-sheet"
		class:dark={printTheme.value === 'dark'}
		data-resume-version="compact"
	>
		{@render sheetMeta('02', '02', '이전 경력과 기본 정보')}

		<section
			class="resume-overview portfolio-project-summary portfolio-page-lead"
			aria-label="경력 계속"
		>
			{@render portfolioExperience(PRINT_PORTFOLIO_EXPERIENCES[1])}
			{@render portfolioExperience(PRINT_PORTFOLIO_EXPERIENCES[2])}
		</section>

		<div class="portfolio-resume-facts">
			<section class="resume-overview" aria-labelledby="portfolio-skills">
				<h2 id="portfolio-skills" class="pr-label">기술</h2>
				<div class="resume-skill-list">
					{#each PRINT_SKILLS as skill (skill.label)}
						<p>
							<strong>{skill.label}</strong><span class="resume-skill-value">{skill.value}</span>
						</p>
					{/each}
				</div>
			</section>

			<section class="resume-overview" aria-labelledby="portfolio-collaboration">
				<h2 id="portfolio-collaboration" class="pr-label">협업 및 리더십</h2>
				<ul class="portfolio-collaboration-list">
					{#each PRINT_PORTFOLIO_COLLABORATION as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</section>

			<section class="resume-overview" aria-labelledby="portfolio-education">
				<h2 id="portfolio-education" class="pr-label">교육</h2>
				{#each PRINT_EDUCATION as education (education.title)}
					<article class="portfolio-education-item">
						<header>
							<h3>{education.title}</h3>
							<span>{education.period}</span>
						</header>
						<p>{education.details.join(' · ')}</p>
					</article>
				{/each}
			</section>

			<section class="resume-overview" aria-labelledby="portfolio-links">
				<h2 id="portfolio-links" class="pr-label">링크</h2>
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
							rel="noopener noreferrer">im-wen3yz.vercel.app/portfolio</a
						>
					</li>
				</ul>
			</section>
		</div>
	</article>
{/snippet}

<div class="preview-wrap">
	{#if variant === 'career'}
		<div class="resume-pages">
			{@render careerPages('01', '02', '03', '04', '04')}
		</div>
	{:else if targetResume}
		<div class="resume-pages">
			{@render targetedResumePages(targetResume)}
		</div>
	{:else if variant === 'portfolio'}
		<div class="resume-pages">
			{@render portfolioPages()}
		</div>
	{:else}
		<div class="resume-pages">
			<article
				class="page resume-document resume-sheet"
				class:dark={printTheme.value === 'dark'}
				data-resume-version="compact"
			>
				{@render sheetMeta('01', '05', '프로필과 경력 요약')}
				{@render documentHeader()}

				<section class="resume-thesis" aria-label="요약">
					{#each PRINT_RESUME_SUMMARY as paragraph (paragraph.text)}
						<p>
							<InlineHighlights text={paragraph.text} highlights={paragraph.highlights} />
						</p>
					{/each}
				</section>

				<section
					class="resume-career-history resume-overview"
					aria-labelledby="resume-career-history"
				>
					<h2 id="resume-career-history" class="pr-label">경력</h2>
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
										<span class="resume-summary-responsibilities"
											>{experience.responsibilities}</span
										>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
					<p class="resume-detail-pointer">
						프로젝트별 문제·조치·결과는 <a href="#career-detail">경력기술서</a>에서 확인할 수
						있습니다.
					</p>
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
					<h2 id="resume-skills" class="pr-label">기술</h2>
					<div class="resume-skill-list">
						{#each PRINT_SKILLS as skill (skill.label)}
							<p>
								<strong>{skill.label}</strong><span class="resume-skill-value">{skill.value}</span>
							</p>
						{/each}
					</div>
				</section>
			</article>

			{@render careerPages('02', '03', '04', '05', '05', true)}
		</div>
	{/if}
</div>
