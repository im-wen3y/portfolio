<script>
	function handlePrint() {
		window.print();
	}
</script>

<svelte:head>
	<title>이력서 — 송누리</title>
</svelte:head>

<!-- 화면 전용 컨트롤 바 -->
<div class="controls">
	<a href="/resume" class="back-link">← 이력서로</a>
	<button onclick={handlePrint} class="save-btn">PDF로 저장</button>
</div>

<!-- A4 미리보기 래퍼 (화면에서 종이처럼 보임) -->
<div class="preview-wrap">
	<article class="page">
		<!-- 헤더 -->
		<header class="pr-header">
			<div>
				<h1 class="pr-name">송누리</h1>
				<p class="pr-role-line">Frontend Developer &middot; 프론트엔드 파트 리더 &middot; 7년차</p>
			</div>
			<div class="pr-contact">
				<a href="mailto:imwen3y@gmail.com">imwen3y@gmail.com</a>
				<a href="https://www.linkedin.com/in/im-wen3y" target="_blank" rel="noopener noreferrer">linkedin.com/in/im-wen3y</a>
				<a href="https://velog.io/@imwen3y" target="_blank" rel="noopener noreferrer">velog.io/@imwen3y</a>
			</div>
		</header>

		<hr class="pr-divider" />

		<p class="pr-about">
			사용자 관점에서 UI/UX를 고민하고, 팀과 함께 안정적인 개발 프로세스를 만들어가는 7년차
			프론트엔드 개발자입니다. React 기반 웹/앱 개발·운영과 모바일 리뉴얼, 주요 기능 설계를 주도하며
			기획·디자인팀과 협업해 왔습니다.
		</p>

		<hr class="pr-divider" />

		<!-- 2단 본문 -->
		<div class="pr-body">
			<!-- 왼쪽: Experience -->
			<div class="pr-left">
				<section>
					<h2 class="pr-label">EXPERIENCE</h2>

					<div class="pr-exp">
						<div class="pr-exp-top">
							<strong class="pr-company">라텔앤드파트너즈</strong>
							<span class="pr-badge">프론트엔드 파트 리더</span>
						</div>
						<span class="pr-muted">2024.04 — 2026.06 · 2년 2개월</span>

						<p class="pr-proj">아큐브 전사 서비스 개발 – 파트 리더</p>
						<ul class="pr-list">
							<li>
								소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템 등 전사 서비스 개발·운영 총괄
							</li>
							<li>기획·디자인·개발팀과 초기 기획부터 참여, 요구사항 정의 및 기능 우선순위 조율</li>
							<li>팀 업무 배분, 일정 관리, 의사결정 지원으로 팀 생산성 향상</li>
						</ul>
						<p class="pr-proj">소비자 대상 프로모션 이벤트 페이지 개발</p>
						<ul class="pr-list">
							<li>
								GA, Meta Pixel, Kakao Pixel 등 전환·행동 기반 트래킹 연동 및 이벤트 측정 로직 구현
							</li>
							<li>쿠폰 발급, 럭키드로우 등 프로모션 기능 개발 및 서버 연동 플로우 구축</li>
						</ul>
						<p class="pr-proj">제품 판매 페이지 최대 할인 혜택 기능 개발</p>
						<ul class="pr-list">
							<li>
								최대 혜택가 기능을 클래스형으로 분리·모듈화, 기존 스캔·쿠폰·결제 로직과 독립적으로
								설계
							</li>
							<li>관리자 페이지에서 쿠폰 등록·관리 가능하도록 DB 기반 마크업과 기능 구현</li>
						</ul>
						<p class="pr-proj">안경사 대상 렌즈 시뮬레이터 게임 개발</p>
						<ul class="pr-list">
							<li>고객 상담·렌즈 맞춤 프로세스 기반 학습형 시뮬레이터 설계·개발</li>
							<li>React + Framer Motion 애니메이션, Zustand 상태 관리, Okta 기반 인증 구현</li>
						</ul>
						<p class="pr-proj">영업사원 현장 지원 프로그램 – 모바일 리뉴얼</p>
						<ul class="pr-list">
							<li>기존 PC 전용 내부 시스템을 React 기반 모바일 친화적으로 리뉴얼</li>
							<li>약정서 체결·승인 프로세스를 재사용 가능한 블록 형태로 공통화</li>
						</ul>
					</div>

					<div class="pr-exp">
						<div class="pr-exp-top">
							<strong class="pr-company">샤플앤컴퍼니</strong>
							<span class="pr-badge">프론트엔드 개발자</span>
						</div>
						<span class="pr-muted">2021.04 — 2023.08 · 2년 4개월</span>
						<p class="pr-proj">관리자 대시보드 개발 및 운영 (JSP / React)</p>
						<ul class="pr-list">
							<li>아임포트·Stripe API를 이용한 결제 연동 개발</li>
							<li>구글·바이두 지도 API를 국내 네이버, 해외 구글 지도 API로 변경 및 공통화</li>
							<li>네이버·구글 Map API Cluster 기능으로 근무지·직원별 작업률 시각화</li>
							<li>휴가 사용·승인, 임산부 등록, 게시판, 공지, 설문 등 기능 페이지 개발</li>
						</ul>
						<p class="pr-proj">레거시 웹 시스템 React 전환 및 AWS 배포 환경 구성</p>
						<ul class="pr-list">
							<li>JSP 기반 레거시 시스템을 React로 전환, 재사용 가능한 UI 컴포넌트 설계 및 구현</li>
							<li>React 빌드 결과물을 AWS S3에 배포, JSP와 React 동시 운영 환경 구성</li>
							<li>AWS Pipeline 활용 배포 안정성 확보 및 반복 가능한 배포 프로세스 구축</li>
						</ul>
						<p class="pr-proj">채팅 v2.0 개발</p>
						<ul class="pr-list">
							<li>
								Electron + Sendbird UIkit 2.0 기반 서비스를 React + Vite + Sendbird UIkit 3.0으로
								재구현 (진행률 90%, 팀원 2명)
							</li>
						</ul>
					</div>

					<div class="pr-exp">
						<div class="pr-exp-top">
							<strong class="pr-company">아이티키</strong>
							<span class="pr-badge">SI 개발팀 사원</span>
						</div>
						<span class="pr-muted">2018.07 — 2020.11 · 2년 4개월</span>
						<p class="pr-proj">SI 프로젝트 개발 및 유지보수</p>
						<ul class="pr-list">
							<li>신한DS LMS 고도화 — 직원용 Admin 화면 개발 및 API 연동, 데이터 통신 오류 수정</li>
							<li>
								롯데마트 웹/웹앱 운영 — 주문·결제 API 문제 해결, 신규 팀원용 프로세스 가이드 작성
							</li>
							<li>공공기관 사이트 유지보수 — 자료관리시스템 백엔드 유지보수 및 운영 표준화</li>
							<li>미스터피자 웹/모바일웹 리뉴얼 — 회원가입·로그인·주문·결제 API 설계 및 개발</li>
						</ul>
					</div>
				</section>
			</div>

			<!-- 오른쪽: Skills + Education -->
			<div class="pr-right">
				<section>
					<h2 class="pr-label">SKILLS</h2>
					<h3 class="pr-sublabel">기술</h3>
					<div class="pr-badges">
						<span class="pr-skill-badge">React</span>
						<span class="pr-skill-badge">TypeScript</span>
						<span class="pr-skill-badge">JavaScript</span>
						<span class="pr-skill-badge">Next.js</span>
						<span class="pr-skill-badge">Zustand</span>
						<span class="pr-skill-badge">Framer Motion</span>
						<span class="pr-skill-badge">Emotion</span>
						<span class="pr-skill-badge">TailwindCSS</span>
					</div>
					<h3 class="pr-sublabel pr-sublabel-gap">협업</h3>
					<div class="pr-badges">
						<span class="pr-skill-badge">Git</span>
						<span class="pr-skill-badge">Slack</span>
						<span class="pr-skill-badge">Jira</span>
						<span class="pr-skill-badge">Bitbucket</span>
						<span class="pr-skill-badge">Confluence</span>
						<span class="pr-skill-badge">Figma</span>
					</div>
					<h3 class="pr-sublabel pr-sublabel-gap">AI 도구</h3>
					<div class="pr-badges">
						<span class="pr-skill-badge">Cursor AI</span>
						<span class="pr-skill-badge">Claude</span>
					</div>
				</section>

				<section class="pr-edu-section">
					<h2 class="pr-label">EDUCATION</h2>
					<strong class="pr-company">대진대학교</strong>
					<p class="pr-edu-sub">문헌정보학과 졸업</p>
					<p class="pr-muted">2012.02 — 2017.08</p>
				</section>
			</div>
		</div>
	</article>
