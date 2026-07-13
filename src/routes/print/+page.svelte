<script lang="ts">
	import PrintShell from '$lib/components/print/PrintShell.svelte';
	import type { PrintProfileConfig } from '$lib/components/print/print-profile';

	const company: PrintProfileConfig = {
		companyLabel: '기본',
		roleLine: 'Frontend Developer · 7년차',
		portfolioAbout:
			'레거시 코드를 뜯어보고 다시 짜는 일, UI/UX를 사용자 입장에서 따져보고 토론하는 일을 좋아하는 7년차 프론트엔드입니다. 아큐브 전사 서비스를 파트 리더로 맡으며 업무 프로세스를 정립하고, 마이그레이션·복잡한 연동·모니터링까지 두루 다뤘습니다.',
		featuredProjectIds: ['acuvue-renewal', 'lens-simulator', 'smartfitting']
	};
</script>

<PrintShell {company}>
	{#snippet resume()}
		<section class="pr-section">
			<p class="pr-about">
				프론트엔드 개발자로 시작해 지금은 파트 리더로 팀을 이끌고 있습니다. 레거시 시스템의 React
				전환도 처음엔 <strong>설득하는 역할</strong>이었지만, 이후엔
				<strong>직접 주도하는 역할</strong>로 바뀌었습니다. 결제·지도 연동처럼 문서가 불명확한
				문제도 직접 부딪혀 해결해 왔습니다. 최근에는 Claude Code를 프로젝트 컨벤션과 리뷰
				워크플로우에 통합해 AI 도구를 팀 생산성을 높이는 데 쓰고 있습니다. 기술은 필요성과 유지보수
				비용을 보고 고르는 편이고, 협업에서는 이해관계자를 설득해 일이 되게 만드는 방향을 먼저
				제안합니다.
			</p>
		</section>

		<hr class="pr-divider" />

		<section class="pr-section">
			<h2 class="pr-label">CORE STRENGTHS</h2>
			<div class="pr-strength-grid">
				<div class="pr-strength-card">
					<span class="pr-strength-tag">MIGRATION · LEADERSHIP</span>
					<h3 class="pr-strength-title">레거시 마이그레이션 리드 &amp; 파트 리더십</h3>
					<p class="pr-strength-desc">
						라텔앤드파트너즈에서 파트 리더로 Spring/JSP→React 리뉴얼을 총괄(15,000줄 규모 전환).
						기획·디자인·개발팀과 요구사항·우선순위를 조율하고 업무 배분·의사결정을 지원하며 팀
						생산성을 끌어올렸습니다.
					</p>
				</div>
				<div class="pr-strength-card">
					<span class="pr-strength-tag">AI WORKFLOW</span>
					<h3 class="pr-strength-title">AI 도구를 팀 워크플로우로 통합</h3>
					<p class="pr-strength-desc">
						Cursor AI·Claude Code를 일상 개발에 쓰고, Claude Code는 단순 보조를 넘어 CLAUDE.md
						가이드·코드 컨벤션 skills화·AI 산출물 표기 규칙까지 프로세스 자체로 설계했습니다.
					</p>
				</div>
			</div>
		</section>

		<hr class="pr-divider" />

		<section class="pr-section">
			<h2 class="pr-label">PROJECT</h2>

			<div class="pr-exp">
				<div class="pr-exp-top">
					<strong class="pr-company">아큐브 전사 서비스 개발 · 라텔앤드파트너즈</strong>
					<span class="pr-muted">2024.04 — 2026.06</span>
				</div>
				<p class="pr-stack">
					React · TypeScript · TanStack Query · Zustand · Framer Motion · Emotion · Vite · Cursor AI
				</p>
				<ul class="pr-list">
					<li>
						소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템 등 <strong
							>전사 서비스 개발·운영을 총괄</strong
						>, 기획 초기 단계부터 참여해 요구사항 정의·기능 우선순위 조율
					</li>
					<li>
						<strong
							>JSP로 구현된 레거시 안경사 통합관리 시스템을 React로 리뉴얼하는 프로젝트를 파트
							리더로 총괄</strong
						>
						(2025.10–2026.03, FE 3명, 기여도 30%) — 레거시 분석·컨플루언스 문서화부터 IA 관리·업무 분배·기획/디자인
						의사결정까지 리드, <strong>JS 파일 당 15,000줄 규모 제품판매 JS 파일</strong>을 React로
						전환해 유지보수 가능한 구조로 개선
					</li>
					<li>
						하드코딩돼 있던 팝업·서브배너·롤링배너를 서버팀과 합의해 <strong
							>어드민에서 동적으로 등록·적용되는 구조로 전환</strong
						>
					</li>
					<li>
						렌즈 계산기 ComboBox 리팩토링 — 숫자 입력값에 따른 도수 옵션(-3.00~-3.75, +3.00~+3.75) <strong
							>자동 변환·노출 로직</strong
						>을 만들고, blur/focus-out/enter/tab을 tabIndex 흐름으로 통일해 키보드 접근성 처리. 이후
						모바일 버전인 스마트피팅에서 iOS
						<code>input type="number"</code>가 기호(-/+/.) 입력을 지원하지 않는 제약에 부딪혀,
						<strong>ComboBox를 직접 구현하고 유효성 검사를 강화</strong>하는 방향으로 같은 패턴을
						재구현
					</li>
					<li>
						운영 반영 3일 전 스마트피팅 지급 기기가 Lenovo Tab M9으로 변경되며 반응형 오작동 발생 —
						<strong>DPR·CSS 논리적 뷰포트 계산으로 원인을 특정</strong>(9인치·1340×800 해상도에 DPR
						1.5~2배 적용 시 논리적 뷰포트가 450~550px로 잡혀 모바일로 오인식)하고 브레이크포인트를
						재조정해 기한 내 해결
					</li>
					<li>
						안경사 대상 렌즈 시뮬레이터 게임 — 고객 상담·렌즈 맞춤 프로세스 기반 학습형 시뮬레이터를
						<strong>Framer Motion 애니메이션·Zustand 상태 관리·Okta 인증</strong>으로 설계·개발
					</li>
					<li>
						논마이아큐브 프로모션에서 백엔드팀도 원인을 못 찾던 외부 인증 API(드림시큐리티) 연동
						장애를 서버 로그 직접 분석으로 진단 — <strong
							>Spring Security 필터 체인의 CSRF 정책 차단임을 특정</strong
						>하고, 담당 백엔드 부재 상황에서 임시 조치까지 단독 수행 후 정식 개선을 인계
					</li>
					<li>
						Cre8or-Club 웹뷰에 <strong>Sentry 에러 모니터링 대시보드를 구축</strong> — 크래시·API 에러·성능을
						추적하고 Slack 알림을 연동해 장애 발생 시 즉시 대응 가능한 체계 마련
					</li>
				</ul>
			</div>

			<div class="pr-exp pr-exp-quiet">
				<div class="pr-exp-top">
					<strong class="pr-company"
						>관리자 대시보드 &amp; 레거시 마이그레이션 · 샤플앤컴퍼니</strong
					>
					<span class="pr-muted">2021.04 — 2023.08</span>
				</div>
				<p class="pr-stack">React · JSP · Redux Toolkit · React-Query · Emotion</p>
				<ul class="pr-list">
					<li>
						<strong>대표·PM의 반대(서버·프론트 동시 배포 부담)를 설득</strong>해 JSP → React
						마이그레이션 착수 결정을 이끌어내고, Vue 대신 React를 택한 기술 의사결정까지 주도
					</li>
					<li>
						React/JSP 동시 구동 시 발생한 무한 호출 이슈를 원인 규명 후 해결, <strong
							>AWS S3 + Pipeline</strong
						>으로 배포 안정성·반복성 확보
					</li>
					<li>
						"할 일" 기능(1년간 운영한 최장기 프로젝트) — 구글·네이버 지도로 근무지별 작업률을
						시각화하던 중 <strong>마커 2만 개 렌더링으로 브라우저가 다운되는 이슈</strong>를
						클러스터링으로 긴급 대응 → 이후 서버 데이터 축소로 근본 해결까지 주도
					</li>
					<li>
						아임포트(국내)·Stripe(해외) 결제 연동 — 공식 문서가 불명확했던 <strong
							>정기결제 흐름을 고객센터 문의로 직접 해결</strong
						>
					</li>
					<li>
						Electron + Sendbird UIkit 2.0 기반 채팅을 <strong
							>React + Vite + Sendbird UIkit 3.0으로 재구현</strong
						> (진행률 90%, 팀원 2명), UIkit의 채널 목록 재가공 제약을 요구사항 재설계로 우회
					</li>
				</ul>
			</div>

			<p class="pr-etc">
				기타 프로젝트 — 아이티키 SI 개발팀(신한DS·롯데마트·공공기관·미스터피자 등 다수 고객사 백엔드
				개발·운영, 2018.07–2020.11), 책을피서 사이드 프로젝트(팀 독서 기록 서비스, 9일간 49커밋으로
				로그인·홈·팀 페이지 단독 구현, 2023.08~2023.12).
			</p>
		</section>

		<hr class="pr-divider" />

		<section class="pr-section">
			<h2 class="pr-label">EXPERIENCE</h2>

			<div class="pr-exp pr-exp-quiet">
				<div class="pr-exp-meta">
					<strong class="pr-company">라텔앤드파트너즈</strong>
					<span class="pr-muted">2024.04 — 2026.06 · 2년 2개월 · 프론트엔드 파트 리더</span>
				</div>
				<p class="pr-exp-summary">
					아큐브 전사 서비스(소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템)를 개발·운영하며
					파트 리더로서 주요 기능 설계 및 개발을 주도했습니다.
				</p>
			</div>

			<div class="pr-exp pr-exp-quiet">
				<div class="pr-exp-meta">
					<strong class="pr-company">샤플앤컴퍼니</strong>
					<span class="pr-muted">2021.04 — 2023.08 · 2년 4개월 · 프론트엔드 개발자</span>
				</div>
				<p class="pr-exp-summary">
					현장 직원 관리·감독 서비스 샤플(Shopl)의 관리자 대시보드와 채팅 서비스 개발 및 운영을
					담당했습니다.
				</p>
			</div>

			<div class="pr-exp pr-exp-quiet">
				<div class="pr-exp-meta">
					<strong class="pr-company">아이티키</strong>
					<span class="pr-muted">2018.07 — 2020.11 · 2년 4개월 · SI 개발팀 사원</span>
				</div>
				<p class="pr-exp-summary">
					SI 개발팀에서 다양한 업체의 백엔드 개발, 운영 및 유지보수 업무를 수행했습니다.
				</p>
			</div>
		</section>

		<hr class="pr-divider" />

		<section class="pr-section">
			<h2 class="pr-label">EDUCATION &amp; CERTIFICATION</h2>
			<div class="pr-edu-grid">
				<div>
					<strong class="pr-company">대진대학교</strong>
					<p class="pr-edu-sub">문헌정보학과(졸업)</p>
					<p class="pr-muted">2012.02 — 2017.08</p>
				</div>
			</div>
		</section>
	{/snippet}
</PrintShell>
