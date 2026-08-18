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

	const CAREERS: Career[] = [
		{
			period: '2024.04 - 2026.06',
			duration: '2년 2개월',
			lead: true,
			company: '라텔앤드파트너즈',
			role: '프론트엔드 파트 리더',
			summary:
				'아큐브 소비자 웹·앱, 안경사용 프로그램, 영업·CS 내부 시스템을 개발·운영하고 6명 규모의 프론트엔드 파트를 이끌었습니다. 기획 리뷰부터 업무 범위·예상 작업량·우선순위를 조율하고 프로젝트별 담당자와 운영 이슈 대응 흐름을 정리했습니다.',
			bullets: [
				'안경사 통합관리 시스템의 React 리뉴얼에서 레거시 정책을 문서화하고 프론트엔드 개발자 3명의 업무와 요구사항 우선순위를 조율',
				'서로 다른 UI의 렌즈 계산기 3개를 Headless 공통 구조로 통합해 입력·포커스 이동·유효성 검사 기준을 표준화',
				'코드에 고정돼 있던 배너·팝업의 일정과 노출 조건을 DB·API 기반 관리 방식으로 바꿔 운영 일정 변경에 따른 프론트엔드 재배포를 제거',
				'JSP 경험이 없던 신입 4명의 프로젝트 세팅과 개발 방식을 문서화하고, 이벤트 업무 이후 3명은 관리자 기능, 1명은 모바일 시스템과 주문·결제 영역으로 담당 범위를 확대',
				'주임급 개발자의 React 학습과 프로젝트 리드를 지원해 스마트피팅 운영 반영 후 유지보수까지 독립적으로 맡을 수 있도록 역할을 확장'
			]
		},
		{
			period: '2021.04 - 2023.08',
			duration: '2년 4개월',
			company: '샤플앤컴퍼니',
			role: '프론트엔드 개발자',
			summary:
				'현장 직원을 관리하는 Shopl의 관리자 대시보드와 채팅 서비스를 개발·운영했습니다. 운영 중인 JSP 화면의 점진적 React 전환과 국내·해외 결제, 대규모 근무지 지도 기능을 맡았습니다.',
			bullets: [
				'React 선택 근거와 점진 전환 방식을 대표·PM에게 설명해 기존 서비스를 중단하지 않고 약 1년간 JSP와 React를 병행 운영',
				'아임포트·Stripe를 연동해 국내·해외 고객이 요금제와 결제수단을 직접 관리하는 흐름을 구현',
				'근무지 마커 2만 개로 브라우저가 멈추던 ‘할 일’ 분석 지도에 국내·해외 지도별 클러스터링을 적용해 운영 화면 정상화',
				'Electron 기반 채팅을 React·Vite 웹 서비스로 재구현하고, Sendbird UIkit 제약은 검색한 채널을 상단에 노출하는 방식으로 요구사항을 조정'
			]
		},
		{
			period: '2018.07 - 2020.11',
			duration: '2년 4개월',
			company: '아이티키',
			role: 'SI 개발팀 사원',
			summary:
				'신한DS LMS, 롯데마트 웹·웹앱, 공공기관 사이트와 미스터피자 리뉴얼을 수행했습니다. 관리자·회원·주문·결제 화면과 API를 개발하고 운영 장애에 대응했으며, 신규 팀원을 위한 업무·테스트 가이드를 작성했습니다.',
			bullets: [
				'고객사별 관리자·회원·주문·결제 화면과 API를 개발하고, 롯데마트 웹·웹앱의 주문·결제 운영 이슈에 대응',
				'프로젝트마다 달랐던 실행 방법과 단위 테스트 절차를 가이드로 정리해 신규 팀원의 인수인계 자료로 활용'
			]
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
			skills: ['React', 'JavaScript', 'TypeScript', 'JSP', 'Emotion', 'Storybook']
		},
		{
			title: '상태 · 데이터',
			skills: ['Zustand', 'TanStack Query']
		}
	];

	const TAG_GROUPS = [
		{
			title: '협업 도구',
			tags: ['Slack', 'Git', 'Jira', 'Confluence', 'Figma']
		},
		{
			title: '빌드 · 배포',
			tags: ['Vite', 'Jenkins', 'S3', 'CloudFront']
		},
		{
			title: 'AI 개발 도구',
			tags: ['Claude Code', 'Codex', 'Cursor AI']
		}
	];

	const EDUCATION: Education[] = [
		{
			period: '2012.02 - 2017.08',
			ongoing: false,
			title: '대진대학교',
			text: '문헌정보학과 전공 · 컴퓨터소프트웨어융합 부전공'
		}
	];

	let portfolioFeed: HTMLDivElement;
	let showTopButton = $state(false);

	function handleFeedScroll(event: Event) {
		const feed = event.currentTarget as HTMLDivElement;
		showTopButton = feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 24;
	}

	function scrollFeedToTop() {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		portfolioFeed.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
	}
</script>

<svelte:head>
	<title>Portfolio · 송누리</title>
</svelte:head>

