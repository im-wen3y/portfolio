export const ACCENT = '#21F1A8';
export const SECONDARY = '#FF4D9D';

export type DialogueLine = { name: string; text: string };

export const dialogue: DialogueLine[] = [
	{ name: '송누리', text: '안녕하세요, 프론트엔드 개발자 송누리입니다.' },
	{ name: 'SYSTEM', text: '아래로 스크롤하면 경력과 프로젝트를 확인할 수 있어요 ▶' }
];

export const bootLines = [
	'> mounting react runtime...',
	'> loading experience.json...',
	'> hydrating skill_tree...',
	'> render complete ✓'
];

export type SkillRadarPoint = { label: string; value: number };

// Self-assessed proficiency (0-100), draft values based on role/tenure — worth
// tuning by hand rather than treating as a measured score.
export const skillRadar: SkillRadarPoint[] = [
	{ label: '프론트엔드', value: 92 },
	{ label: '팀 리딩', value: 80 },
	{ label: '구조 설계', value: 78 },
	{ label: 'AI 도구 활용', value: 70 },
	{ label: '협업·커뮤니케이션', value: 85 }
];

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
	{
		title: '기술',
		items: [
			'JavaScript',
			'TypeScript',
			'React',
			'Zustand',
			'REST API',
			'재사용 블록/클래스 설계',
			'크로스 브라우저'
		]
	},
	{
		title: '협업 · 리더십',
		items: [
			'요구사항 정의·기능 설계',
			'코드 리뷰',
			'개발 가이드',
			'Git',
			'Jira',
			'Confluence',
			'Notion',
			'Figma'
		]
	},
	{ title: 'AI 도구', items: ['Cursor AI', 'Claude', 'ChatGPT'] }
];

export type Contact = { label: string; value: string; href: string };

export const contacts: Contact[] = [
	{ label: 'MAIL', value: 'imwen3y@gmail.com', href: 'mailto:imwen3y@gmail.com' },
	{
		label: 'LINKEDIN',
		value: 'linkedin.com/in/im-wen3y',
		href: 'https://www.linkedin.com/in/im-wen3y/'
	},
	{ label: 'VELOG', value: 'velog.io/@imwen3y', href: 'https://velog.io/@imwen3y/posts' }
];

export type ExpGroup = { title: string; items: string[] };
export type Flagship = { badge: string; title: string; narrative: string };
export type Exp = {
	company: string;
	period: string;
	dur: string;
	role: string;
	summary: string;
	flagship: Flagship;
	groups: ExpGroup[];
};

