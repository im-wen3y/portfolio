<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import IntroSequence from '$lib/components/portfolio/IntroSequence.svelte';
	import ChatFab from '$lib/components/portfolio/ChatFab.svelte';
	import QuestCard from '$lib/components/portfolio/QuestCard.svelte';
	import ExpDetailModal from '$lib/components/portfolio/ExpDetailModal.svelte';
	import ProjectCard from '$lib/components/portfolio/ProjectCard.svelte';
	import ProjectDetailModal from '$lib/components/portfolio/ProjectDetailModal.svelte';
	import SkillRadarChart from '$lib/components/portfolio/SkillRadarChart.svelte';
	import SkillBelt from '$lib/components/portfolio/SkillBelt.svelte';
	import ContactList from '$lib/components/portfolio/ContactList.svelte';
	import { STAGE_LABELS } from '$lib/portfolio/pixel-pet';
	import { SvelteSet } from 'svelte/reactivity';
	import { exps, skills, skillRadar, contacts } from '$lib/portfolio/content';
	import { projects } from '$lib/data/projects';
	import { projectVisuals } from '$lib/portfolio/project-visuals';

	const SECTION_IDS = ['hero', 'experience', 'projects', 'skills', 'contact'];
	const GNB_HEIGHT = 64;

	let introDone = $state(false);
	let visited = new SvelteSet<string>();
	let detailIndex = $state<number | null>(null);
	let selectedProjectIndex = $state<number | null>(null);
	let experienceInView = $state(false);

	const stage = $derived(Math.min(visited.size, 4));
	const selectedExp = $derived(detailIndex != null ? exps[detailIndex] : null);
	const selectedProject = $derived(
		selectedProjectIndex != null ? projects[selectedProjectIndex] : null
	);

	function scrollToProjects() {
		document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	$effect(() => {
		if (!introDone) return;
		const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
			(el): el is HTMLElement => el !== null
		);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visited.add(entry.target.id);
					}
					if (entry.target.id === 'experience') {
						experienceInView = entry.isIntersecting;
					}
				}
			},
			{ threshold: 0.35 }
		);
		sections.forEach((s) => observer.observe(s));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<title>Portfolio · 송누리</title>
</svelte:head>

