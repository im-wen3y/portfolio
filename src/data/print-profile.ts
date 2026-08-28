export interface PrintWork {
	id: string;
	title: string;
	period: string;
	/** 함께한 팀 구성 (기여도 포함). 기록이 없으면 생략한다 */
	team?: string;
	/** 그 팀 안에서 맡은 역할 */
	role: string;
	scope: string;
	problem: string;
	process: string[];
	effect: string;
	effectHighlights?: string[];
	stack: string[];
}

export interface PrintExperience {
	company: string;
	period: string;
	duration: string;
	role: string;
	/** 경력 요약 표의 "역할 및 담당업무" 한 줄 */
	responsibilities: string;
	summary: string;
	works: PrintWork[];
}

export interface PrintSkill {
	label: string;
	value: string;
}

export interface PrintContribution {
	title: string;
	problem: string;
	process: string[];
	effect: string;
}

export interface PrintEducation {
	title: string;
	period: string;
	details: string[];
}

export interface PrintPortfolioProject {
	title: string;
	details: string[];
}

export interface PrintPortfolioExperience {
	company: string;
	period: string;
	role: string;
	summary: string;
	projects: PrintPortfolioProject[];
}

export type PrintTargetResumeId = 'senior' | 'lead' | 'product';

export interface PrintTargetResume {
	id: PrintTargetResumeId;
	label: string;
	headline: string;
	intro: string;
	sentences?: string[];
	strengths: string[];
	workIds: string[];
}

export const PRINT_ROLE = '프론트엔드 개발자';

export const PRINT_TOTAL_EXPERIENCE = '6년 10개월';

export const PRINT_CORE_COMPETENCIES: PrintSkill[] = [
	{
		label: '팀 리드',
		value:
			'프론트엔드 파트 리더로 주임급 2명·신입 4명 운영 - 신입 4명이 각자 운영 기능을 맡고 주임급 1명이 프로젝트 리드까지 담당하도록 역할을 넓힘'
	},
	{
		label: '구조 개선',
		value:
			'운영 중인 JSP 서비스를 두 차례 React로 전환 - 한 번은 착수를 설득해, 한 번은 FE 3명 규모의 기술 리드로 주도'
	},
	{
		label: '제품 개발',
		value: '사용자와 운영자의 실제 업무를 확인해 웹·앱, 모바일·태블릿 화면을 설계하고 구현'
	},
	{
		label: '장애 대응',
		value:
			'프론트엔드 범위를 넘는 장애도 서버 로그·보안 설정까지 원인을 특정하고, 임시 조치와 정식 개선을 나눠 담당 팀에 인계'
	},
	{
		label: 'AI 활용',
		value:
			'반복되는 코드 컨벤션을 AI 에이전트가 자동 적용하는 스킬로 이관하고, 셀프 리뷰와 계획서·코드 대조를 자동화. AI가 내놓은 근거는 반증 실험으로 확인한 뒤 반영'
	}
];

/** 이력서 요약 — 정체성 선언과 일하는 성향 */
export const PRINT_RESUME_SUMMARY = [
	{
		text: '운영 중인 레거시 서비스를 멈추지 않고 개선해 온 7년 차 프론트엔드 개발자이자, 6명 규모 파트를 운영한 파트 리더입니다. 불편한 지점을 발견하면 그냥 지나치지 않고 원인을 찾습니다. 두 차례의 JSP 서비스 React 전환에서 비대해진 화면과 흩어져 있던 운영 정책을 하나씩 구조로 정리해 왔습니다.',
		highlights: [
			'7년 차 프론트엔드 개발자이자, 6명 규모 파트를 운영한 파트 리더',
			'원인을 찾습니다'
		]
	},
	{
		text: 'UI/UX에 관심이 많아 기능 구현에서 멈추지 않고 사용자가 어떤 흐름으로 서비스를 이용하는지 함께 살핍니다. 렌즈 계산기를 모바일로 옮길 때 초기 UI·UX 결정부터 기획자·디자이너와 함께 참여했고, 입력이 불편하다는 피드백을 받은 뒤에는 우회책에 머물지 않고 입력 방식을 다시 만들었습니다.',
		highlights: ['사용자가 어떤 흐름으로 서비스를 이용하는지', '입력 방식을 다시 만들었습니다']
	},
	{
		text: '리더로서는 제가 다 구현하는 대신 맡길 수 있는 상태를 만드는 일을 우선합니다. 구현 기준과 레거시 정책을 문서로 남겨 기획·디자인·백엔드가 같은 맥락에서 판단하게 하고, 팀원에게는 난이도를 단계적으로 높여 배분해 담당 범위를 넓혀 왔습니다.',
		highlights: ['맡길 수 있는 상태를 만드는 일', '난이도를 단계적으로 높여 배분']
	}
];