export const exps: Exp[] = [
	{
		company: '라텔앤드파트너즈',
		period: '2024.04 — 2026.06',
		dur: '2년 2개월',
		role: '프론트엔드 파트 리더',
		summary:
			'아큐브 전사 서비스(소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템)를 개발·운영하며 파트 리더로서 주요 기능 설계 및 개발을 주도했습니다.',
		flagship: {
			badge: '🏆 QUEST CLEARED',
			title: '아큐브 전사 서비스 리드',
			narrative:
				'기획 단계부터 참여해 소비자 웹/앱부터 사내 영업·CS 시스템까지 아우르는 전사 서비스의 요구사항을 정의하고 우선순위를 조율했습니다. 팀 업무 배분과 의사결정을 지원하며 파트 전체의 생산성을 끌어올렸습니다.'
		},
		groups: [
			{
				title: '아큐브 전사 서비스 개발 — 파트 리더',
				items: [
					'소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템 등 전사 서비스 개발 및 운영 총괄',
					'기획·디자인·개발팀과 초기 기획 단계부터 참여, 요구사항 정의 및 기능 우선순위 조율',
					'팀 업무 배분·일정 관리·의사결정 지원으로 팀 생산성 향상'
				]
			},
			{
				title: '소비자 대상 프로모션 이벤트 페이지',
				items: [
					'마케팅 캠페인 요구사항 기반 단기 프로모션 페이지 개발 주도',
					'GA·Meta Pixel·Kakao Pixel 등 전환·행동 트래킹 연동 및 이벤트 측정 로직 구현',
					'쿠폰 발급·럭키드로우 등 프로모션 기능 개발 및 서버 연동 플로우 구축'
				]
			},
			{
				title: '제품 판매 페이지 최대 할인 혜택 기능',
				items: [
					'기존 스캔·쿠폰·결제 로직과 독립적으로 최대 혜택가 기능을 클래스형으로 분리·모듈화',
					'관리자 페이지에서 쿠폰 등록·관리 가능하도록 DB 기반 마크업과 기능 구현'
				]
			},
			{
				title: '안경사 대상 렌즈 시뮬레이터 게임',
				items: [
					'안경원 고객 상담 및 렌즈 맞춤 프로세스 기반 학습형 시뮬레이터 설계·개발',
					'React + Framer Motion 애니메이션, Zustand 상태 관리, Okta 기반 인증 구현'
				]
			},
			{
				title: '영업사원 현장 지원 프로그램 — 모바일 리뉴얼',
				items: [
					'기존 PC 전용 내부 시스템을 React 기반 모바일 친화적으로 리뉴얼',
					'약정서 체결·승인 프로세스를 재사용 가능한 블록 형태로 공통화, 개발 효율성 강화'
				]
			}
		]
	},
	{
		company: '샤플앤컴퍼니',
		period: '2021.04 — 2023.08',
		dur: '2년 4개월',
		role: '프론트엔드 개발자',
		summary:
			'현장 직원 관리·감독 서비스 샤플(Shopl)의 관리자 대시보드와 채팅 서비스 개발 및 운영을 담당했습니다.',
		flagship: {
			badge: '⚔ BOSS CLEARED',
			title: '레거시 전환 & 채팅 v2.0 재구현',
			narrative:
				'JSP 기반 레거시 관리자 대시보드를 React로 전환하고 AWS 배포 파이프라인을 직접 구축했습니다. 이어서 Electron 기반 채팅 서비스를 Vite + Sendbird UIkit 3.0 웹 서비스로 재구현하는 프로젝트를 팀원 2명과 함께 진행했습니다.'
		},
		groups: [
			{
				title: '관리자 대시보드 개발 및 운영 (JSP / React)',
				items: [
					'아임포트·Stripe API를 이용한 결제 연동 개발',
					'구글·바이두 지도 API를 국내 네이버·해외 구글 지도 API로 변경 및 공통화',
					'Map API의 Cluster 기능으로 근무지·직원별 작업률 시각화',
					'휴가 승인·임산부 등록·게시판·공지·설문 등 기능 페이지 개발'
				]
			},
			{
				title: '레거시 웹 시스템 React 전환 및 AWS 배포',
				items: [
					'JSP 기반 레거시 시스템을 React로 전환, 재사용 가능한 UI 컴포넌트 설계·구현',
					'React 빌드 결과물을 AWS S3에 배포, JSP·React 동시 동작 운영 환경 구성',
					'AWS Pipeline을 활용한 배포 안정성 확보 및 반복 가능한 배포 프로세스 구축'
				]
			},
			{
				title: '채팅 v2.0 개발',
				items: [
					'Electron + Sendbird UIkit 2.0 채팅을 React + Vite + Sendbird UIkit 3.0으로 커스텀 웹 재구현 (진행률 90%, 팀원 2명)'
				]
			}
		]
	},
	{
		company: '아이티키',
		period: '2018.07 — 2020.11',
		dur: '2년 4개월',
		role: 'SI 개발팀 사원',
		summary: 'SI 개발팀에서 다양한 업체의 백엔드 개발, 운영 및 유지보수 업무를 수행했습니다.',
		flagship: {
			badge: '🛡 SIDE QUEST CLEARED',
			title: '다중 클라이언트 SI 운영',
			narrative:
				'신한DS, 롯데마트, 공공기관, 미스터피자 등 여러 고객사의 백엔드 개발과 운영을 동시에 담당했습니다. 데이터 통신 오류 수정부터 신규 팀원을 위한 업무 프로세스 가이드 작성까지, SI 현장의 실무를 처음 익힌 시기였습니다.'
		},
		groups: [
			{
				title: '주요 프로젝트',
				items: [
					'신한DS LMS 고도화 — 직원용 Admin 화면 개발·API 연동, User-Admin 데이터 통신 오류 수정',
					'롯데마트 웹/웹앱 운영 — 주문·결제 API 문제 해결, 신규 팀원용 업무 프로세스·단위 테스트 가이드 작성',
					'공공기관 사이트 유지보수 — 자료관리시스템 백엔드 유지보수 및 데이터 관리, 운영 표준화',
					'미스터피자 웹/모바일 리뉴얼 — 회원가입·로그인·주문·결제 API 설계 및 개발'
				]
			}
		]
	}
];