<div class="stage" style="--ac: #21F1A8; --sec: #FF4D9D; --gnb-height: {GNB_HEIGHT}px;">
	{#if !introDone}
		<IntroSequence onDone={() => (introDone = true)} />
	{:else}
		<ChatFab />
	{/if}

	<div class="pet-dock">{STAGE_LABELS[stage]}</div>

	<section id="hero" class="hero">
		<div class="hero-atmosphere" aria-hidden="true"></div>

		<div class="hero-inner">
			<div class="hero-card reveal" use:reveal>
				<div class="hero-grid">
					<div class="hero-text">
						<span class="hero-tag">
							<span class="hero-tag-dot"></span>FRONTEND DEVELOPER
						</span>
						<h1 class="hero-name">송누리</h1>
						<p class="hero-pitch">
							전사 서비스를 기획 단계부터 리드하고, 팀의 생산성을 끌어올리는 프론트엔드 파트
							리더입니다.
						</p>
					</div>

					<div class="hero-code">
						<div class="hero-code-chrome">
							<span class="code-dot"></span><span class="code-dot"></span><span class="code-dot"
							></span>
							<span class="code-filename">song-nuri.ts</span>
						</div>
						<pre class="hero-code-body"><code
								><span class="syn-comment">// song-nuri.ts</span>
<span class="syn-keyword">const</span> <span class="syn-var">dev</span> <span class="syn-punct"
									>=</span
								> <span class="syn-punct">{'{'}</span>
  <span class="syn-prop">role</span><span class="syn-punct">:</span> <span class="syn-string"
									>'프론트엔드 파트 리더'</span
								><span class="syn-punct">,</span>
  <span class="syn-prop">career</span><span class="syn-punct">:</span> <span class="syn-string"
									>'7년차'</span
								><span class="syn-punct">,</span>
  <span class="syn-prop">stack</span><span class="syn-punct">:</span> <span class="syn-punct"
									>[</span
								><span class="syn-string">'React'</span><span class="syn-punct">,</span> <span
									class="syn-string">'TypeScript'</span
								><span class="syn-punct">]</span><span class="syn-punct">,</span>
  <span class="syn-prop">status</span><span class="syn-punct">:</span> <span class="syn-string"
									>'OPEN_TO_WORK'</span
								><span class="syn-punct">,</span>
<span class="syn-punct">}</span></code
							></pre>
					</div>
				</div>
			</div>
		</div>
	</section>

	{#if introDone && !experienceInView}
		<button
			class="hero-scroll-btn"
			use:reveal={{ delay: 260 }}
			onclick={scrollToProjects}
			aria-label="아래로 스크롤해 프로젝트 보러가기"
		>
			<svg
				class="scroll-chevron"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="6 9 12 15 18 9" />
			</svg>
			프로젝트 보러가기
		</button>
	{/if}

	<section id="experience" class="section">
		<h2 class="heading reveal" use:reveal>▲ EXPERIENCE — QUEST LOG</h2>
		<div class="quest-list">
			{#each exps as exp, i (exp.company)}
				<div class="reveal" use:reveal={{ delay: i * 90 }}>
					<QuestCard {exp} onOpen={() => (detailIndex = i)} />
				</div>
			{/each}
		</div>
	</section>

	<section id="projects" class="section">
		<h2 class="heading reveal" use:reveal>■ PROJECTS</h2>
		<p class="note reveal" use:reveal={{ delay: 60 }}>
			사내·보안 이슈로 실제 화면 스크린샷은 공개할 수 없어, 각 프로젝트의 구조를 재구성해
			보여드립니다.
		</p>
		<div class="project-grid">
			{#each projects as project, i (project.id)}
				<div class="reveal" use:reveal={{ delay: (i % 3) * 90 }}>
					<ProjectCard
						{project}
						visual={projectVisuals[project.id]}
						onOpen={() => (selectedProjectIndex = i)}
					/>
				</div>
			{/each}
		</div>
	</section>

	<section id="skills" class="section">
		<h2 class="heading reveal" use:reveal>◆ SKILLS</h2>
		<SkillRadarChart data={skillRadar} />
		<div class="reveal" use:reveal={{ delay: 120 }}>
			<SkillBelt groups={skills} />
		</div>
	</section>

	<section id="contact" class="section">
		<h2 class="heading reveal" use:reveal>● CONTACT</h2>
		<div class="reveal" use:reveal={{ delay: 80 }}>
			<ContactList {contacts} />
		</div>
	</section>
</div>

{#if selectedExp}
	<ExpDetailModal exp={selectedExp} onclose={() => (detailIndex = null)} />
{/if}

{#if selectedProject}
	<ProjectDetailModal project={selectedProject} onclose={() => (selectedProjectIndex = null)} />
{/if}

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}
	}

	.reveal {
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;
	}

	.reveal:global(.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}

	.stage {
		background: #171717;
		color: #eafdf6;
		font-family: 'IBM Plex Sans', sans-serif;
		min-height: 100vh;
	}

	.pet-dock {
		position: fixed;
		top: calc(var(--gnb-height) + 16px);
		right: 16px;
		z-index: 60;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.08em;
		color: var(--ac);
	}

	.hero {
		position: relative;
		overflow: hidden;
		min-height: 100vh;
		display: flex;
		align-items: center;
	}

	.hero-atmosphere {
		position: absolute;
		inset: 0;
		z-index: 0;
		background:
			radial-gradient(640px circle at 12% 18%, rgba(33, 241, 168, 0.16), transparent 60%),
			radial-gradient(560px circle at 88% 78%, rgba(255, 77, 157, 0.12), transparent 60%);
		pointer-events: none;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 1028px;
		margin: 0 auto;
		padding: 24px clamp(24px, 6vw, 96px);
	}

	.hero-card {
		background: linear-gradient(
			155deg,
			rgba(255, 255, 255, 0.14) 0%,
			rgba(255, 255, 255, 0.04) 40%,
			rgba(20, 24, 23, 0.35) 100%
		);
		backdrop-filter: blur(28px) saturate(180%);
		-webkit-backdrop-filter: blur(28px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.22);
		border-radius: 28px;
		padding: clamp(28px, 4vw, 56px);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.3),
			0 30px 80px rgba(0, 0, 0, 0.4);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: clamp(24px, 4vw, 56px);
		align-items: center;
	}

	.hero-tag {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.14em;
		color: var(--ac);
		border: 1px solid rgba(33, 241, 168, 0.3);
		border-radius: 999px;
		padding: 6px 14px;
		margin-bottom: 20px;
	}

	.hero-tag-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--ac);
		box-shadow: 0 0 8px var(--ac);
	}

	.hero-name {
		font-size: clamp(36px, 6vw, 64px);
		font-weight: 700;
		margin: 0 0 16px;
	}

	.hero-pitch {
		font-size: 16px;
		line-height: 1.7;
		color: rgba(233, 255, 248, 0.75);
		max-width: 42ch;
	}

	.hero-code {
		background: rgba(12, 17, 16, 0.6);
		border: 1px solid rgba(233, 255, 248, 0.1);
		border-radius: 14px;
		overflow: hidden;
	}

	.hero-code-chrome {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 14px;
		border-bottom: 1px solid rgba(233, 255, 248, 0.08);
	}

	.code-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(233, 255, 248, 0.2);
	}

	.code-filename {
		margin-left: 6px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		color: rgba(233, 255, 248, 0.4);
	}

	.hero-code-body {
		margin: 0;
		padding: 18px 20px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12.5px;
		line-height: 1.8;
		white-space: pre-wrap;
	}

	.syn-comment {
		color: rgba(233, 255, 248, 0.35);
	}

	.syn-keyword {
		color: var(--sec);
	}

	.syn-var {
		color: #eafdf6;
	}

	.syn-punct {
		color: rgba(233, 255, 248, 0.5);
	}

	.syn-prop {
		color: rgba(233, 255, 248, 0.75);
	}

	.syn-string {
		color: var(--ac);
	}

	.hero-scroll-btn {
		position: fixed;
		left: 50%;
		bottom: 32px;
		transform: translateX(-50%);
		z-index: 60;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		border-radius: 999px;
		background: var(--ac);
		border: none;
		color: #0b1512;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.03em;
		cursor: pointer;
		box-shadow: 0 0 24px rgba(33, 241, 168, 0.35);
		opacity: 0;
		transition:
			opacity 0.5s ease,
			box-shadow 0.15s;
	}

	.hero-scroll-btn:global(.in-view) {
		opacity: 1;
	}

	.hero-scroll-btn:hover {
		box-shadow: 0 0 32px rgba(33, 241, 168, 0.5);
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-scroll-btn {
			opacity: 1;
		}
	}

	.scroll-chevron {
		width: 16px;
		height: 16px;
		animation: bob 1.6s ease-in-out infinite;
	}

	@keyframes bob {
		50% {
			transform: translateY(4px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-chevron {
			animation: none;
		}
	}

	@media (max-width: 800px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}

		.hero-scroll-btn {
			bottom: 20px;
		}
	}

	.section {
		padding: 64px clamp(24px, 6vw, 96px);
		max-width: 1028px;
		margin: 0 auto;
	}

	.heading {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 14px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #eafdf6;
		margin: 0 0 24px;
	}

	.note {
		margin: -12px 0 24px;
		font-size: 13px;
		color: rgba(233, 255, 248, 0.5);
	}

	.quest-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.project-grid {
		columns: 3 280px;
		column-gap: 18px;
	}

	.project-grid > .reveal {
		break-inside: avoid;
		margin-bottom: 18px;
	}

	@media (max-width: 640px) {
		.pet-dock {
			right: 8px;
		}
	}
</style>