export const PRINT_SKILLS: PrintSkill[] = [
	{
		label: '언어',
		value: 'JavaScript · TypeScript'
	},
	{
		label: '프레임워크·라이브러리',
		value: 'React · JSP · Emotion'
	},
	{
		label: '상태 관리·데이터',
		value: 'Zustand · TanStack Query'
	},
	{
		label: '컴포넌트 문서화',
		value: 'Storybook'
	},
	{
		label: '빌드·협업 도구',
		value: 'Vite · Git · Jira · Confluence · Claude Code'
	}
];

export const PRINT_EDUCATION: PrintEducation[] = [
	{
		title: '대진대학교',
		period: '2012.02~2017.08',
		details: ['문헌정보학과 전공 · 컴퓨터소프트웨어융합 부전공']
	}
];

export const PRINT_PORTFOLIO_INTRO = [
	'다양한 웹·앱 프로젝트를 React 기반으로 개발·운영하며 모바일·웹 리뉴얼과 주요 기능의 설계·개발을 주도했습니다.',
	'기획·디자인팀과 요구사항과 우선순위를 조율하고, 팀 내 업무 조율과 신입 개발자 멘토링을 맡았습니다. 사용자의 관점에서 UI·UX를 살피고 안정적으로 운영할 수 있는 개발 구조를 만드는 일을 중요하게 생각합니다.'
];

export const PRINT_PORTFOLIO_STACK = ['React', 'JavaScript', 'TypeScript', 'Zustand', 'Emotion'];

export const PRINT_PORTFOLIO_EXPERIENCES: PrintPortfolioExperience[] = [
	{
		company: '라텔앤드파트너즈',
		period: '2024.04 - 2026.06 (총 2년 2개월)',
		role: '프론트엔드 파트 리더',
		summary:
			'아큐브 소비자 웹·앱, 안경사용 프로그램, 영업·CS 내부 시스템을 개발·운영하고 React 기반 모바일·웹 리뉴얼과 주요 기능 설계를 이끌었습니다.',
		projects: [
			{
				title: '아큐브 전사 서비스 개발·파트 운영',
				details: [
					'프로젝트 초기부터 요구사항과 기능 우선순위를 조율하고, 업무 배분·일정 관리·회의 진행을 맡아 팀의 의사결정과 문제 해결을 지원했습니다.',
					'소비자 웹·앱, 안경사용 프로그램, 영업·CS 내부 시스템의 개발과 운영을 총괄했습니다.'
				]
			},
			{
				title: '소비자 대상 프로모션 이벤트',
				details: [
					'마케팅 캠페인 요구사항에 맞춰 단기 프로모션 페이지를 개발하고 GA·Meta Pixel·Kakao Pixel 기반 행동 추적과 쿠폰·럭키드로우 기능을 서버 흐름에 연동했습니다.'
				]
			},
			{
				title: '제품 판매 페이지 최대 할인 혜택',
				details: [
					'제품 스캔·쿠폰·결제 로직과 분리된 클래스형 구조로 최대 혜택가 기능을 구현하고, 관리자가 쿠폰을 등록·관리할 수 있도록 DB 기반 화면과 기능을 개발했습니다.'
				]
			},
			{
				title: '안경사 대상 렌즈 판매 교육 시뮬레이터',
				details: [
					'안경원 상담과 렌즈 맞춤 과정을 학습하는 시뮬레이터를 React로 개발하고, Framer Motion 애니메이션과 Zustand·LocalStorage 상태 유지, Okta 인증을 구현했습니다.'
				]
			},
			{
				title: '영업사원 현장 지원 프로그램 모바일 리뉴얼',
				details: [
					'PC 전용 내부 시스템을 모바일 환경에 맞춰 React로 리뉴얼하고, 약정서 체결·승인 과정을 재사용 가능한 블록으로 공통화했습니다. 안경원 관리·포인트 지급 기능과 입력 검증·상태 관리도 구현했습니다.'
				]
			}
		]
	},
	{
		company: '샤플앤컴퍼니',
		period: '2021.04 - 2023.08 (총 2년 4개월)',
		role: '프론트엔드 개발자',
		summary: '현장 직원 관리 서비스 Shopl의 관리자 대시보드와 채팅 서비스를 개발·운영했습니다.',
		projects: [
			{
				title: '관리자 대시보드 개발·운영',
				details: [
					'아임포트·Stripe 정기결제, 국내 네이버·해외 Google 지도, 근무지 작업률 클러스터링을 연동하고 휴가·게시판·설문 등 관리자 기능을 개발했습니다.'
				]
			},
			{
				title: 'JSP 레거시의 React 전환',
				details: [
					'JSP 화면을 React로 전환하고 공통 UI 컴포넌트를 구현했습니다. React 빌드 결과물을 AWS S3에 배포해 JSP와 React가 함께 동작하도록 구성하고 Pipeline 기반 배포 흐름을 운영했습니다.'
				]
			},
			{
				title: '채팅 v2.0',
				details: [
					'Electron·Sendbird UIKit 2.0 채팅을 React·Vite·Sendbird UIKit 3.0 기반 웹 서비스로 재구현했습니다(진행률 90%, 팀원 2명).'
				]
			}
		]
	},
	{
		company: '아이티키',
		period: '2018.07 - 2020.11 (총 2년 4개월)',
		role: 'SI 개발팀 사원',
		summary: '여러 고객사의 웹·모바일 서비스와 관리자 기능을 개발하고 운영·유지보수했습니다.',
		projects: [
			{
				title: '신한DS LMS 고도화',
				details: [
					'직원용 관리자 화면과 API 연동을 구현하고 사용자·관리자 간 데이터 오류를 수정했습니다.'
				]
			},
			{
				title: '롯데마트 웹·웹앱 운영',
				details: [
					'주문·결제 API 문제와 데이터 처리 업무를 맡고, 신규 팀원을 위한 주문·결제 업무와 단위 테스트 가이드를 작성했습니다.'
				]
			},
			{
				title: '공공기관 사이트 유지보수',
				details: [
					'자료관리시스템과 데이터를 유지보수하고 신규 팀원을 위한 업무 가이드를 작성했습니다.'
				]
			},
			{
				title: '미스터피자 웹·모바일웹 리뉴얼',
				details: [
					'회원가입·로그인·주문·결제 API를 설계·개발하고 프로젝트 가이드 문서를 작성했습니다.'
				]
			}
		]
	}
];

