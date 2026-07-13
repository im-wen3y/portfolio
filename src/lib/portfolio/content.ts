export const ACCENT = '#21F1A8';
export const SECONDARY = '#FF4D9D';

type DialogueLine = { name: string; text: string };

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

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
	{
		title: '기술',
		items: [
			'JavaScript',
			'TypeScript',
			'React',
			'Next.js',
			'Zustand',
			'TanStack Query',
			'Framer Motion',
			'REST API',
			'Sentry',
			'재사용 블록/클래스 설계',
			'크로스 브라우저'
		]
	},
	{
		title: '협업 · 리더십',
		items: ['요구사항 정의·기능 설계', '개발 가이드', 'Git', 'Jira', 'Confluence', 'Figma']
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

type ExpGroup = { title: string; items: string[] };
type Flagship = { badge: string; title: string; narrative: string };
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
			'아큐브 전사 서비스(소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템)를 파트 리더로 개발·운영하고, 주요 기능의 설계와 개발을 맡았습니다.',
		flagship: {
			badge: '🏆 QUEST CLEARED',
			title: '레거시 → React 리뉴얼 & 전사 서비스 리드',
			narrative:
				'레거시 마이아큐브웹(Java·JSP)을 React 기반 안경사 통합관리 시스템으로 옮기는 리뉴얼을 파트 리더로 이끌었습니다. 기획 단계부터 소비자 웹/앱과 사내 영업·CS 시스템의 요구사항을 정리·조율했고, 15,000줄짜리 제품판매 JS를 React로 걷어냈습니다.'
		},
		groups: [
			{
				title: '아큐브 전사 서비스 개발 · 파트 리더',
				items: [
					'소비자 웹/앱, 안경사용 프로그램, 영업·CS 내부 시스템 등 전사 서비스 개발·운영 담당',
					'기획·디자인·개발팀과 초기 기획 단계부터 참여, 요구사항 정의와 기능 우선순위 조율',
					'팀 업무 배분과 일정 관리를 맡고 의사결정을 도움'
				]
			},
			{
				title: '소비자 대상 프로모션 이벤트 페이지',
				items: [
					'마케팅 캠페인 기반 단기 프로모션 페이지 개발',
					'GA·Meta Pixel·Kakao Pixel 전환·행동 트래킹 연동, 이벤트 측정 로직 구현',
					'쿠폰 발급·럭키드로우 등 프로모션 기능 개발과 서버 연동'
				]
			},
			{
				title: '제품 판매 페이지 최대 할인 혜택 기능',
				items: [
					'기존 스캔·쿠폰·결제 로직과 분리해 최대 혜택가 계산을 클래스형으로 모듈화',
					'관리자 페이지에서 쿠폰을 등록·관리하도록 DB 기반으로 구현'
				]
			},
			{
				title: '안경사 대상 렌즈 시뮬레이터 게임',
				items: [
					'안경원 고객 상담·렌즈 맞춤 프로세스를 학습형 시뮬레이터로 설계·개발',
					'Framer Motion 애니메이션, Zustand 상태 관리, Okta 인증 연동'
				]
			},
			{
				title: '영업사원 현장 지원 프로그램 · 모바일 리뉴얼',
				items: [
					'PC 전용 내부 시스템을 React 기반 모바일로 리뉴얼',
					'약정서 체결·승인 프로세스를 재사용 가능한 블록으로 공통화'
				]
			},
			{
				title: '안경사 통합관리 시스템 리뉴얼 (Spring/JSP → React)',
				items: [
					'레거시 마이아큐브웹(Java·JSP)을 React로 옮기는 리뉴얼을 파트 리더로 이끌 (FE 3명, 기여도 30%)',
					'레거시 분석과 컨플루언스 문서화, IA 관리, 업무 분배, 기획/디자인 의사결정까지 담당',
					'15,000줄짜리 제품판매 JS를 React로 전환, 하드코딩 배너를 어드민에서 동적으로 등록하게 개선'
				]
			},
			{
				title: '모바일/태블릿용 착용 렌즈 계산기',
				items: [
					'iOS input=number가 기호 입력을 막아서 ComboBox를 직접 구현하고 유효성 검사를 붙임 (FE 4명, 기여도 20%)',
					'동의 전 도수 데이터를 Zustand + persist로 프론트에서만 관리 (탭 간 유지·새로고침 대응)',
					'운영 3일 전 지급 기기가 Lenovo Tab M9으로 바뀌며 생긴 반응형 오작동을, DPR·논리적 뷰포트를 계산해 원인 찾고 해결'
				]
			},
			{
				title: '논마이아큐브 프로모션 (1~5차)',
				items: [
					'구매 LOT 스캔(네이버 OCR / AWS Text)과 휴대폰 인증(드림시큐리티) 플로우 구현 (FE 1명, 기여도 100%)',
					'백엔드팀도 못 찾던 외부 API 연동 장애를 서버 로그를 뜯어보며 Spring Security 필터 체인의 CSRF 차단으로 특정',
					'백엔드 담당 부재 상황에서 임시 조치까지 혼자 하고, 정식 개선은 백엔드팀에 인계'
				]
			},
			{
				title: 'Cre8or-Club · Sentry 에러 모니터링',
				items: [
					'웹뷰 크래시·API 에러·성능을 Sentry 대시보드로 추적',
					'Slack에 붙여서 장애가 나면 바로 알아채고 대응하게 함'
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
			'현장 직원 관리·감독 서비스 샤플(Shopl)의 관리자 대시보드와 채팅 서비스를 개발·운영했습니다.',
		flagship: {
			badge: '⚔ BOSS CLEARED',
			title: '레거시 전환 & 채팅 v2.0 재구현',
			narrative:
				'JSP 기반 레거시 관리자 대시보드를 React로 옮기고 AWS 배포 파이프라인을 직접 세팅했습니다. 그다음 Electron 기반 채팅을 Vite + Sendbird UIkit 3.0 웹으로 다시 만드는 프로젝트를 팀원 2명과 진행했습니다.'
		},
		groups: [
			{
				title: '관리자 대시보드 개발 및 운영 (JSP / React)',
				items: [
					'아임포트·Stripe API로 결제 연동',
					'구글·바이두 지도 API를 국내 네이버·해외 구글 지도로 교체하고 공통화',
					'Map API의 클러스터 기능으로 근무지·직원별 작업률 시각화',
					'휴가 승인·임산부 등록·게시판·공지·설문 등 기능 페이지 개발'
				]
			},
			{
				title: '레거시 웹 시스템 React 전환 및 AWS 배포',
				items: [
					'JSP 레거시를 React로 옮기며 재사용 가능한 UI 컴포넌트 설계',
					'React 빌드 결과물을 AWS S3에 올려 JSP·React가 같이 도는 환경 구성',
					'AWS Pipeline으로 배포를 안정화하고 반복 가능하게 만듦'
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
		summary: 'SI 개발팀에서 여러 업체의 백엔드 개발과 운영·유지보수를 했습니다.',
		flagship: {
			badge: '🛡 SIDE QUEST CLEARED',
			title: '다중 클라이언트 SI 운영',
			narrative:
				'신한DS, 롯데마트, 공공기관, 미스터피자 등 여러 고객사의 백엔드 개발·운영을 동시에 맡았습니다. 데이터 통신 오류 수정부터 신규 팀원용 업무 가이드 작성까지, SI 현장 실무를 처음 익힌 때입니다.'
		},
		groups: [
			{
				title: '주요 프로젝트',
				items: [
					'신한DS LMS 고도화: 직원용 Admin 화면 개발·API 연동, User-Admin 데이터 통신 오류 수정',
					'롯데마트 웹/웹앱 운영: 주문·결제 API 문제 해결, 신규 팀원용 업무 프로세스·단위 테스트 가이드 작성',
					'공공기관 사이트 유지보수: 자료관리시스템 백엔드 유지보수와 데이터 관리, 운영 표준화',
					'미스터피자 웹/모바일 리뉴얼: 회원가입·로그인·주문·결제 API 설계·개발'
				]
			}
		]
	}
];
