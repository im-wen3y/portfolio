<script lang="ts">
	type Career = {
		period: string;
		duration: string;
		lead?: boolean;
		company: string;
		role: string;
		summary: string;
		bullets: string[];
	};

	type Project = {
		id: string;
		meta: string;
		badge?: { label: string; tone: 'primary' | 'secondary' };
		title: string;
		summary: string;
		stack: string[];
		detail: { title: string; bullets?: string[]; text?: string }[];
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
				'아큐브 전사 서비스(소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템) 개발·운영 총괄. 기획·디자인·개발팀 초기 기획 단계부터 참여해 요구사항과 우선순위를 조율하고, 팀 업무 배분·일정 관리·의사결정을 지원했습니다.',
			bullets: [
				'JSP → React 리뉴얼 리드 (레거시 분석·문서화·업무 분배 총괄)',
				'서로 다른 UI의 3개 렌즈 계산기를 Headless 공통 컴포넌트로 통합, Storybook 기반 공통 컴포넌트 체계 구축',
				'영업사원 내부 시스템 PC → React 모바일 리뉴얼, 약정서 체결·승인 프로세스 블록 공통화',
				'프로모션·렌즈 판매 교육 시뮬레이터 등 캠페인성 프로덕트 설계 및 빌드 구조 분리'
			]
		},
		{
			period: '2021.04 – 2023.08',
			duration: '2년 4개월',
			company: '샤플앤컴퍼니',
			role: '프론트엔드 개발자',
			summary: '현장 직원 관리 서비스 Shopl의 관리자 대시보드와 채팅 서비스 개발·운영.',
			bullets: [
				'JSP → React 마이그레이션 주도 (기술 선택부터 대표·PM 설득, 동시 운영 배포 환경 구성까지)',
				'아임포트(국내)·Stripe(해외) 결제 및 정기결제 연동',
				'ShoplChat v2.0 재구현 (Electron + Sendbird 2.0 → React + Vite + Sendbird 3.0)',
				'게시판 고도화, 연차 사용 촉진, 초과근무시간 관리 등 관리자 기능 다수'
			]
		},
		{
			period: '2018.07 – 2020.11',
			duration: '2년 4개월',
			company: '아이티키',
			role: 'SI 개발팀',
			summary:
				'신한DS LMS 고도화, 롯데마트 웹/웹앱 운영, 공공기관 사이트 유지보수, 미스터피자 리뉴얼 등 다수 SI 프로젝트를 수행하며 신규 팀원용 프로세스·테스트 가이드 문서를 여러 차례 작성했습니다.',
			bullets: []
		}
	];

	const PROJECTS: Project[] = [
		{
			id: 'acuvue-renewal',
			meta: '2025.10 – 2026.03 · 라텔앤드파트너즈',
			badge: { label: 'Lead', tone: 'primary' },
			title: '안경사 통합관리 시스템 React 리뉴얼',
			summary:
				'JSP 기반 화면과 제품 판매 기능을 React로 전환하고, 파트 리더로서 분석·문서화·업무 분배를 맡았습니다.',
			stack: ['React', 'TypeScript', 'Storybook', '레거시 마이그레이션'],
			detail: [
				{
					title: '한 일',
					bullets: [
						'15,000줄 규모 제품판매 JS 파일을 React 컴포넌트 구조로 전환해 유지보수 가능한 형태로 개선',
						'캘린더·라디오·ComboBox·테이블 공통 컴포넌트와 Storybook 구축, 제품판매·판매내역·공지사항·이벤트·대량결제 화면 구현·연동',
						'프론트엔드에 하드코딩되어 있던 팝업·배너의 날짜·노출 조건을 서버팀과 합의해 어드민에서 동적으로 관리하도록 전환',
						'레거시 정책을 문서화해 전 파트가 같은 업무 맥락과 구현 기준을 공유하도록 정립'
					]
				},
				{
					title: '해결한 문제',
					text: 'LOT 스캔 입력 오류를 한글→영문 변환, 스캐너별 특수문자 제거, 전송 시점의 변환 순서 조정으로 단계적으로 해결. 일정 변경마다 재배포가 필요했던 운영 구조에서 휴먼에러 가능성을 함께 제거했습니다.'
				}
			]
		},
		{
			id: 'smartfitting',
			meta: '2025.05 – 2025.08 · 라텔앤드파트너즈',
			title: '스마트피팅 — 렌즈 계산기 모바일·태블릿',
			summary:
				'안경사 통합관리 시스템의 렌즈 계산기를 현장용 태블릿에서 쓸 수 있도록 재설계. QR 로그인 브릿지와 도수 데이터 처리 구조를 담당했습니다.',
			stack: ['Zustand + persist', '반응형', 'QR 브릿지'],
			detail: [
				{
					title: '한 일',
					bullets: [
						'주문 가능 제품의 구면·난시·멀티포컬 영역과 제품 상세 바텀시트 구현·연동',
						'저장하지 않는 개인정보(도수 데이터)의 동의 전 상태를 Zustand + persist로 설계해 탭 간 유지와 새로고침 대응을 함께 해결',
						'프론트엔드 계산 로직의 백엔드 이관을 위해 기존 로직과 FE/BE 경계를 Confluence에 문서화해 회의로 전달'
					]
				},
				{
					title: '해결한 문제',
					text: '운영 반영 3일 전 지급 기기가 Lenovo Tab M9으로 변경되며 반응형이 깨졌습니다. DPR과 CSS 논리적 뷰포트를 직접 계산해 원인을 특정하고, 확정된 신규 기기 스펙 기준으로 브레이크포인트를 재조정해 기한 내 배포했습니다.'
				}
			]
		},
		{
			id: 'nonmyacuvue-promo',
			meta: '2024.08 – 2026.06 · 라텔앤드파트너즈',
			title: '논마이아큐브 프로모션 1~5차',
			summary:
				'마이아큐브 비회원 안경점을 대상으로 한 연속 이벤트 프로모션. 구매 LOT 스캔과 휴대폰 본인인증 플로우를 JSP 환경에서 구현했습니다.',
			stack: ['Web Components', 'OCR / Text Scan API', 'JSP'],
			detail: [
				{
					title: '한 일',
					bullets: [
						'LOT 스캔 연동 — 1~3차 네이버 OCR 스캔 API, 4~5차 AWS Text 스캔 API로 전환',
						'드림시큐리티 휴대폰 인증 플로우 구현',
						'1~4차는 클래스형 구조, 5차는 Web APIs 기반 Web Components로 전환해 회차 간 재사용성 확보'
					]
				},
				{
					title: '해결한 문제',
					text: '백엔드팀도 원인을 찾지 못한 외부 API 연동 장애를 서버 로그 직접 분석으로 진단해 Spring Security 필터 체인과 CSRF 정책 차단을 특정했습니다. 담당 백엔드 부재 상황에서 임시 조치까지 단독 수행한 뒤 정식 개선을 백엔드팀에 인계했습니다.'
				}
			]
		},
		{
			id: 'virtual-fitting',
			meta: '1차 2024.11 – 2025.02 · 2차 2026.04 – 2026.05',
			title: '안경사 렌즈 판매 교육 시뮬레이터',
			summary:
				'안경사가 고객과 대화하며 검사 결과를 확인하고 렌즈를 제안하는 판매 과정을 게임 형태로 연습하는 교육용 웹 시뮬레이터입니다.',
			stack: ['Zustand', 'overlay-kit', '모노레포'],
			detail: [
				{
					title: '진단과 해결',
					bullets: [
						'1차에서 Context API와 Funnel 병행으로 발생한 리렌더링 문제를 진단해 Zustand로 통합하고, 비대해진 store를 도메인별로 분리',
						'1차에서 변경 주기가 다른 site와 simulator를 모노레포로 분리하고 shared 디자인 시스템과 애플리케이션별 빌드 설정을 구성한 뒤 배포 방식을 인프라 담당자와 협의',
						'2차에서 모달로 인한 대화 초기화를 localStorage로 우선 대응한 뒤 overlay-kit으로 개선하고, 기존 기능과 기술 맥락을 후속 개발자에게 인계'
					]
				}
			]
		},
		{
			id: 'shopl-migration',
			meta: '2022.01 – 2023.08 · 샤플앤컴퍼니',
			badge: { label: 'Lead', tone: 'primary' },
			title: 'Shopl — JSP → React 마이그레이션',
			summary:
				'레거시 관리자 대시보드의 React 전환을 기술 선택부터 설득, 배포 환경 구성까지 주도했습니다.',
			stack: ['React', '점진적 전환', '기술 의사결정'],
			detail: [
				{
					title: '한 일',
					bullets: [
						'서버·프론트 동시 배포 부담을 이유로 반대하던 대표·PM을 설득해 마이그레이션 진행 결정을 이끌어냄',
						'Vue/React 중 운영·유지보수 관점에서 React를 선택하고 근거를 문서화',
						'배포 직후 프론트엔드 코드를 롤백하고 오류 응답과 백엔드 리다이렉트 흐름을 추적해, 잘못된 URL이 404와 index.html 재호출을 반복시키는 원인을 특정하고 백엔드 수정으로 연결'
					]
				}
			]
		},
		{
			id: 'shopl-todo-map',
			meta: '2022 – 2023 · 샤플앤컴퍼니',
			title: 'Shopl "할 일" — 근무지별 작업률 지도',
			summary:
				'1년간 운영한 최장기 프로젝트. 구글·네이버 지도와 클러스터링으로 근무지별 작업률을 시각화했습니다.',
			stack: ['Google · Naver Map API', '클러스터링', '성능 최적화'],
			detail: [
				{
					title: '해결한 문제',
					text: '마커 2만 개를 한 번에 렌더링할 때 브라우저가 멈추는 문제를 지도별 클러스터링으로 해결하고 운영에 반영했습니다.'
				}
			]
		}
	];

	const TROUBLES = [
		{
			label: '외부 API 연동 장애',
			title: '서버 로그를 직접 읽어 Spring Security 차단을 특정',
			text: '백엔드팀도 원인을 찾지 못한 상태에서 서버 로그를 직접 분석해 필터 체인과 CSRF 정책이 요청을 차단하고 있음을 확인. 담당 부재 상황에서 임시 조치까지 수행하고 정식 개선을 인계했습니다.'
		},
		{
			label: '배포 3일 전 기기 변경',
			title: 'DPR·논리적 뷰포트 계산으로 반응형 재설계',
			text: '지급 기기가 Lenovo Tab M9으로 바뀌며 레이아웃이 깨졌습니다. DPR과 CSS 논리적 뷰포트를 계산해 원인을 특정하고 신규 기기 스펙 기준으로 브레이크포인트를 재조정, 기한 내 반영했습니다.'
		},
		{
			label: '마커 2만 개 렌더링',
			title: '지도별 클러스터링으로 흰 화면 정상화',
			text: '국내·해외 지도 API에 맞는 클러스터링을 적용해 브라우저가 멈추던 문제를 해결하고 운영에 반영했습니다.'
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
				'Google · Naver Map API',
				'Naver OCR / AWS Text Scan',
				'Sendbird',
				'Okta',
				'JSP',
				'Spring Security 트러블슈팅'
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
		<h1>레거시를 걷어내고, 팀이 계속 굴릴 수 있는 프론트엔드를 만듭니다.</h1>
		<p class="lede">
			React 기반 웹·앱 개발과 운영, JSP 레거시 마이그레이션, 모바일 리뉴얼을 주도해왔습니다. 파트
			리더로 기획·디자인·서버팀 사이의 요구사항을 조율하고, 공통 컴포넌트와 개발 컨벤션으로 팀이
			반복하지 않을 구조를 남기는 데 집중합니다.
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
		<p class="section-note">카드를 펼치면 문제 정의 · 진단 · 해결 과정을 볼 수 있습니다.</p>
		<div class="card-grid two">
			{#each PROJECTS as project (project.id)}
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
					<details class="detail">
						<summary>상세 보기</summary>
						<div class="detail-body">
							{#each project.detail as block (block.title)}
								<div>
									<div class="detail-title">{block.title}</div>
									{#if block.bullets}
										<ul class="bullets sm">
											{#each block.bullets as bullet (bullet)}
												<li>{bullet}</li>
											{/each}
										</ul>
									{/if}
									{#if block.text}
										<p class="detail-text">{block.text}</p>
									{/if}
								</div>
							{/each}
						</div>
					</details>
				</article>
			{/each}
		</div>
	</section>

	<section id="trouble" class="dark">
		<div class="container">
			<div class="eyebrow on-dark">Troubleshooting</div>
			<h2 class="on-dark">직접 원인을 특정해 해결한 문제들</h2>
			<p class="section-note on-dark">
				담당 범위가 아니어도 로그와 스펙을 직접 파고들어 원인을 좁혀왔습니다.
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
			코드 자동완성에 그치지 않고, 개인 개발 기준과 커리어 기록을 관리하는 흐름에 활용합니다.
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

	/* Project detail disclosure */
	.detail {
		display: flex;
		flex-direction: column-reverse;
		width: 100%;
		margin-top: auto;
	}

	.detail summary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		align-self: flex-start;
		margin-top: 20px;
		padding: 9px 16px;
		border: 1.5px solid var(--border-default);
		border-radius: var(--radius-default);
		font-size: 14px;
		font-weight: 700;
		color: var(--text-heading);
		cursor: pointer;
		list-style: none;
	}

	.detail summary::-webkit-details-marker {
		display: none;
	}

	.detail summary::after {
		content: '+';
		font-weight: 800;
	}

	.detail[open] summary::after {
		content: '−';
	}

	.detail summary:hover {
		border-color: var(--border-strong);
	}

	.detail-body {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-top: 18px;
		border-top: 1px solid var(--border-default);
	}

	.detail-title {
		margin-bottom: 6px;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-secondary-strong);
	}

	.detail-text {
		font-size: 14px;
		line-height: 1.7;
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