export const PRINT_PORTFOLIO_COLLABORATION = [
	'기획·디자인팀과 요구사항 정의 및 기능 설계',
	'팀 업무 조율, 코드 리뷰, 개발 가이드 제공과 신입 개발자 멘토링',
	'Git · Slack · Jira · Confluence · Notion · Figma'
];

export const PRINT_TARGET_RESUMES: Record<PrintTargetResumeId, PrintTargetResume> = {
	senior: {
		id: 'senior',
		label: '토스 지원용 FE',
		headline:
			'사용자 흐름과 운영 기준을 함께 다듬으며, 팀이 같은 기준으로 움직이게 만드는 시니어 프론트엔드 개발자',
		intro:
			'6명 규모 프론트엔드 파트에서 업무 배분, 온보딩, 기술 의사결정을 맡아 레거시 서비스 전환과 운영 개선을 함께 이끌었습니다. 화면만 보는 대신 입력·포커스·반응형·배포·보안 설정까지 원인을 좁혀 해결하고, 판단 근거를 문서로 남겨 팀이 같은 기준으로 개발하게 합니다.',
		sentences: [
			'6명 규모 프론트엔드 파트에서 업무 배분, 온보딩, 기술 의사결정을 맡아 레거시 서비스 전환과 운영 개선을 함께 이끌었습니다.',
			'화면만 보는 대신 입력·포커스·반응형·배포·보안 설정까지 원인을 좁혀 해결하고, 판단 근거를 문서로 남겨 팀이 같은 기준으로 개발하게 합니다.',
			'JSP 레거시를 React로 전환하고 화면·정책·배포 구조를 분리했습니다.',
			'모바일·태블릿 입력, 포커스, 반응형 기준을 사용자 피드백에 맞춰 조정했습니다.'
		],
		strengths: [
			'6명 규모 프론트엔드 파트 운영: 신입 온보딩, 업무 배분, 기술 기준 정리',
			'JSP 레거시를 React로 전환하고 화면·정책·배포 구조를 분리',
			'모바일·태블릿 입력, 포커스, 반응형 기준을 사용자 피드백에 맞춰 조정',
			'결제·지도·본인인증·보안 차단 같은 운영 이슈를 직접 진단해 임시 조치와 정식 개선을 분리'
		],
		workIds: [
			'acuvue-renewal',
			'smartfitting',
			'shopl-migration',
			'shopl-map',
			'shopl-payment',
			'nonmyacuvue-promo'
		]
	},
	lead: {
		id: 'lead',
		label: 'FE 리드',
		headline: '팀원이 맡아 끝낼 수 있는 기준과 구조를 만드는 프론트엔드 리드',
		intro:
			'6명 규모 프론트엔드 파트에서 업무 배분과 일정 조율, 기술 의사결정과 신입 온보딩을 맡았습니다. 제가 모든 기능을 구현하기보다 정책과 판단 근거를 문서로 남기고, 팀원의 경험에 맞춰 역할을 넓히는 방식으로 팀을 운영했습니다.',
		strengths: [
			'기획 리뷰 이후 담당자·일정·막힌 일을 Jira와 주간보고로 관리',
			'신입 4명이 각자 운영 기능을 맡고 주임급 개발자가 프로젝트를 리드하도록 역할 확대',
			'대표·기획·디자인·서버팀과 React 전환 및 운영 정책의 결정 기준 합의'
		],
		workIds: ['acuvue-renewal', 'smartfitting', 'virtual-fitting', 'shopl-migration']
	},
	product: {
		id: 'product',
		label: '제품 FE',
		headline: '사용자와 운영자의 실제 흐름을 제품 기능으로 연결하는 프론트엔드 개발자',
		intro:
			'모바일·태블릿 상담 도구, 관리자 대시보드, 결제와 지도 기능을 개발하며 사용자가 실제로 막히는 지점을 확인해 왔습니다. 우회책으로 끝내지 않고 피드백과 운영 조건을 반영해 입력 방식과 화면 흐름을 다시 설계합니다.',
		strengths: [
			'기획·디자인과 초기 UI·UX 및 요구사항 우선순위 결정',
			'모바일·태블릿 제약과 사용자 피드백을 반영한 커스텀 입력 경험 구현',
			'관리자·현장 사용자·국내외 고객의 업무 흐름에 맞춘 제품 기능 개발'
		],
		workIds: [
			'smartfitting',
			'cre8orclub-sentry',
			'shopl-map',
			'shopl-payment',
			'nonmyacuvue-promo'
		]
	}
};

