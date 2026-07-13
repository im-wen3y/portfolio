<script lang="ts">
	import PrintShell from '$lib/components/print/PrintShell.svelte';
	import type { PrintProfileConfig } from '$lib/components/print/print-profile';

	const company: PrintProfileConfig = {
		companyLabel: '미리캔버스 시니어',
		roleLine: 'Frontend Developer · 파트 리더 · 7년차',
		portfolioAbout:
			'7년차 프론트엔드 파트 리더입니다. 레거시 시스템의 React 전환을 두 번 이끌며, 대규모 코드베이스를 멈추지 않고 점진적으로 옮기는 마이그레이션을 경험했습니다. 결제·지도·인증 연동처럼 문서가 불명확하거나 팀 경계를 넘는 문제를 근본 원인까지 파고들어 해결해 왔고, 컨벤션 문서화·코드 리뷰·AI 워크플로우 정비로 팀 생산성을 높이는 데 관심이 많습니다.',
		featuredProjectIds: ['acuvue-renewal', 'legacy-react', 'shopl-dashboard']
	};
</script>

<PrintShell {company}>
	{#snippet resume()}
		<section class="pr-section">
			<p class="pr-about">
				7년차 프론트엔드 파트 리더입니다. 레거시 시스템의 React 전환을 두 번 이끌며 — 한 번은
				대표·PM을 설득해 착수시키고, 한 번은 파트 리더로 총괄하며 —
				<strong>대규모 코드베이스를 멈추지 않고 점진적으로 옮기는 마이그레이션</strong>을
				경험했습니다. 결제·지도·인증 연동처럼 문서가 불명확하거나 팀 경계를 넘는 문제를 서버
				로그·근본 원인까지 파고들어 해결해 왔고,
				<strong>컨벤션 문서화·코드 리뷰·AI 워크플로우 정비로 팀 생산성</strong>을 끌어올리는 데
				관심이 많습니다. 유지 가능한 구조와 팀의 기술 기준을 세우는 일을 좋아합니다.
			</p>
		</section>

		<hr class="pr-divider" />

		<section class="pr-section">
			<h2 class="pr-label">CORE STRENGTHS</h2>
			<div class="pr-strength-grid">
				<div class="pr-strength-card">
					<span class="pr-strength-tag">INCREMENTAL MIGRATION</span>
					<h3 class="pr-strength-title">점진적 레거시 마이그레이션 리드</h3>
					<p class="pr-strength-desc">
						샤플앤컴퍼니에서는 대표·PM의 반대를 설득해 JSP→React 마이그레이션을 착수시키고 JSP/React
						동시 운영 환경을 구성했고, 라텔앤드파트너즈에서는 파트 리더로 Java/JSP→React 리뉴얼을
						총괄(15,000줄 규모 전환)했습니다. 서비스를 멈추지 않고 옮기는 경험을 두 번 쌓았습니다.
					</p>
				</div>
				<div class="pr-strength-card">
					<span class="pr-strength-tag">LEADERSHIP · PRODUCTIVITY</span>
					<h3 class="pr-strength-title">기술 리더십 &amp; 팀 생산성</h3>
					<p class="pr-strength-desc">
						기획·디자인·개발팀과 요구사항·우선순위를 조율하고, 컨플루언스 문서화와 코드 컨벤션
						정비로 팀 기준을 세웠습니다. Claude Code를 CLAUDE.md 가이드·컨벤션 skills화로
						워크플로우에 통합해 반복 작업과 리뷰 부담을 줄였습니다.
					</p>
				</div>
			</div>
		</section>

		<hr class="pr-divider" />

		<section class="pr-section">
			<h2 class="pr-label">PROJECT</h2>

			<div class="pr-exp">
				<div class="pr-exp-top">
					<strong class="pr-company">안경사 통합관리 시스템 리뉴얼 · 라텔앤드파트너즈</strong>
					<span class="pr-muted">2024.04 — 2026.06</span>
				</div>
				<p class="pr-stack">React · TypeScript · Vite · Zustand · Emotion · Sentry</p>
				<ul class="pr-list">
					<li>
						소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템 등 <strong
							>전사 서비스 개발·운영을 파트 리더로 총괄</strong
						>, 기획 초기 단계부터 참여해 요구사항 정의·우선순위 조율
					</li>
					<li>
						레거시 마이아큐브웹(Java 1.8, JSP)을 <strong
							>안경사 통합관리 시스템(React 19)으로 리뉴얼하는 프로젝트를 파트 리더로 총괄</strong
						> (2025.10–2026.03, FE 3명) — 레거시 분석·컨플루언스 문서화·IA 관리·업무 분배까지 리드하고,
						15,000줄 규모 제품판매 JS 파일을 React로 전환해 유지보수 가능한 구조로 개선
					</li>
					<li>
						프론트에 하드코딩돼 있던 팝업·서브배너·롤링배너를 서버팀과 합의해 <strong
							>어드민에서 동적으로 등록·적용되는 API 구조로 전환</strong
						>
					</li>
					<li>
						논마이아큐브 프로모션에서 백엔드팀도 원인을 못 찾던 외부 인증 API(드림시큐리티) 연동
						장애를 서버 로그 직접 분석으로 진단 — <strong
							>Spring Security 필터 체인의 CSRF 정책 차단임을 특정</strong
						>하고, 담당 백엔드 부재 상황에서 임시 조치까지 단독 수행 후 정식 개선을 인계
					</li>
					<li>
						cre8or club 웹뷰에 <strong>Sentry 에러 모니터링 대시보드를 구축</strong> — 크래시·API 에러·성능을
						추적하고 Slack 알림을 연동해 장애를 실시간 감지·대응하는 체계 마련
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
				<p class="pr-stack">React · JSP · Redux Toolkit · React-Query · AWS(S3·Pipeline)</p>
				<ul class="pr-list">
					<li>
						<strong>대표·PM의 반대(서버·프론트 동시 배포 부담)를 설득</strong>해 JSP→React
						마이그레이션 착수 결정을 이끌어내고, 운영·유지보수 관점에서 Vue 대신 React를 택한 기술
						의사결정까지 주도
					</li>
					<li>
						AWS S3 + Pipeline으로 <strong
							>JSP와 React가 동시에 동작하는 점진적 배포 환경을 구성</strong
						>하고, 동시 구동 시 발생한 무한 호출 이슈를 원인 규명 후 해결
					</li>
					<li>
						"할 일" 기능(1년간 운영한 최장기 프로젝트)에서 지도 마커 2만 개 렌더링으로 브라우저가
						다운되던 이슈를 <strong
							>클러스터링으로 긴급 대응 후, 서버 데이터 축소로 근본 해결</strong
						>까지 주도
					</li>
					<li>
						아임포트(국내)·Stripe(해외) 결제 연동에서 공식 문서가 불명확했던 <strong
							>정기결제 흐름을 고객센터 문의·서버 개발자 협의로 직접 해결</strong
						>
					</li>
				</ul>
			</div>
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
					<p class="pr-edu-sub">문헌정보학과(전공) · 컴퓨터소프트웨어융합(부전공)</p>
					<p class="pr-muted">2012.02 — 2017.08</p>
				</div>
				<div>
					<strong class="pr-company">Loopers Loop:Pak L2 Frontend</strong>
					<p class="pr-edu-sub">Next.js 기반 시스템 설계·성능 최적화를 다루는 10주 심화 과정</p>
					<p class="pr-muted">2026.06 — 진행중</p>
				</div>
			</div>
		</section>
	{/snippet}
</PrintShell>
