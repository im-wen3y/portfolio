export type Tag = '웹 프로젝트' | '모바일 앱' | '코드' | '팀 리딩' | '나의 선택';

export interface Project {
	id: string;
	title: string;
	company: string;
	period: string;
	tags: Tag[];
	stack: string[];
	summary: string;
	bullets: string[];
}

export const projects: Project[] = [
	{
		id: 'acuvue-lead',
		title: '아큐브 전사 서비스 개발 – 파트 리더',
		company: '라텔앤드파트너즈',
		period: '2024.04 — 2026.06',
		tags: ['팀 리딩', '웹 프로젝트', '나의 선택'],
		stack: ['React', 'TypeScript', 'Zustand', 'Framer Motion'],
		summary:
			'소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템 등 전사 서비스 개발 및 운영 총괄',
		bullets: [
			'소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템 등 전사 서비스 개발 및 운영 총괄',
			'기획·디자인·개발팀과 초기 기획 단계부터 참여, 요구사항 정의 및 기능 우선순위 조율',
			'팀 업무 배분, 일정 관리, 의사결정 지원으로 팀 생산성 향상'
		]
	},
	{
		id: 'promotion-event',
		title: '소비자 대상 프로모션 이벤트 페이지 개발',
		company: '라텔앤드파트너즈',
		period: '2024 — 2025',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'TypeScript', 'GA', 'Meta Pixel', 'Kakao Pixel'],
		summary: '마케팅 캠페인 요구사항 기반 단기 프로모션 페이지 개발 주도',
		bullets: [
			'마케팅 캠페인 요구사항 기반 단기 프로모션 페이지 개발 주도',
			'GA, Meta Pixel, Kakao Pixel 등 전환·행동 기반 트래킹 연동 및 이벤트 측정 로직 구현',
			'쿠폰 발급, 럭키드로우 등 프로모션 기능 개발 및 서버 연동 플로우 구축'
		]
	},
	{
		id: 'max-discount',
		title: '제품 판매 페이지 최대 할인 혜택 기능',
		company: '라텔앤드파트너즈',
		period: '2024 — 2025',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'TypeScript'],
		summary: '기존 스캔·쿠폰·결제 로직과 독립적으로 최대 혜택가 기능을 클래스형으로 분리, 모듈화',
		bullets: [
			'기존 스캔·쿠폰·결제 로직과 독립적으로 최대 혜택가 기능을 클래스형으로 분리, 모듈화 및 유지보수성 확보',
			'관리자 페이지에서 쿠폰 등록·관리 가능하도록 DB 기반 마크업과 기능 구현'
		]
	},
	{
		id: 'lens-simulator',
		title: '안경사 대상 렌즈 시뮬레이터 게임 개발',
		company: '라텔앤드파트너즈',
		period: '2024 — 2025',
		tags: ['웹 프로젝트', '코드', '나의 선택'],
		stack: ['React', 'TypeScript', 'Framer Motion', 'Zustand', 'Okta'],
		summary: '안경원 고객 상담 및 렌즈 맞춤 프로세스 기반 학습형 시뮬레이터 설계·개발',
		bullets: [
			'안경원 고객 상담 및 렌즈 맞춤 프로세스 기반 학습형 시뮬레이터 설계·개발',
			'React + Framer Motion 애니메이션, Zustand 상태 관리, Okta 기반 인증 구현'
		]
	},
	{
		id: 'sales-mobile',
		title: '영업사원 현장 지원 프로그램 – 모바일 리뉴얼',
		company: '라텔앤드파트너즈',
		period: '2024 — 2025',
		tags: ['모바일 앱', '코드'],
		stack: ['React', 'TypeScript'],
		summary: '기존 PC 전용 내부 시스템을 React 기반 모바일 친화적으로 리뉴얼',
		bullets: [
			'기존 PC 전용 내부 시스템을 React 기반 모바일 친화적으로 리뉴얼',
			'약정서 체결·승인 프로세스를 재사용 가능한 블록 형태로 공통화, 개발 효율성 강화'
		]
	},
	{
		id: 'shopl-dashboard',
		title: '관리자 대시보드 개발 및 운영',
		company: '샤플앤컴퍼니',
		period: '2021.04 — 2023.08',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'JSP', 'JavaScript', '네이버 지도 API', 'Stripe', 'iamport'],
		summary: '현장 직원 관리·감독 서비스 샤플의 관리자 대시보드 개발 및 운영',
		bullets: [
			'아임포트·Stripe API를 이용한 결제 연동 개발',
			'구글·바이두 지도 API를 국내 네이버, 해외 구글 지도 API로 변경 및 공통화',
			'네이버·구글 Map API의 Cluster 기능으로 근무지·직원별 작업률 시각화',
			'휴가 사용·승인, 임산부 등록, 게시판, 공지, 설문 등 기능 페이지 개발'
		]
	},
	{
		id: 'legacy-react',
		title: '레거시 웹 시스템 React 전환 및 AWS 배포',
		company: '샤플앤컴퍼니',
		period: '2021.04 — 2023.08',
		tags: ['웹 프로젝트', '코드', '나의 선택'],
		stack: ['React', 'JavaScript', 'AWS S3', 'AWS Pipeline', 'JSP'],
		summary: 'JSP 기반 레거시 시스템을 React로 전환, AWS 배포 환경 구성',
		bullets: [
			'JSP 기반 레거시 시스템을 React로 전환, 재사용 가능한 UI 컴포넌트 설계 및 구현',
			'React 빌드 결과물을 AWS S3에 배포, JSP와 React가 동시에 동작하는 운영 환경 구성',
			'AWS Pipeline을 활용한 배포 안정성 확보 및 반복 가능한 배포 프로세스 구축'
		]
	},
	{
		id: 'chat-v2',
		title: '채팅 v2.0 개발',
		company: '샤플앤컴퍼니',
		period: '2022 — 2023',
		tags: ['웹 프로젝트', '코드', '나의 선택'],
		stack: ['React', 'Vite', 'TypeScript', 'Sendbird UIkit 3.0'],
		summary: 'Electron + Sendbird UIkit 2.0 기반 채팅을 React + Vite 웹 서비스로 재구현',
		bullets: [
			'Electron + Sendbird UIkit 2.0 기반 채팅 서비스를 React + Vite + Sendbird UIkit 3.0으로 커스텀 웹 서비스 재구현 (진행률 90%, 팀원 2명)'
		]
	}
];