export const PRINT_COMPACT_EXPERIENCES: PrintExperience[] = [
	{
		company: '라텔앤드파트너즈',
		responsibilities: '아큐브 전사 웹·앱 개발 및 운영, React 전환, 프론트엔드 파트 리딩',
		period: '2024.04 - 2026.06',
		duration: '2년 2개월',
		role: '프론트엔드 파트 리더',
		summary:
			'아큐브 소비자 웹·앱, 안경사용 프로그램, 영업·CS 내부 시스템의 개발·운영과 프론트엔드 파트 운영을 맡았습니다.',
		works: [
			{
				id: 'acuvue-renewal',
				title: '안경사 통합관리 시스템 React 전환',
				period: '2025.10 - 2026.03',
				team: '기획 1명 · 디자인 1명 · FE 3명 · BE 2~5명',
				role: '파트 리더 | IA 관리, 업무 배분, 기획·디자인 의사결정과 요구사항 우선순위 조율',
				scope: '권한별 정책 분석, 공통 컴포넌트·렌즈 계산 구조 설계, 주요 화면 구현',
				problem:
					'10년 가까이 쌓인 레거시라 제품 판매·결제 화면은 더 손대기 어려울 만큼 위험했고, 권한별 정책도 코드 곳곳에 흩어져 있었습니다. 프론트엔드 수정 요청은 잦은데 서버와 함께 배포해야 했고, 배너·팝업 운영 조건까지 코드에 들어 있어 일정이 바뀔 때마다 다시 배포해야 했습니다. 키보드와 스캐너에 따라 LOT 입력 오류도 반복됐습니다.',
				process: [
					'화면부터 옮기면 정책 누락이 그대로 따라온다고 보고, 권한별 페이지와 업무 정책을 먼저 문서로 정리해 모든 파트가 같은 기준으로 개발하게 했습니다. UI가 서로 다른 렌즈 계산기 세 개는 화면별로 다시 구현하는 대신 입력·포커스·검증 로직만 화면과 분리한 공통 구조로 묶었습니다.',
					'배너·팝업은 코드 수정 대신 관리자가 직접 바꾸는 방식을 택해, 재배포 부담과 수기 입력 실수를 함께 줄이도록 기획·백엔드와 조율했습니다. LOT 값은 입력 단계마다 막는 대신 서버로 보내기 직전 한 곳에서 변환·정제하도록 했습니다.'
				],
				effect:
					'제품 판매 화면을 React 구조로 분리해 서버와 따로 배포할 수 있게 하고, 렌즈 계산기 3개의 입력·검증 로직을 하나로 통합해 400 오류와 중복 구현을 줄였습니다. 배너·팝업 일정 변경은 프론트엔드 재배포 없이 처리하고, LOT 값도 입력 환경과 무관하게 서버 규격으로 전달됩니다.',
				effectHighlights: [
					'렌즈 계산기 3개의 입력·검증 로직을 하나로 통합',
					'프론트엔드 재배포 없이 처리'
				],
				stack: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Emotion', 'Storybook', 'Vite']
			},
			{
				id: 'smartfitting',
				title: '모바일/태블릿 전용 착용 렌즈 계산기',
				period: '2025.05 - 2025.08',
				team: '기획 1명 · 디자인 1명 · FE 3~4명 · BE 2명',
				role: '파트 리더 | 프로젝트 리드를 주임급 팀원에게 위임하고, 초기 UI·UX 결정과 전체 QA를 담당',
				scope: 'UI·UX 결정, 주문 가능 제품·상세 화면과 API 연동, 전체 QA',
				problem:
					'개인정보 수집 동의를 받기 전에는 사용자의 도수 정보를 서버에 저장할 수 없다는 제약이 있었습니다. 여기에 운영 배포를 불과 3일 앞두고 지급 기기가 교체됐고, 새 기기의 논리적 뷰포트가 모바일 크기로 인식되면서 기존 레이아웃까지 깨졌습니다.',
				process: [
					'서버에 저장할 수 없는 조건이라 입력 중인 도수를 브라우저에 보관하는 방식을 택했고, 탭을 이동하거나 페이지를 새로고침해도 입력값이 유지되도록 Zustand의 상태 저장 기능을 사용했습니다.',
					'화면 폭을 임의로 늘려 레이아웃만 맞추지 않고, 화면 배율에 따라 브라우저가 인식하는 너비를 확인해 태블릿이 모바일로 분류된 원인을 찾았습니다. 이를 바탕으로 반응형 기준을 조정했습니다. 도수 기호를 입력할 수 없는 iOS 제약에는 선택 팝업으로 우선 대응했습니다. 이후 사용자의 불편 피드백을 반영해 도수 기호를 직접 입력할 수 있는 커스텀 입력 컴포넌트를 만들고 유효성 검사를 강화했습니다.'
				],
				effect:
					'운영 배포 3일 전 지급 기기가 바뀌었지만, 반응형 기준을 조정해 예정된 운영 일정에 맞춰 오픈했습니다. 개인정보 동의 전에도 입력값을 잃지 않고 상담을 계속할 수 있도록 브라우저 기반 상태 저장 기능을 구현했습니다.',
				effectHighlights: [
					'예정된 운영 일정에 맞춰 오픈',
					'브라우저 기반 상태 저장 기능을 구현했습니다'
				],
				stack: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Emotion', 'Vite']
			},
			{
				id: 'virtual-fitting',
				title: '렌즈 판매 교육 시뮬레이터',
				period: '1차 2024.11 - 2025.02 · 2차 2026.04 - 2026.05',
				role: '구조 설계부터 상태 관리 개선까지 수행하고 2차 종료 후 후속 개발자에게 인계',
				scope: '대화·문제·단계 상태 설계, Zustand store 구조 개선, 기술 인계',
				problem:
					'서버에서 교육 대화·문제·단계 데이터를 시작 시점에 한 번에 내려주는 구조라, 깊게 중첩된 데이터를 화면 단계별로 나눠 관리해야 했습니다. Context API와 Funnel을 함께 사용하면서 화면이 반복해서 렌더링되고, 새로고침하면 진행 상태가 사라지는 문제도 있었습니다.',
				process: [
					'상태 관리를 Zustand로 통합해 한 번에 전달된 데이터를 대화·문제·단계별로 관리하고, 새로고침 후에도 진행 상태가 유지되도록 구성했습니다. 이후 한곳에 데이터가 몰려 비대해진 store는 도메인별로 다시 분리했습니다.',
					'모달을 열 때 교육 대화가 초기화되는 문제는 진행 상황을 브라우저에 저장해 우선 대응한 뒤, 모달 라이브러리를 도입해 화면 전체가 다시 렌더링되는 원인을 없앴습니다. 2차 작업을 마친 뒤에는 기능과 기술 맥락을 문서로 정리해 후속 개발자에게 넘겼습니다.'
				],
				effect:
					'서버에서 한 번에 받은 교육 데이터를 단계별로 관리하고, 새로고침이나 모달 진입 후에도 진행 상태가 유지되도록 구현했습니다.',
				effectHighlights: ['교육 데이터를 단계별로 관리', '진행 상태가 유지되도록 구현했습니다'],
				stack: ['React', 'TypeScript', 'Zustand', 'Emotion', 'Vite']
			},
			{
				id: 'nonmyacuvue-promo',
				title: '논마이아큐브 프로모션',
				period: '2024.08 - 2026.06',
				role: '백엔드 개발자와 함께 점검하며 서버 보안 설정에서 원인을 직접 진단',
				scope: '프로모션 1~5차 구현, 외부 API 장애 원인 진단, 서버 보안 예외 적용 협의',
				problem:
					'휴대폰 본인인증 라이브러리를 적용하던 중 인증 요청이 응답 없이 멈췄습니다. 원인이 애플리케이션 코드인지 서버 보안 설정인지 구분되지 않았습니다.',
				process: [
					'백엔드 개발자와 함께 서버 로그와 보안 설정 파일을 확인해, 요청이 애플리케이션에 도달하기 전 Spring Security의 CSRF 정책에서 차단되는 원인을 직접 특정했습니다.',
					'해당 경로 전체의 보안을 해제하면 위험 범위가 넓어진다고 판단해, 연동 개발을 계속하기 위한 임시 조치만 적용했습니다. 특정 요청만 예외 처리하는 정식 개선 방향은 백엔드 개발자와 협의했습니다.'
				],
				effect:
					'본인인증 라이브러리 연동을 이어갈 수 있도록 임시 조치를 적용하고, 특정 요청에만 정식 보안 예외를 적용하도록 백엔드 개발자와 협의했습니다.',
				effectHighlights: [
					'라이브러리 연동을 이어갈 수 있도록 임시 조치를 적용',
					'정식 보안 예외를 적용하도록 백엔드 개발자와 협의했습니다'
				],
				stack: ['JSP', 'JavaScript', 'Web Components', 'Spring Security']
			},
			{
				id: 'cre8orclub-sentry',
				title: '웹뷰 장애를 발견 즉시 알리는 모니터링 체계 구축',
				period: '재직 기간 중',
				role: '대표 지시로 시작된 모니터링 도입에서 대시보드 구성안을 제안하고 직접 구축',
				scope: '웹뷰 에러·성능 추적 대시보드 구성, 알림 체계 연동',
				problem:
					'웹뷰에서 화면이 멈추거나 요청이 실패해도 개발팀은 사용자 문의가 들어온 뒤에야 알 수 있었습니다. 언제 어떤 화면에서 발생했는지 확인할 근거도 없었습니다.',
				process: [
					'무엇을 봐야 대응으로 이어지는지를 기준으로 대시보드 구성안을 제안했습니다. 지표를 모두 늘어놓는 대신 크래시와 API 오류를 중심으로 추적 대상을 정했습니다.',
					'확인하러 들어가야 하는 도구는 결국 안 보게 된다고 판단해, 팀이 상주하는 Slack에 알림을 연동했습니다.'
				],
				effect:
					'오류 발생 시점과 화면을 즉시 파악할 수 있게 해, 사용자 문의를 기다리지 않고 대응을 시작하는 흐름을 만들었습니다.',
				effectHighlights: ['사용자 문의를 기다리지 않고 대응'],
				stack: ['Sentry', 'Slack']
			}
		]
	},
	{
		company: '샤플앤컴퍼니',
		responsibilities: '관리자 대시보드·채팅 개발·운영, JSP의 React 점진 전환',
		period: '2021.04 - 2023.08',
		duration: '2년 4개월',
		role: '프론트엔드 개발자',
		summary: '현장 직원 관리 서비스 Shopl의 관리자 대시보드와 채팅 서비스를 개발·운영했습니다.',
		works: [
			{
				id: 'shopl-migration',
				title: 'JSP 대시보드의 React 점진 전환',
				period: '2022.01 - 2023.08',
				team: 'FE 3~4명 · 기획·디자인 협업 (기여도 40%)',
				role: '마이그레이션을 제안해 착수를 이끌고 주요 관리자 기능 전환을 담당',
				scope: '마이그레이션 제안·기술 선택, 주요 관리자 기능 구현, 동시 운영 구조 구성',
				problem:
					'5년 넘게 쌓인 대시보드는 백엔드와 프론트엔드가 한 프로젝트에 묶여 있어, 프론트엔드만 바꿔도 서버를 함께 배포해야 했고 프론트엔드 개발자를 뽑기도 어려웠습니다. 대표와 PM은 JSP와 React를 동시에 운영하면 오히려 관리가 복잡해질 수 있다고 우려했습니다.',
				process: [
					'운영과 유지보수 측면에서 React가 필요한 이유와 기능별 전환 방식을 제안했고, 합의 후 주요 관리자 기능을 옮겼습니다. 한 차례 배포 직후 무한 호출이 발생했을 때는 먼저 롤백한 뒤 오류와 리다이렉트 흐름을 추적해 백엔드 URL 문제를 찾았습니다.'
				],
				effect:
					'약 1년 동안 기존 서비스를 멈추지 않고 JSP와 React를 함께 운영하며 기능별로 화면을 옮겼습니다.',
				effectHighlights: ['기존 서비스를 멈추지 않고', '기능별로 화면을 옮겼습니다'],
				stack: ['React', 'TanStack Query', 'Emotion']
			},
			{
				id: 'shopl-map',
				title: '대량 근무지 작업률 지도',
				period: '재직 기간 중 약 1년간 개발·운영',
				team: '기획 1명 · 디자인 2명 · FE 4명 · BE 3명 (기여도 30%)',
				role: '지도 시각화와 국내·해외 마커 클러스터링을 담당',
				scope: '국내·해외 지도 연동과 클러스터링 구현',
				problem: '근무지 마커 2만 개를 한꺼번에 그리면 브라우저가 멈추고 화면이 하얗게 비었습니다.',
				process: [
					'표시 개수를 제한하면 관리자가 전체 분포를 볼 수 없어, 가까운 근무지를 하나로 묶어 보여주고 확대하면 나뉘는 방식을 앱·웹 팀과 논의해 우선 배포했습니다. 국내와 해외가 서로 다른 지도 서비스를 써서 묶는 방식은 각각 구현하되, 관리자가 보는 화면과 탐색 흐름은 동일하게 맞췄습니다.'
				],
				effect:
					'마커가 많은 근무지도 화면이 멈추지 않았고, 관리자는 지도에서 작업 현황을 다시 확인할 수 있었습니다.',
				effectHighlights: ['화면이 멈추지 않았고', '작업 현황을 다시 확인'],
				stack: ['React', 'NAVER Maps API', 'Google Maps API']
			},
			{
				id: 'shopl-payment',
				title: '국내·해외 정기결제',
				period: '2022.11 - 2023.02',
				team: '기획 1명 · 디자인 1명 · FE 2명 · BE 3명 (기여도 70%)',
				role: '요금제·결제수단 화면과 국내·해외 결제 상태 흐름 정의를 담당',
				scope: '요금제·결제수단 관리 화면과 API 연동, 국내·해외 결제 상태 흐름 정의',
				problem:
					'국내외 고객의 정기결제를 인보이스로 수기 처리하고 있어, 고객이 요금제와 결제수단을 직접 등록하고 관리할 수 있는 기능이 필요했습니다.',
				process: [
					'국내는 아임포트, 해외는 Stripe로 나눠 연동했습니다. Stripe 문서만으로 확인하기 어려운 결제 상태는 고객센터에 직접 문의해 검증하고, 상태별 프론트엔드·서버 처리 범위를 백엔드 개발자와 합의했습니다.'
				],
				effect:
					'국내외 고객이 제품 안에서 요금제와 결제수단을 직접 등록하고 관리할 수 있도록 정기결제 기능을 구현했습니다.',
				effectHighlights: ['직접 등록하고 관리할 수 있도록', '정기결제 기능을 구현했습니다'],
				stack: ['React', '아임포트', 'Stripe', 'TanStack Query']
			}
		]
	},
	{
		company: '아이티키',
		responsibilities: '고객사 웹·관리자 화면과 API 개발, 주문·결제 운영 장애 대응',
		period: '2018.07 - 2020.11',
		duration: '2년 4개월',
		role: 'SI 개발팀 사원',
		summary: '여러 고객사의 웹 서비스·관리자 화면을 개발하고 운영 장애에 대응했습니다.',
		works: [
			{
				id: 'itkey-si',
				title: '',
				period: '2018.07 - 2020.11',
				team: '고객사별 SI 프로젝트 팀',
				role: 'SI 개발팀 사원 | 관리자·회원·주문·결제 화면과 API 개발, 신규 팀원 가이드 작성',
				scope: '관리자·회원·주문·결제 화면과 API 개발, 운영 대응, 가이드 작성',
				problem:
					'여러 고객사 프로젝트를 오가며 관리자·회원·주문·결제 기능을 개발하고 운영 장애에 대응해야 했습니다. 프로젝트마다 실행 방법과 테스트 절차가 달라 새로 합류한 팀원이 같은 내용을 다시 파악하는 일도 반복됐습니다.',
				process: [
					'신한DS LMS, 롯데마트 웹·웹앱, 공공기관 사이트와 미스터피자 리뉴얼에서 관리자·회원·주문·결제 화면과 API를 개발하고 운영 장애를 처리했습니다. 프로젝트별 실행 방법과 단위 테스트 절차를 문서로 정리했습니다.'
				],
				effect:
					'새로 합류한 팀원이 프로젝트 실행 방법과 테스트 절차를 팀 문서에서 확인할 수 있도록 인수인계 가이드를 만들었습니다.',
				effectHighlights: ['인수인계 가이드를 만들었습니다'],
				stack: ['Spring', 'Java', 'JavaScript', 'JSP', 'jQuery', 'Oracle', 'MySQL']
			}
		]
	}
];

