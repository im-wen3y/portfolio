<script lang="ts">
	import { resolve } from '$app/paths';
	import { PORTFOLIO_PROJECTS } from '$lib/data/portfolio-projects';

	type Career = {
		period: string;
		duration: string;
		lead?: boolean;
		company: string;
		role: string;
		summary: string;
		bullets: string[];
	};

	type SkillGroup = { title: string; skills: string[] };
	type Education = {
		period: string;
		ongoing: boolean;
		title: string;
		text?: string;
		topics?: { title: string; text: string }[];
	};

	const STATS = [
		{ value: '6년 10개월', label: '총 개발 경력' },
		{ value: '6명', label: '프론트엔드 파트 운영' },
		{ value: '2회', label: 'JSP → React 마이그레이션 주도' },
		{ value: '15,000줄', label: '단일 JS 파일 React 전환' }
	];

	const CAREERS: Career[] = [
		{
			period: '2024.04 – 2026.06',
			duration: '2년 2개월',
			lead: true,
			company: '라텔앤드파트너즈',
			role: '프론트엔드 파트 리더',
			summary:
				'아큐브 소비자 웹·앱, 안경사용 프로그램, 영업·CS 내부 시스템을 개발·운영하고 6명 규모의 프론트엔드 파트를 이끌었습니다. 기획 리뷰부터 업무 범위·예상 작업량·우선순위를 조율하고 프로젝트별 담당자와 운영 이슈 대응 흐름을 정리했습니다.',
			bullets: [
				'안경사 통합관리 시스템의 React 리뉴얼에서 레거시 정책을 문서화하고 프론트엔드 개발자 3명의 업무와 요구사항 우선순위를 조율',
				'서로 다른 UI의 렌즈 계산기 3개를 Headless 공통 구조로 통합해 입력·포커스 이동·유효성 검사 기준을 표준화',
				'JSP 경험이 없던 신입 4명의 프로젝트 세팅과 개발 방식을 문서화하고, 이벤트 업무 이후 3명은 관리자 기능, 1명은 모바일 시스템과 주문·결제 영역으로 담당 범위를 확대',
				'주임급 개발자의 React 학습과 프로젝트 리드를 지원해 스마트피팅 운영 반영 후 유지보수까지 독립적으로 맡을 수 있도록 역할을 확장'
			]
		},
		{
			period: '2021.04 – 2023.08',
			duration: '2년 4개월',
			company: '샤플앤컴퍼니',
			role: '프론트엔드 개발자',
			summary:
				'현장 직원을 관리하는 Shopl의 관리자 대시보드와 채팅 서비스를 개발·운영했습니다. 운영 중인 JSP 화면의 점진적 React 전환과 국내·해외 결제, 대규모 근무지 지도 기능을 맡았습니다.',
			bullets: [
				'React 선택 근거와 점진 전환 방식을 대표·PM에게 설명해 기존 서비스를 중단하지 않고 약 1년간 JSP와 React를 병행 운영',
				'아임포트·Stripe를 연동해 국내·해외 고객이 요금제와 결제수단을 직접 관리하는 흐름을 구현',
				'근무지 마커 2만 개로 브라우저가 멈추던 ‘할 일’ 분석 지도에 국내·해외 지도별 클러스터링을 적용해 운영 화면 정상화'
			]
		},
		{
			period: '2018.07 – 2020.11',
			duration: '2년 4개월',
			company: '아이티키',
			role: 'SI 개발팀 사원',
			summary:
				'신한DS LMS, 롯데마트 웹·웹앱, 공공기관 사이트와 미스터피자 리뉴얼을 수행했습니다. 관리자·회원·주문·결제 화면과 API를 개발하고 운영 장애에 대응했으며, 신규 팀원을 위한 업무·테스트 가이드를 작성했습니다.',
			bullets: []
		}
	];

	const TROUBLES = [
		{
			label: '외부 API 연동 장애',
			title: '서버 로그를 직접 읽어 Spring Security 차단을 특정',
			text: '본인인증 요청이 응답 없이 멈춰 애플리케이션 코드와 서버 설정 중 원인을 구분해야 했습니다. 로그와 XML 보안 설정을 확인해 CSRF 차단을 특정하고 서비스를 우선 정상화한 뒤, 백엔드팀의 정식 예외 처리로 연결했습니다.'
		},
		{
			label: '배포 3일 전 기기 변경',
			title: 'DPR·논리적 뷰포트 계산으로 반응형 재설계',
			text: '지급 기기가 Lenovo Tab M9으로 바뀌면서 태블릿이 모바일 화면으로 인식됐습니다. 물리 해상도와 DPR로 CSS 논리적 너비를 계산해 원인을 찾고, 확정된 기기 기준으로 반응형 구간을 다시 정했습니다.'
		},
		{
			label: '마커 2만 개 렌더링',
			title: '지도별 클러스터링으로 흰 화면 정상화',
			text: '전체 근무지 마커를 한 번에 표시하면 브라우저가 멈췄습니다. Google Maps와 NAVER Maps의 기능 차이를 반영한 클러스터링을 구현해 지역별 작업률과 직원별 완료 상태를 확인할 수 있도록 운영 화면을 정상화했습니다.'
		}
	];

	const SKILL_GROUPS: SkillGroup[] = [
		{
			title: '프론트엔드',
			skills: ['React', 'JavaScript', 'TypeScript', 'JSP', 'Emotion']
		},
		{
			title: '상태 · 데이터',
			skills: ['Zustand', 'TanStack Query']
		},
		{
			title: '빌드 · 협업',
			skills: ['Storybook', 'Vite', 'Git', 'Jira', 'Confluence', 'Claude Code']
		}
	];

	const TAG_GROUPS = [
		{
			title: '외부 연동 · 레거시',
			tags: [
				'아임포트',
				'Stripe',
				'Google Maps · NAVER Maps API',
				'NAVER OCR / AWS Text Scan',
				'Okta',
				'JSP'
			]
		},
		{
			title: '협업 · 도구',
			tags: ['Git', 'Jira', 'Confluence', 'Slack', 'Notion', 'Figma', 'Claude Code', 'Cursor AI']
		}
	];

	const EDUCATION: Education[] = [
		{
			period: '2012.02 – 2017.08',
			ongoing: false,
			title: '대진대학교',
			text: '문헌정보학과 전공 · 컴퓨터소프트웨어융합 부전공'
		}
	];
