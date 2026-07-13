type Tag = '웹 프로젝트' | '모바일 앱' | '코드' | '팀 리딩';

export interface Project {
	id: string;
	title: string;
	company: string;
	period: string;
	featured?: boolean;
	role?: string; // 역할
	contribution?: string; // 기여도 (예: 'FE 3명 · 기여도 30%')
	tags: Tag[];
	stack: string[];
	summary: string;
	problem?: string; // 문제
	solution?: string; // 해결
	result?: string; // 성과
	bullets: string[];
}

export const projects: Project[] = [
	{
		id: 'acuvue-renewal',
		title: '안경사 통합관리 시스템 리뉴얼 (Spring/JSP → React)',
		company: '라텔앤드파트너즈',
		period: '2025.10 — 2026.03',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: 'FE 3명 · 기여도 30%',
		tags: ['팀 리딩', '웹 프로젝트', '코드'],
		stack: ['React', 'TypeScript', 'Vite', 'Emotion', 'yarn'],
		summary:
			'레거시 마이아큐브웹(Java·JSP)을 React 기반 안경사 통합관리 시스템으로 옮기는 리뉴얼을 파트 리더로 이끔',
		problem:
			'마이아큐브웹이 Java·JSP 레거시로 묶여 있었고, 제품판매 화면은 15,000줄짜리 단일 JS 파일이라 기능 추가와 유지보수가 어려웠음. 팝업·배너도 프론트에 하드코딩돼 문구 하나 바꾸려면 배포가 필요했음.',
		solution:
			'레거시를 분석·문서화하고 React로 점진 전환하면서 파트 리더로 IA 관리·업무 분배·기획/디자인 의사결정을 맡음. 하드코딩된 팝업·서브배너·롤링배너는 서버팀과 합의해 어드민에서 동적으로 등록하는 API 구조로 바꿈.',
		result:
			'15,000줄 제품판매 JS를 React 구조로 정리해 유지보수성을 확보했고, 배너는 코드 배포 없이 어드민에서 관리하게 됨.',
		bullets: [
			'레거시 분석과 컨플루언스 문서화, IA 관리, 업무 분배, 기획/디자인 의사결정까지 파트 리더로 맡음 (FE 3명, 기여도 30%)',
			'15,000줄짜리 제품판매 JS 파일을 React로 걷어내 유지보수하기 쉽게 정리',
			'프론트에 하드코딩돼 있던 팝업·서브배너·롤링배너를, 서버팀과 합의해 어드민에서 동적으로 등록하게 바꿈',
			'렌즈 계산기 ComboBox 리팩토링: 숫자 입력에 따라 도수 옵션을 자동 변환·노출하고, blur/focusout/enter/tab을 tabIndex 흐름으로 통일해 키보드 접근성 처리'
		]
	},
	{
		id: 'lens-simulator',
		title: '안경사 대상 렌즈 시뮬레이터 게임 개발',
		company: '라텔앤드파트너즈',
		period: '2024 — 2025',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: 'FE 1명 · 기여도 100%',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'TypeScript', 'Framer Motion', 'Zustand', 'Okta'],
		summary: '안경원 고객 상담·렌즈 맞춤 프로세스를 학습형 시뮬레이터로 설계·개발',
		problem:
			'안경원의 고객 상담·렌즈 맞춤 프로세스를 안경사가 몸에 익히기 어려웠음. 실제 상담 흐름을 따라가며 연습할 도구가 필요했음.',
		solution:
			'상담·맞춤 프로세스를 단계별 학습형 시뮬레이터로 설계하고, Framer Motion 애니메이션으로 진행 흐름을 시각화. Zustand로 단계 상태를 관리하고 Okta로 인증을 붙임.',
		result: '상담 흐름을 따라 연습하는 학습형 시뮬레이터를 단독(기여도 100%)으로 설계·개발.',
		bullets: [
			'안경원 고객 상담·렌즈 맞춤 프로세스를 학습형 시뮬레이터로 설계·개발 (FE 1명, 기여도 100%)',
			'React + Framer Motion 애니메이션, Zustand 상태 관리, Okta 인증 연동'
		]
	},
	{
		id: 'smartfitting',
		title: '모바일/태블릿용 착용 렌즈 계산기',
		company: '라텔앤드파트너즈',
		period: '2025 — 2026',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: 'FE 4명 · 기여도 20%',
		tags: ['모바일 앱', '코드'],
		stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Emotion'],
		summary:
			'안경사 통합관리 시스템의 렌즈 계산기를 모바일·태블릿에서 쓸 수 있게 별도 앱으로 구현 (QR 브릿지 로그인)',
		problem:
			'iOS의 input type="number"가 도수 입력에 필요한 -/+/. 기호를 받지 못했음. 게다가 운영 반영 3일 전, 지급 기기가 아이폰13미니~아이패드 프로 기준에서 Lenovo Tab M9으로 바뀌며 반응형이 모바일로 오인식돼 레이아웃이 깨졌음.',
		solution:
			'기호 입력은 ComboBox를 직접 구현하고 유효성 검사를 붙여 해결. 동의 전 도수 데이터는 서버에 저장할 수 없어 Zustand + persist로 프론트에서만 관리(탭 간 유지·새로고침 대응). 반응형 오작동은 Tab M9의 1340×800·DPR 1.5~2 때문에 논리적 뷰포트가 450~550px로 잡히는 게 원인임을 계산으로 특정하고, M9 기준으로 브레이크포인트를 재조정.',
		result:
			'기호 입력·상태 유지 문제를 해결하고, 기기 변경으로 생긴 반응형 오작동을 3일 안에 잡아 기한 내 배포.',
		bullets: [
			'iOS input type="number"가 기호(-/+/.) 입력을 막아서, ComboBox를 직접 구현하고 유효성 검사를 붙임',
			'동의 전에는 서버에 저장할 수 없는 도수 데이터를 Zustand + persist로 프론트에서만 관리, 구면·난시·멀티포컬 탭 간 유지·새로고침 대응',
			'운영 3일 전 지급 기기가 Lenovo Tab M9으로 바뀌며 반응형이 깨졌는데, DPR·논리적 뷰포트를 계산해 원인 찾고 브레이크포인트 재조정으로 기한 내 해결'
		]
	},
	{
		id: 'shopl-dashboard',
		title: '관리자 대시보드 개발 및 운영',
		company: '샤플앤컴퍼니',
		period: '2021.04 — 2023.08',
		role: '프론트엔드 개발자',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'JSP', 'JavaScript', '네이버 지도 API', 'Stripe', 'iamport'],
		summary: '현장 직원 관리·감독 서비스 샤플의 관리자 대시보드 개발·운영',
		problem:
			'"할 일" 지도 기능에서 근무지 마커를 2만 개 한 번에 그리면 브라우저가 다운됐음. 결제(아임포트·Stripe) 정기결제 흐름은 공식 문서가 불명확했음.',
		solution:
			'마커는 클러스터링으로 긴급 대응한 뒤, 서버가 화면 영역 기준으로 데이터를 줄여 내려주도록 합의해 근본 해결. 정기결제는 고객센터 문의와 서버 개발자 협의로 흐름을 확정.',
		result: '마커 2만 개 렌더링 다운 이슈 해결, 1년간 안정 운영. 국내·해외 결제 연동 완료.',
		bullets: [
			'아임포트·Stripe API로 결제 연동',
			'구글·바이두 지도 API를 국내 네이버·해외 구글 지도로 교체하고 공통화',
			'Map API 클러스터 기능으로 근무지·직원별 작업률 시각화 (마커 2만 개를 한 번에 그리다 브라우저가 다운되던 걸 클러스터링으로 해결)',
			'휴가 승인·임산부 등록·게시판·공지·설문 등 기능 페이지 개발'
		]
	},
	{
		id: 'acuvue-lead',
		title: '아큐브 전사 서비스 개발 · 파트 리더',
		company: '라텔앤드파트너즈',
		period: '2024.04 — 2026.06',
		role: '프론트엔드 파트 리더',
		tags: ['팀 리딩', '웹 프로젝트'],
		stack: ['React', 'TypeScript', 'Zustand', 'Framer Motion'],
		summary: '소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템 등 전사 서비스 개발·운영 담당',
		bullets: [
			'소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템 등 전사 서비스 개발·운영 담당',
			'기획·디자인·개발팀과 초기 기획 단계부터 참여, 요구사항 정의와 기능 우선순위 조율',
			'팀 업무 배분과 일정 관리를 맡고 의사결정을 도움'
		]
	},
	{
		id: 'nonmyacuvue-promo',
		title: '논마이아큐브 프로모션 (1~5차)',
		company: '라텔앤드파트너즈',
		period: '2025 — 2026',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: 'FE 1명 · 기여도 100%',
		tags: ['웹 프로젝트', '코드'],
		stack: ['JSP', 'JavaScript', 'Web Components', '네이버 OCR', 'AWS Text', '드림시큐리티'],
		summary: '마이아큐브 비회원 안경점 대상 이벤트 프로모션. 구매 LOT 스캔·휴대폰 인증 플로우 구현',
		problem:
			'드림시큐리티 인증 API로 나가는 요청이 응답 없이 막혔는데, 백엔드팀도 원인을 못 찾았고 담당 백엔드도 부재 상황이었음.',
		solution:
			'서버 로그를 직접 뜯어보며 애플리케이션 로직이 아니라 Spring Security 필터 체인의 CSRF 정책 차단이 원인임을 특정. 임시로 해당 경로를 예외 처리해 정상화한 뒤, 필터 전체 예외가 아니라 CSRF 예외 처리 방식으로 정식 개선하도록 백엔드팀에 인계.',
		result:
			'백엔드 담당 부재 상황에서 프론트 개발자가 백엔드 영역 장애를 단독으로 진단·조치하고 정식 개선까지 연결.',
		bullets: [
			'구매 LOT 스캔(1~3차 네이버 OCR / 4~5차 AWS Text API)과 휴대폰 인증(드림시큐리티) 플로우 구현. 1~4차는 클래스형, 5차는 Web Components로 전환',
			'백엔드팀도 원인을 못 찾던 드림시큐리티 API 연동 장애를, 서버 로그를 직접 뜯어보며 Spring Security 필터 체인의 CSRF 차단으로 특정',
			'백엔드 담당 부재라 임시 조치까지 혼자 하고, 정식 개선(필터 전체 예외가 아니라 CSRF 예외 처리)은 백엔드팀에 인계'
		]
	},
	{
		id: 'promotion-event',
		title: '소비자 대상 프로모션 이벤트 페이지 개발',
		company: '라텔앤드파트너즈',
		period: '2024 — 2025',
		role: '프론트엔드 파트 리더',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'TypeScript', 'GA', 'Meta Pixel', 'Kakao Pixel'],
		summary: '마케팅 캠페인 요구사항 기반 단기 프로모션 페이지 개발',
		bullets: [
			'마케팅 캠페인 요구사항 기반 단기 프로모션 페이지 개발',
			'GA·Meta Pixel·Kakao Pixel 전환·행동 트래킹 연동, 이벤트 측정 로직 구현',
			'쿠폰 발급·럭키드로우 등 프로모션 기능 개발과 서버 연동'
		]
	},

	{
		id: 'max-discount',
		title: '제품 판매 페이지 최대 할인 혜택 기능',
		company: '라텔앤드파트너즈',
		period: '2024 — 2025',
		role: '프론트엔드 파트 리더',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'TypeScript'],
		summary: '기존 스캔·쿠폰·결제 로직과 분리해 최대 혜택가 계산을 클래스형으로 모듈화',
		bullets: [
			'기존 스캔·쿠폰·결제 로직과 분리해 최대 혜택가 계산을 클래스형으로 모듈화, 유지보수하기 쉽게 정리',
			'관리자 페이지에서 쿠폰을 등록·관리하도록 DB 기반으로 구현'
		]
	},
	{
		id: 'sales-mobile',
		title: '영업사원 현장 지원 프로그램 · 모바일 리뉴얼',
		company: '라텔앤드파트너즈',
		period: '2024 — 2025',
		role: '프론트엔드 파트 리더',
		tags: ['모바일 앱', '코드'],
		stack: ['React', 'TypeScript'],
		summary: 'PC 전용 내부 시스템을 React 기반 모바일로 리뉴얼',
		bullets: [
			'PC 전용 내부 시스템을 React 기반 모바일로 리뉴얼',
			'약정서 체결·승인 프로세스를 재사용 가능한 블록으로 공통화'
		]
	},
	{
		id: 'cre8or-sentry',
		title: 'Sentry 에러 모니터링 대시보드 구축·운영',
		company: '라텔앤드파트너즈',
		period: '2025 — 2026',
		role: '프론트엔드 파트 리더',
		tags: ['웹 프로젝트', '코드'],
		stack: ['Sentry', 'Slack', 'React'],
		summary: 'Cre8or-Club 웹뷰 전체의 에러·성능을 Sentry 대시보드로 모니터링',
		problem:
			'Cre8or-Club 웹뷰에서 나는 크래시·API 에러를 흩어진 채로만 확인해, 장애를 늦게 알아채는 경우가 있었음.',
		solution:
			'웹뷰 전체의 크래시·API 에러·성능을 추적하는 Sentry 대시보드를 구성하고, Slack에 연동해 에러가 나면 바로 알림이 오게 함.',
		result: '장애 발생 시 실시간으로 감지·대응하는 체계를 마련.',
		bullets: [
			'크래시·API 에러 등 웹뷰 전체 성능을 Sentry 대시보드로 추적',
			'Slack에 붙여서 에러가 나면 바로 알아채고 대응하게 함'
		]
	},
	{
		id: 'legacy-react',
		title: '레거시 웹 시스템 React 전환 및 AWS 배포',
		company: '샤플앤컴퍼니',
		period: '2021.04 — 2023.08',
		role: '프론트엔드 개발자',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'JavaScript', 'AWS S3', 'AWS Pipeline', 'JSP'],
		summary: 'JSP 기반 레거시 시스템을 React로 전환, AWS 배포 환경 구성',
		problem:
			'JSP 레거시라 유지보수·개발 속도가 느렸지만, 대표·PM은 서버·프론트 동시 배포 부담 때문에 마이그레이션에 반대했음. 실제로 React/JSP를 같이 띄우면 무한 호출 이슈도 났음.',
		solution:
			'운영·유지보수 관점을 근거로 설득해 착수 결정을 이끌고(Vue 대신 React 선택), AWS S3 + Pipeline으로 JSP와 React가 동시에 도는 환경을 구성. 무한 호출은 백엔드 index.html 리다이렉트 수정으로 해결.',
		result:
			'서비스를 멈추지 않고 점진적으로 마이그레이션을 시작했고, 재사용 컴포넌트 기반 구조와 반복 가능한 배포 파이프라인을 확보.',
		bullets: [
			'JSP 레거시를 React로 옮기며 재사용 가능한 UI 컴포넌트 설계',
			'React 빌드 결과물을 AWS S3에 올려 JSP·React가 같이 도는 환경 구성',
			'AWS Pipeline으로 배포를 안정화하고 반복 가능하게 만듦'
		]
	},

	{
		id: 'chat-v2',
		title: '채팅 v2.0 개발',
		company: '샤플앤컴퍼니',
		period: '2022 — 2023',
		role: '프론트엔드 개발자',
		contribution: '팀원 2명 · 진행률 90%',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'Vite', 'TypeScript', 'Sendbird UIkit 3.0'],
		summary: 'Electron + Sendbird UIkit 2.0 기반 채팅을 React + Vite 웹 서비스로 재구현',
		problem:
			'채팅이 Electron + Sendbird UIkit 2.0 기반이라 웹으로 확장·커스텀하기 어려웠고, UIkit이 채널 목록 재가공을 막는 제약이 있었음.',
		solution:
			'React + Vite + Sendbird UIkit 3.0으로 재구현하고, UIkit 제약은 "채널 검색 후 최상단 노출" 방식으로 요구사항을 재설계해 우회. 팀원 2명과 진행.',
		result: '웹 기반 채팅으로 재구현을 진행률 90%까지 진행.',
		bullets: [
			'Electron + Sendbird UIkit 2.0 기반 채팅을 React + Vite + Sendbird UIkit 3.0으로 커스텀 웹으로 재구현 (진행률 90%, 팀원 2명)'
		]
	}
];
