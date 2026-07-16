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
	resumeImpact?: {
		label: string;
		detail: string;
	};
	bullets: string[];
}

export const projects: Project[] = [
	{
		id: 'acuvue-renewal',
		title: '안경사 통합관리 시스템 리뉴얼 (JSP → React)',
		company: '라텔앤드파트너즈',
		period: '2025.10 — 2026.03',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: 'FE 3명 · 기여도 30%',
		tags: ['팀 리딩', '웹 프로젝트', '코드'],
		stack: ['React', 'TypeScript', 'Vite', 'Emotion', 'yarn'],
		summary:
			'60개 이상의 안경사·관리자 화면을 Spring/JSP에서 React로 전환한 리뉴얼을 파트 리더로 이끔',
		problem:
			'제품판매 화면이 15,000줄짜리 단일 JavaScript 파일로 구성돼 기능 간 결합도가 높았고, 팝업·배너도 날짜 조건으로 하드코딩돼 변경할 때마다 약 20분의 운영 배포가 필요했음.',
		solution:
			'6개 사용자 역할에 따른 60개 이상의 화면과 라우팅 규칙을 정리해 React로 점진 전환함. 파트 리더로 IA·업무 배분·결제 및 정적 리소스 규칙을 문서화하고, 배너는 서버팀과 협의해 DB 기반 어드민 관리 구조로 변경함.',
		result:
			'기능별 결합도를 낮추고 프론트엔드 독립 배포 구조를 구축해 운영 배포 시간을 약 20분에서 1분 30초로 단축함. 배너 변경을 프론트 배포 없이 어드민에서 처리할 수 있게 됨.',
		resumeImpact: {
			label: '독립 배포 구조 구축 · 운영 배포 약 20분 → 1분 30초',
			detail:
				'JSP 기반 60개 이상 화면과 15,000줄 제품판매 JavaScript를 기능 단위 React 구조로 전환하고, 배너 운영을 어드민으로 이관'
		},
		bullets: [
			'FE 3명의 업무를 배분하고 6개 역할별 라우팅, 결제 성공·실패, 인증·보안, S3 정적 리소스 규칙을 문서화',
			'15,000줄 제품판매 JavaScript를 기능 단위 React 구조로 전환하고 프론트엔드 독립 배포 구조를 구축해 운영 배포 시간을 약 20분에서 1분 30초로 단축',
			'날짜 조건으로 하드코딩하던 팝업·서브배너·롤링배너를 DB 기반 어드민 관리 방식으로 전환',
			'렌즈 계산기 ComboBox 리팩토링: 숫자 입력에 따라 도수 옵션을 자동 변환·노출하고, blur/focusout/enter/tab을 tabIndex 흐름으로 통일해 키보드 접근성 처리'
		]
	},
	{
		id: 'lens-simulator',
		title: '안경사 대상 렌즈 시뮬레이터 게임 개발',
		company: '라텔앤드파트너즈',
		period: '2024.11 — 2025.02 · 2026.04 — 2026.05',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: '1차 FE 단독 100% · 2차 기술 검토 5%',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'TypeScript', 'Framer Motion', 'Zustand', 'Okta'],
		summary:
			'안경사와 산학 협력 사용자가 고객 상담·렌즈 맞춤 과정을 연습하는 단계형 시뮬레이터를 설계·개발',
		problem:
			'서버가 전체 대화·문제 데이터를 깊게 중첩된 객체로 한 번에 전달해 단계별 상태 처리가 복잡했음. Context·Funnel 기반 단계는 새로고침 시 유지되지 않았고, 모달을 열고 닫을 때 완료된 메시지의 타이핑 애니메이션이 다시 실행됐음.',
		solution:
			'단계 상태를 Zustand로 통합해 새로고침 후에도 진행 상태를 유지하고, 메시지별 stepNumber로 타이핑 애니메이션을 한 번만 실행하도록 제어함. 2차에서는 기존 모달의 문제를 정리하고 overlay-kit 적용을 위한 기술 검토와 인수인계를 담당함.',
		result:
			'1차 서비스를 FE 단독으로 구축해 안경원에 배포했고, 2차 산학 협력 확장에 필요한 상태·모달 구조 개선 방향을 팀에 인계함.',
		resumeImpact: {
			label: '1차 FE 단독 구축 · 2차 기술 인계',
			detail: '새로고침 상태 유지와 모달 재진입 시 타이핑 애니메이션 반복 문제를 해결'
		},
		bullets: [
			'1차는 기획 1·BE 2와 협업하며 FE 전반을 단독 개발하고, 2차는 FE 2명에게 기존 구조와 하드코딩 영역을 인계',
			'Context·Funnel 상태를 Zustand로 통합해 새로고침에도 단계 진행 상태가 유지되도록 변경',
			'메시지별 stepNumber를 적용해 모달 재진입 시 타이핑 애니메이션이 반복되는 문제 해결',
			'초기 모노레포 구성이 서비스 범위 축소 후 오버엔지니어링이 된 경험을 통해 실제 확장 시점에 맞춘 구조 선택의 중요성을 확인'
		]
	},
	{
		id: 'smartfitting',
		title: '모바일/태블릿용 착용 렌즈 계산기',
		company: '라텔앤드파트너즈',
		period: '2025 — 2026',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: 'FE 3명 · 기술 의사결정 및 협업 조율',
		tags: ['모바일 앱', '코드'],
		stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Emotion'],
		summary:
			'안경사 통합관리 시스템의 렌즈 계산기를 모바일·태블릿에서 쓸 수 있게 별도 앱으로 구현 (QR 브릿지 로그인)',
		problem:
			'iOS의 input type="number"가 도수 입력에 필요한 -/+/. 기호를 받지 못했음. 게다가 운영 반영 3일 전, 지급 기기가 아이폰13미니~아이패드 프로 기준에서 Lenovo Tab M9으로 바뀌며 반응형이 모바일로 오인식돼 레이아웃이 깨졌음.',
		solution:
			'기호 입력은 ComboBox를 직접 구현하고 유효성 검사를 붙여 해결. 보안팀과 협의해 동의 전에는 개인정보를 제외한 도수만 Zustand와 localStorage에 저장함. Tab M9의 DPR로 논리적 뷰포트가 450~550px로 잡히는 원인을 계산으로 특정하고 브레이크포인트를 재조정함.',
		result:
			'비정상 소수 입력으로 Whatap에 기록되던 400 오류를 제거하고 사용 편의성 개선 피드백을 받음. 운영 3일 전 발생한 기기 대응도 완료해 일정에 맞춰 배포·운영함.',
		resumeImpact: {
			label: '입력 400 오류 제거 · 기한 내 배포',
			detail: 'ComboBox 유효성, 도수 상태 보존과 Lenovo Tab M9 DPR 대응을 완료'
		},
		bullets: [
			'기술 의사결정과 UI·UX 및 사용자 흐름 협의, 백엔드 API 커뮤니케이션을 조율하고 주문 가능 제품 마크업·연동을 담당',
			'ComboBox 유효성 검사로 비정상 소수 입력에 따른 400 오류를 제거하고 사용 편의성 개선 피드백 확보',
			'보안팀과 협의해 개인정보 없이 도수만 로컬에 보관하고 구면·난시·멀티포컬 탭과 새로고침 사이 상태 유지',
			'운영 3일 전 변경된 Lenovo Tab M9의 DPR·논리적 뷰포트를 분석해 반응형 오작동을 기한 내 해결'
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
		result:
			'흰 화면이 발생하던 마커 2만 개를 정상 노출하고 국내·해외 결제를 연동함. JSP·React를 약 1년간 동시 운영하며 전체의 약 10%를 점진 전환함.',
		resumeImpact: {
			label: '지도 마커 2만 개 정상 노출',
			detail: '클러스터링과 서버 데이터 축소로 브라우저 다운을 해결하고 국내·해외 결제를 연동'
		},
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
		period: '2024.08 — 2026.04 · 총 5차',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: 'FE 1명 · 기여도 100%',
		tags: ['웹 프로젝트', '코드'],
		stack: ['JSP', 'JavaScript', 'Web Components', '네이버 OCR', 'AWS Text', '드림시큐리티'],
		summary: '마이아큐브 비회원 안경점 대상 이벤트 프로모션. 구매 LOT 스캔·휴대폰 인증 플로우 구현',
		problem:
			'드림시큐리티 인증 요청이 응답 없이 막혔고, 네이버 OCR은 제품 변경 때마다 학습용 스캔본과 APP KEY를 다시 등록해야 해 비용과 운영 부담이 컸음.',
		solution:
			'서버 로그에서 Spring Security 필터 체인의 CSRF 차단을 특정해 임시 정상화하고 인프라·백엔드팀의 정식 개선으로 연결함. 4차부터 AWS 텍스트 스캔 API로 전환하고, 5차는 HBS 프로젝트로 이전하며 Web Components와 단계형 흐름으로 재구성함.',
		result:
			'기획 1·BE 1과 협업하며 FE를 단독 담당해 5차례 캠페인을 운영함. 약 70개 안경원이 참여했고 LOT 스캔을 통해 300만 원 이상의 인보이스가 발생함.',
		bullets: [
			'1차 본인인증·OCR 연동부터 5차 HBS·Web Components 전환까지 총 5차례 FE를 단독 담당',
			'구매 LOT 스캔을 1~3차 네이버 OCR에서 4~5차 AWS 텍스트 스캔 API로 전환해 제품 재학습과 APP KEY 변경 부담 축소',
			'백엔드팀도 원인을 못 찾던 드림시큐리티 API 연동 장애를, 서버 로그를 직접 뜯어보며 Spring Security 필터 체인의 CSRF 차단으로 특정',
			'약 70개 안경원이 참여해 LOT 스캔 기준 300만 원 이상의 인보이스 발생'
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
		resumeImpact: {
			label: 'JSP·React 약 1년 동시 운영',
			detail: 'AWS S3·Pipeline 환경을 구성해 서비스를 유지하며 전체의 약 10%를 점진 전환'
		},
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