<div class="page">
	<section class="hero container">
		<div class="profile-card">
			<img
				class="profile-avatar"
				src="/avatar-profile-3d.png"
				alt="송누리 캐릭터 아바타"
				width="512"
				height="512"
			/>
			<p class="profile-role">Frontend Developer</p>
			<h1>송누리</h1>
			<p class="profile-headline">
				레거시의 맥락을 읽고, 팀이 계속 운영할 수 있는 프론트엔드를 만듭니다.
			</p>
			<p class="lede">
				사용자와 운영자가 막히는 흐름을 기준으로 정책과 제약을 분석합니다. React 전환과 모바일
				리뉴얼을 이끌고, 팀이 반복해서 사용할 기준을 정리해왔습니다.
			</p>
			<div class="hero-links">
				<a class="btn-primary" href="mailto:gloriosd@gmail.com">이메일</a>
				<a class="btn-ghost" href="https://github.com/im-wen3y" target="_blank" rel="noreferrer"
					>GitHub</a
				>
				<a class="btn-ghost" href="https://velog.io/@imwen3y/posts" target="_blank" rel="noreferrer"
					>기술 블로그</a
				>
			</div>
		</div>
		<div class="profile-facts" aria-label="프로필 요약">
			<div><span>역할</span><strong>프론트엔드 파트 리더</strong></div>
			<div><span>주력 기술</span><strong>React / TypeScript</strong></div>
			<div><span>경력</span><strong>6년 10개월</strong></div>
		</div>
	</section>

	<div class="portfolio-feed" bind:this={portfolioFeed} onscroll={handleFeedScroll}>
		<section id="career" class="container">
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
			<h2>대표 프로젝트</h2>
			<p class="section-note">
				각 프로젝트의 문제 정의 · 직접 맡은 범위 · 결과를 확인할 수 있습니다.
			</p>
			<div class="card-grid two">
				{#each PORTFOLIO_PROJECTS as project (project.id)}
					<article
						class="card project-card"
						class:project-card-lead={project.badge?.label === 'Lead'}
					>
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
						<a
							class="project-link"
							href={resolve('/portfolio/project/[id]', { id: project.id })}
							aria-label={`${project.title} 상세 보기`}
						>
							<span class="project-link-icon" aria-hidden="true"></span>
						</a>
					</article>
				{/each}
			</div>
		</section>

		<section id="trouble" class="case-notes">
			<div class="container">
				<h2>직접 원인을 특정해 해결한 문제들</h2>
				<p class="section-note">
					증상만 고치지 않고 로그·기기 스펙·데이터 규모를 확인해 문제가 발생한 경계를 좁혔습니다.
				</p>
				<div class="case-grid">
					{#each TROUBLES as trouble (trouble.label)}
						<article class="case-card">
							<p class="case-label">{trouble.label}</p>
							<h3>{trouble.title}</h3>
							<p>{trouble.text}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="skills" class="container">
			<h2>기술 스택</h2>
			<div class="skills-layout">
				{#each SKILL_GROUPS as group (group.title)}
					<section class="skill-group" aria-labelledby={`skill-${group.title}`}>
						<h3 id={`skill-${group.title}`}>{group.title}</h3>
						<ul class="skill-list">
							{#each group.skills as skill (skill)}
								<li>
									<span>{skill}</span>
								</li>
							{/each}
						</ul>
					</section>
				{/each}
				{#each TAG_GROUPS as group (group.title)}
					<section class="tag-group" aria-labelledby={`tool-${group.title}`}>
						<h3 id={`tool-${group.title}`}>{group.title}</h3>
						<ul class="skill-list">
							{#each group.tags as tag (tag)}
								<li>{tag}</li>
							{/each}
						</ul>
					</section>
				{/each}
			</div>
		</section>

		<section id="ai" class="container">
			<h2>AI를 프로세스에 편입시킨 방식</h2>
			<p class="section-note">
				코드 자동완성에 그치지 않고 개발 기준과 커리어 기록을 구조화하고, 생성된 변경을 직접
				검토하는 흐름에 활용합니다.
			</p>
			<div class="practice-grid">
				<article class="practice-item">
					<span class="practice-label">개발 기준</span>
					<h3>개인 개발 워크플로우에 Claude Code 통합</h3>
					<p>
						프로젝트 가이드(<code>CLAUDE.md</code>)를 작성하고, 코드 컨벤션 문서를 Claude Code
						skills 형태로 정리해 반복해서 확인할 개발 기준과 작업 절차를 관리하고 있습니다.
					</p>
				</article>
				<article class="practice-item">
					<span class="practice-label">지식 관리</span>
					<h3>AI 기반 개인 커리어 위키 구축</h3>
					<p>
						AI를 활용해 이력서·Notion·GitHub 기록을 수집하고 프로젝트·스킬별로 구조화하는 스킬을
						직접 구현했습니다. 생성된 변경을 검토한 뒤 커밋·푸시하도록 지시하는 방식으로 커리어
						위키를 운영하고 있습니다.
					</p>
				</article>
			</div>
		</section>

		<section id="edu" class="container">
			<h2>학력</h2>
			<div class="education-list">
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
		<div class="sticker-stage sticker-footer">
			<div class="footer-sticker-collage" aria-hidden="true">
				<img
					class="footer-sticker footer-laptop"
					src="/footer-sticker-laptop.png"
					alt=""
					width="332"
					height="332"
				/>
				<img
					class="footer-sticker footer-browser"
					src="/footer-sticker-browser.png"
					alt=""
					width="288"
					height="288"
				/>
				<img
					class="footer-sticker footer-keyboard"
					src="/footer-sticker-keyboard.svg"
					alt=""
					width="128"
					height="128"
				/>
				<img
					class="footer-sticker footer-mouse"
					src="/footer-sticker-mouse.svg"
					alt=""
					width="128"
					height="128"
				/>
				<img
					class="footer-sticker footer-components"
					src="/footer-sticker-components.png"
					alt=""
					width="302"
					height="302"
				/>
				<img
					class="footer-sticker footer-cursor"
					src="/footer-sticker-cursor.png"
					alt=""
					width="187"
					height="187"
				/>
				<img
					class="footer-sticker footer-braces"
					src="/footer-sticker-braces.png"
					alt=""
					width="228"
					height="228"
				/>
				<img
					class="footer-sticker footer-glasses"
					src="/footer-sticker-glasses.png"
					alt=""
					width="202"
					height="202"
				/>
				<img
					class="footer-sticker footer-peace"
					src="/footer-sticker-peace.png"
					alt=""
					width="182"
					height="182"
				/>
				<img
					class="footer-sticker footer-heart"
					src="/footer-sticker-heart.png"
					alt=""
					width="160"
					height="160"
				/>
			</div>
			<p class="footer-copyright">© 2026 송누리. All rights reserved.</p>
		</div>
		<button
			class="top-button"
			class:top-button-visible={showTopButton}
			type="button"
			onclick={scrollFeedToTop}
			aria-label="콘텐츠 맨 위로 이동"
		>
			TOP
		</button>
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

	/* Section shells */
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

	/* 2026 portfolio refinement: editorial index with one evidence rail */
	.page {
		--color-secondary-strong: var(--color-primary-strong);
		--link-color: var(--color-primary-strong);
		--link-color-hover: var(--color-primary-active);
		padding-bottom: 72px;
	}

	.container {
		max-width: 1180px;
		padding-inline: clamp(22px, 6vw, 72px);
		padding-block: clamp(64px, 8vw, 104px);
	}

	.hero {
		display: flex;
		min-height: calc(100dvh - 64px);
		padding-top: clamp(96px, 14vh, 144px);
		padding-bottom: clamp(64px, 9vh, 96px);
		flex-direction: column;
		justify-content: center;
	}

	h1 {
		width: 100%;
		max-width: none;
		margin-bottom: 28px;
		font-size: clamp(40px, 6vw, 68px);
		font-weight: 760;
		line-height: 1.08;
		letter-spacing: -0.045em;
		word-break: keep-all;
		text-wrap: balance;
	}

	.lede {
		max-width: 690px;
		margin-bottom: 34px;
		font-size: clamp(17px, 2vw, 20px);
		line-height: 1.75;
		text-wrap: pretty;
	}

	.hero-links {
		margin-bottom: 0;
	}

	.btn-primary,
	.btn-ghost {
		min-height: 46px;
		padding: 10px 18px;
		border-radius: var(--radius-default);
		transition:
			transform 160ms ease,
			background-color 160ms ease,
			border-color 160ms ease;
	}

	.btn-primary:active,
	.btn-ghost:active,
	.project-link:active {
		transform: translateY(1px);
	}

	.btn-primary:focus-visible,
	.btn-ghost:focus-visible {
		outline: 2px solid var(--color-ink);
		outline-offset: 3px;
	}

	h2 {
		margin-bottom: 18px;
		font-size: clamp(30px, 4vw, 44px);
		font-weight: 740;
		letter-spacing: -0.035em;
	}

	.section-note {
		max-width: 600px;
		margin-bottom: 42px;
		line-height: 1.7;
	}

	.career-list {
		margin-top: 32px;
	}

	.career-row {
		grid-template-columns: minmax(180px, 0.7fr) minmax(0, 2.3fr);
		gap: clamp(28px, 6vw, 72px);
		padding: 40px 0;
	}

	.career-row h3 {
		font-size: clamp(22px, 2.5vw, 28px);
		letter-spacing: -0.025em;
	}

	.career-summary,
	.bullets {
		max-width: 760px;
	}

	#work .card-grid.two {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
	}

	.project-card {
		position: relative;
		display: grid;
		min-height: 0;
		grid-template-columns: minmax(180px, 0.65fr) minmax(0, 1.75fr) minmax(150px, 0.55fr);
		grid-template-areas:
			'meta title link'
			'meta summary link'
			'meta stack link';
		gap: 12px clamp(28px, 5vw, 64px);
		padding: clamp(32px, 5vw, 52px) clamp(20px, 3vw, 32px);
		border: 0;
		border-bottom: 1px solid var(--border-default);
		border-radius: 0;
		background: transparent;
		transition: background-color 180ms ease;
	}

	.project-card:hover {
		background: color-mix(in srgb, var(--surface-card-raised) 44%, transparent);
	}

	.project-card:focus-within {
		background: color-mix(in srgb, var(--surface-card-raised) 58%, transparent);
	}

	.project-card-lead {
		box-shadow: inset 3px 0 0 var(--color-primary);
	}

	.project-card h3 {
		grid-area: title;
		margin: 0;
		font-size: clamp(22px, 2.6vw, 30px);
		line-height: 1.28;
		letter-spacing: -0.025em;
		word-break: keep-all;
	}

	.project-card .card-summary {
		grid-area: summary;
		max-width: 58ch;
		margin: 0;
		color: var(--color-body-strong);
		text-wrap: pretty;
	}

	.project-card .card-head {
		grid-area: meta;
		align-content: flex-start;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin: 0;
	}

	.project-card .chips {
		grid-area: stack;
		align-content: flex-start;
		gap: 6px 0;
		margin: 12px 0 0;
	}

	.project-card .chip {
		padding: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		font-size: 12px;
		font-weight: 650;
		color: var(--color-muted);
	}

	.project-card .chip + .chip::before {
		margin-inline: 8px;
		color: var(--border-strong);
		content: '/';
	}

	.project-card .project-link {
		width: 44px;
		height: 44px;
		grid-area: link;
		align-self: end;
		justify-self: end;
		margin: 0;
		padding: 0;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-default);
		justify-content: center;
		color: var(--text-heading);
		transition:
			transform 160ms ease,
			background-color 160ms ease,
			border-color 160ms ease,
			box-shadow 160ms ease;
	}

	.project-card .project-link:hover,
	.project-card .project-link:focus-visible {
		transform: translateY(-2px);
		border-color: var(--border-strong);
		background: color-mix(in srgb, var(--color-ink) 8%, transparent);
		box-shadow: 0 8px 20px color-mix(in srgb, var(--color-ink) 12%, transparent);
	}

	.project-card .project-link-icon {
		width: 22px;
		height: 22px;
		transition: transform 160ms ease;
	}

	.project-card .project-link:hover .project-link-icon {
		transform: translateX(4px);
	}

	.case-notes {
		margin-top: 32px;
		background: var(--color-surface-soft);
		border-block: 1px solid var(--border-default);
	}

	.case-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0;
	}

	.case-card {
		padding: 32px 0 36px;
		border-bottom: 1px solid var(--border-default);
	}

	.case-card:first-child {
		grid-column: 1 / -1;
	}

	.case-card:first-child h3,
	.case-card:first-child p:last-child {
		max-width: none;
	}

	.case-card:nth-child(2) {
		padding-right: 48px;
	}

	.case-card:nth-child(3) {
		border-left: 1px solid var(--border-default);
		padding-left: 48px;
	}

	.case-label,
	.practice-label {
		margin-bottom: 12px;
		font-size: 13px;
		font-weight: 700;
		color: var(--color-primary-strong);
	}

	.case-card h3,
	.practice-item h3 {
		max-width: 28ch;
		margin-bottom: 14px;
		font-size: clamp(20px, 2.4vw, 27px);
		line-height: 1.35;
		letter-spacing: -0.02em;
		color: var(--text-heading);
	}

	.case-card p:last-child,
	.practice-item p {
		max-width: 64ch;
		font-size: 15px;
		line-height: 1.75;
	}

	.skills-layout {
		display: grid;
		margin-top: 36px;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 0;
		border-bottom: 1px solid var(--border-default);
	}

	.skill-group {
		grid-column: span 3;
		padding: 28px clamp(22px, 3vw, 36px) 32px;
		border-right: 1px solid var(--border-default);
	}

	.skill-group:first-child {
		padding-left: 0;
	}

	.skill-group:nth-child(2) {
		padding-right: 0;
		border-right: 0;
	}

	.skill-group h3,
	.tag-group h3 {
		margin-bottom: 18px;
		font-size: 15px;
	}

	.skill-group h3 {
		color: var(--color-primary-strong);
	}

	.tag-group h3 {
		color: var(--color-muted);
	}

	.skill-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 16px;
	}

	.skill-list li {
		padding: 0;
		border: 0;
		font-size: clamp(17px, 2vw, 21px);
		font-weight: 650;
		letter-spacing: -0.02em;
	}

	.tag-group {
		grid-column: span 2;
		padding: 28px clamp(22px, 3vw, 36px) 32px;
		border-top: 1px solid var(--border-default);
	}

	.tag-group:nth-child(3) {
		padding-left: 0;
	}

	.tag-group:nth-child(3),
	.tag-group:nth-child(4) {
		border-right: 1px solid var(--border-default);
	}

	.tag-group:last-child {
		padding-right: 0;
	}

	.practice-grid {
		display: grid;
		margin-top: 40px;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(32px, 6vw, 72px);
	}

	.practice-item {
		padding-left: 24px;
		border-left: 3px solid var(--color-primary);
	}

	.education-list {
		margin-top: 36px;
	}

	.education-list .card {
		padding: 28px 0;
		border: 0;
		border-bottom: 1px solid var(--border-default);
		border-radius: 0;
		background: transparent;
	}

	@media (max-width: 768px) {
		.container {
			padding-inline: 20px;
			padding-block: 64px;
		}

		.hero {
			min-height: auto;
			padding-top: 112px;
		}

		h1 {
			font-size: clamp(38px, 12vw, 54px);
		}

		.skills-layout,
		.practice-grid,
		.case-grid {
			grid-template-columns: 1fr;
		}

		#work .card-grid.two {
			grid-template-columns: 1fr;
		}

		.project-card,
		.project-card:nth-child(n) {
			min-height: 0;
			grid-column: 1;
			grid-template-columns: 1fr;
			grid-template-areas:
				'meta'
				'title'
				'summary'
				'stack'
				'link';
			gap: 16px;
			padding: 32px 20px;
			box-shadow: none;
		}

		.case-card:first-child {
			grid-column: auto;
		}

		.case-card:nth-child(3) {
			padding-left: 0;
			border-left: 0;
		}

		.case-card:nth-child(2) {
			padding-right: 0;
		}

		.skill-group,
		.skill-group + .skill-group,
		.tag-group {
			grid-column: 1;
			padding: 24px 0;
			border-top: 0;
			border-right: 0;
			border-bottom: 1px solid var(--border-default);
		}

		.skill-group:first-child {
			padding-left: 0;
		}

		.tag-group:last-child {
			border-bottom: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.btn-primary,
		.btn-ghost,
		.project-link,
		.project-card,
		.project-card .project-link-icon {
			transition: none;
		}

		.project-card:hover {
			transform: none;
		}

		.project-card .project-link:hover,
		.project-card .project-link:focus-visible {
			transform: none;
		}
	}

	/* Mobile-first portfolio shell */
	.page {
		padding-bottom: 40px;
		background: var(--color-canvas);
	}

	.container {
		width: 100%;
		max-width: none;
		padding: 44px 28px;
	}

	.hero {
		display: block;
		min-height: 0;
		padding-top: 32px;
		padding-bottom: 20px;
	}

	.profile-card,
	.profile-facts,
	.project-card,
	.education-list .card {
		border: 1px solid color-mix(in srgb, var(--border-default) 82%, transparent);
		border-radius: 16px;
		background: var(--surface-card);
		box-shadow: 0 12px 32px color-mix(in srgb, var(--color-ink) 7%, transparent);
	}

	.profile-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 32px 24px 24px;
		text-align: center;
	}

	.profile-avatar {
		width: 84px;
		height: 84px;
		margin-bottom: 14px;
		border: 1px solid color-mix(in srgb, var(--color-primary-strong) 20%, transparent);
		border-radius: 50%;
		background: color-mix(in srgb, var(--color-primary) 18%, var(--surface-card));
		object-fit: cover;
	}

	.profile-role {
		margin-bottom: 8px;
		font-size: 12px;
		font-weight: 700;
		color: var(--color-primary-strong);
	}

	.profile-card h1 {
		margin: 0;
		font-size: 30px;
		line-height: 1.2;
		letter-spacing: -0.035em;
	}

	.profile-headline {
		max-width: 28ch;
		margin-top: 10px;
		font-size: 18px;
		font-weight: 700;
		line-height: 1.45;
		letter-spacing: -0.02em;
		color: var(--text-heading);
		word-break: keep-all;
	}

	.profile-card .lede {
		max-width: 38ch;
		margin: 14px 0 22px;
		font-size: 14px;
		line-height: 1.7;
		color: var(--color-muted);
		text-wrap: pretty;
	}

	.hero-links {
		display: grid;
		width: 100%;
		margin: 0;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 8px;
	}

	.btn-primary,
	.btn-ghost {
		min-height: 42px;
		justify-content: center;
		padding: 9px 10px;
		border-radius: 10px;
		font-size: 13px;
		white-space: nowrap;
	}

	.profile-facts {
		display: grid;
		margin-top: 14px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		padding: 20px 12px;
	}

	.profile-facts div {
		min-width: 0;
		padding-inline: 10px;
	}

	.profile-facts div + div {
		border-left: 1px solid var(--border-default);
	}

	.profile-facts span,
	.profile-facts strong {
		display: block;
	}

	.profile-facts span {
		margin-bottom: 5px;
		font-size: 13px;
		color: var(--color-muted);
	}

	.profile-facts strong {
		font-size: 15px;
		line-height: 1.45;
		color: var(--text-heading);
		word-break: keep-all;
	}

	h2 {
		margin-bottom: 12px;
		font-size: 26px;
		letter-spacing: -0.035em;
	}

	.section-note {
		margin-top: 16px;
		margin-bottom: 24px;
		font-size: 14px;
		line-height: 1.65;
	}

	h2 + .career-list,
	.career-list {
		margin-top: 24px;
	}

	.career-row {
		display: block;
		padding: 28px 0;
	}

	.career-row > div:first-child {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 14px;
	}

	.career-duration {
		margin: 0;
	}

	.career-row .pill {
		margin: 0 0 0 auto;
	}

	.career-row h3 {
		font-size: 22px;
	}

	.career-summary,
	.bullets {
		font-size: 14px;
	}

	#work .card-grid.two {
		gap: 16px;
		border: 0;
	}

	.project-card,
	.project-card:nth-child(n) {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 44px;
		grid-template-areas:
			'meta meta'
			'title title'
			'summary summary'
			'stack link';
		gap: 14px 16px;
		padding: 24px;
		border-bottom: 1px solid color-mix(in srgb, var(--border-default) 82%, transparent);
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			border-color 180ms ease;
	}

	.project-card:hover,
	.project-card:focus-within {
		transform: translateY(-2px);
		border-color: color-mix(in srgb, var(--color-primary-strong) 38%, var(--border-default));
		background: var(--surface-card);
		box-shadow: 0 18px 40px color-mix(in srgb, var(--color-ink) 11%, transparent);
	}

	.project-card-lead {
		box-shadow:
			inset 0 3px 0 var(--color-primary),
			0 12px 32px color-mix(in srgb, var(--color-ink) 7%, transparent);
	}

	.project-card h3 {
		font-size: 22px;
		line-height: 1.35;
	}

	.project-card .card-summary {
		font-size: 14px;
		line-height: 1.7;
	}

	.project-card .card-head {
		align-items: center;
		justify-content: space-between;
		flex-wrap: nowrap;
	}

	.project-card .chips {
		align-self: center;
		margin: 2px 0 0;
	}

	.project-card .project-link {
		align-self: center;
		border-radius: 12px;
	}

	.project-card .project-link-icon {
		width: 10px;
		height: 10px;
		border-top: 2px solid currentColor;
		border-right: 2px solid currentColor;
		transform: rotate(45deg);
	}

	.project-card .project-link:hover .project-link-icon {
		transform: translateX(2px) rotate(45deg);
	}

	.case-notes {
		margin-top: 20px;
		border: 0;
		background: color-mix(in srgb, var(--color-primary) 6%, var(--color-canvas));
	}

	.case-grid,
	.skills-layout,
	.practice-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
	}

	.case-card,
	.case-card:first-child,
	.case-card:nth-child(2),
	.case-card:nth-child(3) {
		grid-column: auto;
		padding: 24px 0;
		border-right: 0;
		border-left: 0;
		border-bottom: 1px solid var(--border-default);
	}

	.case-card:last-child {
		border-bottom: 0;
	}

	.case-card h3,
	.practice-item h3 {
		font-size: 20px;
	}

	.skills-layout {
		margin-top: 24px;
		border-bottom: 0;
	}

	.skill-group,
	.skill-group:first-child,
	.skill-group:nth-child(2),
	.tag-group,
	.tag-group:nth-child(3),
	.tag-group:nth-child(4),
	.tag-group:last-child {
		grid-column: 1;
		padding: 22px 0;
		border-top: 0;
		border-right: 0;
		border-bottom: 1px solid var(--border-default);
	}

	.skill-group:last-child,
	.tag-group:last-child {
		border-bottom: 0;
	}

	.skill-list {
		gap: 8px 14px;
	}

	.skill-list li {
		font-size: 17px;
	}

	.practice-grid {
		margin-top: 24px;
		gap: 16px;
	}

	.practice-item {
		padding: 22px;
		border: 1px solid var(--border-default);
		border-radius: 16px;
		background: var(--surface-card);
	}

	.education-list {
		margin-top: 24px;
		border: 0;
	}

	.education-list .card {
		padding: 24px;
	}

	.closing {
		align-items: center;
		margin-top: 0;
		padding-block: 32px;
	}

	.closing-title {
		font-size: 21px;
	}

	.top-button {
		display: none;
	}

	@media (max-width: 540px) {
		.container {
			padding-inline: 20px;
		}

		.hero {
			padding-top: 24px;
		}

		.profile-card {
			padding-inline: 20px;
		}

		.hero-links {
			grid-template-columns: 1fr 1fr;
		}

		.hero-links .btn-primary {
			grid-column: 1 / -1;
		}

		.profile-facts {
			grid-template-columns: 1fr;
			gap: 14px;
			padding: 20px;
		}

		.profile-facts div {
			padding: 0;
		}

		.profile-facts div + div {
			padding-top: 14px;
			border-top: 1px solid var(--border-default);
			border-left: 0;
		}
	}

	@media (min-width: 900px) {
		.page {
			display: grid;
			height: 100%;
			grid-template-columns: 420px minmax(0, 520px);
			column-gap: 24px;
			align-items: start;
			padding-bottom: 0;
			overflow: hidden;
			background: transparent;
		}

		.hero {
			position: static;
			display: flex;
			height: 100%;
			max-height: none;
			justify-content: center;
			padding: 16px 24px;
			overflow: hidden;
		}

		.portfolio-feed {
			position: relative;
			height: 100%;
			min-width: 0;
			padding-top: 64px;
			border-inline: 1px solid var(--border-default);
			background: var(--color-canvas);
			box-shadow: 0 0 40px color-mix(in srgb, var(--color-ink) 12%, transparent);
			overflow-y: auto;
			overscroll-behavior: contain;
			scrollbar-gutter: stable;
			scrollbar-width: none;
		}

		.portfolio-feed::-webkit-scrollbar {
			display: none;
		}

		.top-button {
			position: absolute;
			right: 20px;
			bottom: 20px;
			z-index: 4;
			display: grid;
			width: 52px;
			height: 52px;
			margin: 0;
			place-items: center;
			border: 1px solid color-mix(in srgb, var(--color-primary-strong) 36%, transparent);
			border-radius: 50%;
			background: var(--color-primary);
			box-shadow: 0 10px 24px color-mix(in srgb, var(--color-ink) 18%, transparent);
			font: inherit;
			font-size: 12px;
			font-weight: 800;
			color: var(--color-on-primary);
			opacity: 0;
			pointer-events: none;
			transform: translateY(8px);
			transition:
				opacity 160ms ease,
				transform 160ms ease,
				background-color 160ms ease;
		}

		.top-button-visible {
			opacity: 1;
			pointer-events: auto;
			transform: translateY(0);
		}

		.top-button:hover {
			background: var(--color-primary-active);
		}

		.top-button:focus-visible {
			outline: 2px solid var(--color-ink);
			outline-offset: 3px;
		}

		.portfolio-feed .container {
			padding: 52px 40px;
		}

		.profile-card {
			padding: 20px 22px;
		}

		.profile-avatar {
			width: 72px;
			height: 72px;
			margin-bottom: 10px;
		}

		.profile-card h1 {
			font-size: 28px;
		}

		.profile-headline {
			margin-top: 8px;
			font-size: 17px;
		}

		.profile-card .lede {
			margin: 10px 0 18px;
			font-size: 13px;
		}

		.hero-links {
			grid-template-columns: 1fr 1fr;
		}

		.hero-links .btn-primary {
			grid-column: 1 / -1;
		}

		.profile-facts {
			grid-template-columns: 1fr;
			gap: 10px;
			padding: 14px 20px;
		}

		.profile-facts div {
			display: grid;
			grid-template-columns: 72px minmax(0, 1fr);
			align-items: center;
			padding: 0;
		}

		.profile-facts div + div {
			padding-top: 10px;
			border-top: 1px solid var(--border-default);
			border-left: 0;
		}

		.profile-facts span {
			margin: 0;
			font-size: 11px;
		}

		.profile-facts strong {
			font-size: 13px;
		}

		.closing {
			padding-bottom: 64px;
		}
	}

	/* Isometric sticker-book art direction (토큰은 app.css :root) */
	.page {
		color: var(--sticker-ink);
	}

	.profile-card,
	.profile-facts,
	.project-card,
	.education-list .card,
	.practice-item {
		border: 2px solid var(--sticker-ink);
		background: var(--sticker-paper);
		box-shadow: 6px 6px 0 var(--sticker-mint);
	}

	.profile-card {
		position: relative;
		transform: rotate(-0.35deg);
	}

	.profile-card::before,
	.profile-card::after {
		position: absolute;
		width: 56px;
		height: 16px;
		background: color-mix(in srgb, var(--sticker-yellow) 72%, transparent);
		content: '';
	}

	.profile-card::before {
		top: -7px;
		left: 20px;
		transform: rotate(-7deg);
	}

	.profile-card::after {
		right: 20px;
		bottom: -7px;
		transform: rotate(6deg);
	}

	.profile-avatar {
		border: 2px solid var(--sticker-ink);
		background: var(--sticker-lilac-soft);
		box-shadow: 3px 3px 0 var(--sticker-lilac);
	}

	.profile-role {
		display: inline-flex;
		padding: 4px 9px;
		border: 1.5px solid var(--sticker-ink);
		border-radius: 8px;
		background: var(--sticker-mint-soft);
		color: var(--sticker-ink);
		transform: rotate(1.5deg);
	}

	.profile-facts {
		background: var(--sticker-yellow-soft);
		box-shadow: 6px 6px 0 var(--sticker-coral);
		transform: rotate(0.25deg);
	}

	.btn-primary,
	.btn-ghost {
		border: 2px solid var(--sticker-ink);
		box-shadow: 3px 3px 0 var(--sticker-ink);
		color: var(--sticker-ink);
	}

	.btn-primary {
		background: var(--sticker-mint);
	}

	.btn-ghost {
		background: var(--sticker-paper);
	}

	.btn-primary:hover,
	.btn-ghost:hover {
		transform: translate(2px, 2px);
		border-color: var(--sticker-ink);
		box-shadow: 1px 1px 0 var(--sticker-ink);
	}

	.sticker-stage {
		position: relative;
		overflow: hidden;
		padding: 18px 12px 8px;
		border-bottom: 2px solid var(--sticker-ink);
		background:
			radial-gradient(
					circle at center,
					color-mix(in srgb, var(--sticker-lilac) 34%, transparent) 1.2px,
					transparent 1.5px
				)
				0 0 / 15px 15px,
			var(--sticker-paper);
	}

	.sticker-footer {
		margin-top: 18px;
		padding: 0;
		border-top: 2px solid var(--sticker-ink);
		border-bottom: 0;
	}

	.footer-sticker-collage {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 20px 14px;
	}

	/* 가로세로 비율이 제각각이라 정사각 박스에 맞춰 눈높이를 맞춘다 */
	.footer-sticker {
		width: 76px;
		height: 76px;
		object-fit: contain;
		filter: drop-shadow(3px 5px 0 rgb(46 51 64 / 13%));
	}

	.footer-copyright {
		padding: 14px 20px 16px;
		border-top: 1.5px dashed color-mix(in srgb, var(--sticker-ink) 42%, transparent);
		font-size: 12px;
		font-weight: 600;
		text-align: center;
		color: var(--color-muted);
	}

	.portfolio-feed {
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
			#f7f5ff;
	}

	.portfolio-feed > section.container,
	.portfolio-feed > .case-notes,
	.portfolio-feed > .closing {
		width: auto;
		margin: 18px;
		border: 2px solid var(--sticker-ink);
		border-radius: 18px;
		background: var(--sticker-paper);
		box-shadow: 6px 6px 0 var(--sticker-mint);
	}

	.portfolio-feed > section.container:nth-of-type(2) {
		box-shadow: 6px 6px 0 var(--sticker-coral);
	}

	.portfolio-feed > section.container:nth-of-type(4) {
		box-shadow: 6px 6px 0 var(--sticker-lilac);
	}

	.portfolio-feed > section.container:nth-of-type(5) {
		box-shadow: 6px 6px 0 var(--sticker-yellow);
	}

	.portfolio-feed .case-notes {
		border-block: 2px solid var(--sticker-ink);
		background: var(--sticker-yellow-soft);
		box-shadow: 6px 6px 0 var(--sticker-yellow);
	}

	h2 {
		display: inline-block;
		padding: 3px 10px 5px;
		border: 2px solid var(--sticker-ink);
		border-radius: 8px;
		background: var(--sticker-mint-soft);
		box-shadow: 3px 3px 0 var(--sticker-ink);
		font-size: 25px;
		line-height: 1.2;
		transform: rotate(-1deg);
	}

	#work h2,
	#ai h2 {
		background: var(--sticker-coral-soft);
		transform: rotate(1deg);
	}

	#trouble h2,
	#edu h2 {
		background: var(--sticker-yellow-soft);
	}

	#skills h2 {
		background: var(--sticker-lilac-soft);
		transform: rotate(0.8deg);
	}

	.career-row {
		border-top: 2px dashed color-mix(in srgb, var(--sticker-ink) 36%, transparent);
	}

	.career-row:last-child {
		border-bottom: 0;
	}

	/* 섹션 구분선: h2(+설명문) 아래, 콘텐츠 위 */
	.career-list,
	#work .card-grid.two,
	.case-grid,
	.skills-layout,
	.practice-grid,
	.education-list {
		padding-top: 22px;
		border-top: 2px dashed color-mix(in srgb, var(--sticker-ink) 36%, transparent);
	}

	.career-list .career-row:first-child {
		border-top: 0;
	}

	.pill {
		border: 1.5px solid var(--sticker-ink);
		border-radius: 8px;
		box-shadow: 2px 2px 0 var(--sticker-ink);
		letter-spacing: 0;
	}

	.project-card,
	.project-card:nth-child(n) {
		border: 2px solid var(--sticker-ink);
		background: var(--sticker-paper);
		box-shadow: 5px 5px 0 var(--sticker-mint);
	}

	.project-card:nth-child(2n) {
		background: var(--sticker-lilac-soft);
		box-shadow: 5px 5px 0 var(--sticker-lilac);
		transform: rotate(0.35deg);
	}

	.project-card:nth-child(3n) {
		background: var(--sticker-yellow-soft);
		box-shadow: 5px 5px 0 var(--sticker-coral);
		transform: rotate(-0.35deg);
	}

	.project-card:hover,
	.project-card:focus-within {
		border-color: var(--sticker-ink);
		background: var(--sticker-paper);
		box-shadow: 2px 2px 0 var(--sticker-ink);
		transform: translate(3px, 3px) rotate(0);
	}

	.project-card .chip,
	.skill-list li {
		padding: 5px 9px;
		border: 1.5px solid var(--sticker-ink);
		border-radius: 9px;
		background: var(--sticker-paper);
		box-shadow: 2px 2px 0 color-mix(in srgb, var(--sticker-ink) 75%, transparent);
	}

	.project-card .chip + .chip::before {
		display: none;
	}

	.project-card .chips {
		gap: 8px;
	}

	.project-card .project-link {
		border: 2px solid var(--sticker-ink);
		background: var(--sticker-mint-soft);
		box-shadow: 3px 3px 0 var(--sticker-ink);
	}

	.project-card .project-link:hover,
	.project-card .project-link:focus-visible {
		border-color: var(--sticker-ink);
		background: var(--sticker-yellow);
		box-shadow: 1px 1px 0 var(--sticker-ink);
	}

	.case-card,
	.skill-group,
	.tag-group {
		border-color: color-mix(in srgb, var(--sticker-ink) 26%, transparent);
	}

	.case-label,
	.practice-label,
	.skill-group h3 {
		color: #14684f;
	}

	.practice-item:nth-child(2) {
		background: var(--sticker-coral-soft);
		box-shadow: 6px 6px 0 var(--sticker-coral);
	}

	.education-list .card {
		background: var(--sticker-lilac-soft);
		box-shadow: 5px 5px 0 var(--sticker-lilac);
	}

	.portfolio-feed > .closing {
		background: var(--sticker-ink);
		box-shadow: 6px 6px 0 var(--sticker-coral);
		color: var(--sticker-paper);
	}

	.closing-title,
	.closing-mail {
		color: inherit;
	}

	.top-button {
		border: 2px solid var(--sticker-ink);
		background: var(--sticker-yellow);
		box-shadow: 4px 4px 0 var(--sticker-ink);
		color: var(--sticker-ink);
	}

	@media (max-width: 899px) {
		.sticker-stage {
			margin-top: 12px;
		}

		.portfolio-feed > section.container,
		.portfolio-feed > .case-notes,
		.portfolio-feed > .closing {
			margin-inline: 14px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.profile-card,
		.profile-facts,
		.project-card:nth-child(n),
		h2,
		.sticker-stage img {
			transform: none;
		}
	}
</style>