export const PRINT_COMPACT_ORGANIZATION_CONTRIBUTIONS: PrintContribution[] = [
	{
		title: '6명 규모 프론트엔드 파트의 업무·진행 기준 정리',
		problem: '신규 프로젝트와 운영 업무가 동시에 진행돼 담당자와 일정을 계속 맞춰야 했습니다.',
		process: [
			'기획 리뷰가 끝나면 Jira 티켓과 담당자, 예상 일정을 정리했습니다. 진행 상황과 막힌 일은 주간보고에서 공유했습니다.'
		],
		effect:
			'운영 이슈가 들어오면 담당자를 바로 찾을 수 있었고, 다른 팀도 필요한 개발자와 직접 논의할 수 있었습니다.'
	},
	{
		title: '경험에 맞춘 온보딩과 프로젝트 역할 확대',
		problem:
			'React 경험만 있는 신입의 JSP 적응과 주임급 개발자의 프로젝트 리드 경험이 필요했습니다.',
		process: [
			'JSP 실행 흐름을 문서로 정리했습니다. 신입은 프로모션으로 시작해 관리자·모바일·리뉴얼 업무까지 차례로 맡았습니다.',
			'주임급 개발자는 React 학습과 신입 지원을 거친 뒤 모바일·태블릿 프로젝트의 리드와 유지보수를 담당했습니다.'
		],
		effect:
			'신입 4명은 각자 운영 기능을 맡았고, 주임급 개발자는 프로젝트를 운영 반영까지 이끌었습니다.'
	},
	{
		title: '대표·기획·서버팀과의 기술 결정 합의',
		problem:
			'구조를 바꾸려면 개발팀 밖의 동의가 먼저 필요했습니다. 결정 근거가 문서로 남지 않으면 같은 논의가 반복됐습니다.',
		process: [
			'JSP를 React로 옮기는 근거와 기능별 이전 순서를 정리해 대표·PM과 착수 범위를 합의했습니다.',
			'하드코딩된 배너 노출 조건은 DB·API로 관리하도록 기획·서버팀과 합의하고, 레거시 정책은 Confluence에 남겼습니다.'
		],
		effect:
			'기획·디자인·FE·BE가 같은 기준으로 협업했고, 운영 일정 변경에 프론트엔드 재배포가 필요하지 않게 됐습니다.'
	}
];
