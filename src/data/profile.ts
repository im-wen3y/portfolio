// 포트폴리오 인덱스에서 쓰는 프로필 데이터. 출처는 ~/career-wiki.
export type Career = {
	period: string;
	duration: string;
	lead?: boolean;
	company: string;
	role: string;
	summary: string;
	bullets: string[];
};

export type SkillGroup = { title: string; skills: string[] };
export type Education = {
	period: string;
	ongoing: boolean;
	title: string;
	text?: string;
	topics?: { title: string; text: string }[];
};

export const CAREERS: Career[] = [
	{
		period: '2024.04 - 2026.06',
		duration: '2년 2개월',
		lead: true,
		company: '라텔앤드파트너즈',
		role: '프론트엔드 파트 리더',
		summary:
			'아큐브 소비자 웹·앱, 안경사용 프로그램, 영업·CS 내부 시스템을 개발·운영하고 6명 규모의 프론트엔드 파트를 이끌었습니다. 기획 리뷰부터 업무 범위·예상 작업량·우선순위를 조율하고 프로젝트별 담당자와 운영 이슈 대응 흐름을 정리했습니다.',
		bullets: [
			'안경사 통합관리 시스템의 React 리뉴얼에서 레거시 정책을 문서화하고 프론트엔드 개발자 3명의 업무와 요구사항 우선순위를 조율',
			'서로 다른 UI의 렌즈 계산기 3개를 Headless 공통 구조로 통합해 입력·포커스 이동·유효성 검사 기준을 표준화',
			'코드에 고정돼 있던 배너·팝업의 일정과 노출 조건을 DB·API 기반 관리 방식으로 바꿔 운영 일정 변경에 따른 프론트엔드 재배포를 제거',
			'JSP 경험이 없던 신입 4명의 프로젝트 세팅과 개발 방식을 문서화하고, 이벤트 업무 이후 3명은 관리자 기능, 1명은 모바일 시스템과 주문·결제 영역으로 담당 범위를 확대',
			'주임급 개발자의 React 학습과 프로젝트 리드를 지원해 스마트피팅 운영 반영 후 유지보수까지 독립적으로 맡을 수 있도록 역할을 확장'
		]
	},
	{
		period: '2021.04 - 2023.08',
		duration: '2년 4개월',
		company: '샤플앤컴퍼니',
		role: '프론트엔드 개발자',
		summary:
			'현장 직원을 관리하는 Shopl의 관리자 대시보드와 채팅 서비스를 개발·운영했습니다. 운영 중인 JSP 화면의 점진적 React 전환과 국내·해외 결제, 대규모 근무지 지도 기능을 맡았습니다.',
		bullets: [
			'React 선택 근거와 점진 전환 방식을 대표·PM에게 설명해 기존 서비스를 중단하지 않고 약 1년간 JSP와 React를 병행 운영',
			'아임포트·Stripe를 연동해 국내·해외 고객이 요금제와 결제수단을 직접 관리하는 흐름을 구현',
			'근무지 마커 2만 개로 브라우저가 멈추던 ‘할 일’ 분석 지도에 국내·해외 지도별 클러스터링을 적용해 운영 화면 정상화',
			'Electron 기반 채팅을 React·Vite 웹 서비스로 재구현하고, Sendbird UIkit 제약은 검색한 채널을 상단에 노출하는 방식으로 요구사항을 조정'
		]
	},
	{
		period: '2018.07 - 2020.11',
		duration: '2년 4개월',
		company: '아이티키',
		role: 'SI 개발팀 사원',
		summary:
			'신한DS LMS, 롯데마트 웹·웹앱, 공공기관 사이트와 미스터피자 리뉴얼을 수행했습니다. 관리자·회원·주문·결제 화면과 API를 개발하고 운영 장애에 대응했으며, 신규 팀원을 위한 업무·테스트 가이드를 작성했습니다.',
		bullets: [
			'고객사별 관리자·회원·주문·결제 화면과 API를 개발하고, 롯데마트 웹·웹앱의 주문·결제 운영 이슈에 대응',
			'프로젝트마다 달랐던 실행 방법과 단위 테스트 절차를 가이드로 정리해 신규 팀원의 인수인계 자료로 활용'
		]
	}
];

export const TROUBLES = [
	{
		label: '외부 API 연동 장애',
		title: '서버 로그를 직접 읽어 Spring Security 차단을 특정',
		text: '본인인증 요청이 응답 없이 멈춰 애플리케이션 코드와 서버 설정 중 원인을 구분해야 했습니다. 로그와 XML 보안 설정을 확인해 CSRF 차단을 특정하고 서비스를 우선 정상화한 뒤, 백엔드팀의 정식 예외 처리로 연결했습니다.'
	},
	{
		label: '배포 3일 전 기기 변경',
		title: 'DPR·논리적 뷰포트 계산으로 반응형 재설계',
		text: '지급 기기가 Lenovo Tab M9으로 바뀌면서 태블릿이 모바일 화면으로 인식됐습니다. 물리 해상도와 DPR로 CSS 논리적 너비를 계산해 원인을 찾고, 확정된 기기 기준으로 반응형 구간을 다시 정했습니다.'
	},
	{
		label: '마커 2만 개 렌더링',
		title: '지도별 클러스터링으로 흰 화면 정상화',
		text: '전체 근무지 마커를 한 번에 표시하면 브라우저가 멈췄습니다. Google Maps와 NAVER Maps의 기능 차이를 반영한 클러스터링을 구현해 지역별 작업률과 직원별 완료 상태를 확인할 수 있도록 운영 화면을 정상화했습니다.'
	}
];

export const SKILL_GROUPS: SkillGroup[] = [
	{
		title: '프론트엔드',
		skills: ['React', 'JavaScript', 'TypeScript', 'JSP', 'Emotion', 'Storybook']
	},
	{
		title: '상태 · 데이터',
		skills: ['Zustand', 'TanStack Query']
	}
];

export const TAG_GROUPS = [
	{
		title: '협업 도구',
		tags: ['Slack', 'Git', 'Jira', 'Confluence', 'Figma']
	},
	{
		title: '빌드 · 배포',
		tags: ['Vite', 'Jenkins', 'S3', 'CloudFront']
	},
	{
		title: 'AI 개발 도구',
		tags: ['Claude Code', 'Codex', 'Cursor AI']
	}
];

export const EDUCATION: Education[] = [
	{
		period: '2012.02 - 2017.08',
		ongoing: false,
		title: '대진대학교',
		text: '문헌정보학과 전공 · 컴퓨터소프트웨어융합 부전공'
	}
];