</script>

<svelte:head>
	<title>Portfolio · 송누리</title>
</svelte:head>

<div class="page">
	<section class="hero container">
		<p class="hero-meta">
			<span class="hero-meta-dot" aria-hidden="true"></span>
			<span>프론트엔드 파트 리더</span>
			<span class="hero-meta-sep" aria-hidden="true">·</span>
			<span>React · TypeScript</span>
			<span class="hero-meta-sep" aria-hidden="true">·</span>
			<span>총 경력 6년 10개월</span>
		</p>
		<h1>레거시의 맥락을 읽고, 팀이 계속 운영할 수 있는 프론트엔드를 만듭니다.</h1>
		<p class="lede">
			사용자와 운영자가 막히는 흐름을 기준으로 레거시 정책과 제약을 분석하고, React 기반 웹·앱
			전환과 모바일 리뉴얼을 이끌어왔습니다. 파트 리더로 기획·디자인·백엔드팀과 해결 범위를
			조율하고, 공통 구조와 문서화된 기준으로 팀이 같은 문제를 반복하지 않도록 개선합니다.
		</p>
		<div class="hero-links">
			<a class="btn-primary" href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
			<a class="btn-ghost" href="https://github.com/im-wen3y" target="_blank" rel="noreferrer"
				>GitHub</a
			>
			<a class="btn-ghost" href="https://velog.io/@imwen3y" target="_blank" rel="noreferrer"
				>velog</a
			>
		</div>
		<div class="stats">
			{#each STATS as stat (stat.label)}
				<div class="stat">
					<div class="stat-value">{stat.value}</div>
					<div class="stat-label">{stat.label}</div>
				</div>
			{/each}
		</div>
	</section>

	<section id="career" class="container">
		<div class="eyebrow">Career</div>
		<h2>경력</h2>
		<div class="career-list">
			{#each CAREERS as career (career.company)}
				<article class="career-row">
					<div>
						<div class="career-period">{career.period}</div>
						<div class="career-duration">{career.duration}</div>
						{#if career.lead}
							<span class="pill pill-primary">Lead</span>
						{/if}
					</div>
					<div>
						<h3>{career.company}</h3>
						<div class="career-role">{career.role}</div>
						<p class="career-summary">{career.summary}</p>
						{#if career.bullets.length > 0}
							<ul class="bullets">
								{#each career.bullets as bullet (bullet)}
									<li>{bullet}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section id="work" class="container">
		<div class="eyebrow">Selected Work</div>
		<h2>대표 프로젝트</h2>
		<p class="section-note">
			각 프로젝트의 문제 정의 · 직접 맡은 범위 · 결과를 확인할 수 있습니다.
		</p>
		<div class="card-grid two">
			{#each PORTFOLIO_PROJECTS as project (project.id)}
				<article class="card project-card">
					<div class="card-head">
						<span class="card-meta">{project.meta}</span>
						{#if project.badge}
							<span class="pill pill-{project.badge.tone}">{project.badge.label}</span>
						{/if}
					</div>
					<h3>{project.title}</h3>
					<p class="card-summary">{project.summary}</p>
					<div class="chips">
						{#each project.stack as tech (tech)}
							<span class="chip">{tech}</span>
						{/each}
					</div>
					<a class="project-link" href={resolve('/portfolio/project/[id]', { id: project.id })}>
						상세 보기 <span aria-hidden="true">→</span>
					</a>
				</article>
			{/each}
		</div>
	</section>

	<section id="trouble" class="dark">
		<div class="container">
			<div class="eyebrow on-dark">Troubleshooting</div>
			<h2 class="on-dark">직접 원인을 특정해 해결한 문제들</h2>
			<p class="section-note on-dark">
				증상만 고치지 않고 로그·기기 스펙·데이터 규모를 확인해 문제가 발생한 경계를 좁혔습니다.
			</p>
			<div class="card-grid three">
				{#each TROUBLES as trouble (trouble.label)}
					<article class="card card-dark">
						<div class="eyebrow on-dark">{trouble.label}</div>
						<h3>{trouble.title}</h3>
						<p>{trouble.text}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section id="skills" class="container">
		<div class="eyebrow">Skills</div>
		<h2>기술 스택</h2>
		<div class="card-grid three">
			{#each SKILL_GROUPS as group (group.title)}
				<div class="card">
					<div class="detail-title">{group.title}</div>
					<ul class="skill-list">
						{#each group.skills as skill (skill)}
							<li>
								<span>{skill}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		<div class="card-grid two tag-groups">
			{#each TAG_GROUPS as group (group.title)}
				<div class="card raised">
					<div class="detail-title">{group.title}</div>
					<div class="chips">
						{#each group.tags as tag (tag)}
							<span class="chip lg">{tag}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section id="ai" class="container">
		<div class="eyebrow">AI in Practice</div>
		<h2>AI를 프로세스에 편입시킨 방식</h2>
		<p class="section-note">
			코드 자동완성에 그치지 않고 개발 기준과 커리어 기록을 구조화하고, 생성된 변경을 직접 검토하는
			흐름에 활용합니다.
		</p>
		<div class="card-grid two">
			<article class="card">
				<span class="pill pill-secondary">Workflow</span>
				<h3>개인 개발 워크플로우에 Claude Code 통합</h3>
				<p>
					프로젝트 가이드(<code>CLAUDE.md</code>)를 작성하고, 코드 컨벤션 문서를 Claude Code skills
					형태로 정리해 반복해서 확인할 개발 기준과 작업 절차를 관리하고 있습니다.
				</p>
			</article>
			<article class="card">
				<span class="pill pill-primary">Knowledge</span>
				<h3>AI 기반 개인 커리어 위키 구축</h3>
				<p>
					AI를 활용해 이력서·Notion·GitHub 기록을 수집하고 프로젝트·스킬별로 구조화하는 스킬을 직접
					구현했습니다. 생성된 변경을 검토한 뒤 커밋·푸시하도록 지시하는 방식으로 커리어 위키를
					운영하고 있습니다.
				</p>
			</article>
		</div>
	</section>

	<section id="edu" class="container">
		<div class="eyebrow">Education</div>
		<h2>학력</h2>
		<div class="card-grid two">
			{#each EDUCATION as edu (edu.title)}
				<article class="card">
					<div class="card-head start">
						<span class="card-meta">{edu.period}</span>
						{#if edu.ongoing}
							<span class="pill pill-secondary">Ongoing</span>
						{/if}
					</div>
					<h3>{edu.title}</h3>
					{#if edu.topics}
						<ul class="education-topics">
							{#each edu.topics as topic (topic.title)}
								<li>
									<strong>{topic.title}</strong>
									<span>{topic.text}</span>
								</li>
							{/each}
						</ul>
					{:else if edu.text}
						<p>{edu.text}</p>
					{/if}
				</article>
			{/each}
		</div>
	</section>

	<div class="container closing">
		<div class="closing-title">함께 일할 이야기를 나눠요</div>
		<a class="closing-mail" href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
	</div>
</div>

<style>
	.page {
		background: var(--color-canvas);
		color: var(--text-body);
		padding-bottom: 96px;
	}

	.container {
		max-width: var(--container-max, 1200px);
		margin: 0 auto;
		padding: 56px clamp(20px, 5vw, 64px);
	}

	section[id] {
		scroll-margin-top: 88px;
	}

	/* Buttons */
	.btn-primary,
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		padding: 11px 22px;
		border-radius: var(--radius-default);
		font-size: 16px;
		font-weight: 700;
	}

	.btn-primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.btn-primary:hover {
		background: var(--color-primary-active);
	}

	.btn-ghost {
		border: 1.5px solid var(--border-default);
		color: var(--text-heading);
	}

	.btn-ghost:hover {
		border-color: var(--border-strong);
	}

	/* Hero */
	.hero {
		padding-top: 72px;
	}

	/* 히어로 메타는 정보이지 조작 대상이 아니다 — 아래 CTA 버튼과 형태를 겹치지 않게 둔다. */
	.hero-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		margin-bottom: 28px;
		font-size: 14px;
		font-weight: 600;
		line-height: 1.6;
		color: var(--color-muted);
	}

	.hero-meta-dot {
		width: 7px;
		height: 7px;
		border-radius: var(--radius-full);
		background: var(--color-primary);
	}

	.hero-meta-sep {
		color: var(--color-hairline);
	}

	h1 {
		max-width: 860px;
		margin-bottom: 24px;
		font-family: var(--font-display);
		font-size: clamp(32px, 5vw, 52px);
		font-weight: 800;
		line-height: 1.25;
		letter-spacing: -0.025em;
		color: var(--text-heading);
	}

	.lede {
		max-width: 660px;
		margin-bottom: 36px;
		font-size: 18px;
		line-height: 1.7;
	}

	.hero-links {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-bottom: 56px;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1px;
		background: var(--border-default);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.stat {
		background: var(--surface-card-raised);
		padding: 24px;
	}

	.stat-value {
		font-family: var(--font-display);
		font-size: 34px;
		font-weight: 800;
		line-height: 1.2;
		color: var(--text-heading);
	}

	.stat-label {
		margin-top: 6px;
		font-size: 13px;
		font-weight: 600;
		color: var(--color-muted);
	}

	/* Section shells */
	.eyebrow {
		margin-bottom: 10px;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-primary-strong);
	}

	h2 {
		margin-bottom: 12px;
		font-family: var(--font-display);
		font-size: clamp(24px, 3vw, 32px);
		font-weight: 700;
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--text-heading);
	}

	.section-note {
		max-width: 640px;
		margin-bottom: 32px;
		font-size: 16px;
		color: var(--color-muted);
	}

	h2 + .card-grid,
	h2 + .career-list {
		margin-top: 40px;
	}

	/* Career */
	.career-row {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 32px;
		padding: 32px 0;
		border-top: 1px solid var(--border-default);
	}

	.career-row:last-child {
		border-bottom: 1px solid var(--border-default);
	}

	.career-period {
		font-size: 14px;
		font-weight: 700;
		color: var(--text-heading);
	}

	.career-duration {
		margin-top: 6px;
		font-size: 13px;
		color: var(--color-muted);
	}

	.career-row h3 {
		margin-bottom: 4px;
		font-family: var(--font-display);
		font-size: 22px;
		font-weight: 700;
		color: var(--text-heading);
	}

	.career-role {
		margin-bottom: 14px;
		font-size: 15px;
		font-weight: 600;
		color: var(--color-secondary-strong);
	}

	.career-summary {
		max-width: 720px;
		margin-bottom: 16px;
	}

	.bullets {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding-left: 18px;
		font-size: 15px;
		line-height: 1.7;
	}

	.bullets.sm {
		gap: 6px;
		font-size: 14px;
	}

	/* Cards */
	.card-grid {
		display: grid;
		gap: 24px;
	}

	.card-grid.two {
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	}

	.card-grid.three {
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}

	.tag-groups {
		margin-top: 32px;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 28px;
		background: var(--surface-card);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
	}

	.card.raised {
		padding: 24px;
		background: var(--surface-card-raised);
	}

	.card h3 {
		margin-bottom: 12px;
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 700;
		line-height: 1.5;
		color: var(--text-heading);
	}

	.project-card h3 {
		font-size: 22px;
		line-height: 1.4;
	}

	.project-card .chips {
		margin-bottom: 20px;
	}

	.card p {
		font-size: 15px;
		line-height: 1.7;
	}

	.education-topics {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-left: 18px;
	}

	.education-topics li::marker {
		color: var(--color-primary-strong);
	}

	.education-topics strong,
	.education-topics span {
		display: block;
	}

	.education-topics strong {
		margin-bottom: 3px;
		color: var(--text-heading);
		font-size: 15px;
	}

	.education-topics span {
		font-size: 14px;
		line-height: 1.7;
	}

	.card code {
		padding: 1px 6px;
		border-radius: var(--radius-default);
		background: var(--surface-recessed);
		font-family: var(--font-code);
		font-size: 14px;
	}

	.card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		width: 100%;
		margin-bottom: 14px;
	}

	.card-head.start {
		justify-content: flex-start;
		margin-bottom: 12px;
	}

	.card-meta {
		font-size: 13px;
		font-weight: 700;
		color: var(--color-muted);
	}

	.card-summary {
		margin-bottom: 18px;
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

	.career-row .pill {
		margin-top: 12px;
	}

	.card > .pill {
		margin-bottom: 14px;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.chip {
		padding: 4px 10px;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-default);
		background: var(--surface-recessed);
		font-size: 13px;
		font-weight: 600;
		color: var(--text-body);
	}

	.chip.lg {
		padding: 5px 12px;
		background: var(--surface-card);
		font-size: 14px;
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: auto;
		padding: 9px 16px;
		border: 1.5px solid var(--border-default);
		border-radius: var(--radius-default);
		font-size: 14px;
		font-weight: 700;
		color: var(--text-heading);
		transition:
			border-color 0.15s ease,
			color 0.15s ease;
	}

	.project-link:hover {
		border-color: var(--border-strong);
		color: var(--color-primary-strong);
	}

	.project-link:focus-visible {
		outline: 2px solid var(--color-ink);
		outline-offset: 3px;
	}

	.detail-title {
		margin-bottom: 6px;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-secondary-strong);
	}

	/* Dark troubleshooting section */
	.dark {
		margin-top: 56px;
		padding: 72px 0;
		background: var(--color-surface-dark);
	}

	.dark .container {
		padding-block: 0;
	}

	.on-dark {
		color: var(--color-on-dark);
	}

	.eyebrow.on-dark {
		color: var(--color-primary);
	}

	.section-note.on-dark,
	.card-dark p {
		color: var(--color-on-dark-soft);
	}

	.card-dark {
		background: var(--color-surface-dark-elevated);
		border-color: var(--color-surface-dark-soft);
	}

	/* `.card h3`와 같은 (0,1,1) 특정성이어야 잉크색 기본값을 덮는다. */
	.card-dark h3 {
		font-size: 19px;
		color: var(--color-on-dark);
	}

	.card-dark p {
		font-size: 14px;
	}

	/* Skills */
	.skill-list {
		display: grid;
		width: 100%;
		list-style: none;
	}

	.skill-list li {
		padding: 10px 0;
		border-bottom: 1px solid var(--border-default);
		font-size: 14px;
		font-weight: 600;
		color: var(--text-heading);
	}

	.skill-list li:last-child {
		border-bottom: 0;
	}

	/* Closing */
	.closing {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 32px;
		margin-top: 24px;
		padding-top: 40px;
		border-top: 1px solid var(--border-default);
	}

	.closing-title {
		font-family: var(--font-display);
		font-size: 24px;
		font-weight: 800;
		color: var(--text-heading);
	}

	.closing-mail {
		font-size: 16px;
		font-weight: 600;
		color: var(--link-color);
	}

	.closing-mail:hover {
		color: var(--link-color-hover);
	}

	@media (max-width: 768px) {
		.career-row {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
</style>