</div>

<style>
	/* ── 화면 전용 ── */
	.controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 24px;
		background-color: var(--color-surface-soft);
		border-bottom: 1px solid var(--color-hairline);
		position: sticky;
		top: 64px;
		z-index: 10;
	}

	.back-link {
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		color: var(--color-muted);
		transition: color 0.15s ease;
	}

	.back-link:hover {
		color: var(--color-ink);
	}

	.save-btn {
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		line-height: 1;
		padding: 9px 18px;
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		border: none;
		border-radius: var(--rounded-md);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.save-btn:active {
		background-color: var(--color-primary-active);
	}

	.preview-wrap {
		background-color: var(--color-surface-card);
		padding: 40px 24px;
		min-height: calc(100vh - 64px - 48px);
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	/* A4 종이 카드 */
	.page {
		width: 210mm;
		min-height: 297mm;
		padding: 15mm;
		background: #ffffff;
		box-shadow:
			0 4px 6px rgba(20, 20, 19, 0.06),
			0 10px 40px rgba(20, 20, 19, 0.12);
		font-family: 'IBM Plex Sans KR', 'Inter', sans-serif;
		color: #141413;
	}

	/* ── 헤더 ── */
	.pr-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 5mm;
	}

	.pr-name {
		font-family: 'Cormorant Garamond', 'Noto Serif KR', serif;
		font-size: 28pt;
		font-weight: 400;
		line-height: 1.05;
		color: #141413;
		letter-spacing: -0.5pt;
		margin: 0;
	}

	.pr-role-line {
		font-size: 8.5pt;
		color: #6c6a64;
		margin-top: 2mm;
		font-weight: 400;
	}

	.pr-contact {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 1mm;
		font-size: 8pt;
		color: #6c6a64;
		line-height: 1.5;
	}

	.pr-contact a {
		color: #6c6a64;
		text-decoration: none;
	}

	.pr-contact a:hover {
		color: #cc785c;
		text-decoration: underline;
	}

	/* ── 구분선 ── */
	.pr-divider {
		border: none;
		border-top: 1px solid #e6dfd8;
		margin: 4mm 0;
	}

	/* ── About ── */
	.pr-about {
		font-size: 9pt;
		line-height: 1.65;
		color: #3d3d3a;
		margin: 0;
	}

	/* ── 2단 본문 ── */
	.pr-body {
		display: grid;
		grid-template-columns: 3.5fr 1.5fr;
		gap: 0;
		margin-top: 5mm;
	}

	.pr-left {
		padding-right: 8mm;
	}

	.pr-right {
		padding-left: 8mm;
		border-left: 1px solid #e6dfd8;
	}

	/* ── 섹션 레이블 ── */
	.pr-label {
		font-family: 'Inter', sans-serif;
		font-size: 7pt;
		font-weight: 600;
		letter-spacing: 1.5pt;
		text-transform: uppercase;
		color: #cc785c;
		margin: 0 0 3.5mm 0;
	}

	.pr-sublabel {
		font-size: 8.5pt;
		font-weight: 600;
		color: #141413;
		margin: 0 0 2mm 0;
	}

	.pr-sublabel-gap {
		margin-top: 4mm;
	}

	/* ── 불릿 리스트 ── */
	.pr-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5mm;
	}

	.pr-list li {
		font-size: 8pt;
		line-height: 1.5;
		color: #3d3d3a;
		padding-left: 9pt;
		position: relative;
	}

	.pr-list li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: #8e8b82;
		font-size: 7.5pt;
	}

	/* ── 학력 ── */
	.pr-edu-section {
		margin-top: 7mm;
	}

	.pr-company {
		font-size: 10pt;
		font-weight: 600;
		color: #141413;
		display: block;
	}

	.pr-edu-sub {
		font-size: 8.5pt;
		color: #3d3d3a;
		margin: 1mm 0 0.5mm;
	}

	.pr-muted {
		font-size: 8pt;
		color: #6c6a64;
		margin: 0;
	}

	/* ── 기술 배지 ── */
	.pr-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5mm;
		margin: 0;
	}

	.pr-skill-badge {
		font-size: 7.5pt;
		color: #3d3d3a;
		background-color: #f5f0e8;
		padding: 1pt 5pt;
		border-radius: 99pt;
		white-space: nowrap;
	}

	/* ── 프로젝트 소제목 ── */
	.pr-proj {
		font-size: 8pt;
		font-weight: 600;
		color: #141413;
		margin: 3mm 0 1.5mm 0;
	}

	/* ── 경험 아이템 ── */
	.pr-exp {
		margin-bottom: 4mm;
		padding-top: 4mm;
		border-top: 1px solid #e6dfd8;
		break-inside: avoid;
	}

	.pr-label + .pr-exp {
		padding-top: 0;
		border-top: none;
	}

	.pr-exp:last-child {
		margin-bottom: 0;
	}

	.pr-exp-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0;
		gap: 4mm;
	}

	.pr-badge {
		display: inline-block;
		font-size: 7.5pt;
		color: #6c6a64;
		background-color: #f5f0e8;
		padding: 1pt 6pt;
		border-radius: 99pt;
		margin-bottom: 0;
	}

	/* ── 인쇄 시 ── */
	@page {
		size: A4 portrait;
		margin: 15mm;
	}

	@media print {
		:global(html),
		:global(body) {
			background: #ffffff !important;
		}

		:global(.top-nav),
		:global(.drawer),
		:global(.drawer-overlay) {
			display: none !important;
		}

		:global(main) {
			padding-top: 0 !important;
		}

		.controls {
			display: none;
		}

		.preview-wrap {
			display: contents;
		}

		.page {
			width: auto;
			min-height: auto;
			padding: 0;
			box-shadow: none;
		}
	}
</style>
