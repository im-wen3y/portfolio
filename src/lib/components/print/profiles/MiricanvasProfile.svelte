<script lang="ts">
	import PrintShell from '$lib/components/print/PrintShell.svelte';
	import type { PrintProfileConfig } from '$lib/components/print/print-profile';

	const company: PrintProfileConfig = {
		companyLabel: '미리캔버스',
		roleLine: 'Frontend Developer · 7년차',
		portfolioAbout:
			'React·TypeScript로 7년째 UI를 만들어온 프론트엔드 개발자입니다. Framer Motion과 CSS transition으로 인터랙션을 구현하고, ComboBox 같은 입력 컴포넌트를 플랫폼 제약에 맞춰 직접 짜는 일을 즐깁니다. Zustand로 탭 간 이벤트·상태 흐름을 설계하고, Vitest·Playwright로 테스트 코드를 작성합니다. 라이브러리 위에서 실제 사용자가 만나는 UI를 정밀하게 다듬는 작업에 관심이 많습니다.',
		featuredProjectIds: ['lens-simulator', 'smartfitting', 'promotion-event', 'max-discount']
	};
</script>

<PrintShell {company}>
	{#snippet resume()}
		<section class="pr-section">
			<p class="pr-about">
				React·TypeScript로 7년째 UI를 만들어온 프론트엔드 개발자입니다.
				<strong>Framer Motion과 CSS transition으로 인터랙션</strong>을 구현하고, ComboBox 같은 입력
				컴포넌트를 플랫폼 제약에 맞춰 직접 짜는 일을 즐깁니다. Zustand로 탭 간 이벤트·상태 흐름을
				설계하고, Vitest·Playwright로 테스트 코드를 작성합니다.
				<strong>라이브러리 위에서 실제 사용자가 만나는 UI를 정밀하게 다듬는 작업</strong>에 관심이
				많습니다.
			</p>
		</section>

		<hr class="pr-divider" />

		<section class="pr-section">
			<h2 class="pr-label">CORE STRENGTHS</h2>
			<div class="pr-strength-grid">
				<div class="pr-strength-card">
					<span class="pr-strength-tag">ANIMATION · INTERACTION</span>
					<h3 class="pr-strength-title">애니메이션 · 인터랙션 구현</h3>
					<p class="pr-strength-desc">
						Framer Motion으로 학습형 렌즈 시뮬레이터의 단계별 인터랙션을 구현하고, CSS
						transition으로 마이크로 인터랙션을 다듬었습니다. 고객 상담·렌즈 맞춤 프로세스를 사용자가
						따라가기 쉬운 흐름으로 설계했습니다.
					</p>
				</div>
				<div class="pr-strength-card">
					<span class="pr-strength-tag">COMPONENT · STATE</span>
					<h3 class="pr-strength-title">UI 컴포넌트 · 상태 설계</h3>
					<p class="pr-strength-desc">
						ComboBox를 iOS 숫자 키보드 제약에 맞춰 직접 구현하고 키보드 접근성까지 처리했습니다.
						Zustand + persist로 동의 전 도수 데이터의 탭 간 이벤트·상태 흐름을 설계한 경험이
						있습니다.
					</p>
				</div>
			</div>
		</section>

		<hr class="pr-divider" />

		<section class="pr-section">
			<h2 class="pr-label">PROJECT</h2>

			<div class="pr-exp">
				<div class="pr-exp-top">
					<strong class="pr-company">렌즈 시뮬레이터 · 스마트피팅 UI · 라텔앤드파트너즈</strong>
					<span class="pr-muted">2024.12 — 2026.06</span>
				</div>
				<p class="pr-stack">React · TypeScript · Zustand · Framer Motion · Emotion</p>
				<ul class="pr-list">
					<li>
						안경사 대상 렌즈 시뮬레이터 게임 — <strong
							>Framer Motion으로 학습형 인터랙션 애니메이션</strong
						>을 구현하고, 고객 상담·렌즈 맞춤 프로세스를 단계별 UI로 설계, Zustand로 상태 관리,
						Okta로 인증 연동
					</li>
					<li>
						스마트피팅(안경사 통합관리 시스템의 렌즈 계산기를 모바일·태블릿에서 쓸 수 있게 만든 별도
						앱)에서 iOS <code>input type="number"</code>가 기호(-/+/.) 입력을 지원하지 않는 제약에
						부딪혀 <strong>ComboBox를 직접 구현</strong>하고, 도수 옵션 자동 변환과 유효성 검사를
						강화
					</li>
					<li>
						개인정보 동의 전에는 서버에 저장할 수 없는 도수 데이터를 <strong
							>Zustand + persist로 프론트 전용 상태로 설계</strong
						>, 구면·난시·멀티포컬 탭 간 데이터 유지와 새로고침 대응까지 처리
					</li>
					<li>
						운영 반영 3일 전 지급 기기가 Lenovo Tab M9으로 바뀌며 반응형이 오작동 — <strong
							>DPR·CSS 논리적 뷰포트 계산으로 원인을 특정</strong
						>(1340×800에 DPR 1.5~2배가 적용돼 논리적 뷰포트가 450~550px로 잡혀 모바일로 오인식)하고
						브레이크포인트를 재조정해 기한 내 해결
					</li>
				</ul>
			</div>

			<div class="pr-exp pr-exp-quiet">
				<div class="pr-exp-top">
					<strong class="pr-company">프로모션 이벤트 페이지 · 라텔앤드파트너즈</strong>
					<span class="pr-muted">2024 — 2025</span>
				</div>
				<p class="pr-stack">React · TypeScript · GA · Meta Pixel · Kakao Pixel</p>
				<ul class="pr-list">
					<li>
						마케팅 캠페인 요구사항 기반 단기 프로모션 페이지를 주도하며, GA·Meta Pixel·Kakao Pixel
						<strong>전환·행동 트래킹을 연동</strong>하고 쿠폰 발급 등 프로모션 기능과 서버 연동
						플로우 구축
					</li>
					<li>
						반복되는 이벤트 개발을 위해 <strong>재사용 가능한 프로모션 컴포넌트 구조로 설계</strong
						>해 신규 이벤트를 빠르게 찍어낼 수 있도록 개선
					</li>
				</ul>
			</div>

			<div class="pr-exp pr-exp-quiet">
				<div class="pr-exp-top">
					<strong class="pr-company">제품 판매 페이지 · 라텔앤드파트너즈</strong>
					<span class="pr-muted">2025</span>
				</div>
				<p class="pr-stack">React · TypeScript</p>
				<ul class="pr-list">
					<li>
						최대 할인 혜택 기능을 기존 스캔·쿠폰·결제 로직과 <strong
							>독립적으로 클래스형으로 분리·모듈화</strong
						>해 유지보수성을 확보하고, 관리자 페이지에서 쿠폰을 등록·관리할 수 있도록 API 연동
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
