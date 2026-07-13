<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { printTheme } from '$lib/stores/print-theme.svelte';
	import { accentTheme, ACCENT_OPTIONS } from '$lib/stores/accent-theme.svelte';
	import { projects } from '$lib/data/projects';
	import { skills } from '$lib/portfolio/content';
	import '$lib/styles/resume-print.css';
	import type { PrintProfileConfig } from './print-profile';

	let { company, resume }: { company: PrintProfileConfig; resume: Snippet } = $props();

	let view = $state<'resume' | 'portfolio'>('resume');

	function periodEnd(period: string): number {
		const end = period.split('—').pop()?.trim() ?? period;
		const match = end.match(/(\d{4})(?:\.(\d{1,2}))?/);
		if (!match) return 0;
		const year = Number(match[1]);
		const month = match[2] ? Number(match[2]) : 12;
		return year * 12 + month;
	}

	const featured = $derived(
		company.featuredProjectIds
			.map((id) => projects.find((project) => project.id === id))
			.filter((project): project is (typeof projects)[number] => project !== undefined)
	);
	const featuredIds = $derived(new Set(featured.map((project) => project.id)));
	const others = $derived(
		projects
			.filter((project) => !featuredIds.has(project.id))
			.sort((a, b) => periodEnd(b.period) - periodEnd(a.period))
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

	onMount(() => {
		printTheme.hydrate();
		accentTheme.hydrate();
	});
</script>

<svelte:head>
	<title>{view === 'resume' ? '이력서' : '포트폴리오'} — 송누리 ({company.companyLabel})</title>
	<meta
		name="description"
		content="송누리의 {company.companyLabel} 지원용 {view === 'resume'
			? '이력서'
			: '포트폴리오'} PDF 미리보기"
	/>
</svelte:head>

<!-- 화면 전용 컨트롤 바 -->
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
		<button
			type="button"
			class="theme-switch"
			onclick={() => printTheme.toggle()}
			role="switch"
			aria-checked={printTheme.value === 'dark'}
		>
			<span aria-hidden="true">{printTheme.value === 'dark' ? '☾' : '☀'}</span>
			{printTheme.value === 'dark' ? '다크' : '라이트'}
		</button>
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
		<form method="POST" action={resolve('/owner/logout')}>
			<button type="submit" class="logout-btn">로그아웃</button>
		</form>
		<button onclick={handlePrint} class="save-btn">PDF 다운로드</button>
	</div>
</div>

<div
	class="print-toast"
	class:print-toast-visible={toastVisible}
	role="status"
	aria-hidden={!toastVisible}
>
	다크 배경이 보이려면 인쇄 설정에서 '배경 그래픽'을 켜주세요.
</div>

<!-- A4 미리보기 래퍼 (화면에서 종이처럼 보임) -->
<div class="preview-wrap">
	<article class="page" class:dark={printTheme.value === 'dark'} data-accent={accentTheme.value}>
		<!-- 헤더 -->
		<header class="pr-header">
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
			{@render resume()}
		{:else}
			<p class="pr-about">{company.portfolioAbout}</p>

			<hr class="pr-divider" />

			<section class="pr-section">
				<h2 class="pr-label">Featured Projects</h2>
				<div class="pf-projects">
					{#each featured as p (p.id)}
						<div class="pf-project">
							<div class="pf-project-head">
								<strong class="pf-project-title">{p.title}</strong>
								<span class="pf-project-meta">{p.company} · {p.period}</span>
							</div>
							{#if p.role || p.contribution}
								<p class="pf-role-line">
									{#if p.role}<span class="pf-role-value">{p.role}</span>{/if}
									{#if p.role && p.contribution}<span class="pf-role-sep"> · </span>{/if}
									{#if p.contribution}<span class="pf-contribution">{p.contribution}</span>{/if}
								</p>
							{/if}
							<p class="pr-about pf-summary">{p.summary}</p>
							<p class="pr-stack">{p.stack.join(' · ')}</p>
							{#if p.problem}
								<p class="pf-case"><span class="pf-case-label">문제</span>{p.problem}</p>
							{/if}
							{#if p.solution}
								<p class="pf-case"><span class="pf-case-label">해결</span>{p.solution}</p>
							{/if}
							{#if p.result}
								<p class="pf-case"><span class="pf-case-label accent">성과</span>{p.result}</p>
							{/if}
						</div>
					{/each}
				</div>
			</section>

			<hr class="pr-divider" />

			<section class="pr-section">
				<h2 class="pr-label">Other Projects</h2>
				<div class="pf-mini-grid">
					{#each others as p (p.id)}
						<div class="pf-mini">
							<div class="pf-mini-top">
								<strong class="pf-mini-title">{p.title}</strong>
								<span class="pf-mini-period">{p.period}</span>
							</div>
							<p class="pf-mini-meta">{p.company} · {p.stack.slice(0, 4).join(' · ')}</p>
							<p class="pf-mini-sum">{p.summary}</p>
						</div>
					{/each}
				</div>
			</section>

			<hr class="pr-divider" />

			<section class="pr-section">
				<h2 class="pr-label">Skills</h2>
				<div class="pf-skills">
					{#each skills as group (group.title)}
						<div class="pf-skill-row">
							<span class="pf-skill-title">{group.title}</span>
							<div class="pf-chips">
								{#each group.items as item (item)}
									<span class="pf-chip">{item}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}
	</article>
</div>
