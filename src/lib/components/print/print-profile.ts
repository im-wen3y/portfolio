export interface PrintStrength {
	tag: string;
	title: string;
	description: string;
}

export interface PrintWorkHighlight {
	tag: string;
	title: string;
	description: string;
	result: string;
}

export interface PrintProfileConfig {
	companyLabel: string;
	roleLine: string;
	theme?: 'default' | 'miricanvas';
	resumeAbout: string;
	portfolioAbout: string;
	strengths: [PrintStrength, PrintStrength];
	featuredProjectIds: [string, string, string];
	workHighlights?: PrintWorkHighlight[];
}

export interface PrintExperience {
	company: string;
	period: string;
	role: string;
	highlights: string[];
}

export interface PrintWorkPrinciple {
	tag: string;
	title: string;
	description: string;
	evidence: string;
}

export const PRINT_EXPERIENCES: PrintExperience[] = [
	{
		company: '라텔앤드파트너즈',
		period: '2024.04 — 2026.06 · 2년 2개월',
		role: '프론트엔드 파트 리더',
		highlights: [
			'6개 사용자 역할과 60개 이상의 JSP 화면, 15,000줄 제품판매 JavaScript를 기능 단위 React 구조로 전환하고 독립 배포 구조를 구축해 운영 배포 시간을 약 20분에서 1분 30초로 단축',
			'역할별 라우팅, 결제 성공·실패, 인증·보안, 배너 운영과 S3 정적 리소스 규칙을 문서화해 팀의 공통 기준으로 정리',
			'모바일 렌즈 계산기의 UI·UX와 API 협업을 조율하고 입력 400 오류, 상태 보존, Lenovo Tab M9 반응형 문제를 해결'
		]
	},
	{
		company: '샤플앤컴퍼니',
		period: '2021.04 — 2023.08 · 2년 4개월',
		role: '프론트엔드 개발자',
		highlights: [
			'대표·PM에게 유지보수 문제와 점진 전환 방식을 설명해 React 도입을 이끌고 AWS S3·Pipeline 기반 JSP·React 동시 운영 환경을 구성',
			'브라우저를 중단시키던 지도 마커 2만 개를 클러스터링으로 우선 해결하고 서버 데이터 축소 방식으로 근본 개선',
			'문서만으로 확정하기 어려운 아임포트·Stripe 정기결제 흐름을 고객센터와 서버 개발자 협업으로 정의해 국내·해외 결제를 연동'
		]
	},
	{
		company: '아이티키',
		period: '2018.07 — 2020.11 · 2년 4개월',
		role: 'SI 개발팀 사원',
		highlights: [
			'신한DS LMS의 직원용 관리자 화면과 API, 미스터피자 회원·주문·결제 API를 개발하고 운영 데이터 통신 오류를 수정',
			'롯데마트 웹·웹앱의 주문·결제 문제를 대응하며 신규 팀원이 업무를 빠르게 파악할 수 있도록 프로세스와 단위 테스트 가이드를 작성'
		]
	}
];

export const PRINT_WORK_PRINCIPLES: PrintWorkPrinciple[] = [
	{
		tag: 'ANALYZE BEFORE CHANGE',
		title: '레거시의 맥락부터 이해합니다',
		description:
			'코드를 바로 교체하기보다 화면, 사용자 역할, 배포와 운영 제약을 먼저 분석합니다. 서비스가 멈추지 않는 범위에서 작은 단위로 경계를 나누고 전환합니다.',
		evidence: '6개 역할·60개 이상 화면 분석, 15,000줄 JavaScript 분리, JSP·React 약 1년 동시 운영'
	},
	{
		tag: 'GROW AS A TEAM',
		title: '결정의 배경까지 공유합니다',
		description:
			'업무만 나누지 않고 왜 이 방향을 선택했는지 함께 설명합니다. 팀원이 스스로 판단할 수 있도록 맥락과 기준을 남기는 것을 리더의 역할로 생각합니다.',
		evidence: 'FE 3명 업무 배분·기술 검토, 프로젝트 인수인계, 신규 팀원용 업무·테스트 가이드 작성'
	},
	{
		tag: 'DOCUMENT THE RULES',
		title: '반복되는 판단은 규칙으로 만듭니다',
		description:
			'사람의 기억에 의존하는 운영을 줄이기 위해 라우팅, 결제, 인증, 정적 리소스와 배너 관리 기준을 문서와 시스템으로 옮깁니다.',
		evidence:
			'역할별 라우팅·결제 성공/실패·S3 업로드 규칙 문서화, 날짜 조건 배너를 DB 기반 관리로 전환'
	},
	{
		tag: 'DESIGN THE FLOW',
		title: 'UI보다 사용자 흐름을 먼저 봅니다',
		description:
			'입력 방식, 상태 유지, 기기 환경과 오류 상황까지 하나의 흐름으로 봅니다. 기획·디자인·서버팀과 사용자가 막히는 지점을 구체적으로 조율합니다.',
		evidence: 'ComboBox 입력 오류 제거, 도수 상태 보존, 단계형 시뮬레이터, Lenovo Tab M9 긴급 대응'
	},
	{
		tag: 'CLEAR BOUNDARIES',
		title: '깔끔한 코드를 변경하기 쉬운 구조로 정의합니다',
		description:
			'짧거나 영리한 코드보다 책임과 변경 이유가 분명한 코드를 선호합니다. 과한 추상화도 되돌아보며 실제 확장 시점에 필요한 구조를 선택합니다.',
		evidence:
			'제품판매 기능 단위 분리, 상태 구조 개선, 초기 모노레포가 오버엔지니어링이 된 경험을 다음 설계 판단에 반영'
	}
];

export const PRINT_SKILLS = [
	{
		label: 'Core',
		value: 'JavaScript · TypeScript · React · Next.js · JSP'
	},
	{
		label: 'UI & State',
		value: 'Zustand · TanStack Query · Emotion · Framer Motion · 접근성'
	},
	{
		label: 'Delivery',
		value: 'Vite · AWS S3/Pipeline · Git · Jira · Confluence'
	},
	{
		label: 'AI Tools',
		value: 'Claude Code · Cursor AI · ChatGPT'
	}
];

export const PRINT_EDUCATION = {
	school: '대진대학교',
	major: '문헌정보학과(졸업)',
	period: '2012.02 — 2017.08'
};
