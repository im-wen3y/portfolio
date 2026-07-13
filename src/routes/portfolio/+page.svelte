<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import IntroSequence from '$lib/components/portfolio/IntroSequence.svelte';
	import ChatFab from '$lib/components/portfolio/ChatFab.svelte';
	import QuestCard from '$lib/components/portfolio/QuestCard.svelte';
	import ExpDetailModal from '$lib/components/portfolio/ExpDetailModal.svelte';
	import ProjectCard from '$lib/components/portfolio/ProjectCard.svelte';
	import SkillBelt from '$lib/components/portfolio/SkillBelt.svelte';
	import ContactList from '$lib/components/portfolio/ContactList.svelte';
	import { STAGE_LABELS } from '$lib/portfolio/pixel-pet';
	import { SvelteSet } from 'svelte/reactivity';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { exps, skills, contacts } from '$lib/portfolio/content';
	import { projects } from '$lib/data/projects';
	import { projectVisuals } from '$lib/portfolio/project-visuals';

	const SECTION_IDS = ['hero', 'projects', 'experience', 'skills', 'contact'];
	const GNB_HEIGHT = 64;
	const INTRO_KEY = 'portfolio-intro-seen';

	let introDone = $state(false);
	let visited = new SvelteSet<string>();
	let detailIndex = $state<number | null>(null);
	let projectsInView = $state(false);

	// 인트로 로딩 오버레이는 세션당 한 번만 (상세 페이지 갔다 돌아올 때 재생 방지)
	onMount(() => {
		if (sessionStorage.getItem(INTRO_KEY)) introDone = true;
	});

	function finishIntro() {
		introDone = true;
		sessionStorage.setItem(INTRO_KEY, '1');
	}

	function openProject(id: string) {
		goto(resolve('/portfolio/project/[id]', { id }));
	}

	// 커서를 따라다니는 앰비언트 글로우 + 터미널 크로스헤어 (초기값은 화면 밖)
	let glowX = $state(-9999);
	let glowY = $state(-9999);
	let cursorHot = $state(false);

	function handlePointer(e: PointerEvent) {
		glowX = e.clientX;
		glowY = e.clientY;
		const t = e.target as Element | null;
		cursorHot = !!t?.closest('a, button, [role="button"]');
	}

	const stage = $derived(Math.min(visited.size, 4));
	const selectedExp = $derived(detailIndex != null ? exps[detailIndex] : null);

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
					if (entry.target.id === 'projects') {
						projectsInView = entry.isIntersecting;
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

<svelte:window onpointermove={handlePointer} />

<div class="stage" style="--ac: #21F1A8; --sec: #FF4D9D; --gnb-height: {GNB_HEIGHT}px;">
	<svg
		class="crosshair"
		class:hot={cursorHot}
		style="transform: translate3d({glowX}px, {glowY}px, 0)"
		width="26"
		height="26"
		viewBox="0 0 26 26"
		aria-hidden="true"
	>
		<line x1="13" y1="0.5" x2="13" y2="8" />
		<line x1="13" y1="18" x2="13" y2="25.5" />
		<line x1="0.5" y1="13" x2="8" y2="13" />
		<line x1="18" y1="13" x2="25.5" y2="13" />
		<rect class="ch-caret" x="11.5" y="11.5" width="3" height="3" />
	</svg>

	{#if !introDone}
		<IntroSequence onDone={finishIntro} />
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
							레거시를 React로 옮기는 일을 설득에서 주도로 해왔고, 문서에 없는 문제도 근본 원인까지
							파고들어 직접 풀어온 7년차 프론트엔드입니다.
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

	{#if introDone && !projectsInView}
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

	<section id="projects" class="section">
		<h2 class="heading reveal" use:reveal>■ PROJECTS</h2>
		<p class="note reveal" use:reveal={{ delay: 60 }}>
			사내·보안 이슈로 실제 화면 스크린샷은 공개할 수 없어, 각 프로젝트의 구조를 재구성해
			보여드립니다. 카드를 누르면 문제·해결·성과를 상세 페이지에서 볼 수 있어요.
		</p>
		<div class="project-grid">
			{#each projects as project, i (project.id)}
				<div class="reveal" use:reveal={{ delay: Math.min(i, 5) * 70 }}>
					<ProjectCard
						{project}
						visual={projectVisuals[project.id]}
						onOpen={() => openProject(project.id)}
					/>
				</div>
			{/each}
		</div>
	</section>

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

	<section id="skills" class="section">
		<h2 class="heading reveal" use:reveal>◆ SKILLS — INVENTORY</h2>
		<p class="note reveal" use:reveal={{ delay: 60 }}>
			×N은 실제로 그 기술을 사용한 프로젝트 수예요.
		</p>
		<div class="reveal" use:reveal={{ delay: 120 }}>
			<SkillBelt groups={skills} {projects} />
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

	/* 터미널 크로스헤어 커서 */
	.crosshair {
		position: fixed;
		top: 0;
		left: 0;
		margin: -13px 0 0 -13px;
		pointer-events: none;
		z-index: 300;
		color: var(--ac);
	}

	.crosshair line {
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
	}

	.crosshair .ch-caret {
		fill: currentColor;
		animation: ch-blink 1.05s steps(1) infinite;
	}

	.crosshair.hot {
		color: var(--sec);
	}

	@keyframes ch-blink {
		0%,
		49% {
			opacity: 1;
		}
		50%,
		100% {
			opacity: 0;
		}
	}

	/* 정밀 포인터(마우스)에서만 네이티브 커서 숨기고 크로스헤어로 대체 */
	@media (hover: hover) and (pointer: fine) {
		.stage,
		.stage :global(*) {
			cursor: none !important;
		}
	}

	/* 터치기기: 크로스헤어 숨김, 네이티브 커서 유지 */
	@media (hover: none), (pointer: coarse) {
		.crosshair {
			display: none;
		}
	}

	/* 모션 최소화: 캐럿 깜빡임만 정지, 크로스헤어는 유지 */
	@media (prefers-reduced-motion: reduce) {
		.crosshair .ch-caret {
			animation: none;
			opacity: 1;
		}
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
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 18px;
	}

	.project-grid > .reveal {
		display: flex;
	}

	.project-grid > .reveal > :global(*) {
		width: 100%;
	}

	@media (max-width: 640px) {
		.pet-dock {
			right: 8px;
		}
	}
</style>
