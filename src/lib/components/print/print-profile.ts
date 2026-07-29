export interface PrintWork {
	id: string;
	title: string;
	period: string;
	scope: string;
	overview: string;
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

export const PRINT_HEADER_INTRO =
	'레거시 서비스의 구조를 개선하고, 팀이 지속해서 운영할 수 있는 프론트엔드를 만드는 개발자입니다. 사용자 흐름과 운영 제약을 기준으로 문제를 분석하고 기획·디자인·백엔드팀과 해결 범위를 조율합니다.';

export const PRINT_INTRO_PARAGRAPHS = [
	{
		text: '성실하고 꼼꼼한 성격으로, 목표를 달성하는 것만큼 문제를 풀어가는 과정에서 배우고 방향을 찾아가는 일을 중요하게 생각합니다. 익숙하지 않은 상황에서도 원인을 차근차근 좁혀 보고, 다시 같은 판단을 반복하지 않도록 확인한 기준과 과정을 문서로 남기는 편입니다.',
		highlights: ['성실하고 꼼꼼한 성격', '확인한 기준과 과정을 문서로 남기는 편']
	},
	{
		text: '사용자나 운영자가 막히는 흐름을 발견하고, 오래된 서비스의 업무 맥락과 제약을 분석해 해결 범위를 구체화하는 일을 좋아합니다. 혼자 답을 정하기보다 기획·디자인·백엔드팀과 우선순위를 합의하고, 공통 컴포넌트와 개발 기준으로 반복되는 문제를 줄이는 데 집중합니다.',
		highlights: ['업무 맥락과 제약을 분석', '반복되는 문제를 줄이는 데 집중']
	},
	{
		text: '2018년부터 JSP 기반 SI 프로젝트의 개발과 운영을 시작해 React 기반 웹·앱, 모바일·태블릿 서비스, 결제·지도·외부 API 연동을 경험했습니다. 두 차례의 JSP 서비스 React 전환을 주도했으며, 이후에는 프론트엔드 파트 리더로 팀원 6명의 업무 배분과 일정 협의, 신입 온보딩과 기술 문제 해결을 맡았습니다.',
		highlights: ['두 차례의 JSP 서비스 React 전환', '프론트엔드 파트 리더', '팀원 6명']
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

export const PRINT_EXPERIENCES: PrintExperience[] = [
	{
		company: '라텔앤드파트너즈',
		period: '2024.04 — 2026.06',
		duration: '2년 2개월',
		role: '프론트엔드 파트 리더',
		summary:
			'아큐브 소비자 웹·앱, 안경사용 프로그램, 영업·CS 내부 시스템의 개발·운영과 프론트엔드 파트 운영을 맡았습니다.',
		works: [
			{
				id: 'acuvue-renewal',
				title: '하드코딩 운영과 입력 오류를 동적 관리·공통 구조로 전환',
				period: '2025.10 — 2026.03',
				scope:
					'권한별 정책 분석 및 구현 기준 정리, 공통 컴포넌트·렌즈 계산 구조 설계, 주요 화면 구현과 요구사항·우선순위 조율',
				overview:
					'안경사가 제품 판매·고객 관리·렌즈 계산에 사용하는 JSP 기반 통합관리 시스템을 React로 전환했습니다.',
				problem:
					'15,000줄 규모의 제품 판매 JavaScript와 권한별 레거시 정책이 유지보수를 어렵게 했고, 배너·팝업의 날짜와 노출 조건을 코드에 직접 넣어 일정 변경 때마다 재배포해야 했습니다. 키보드 언어와 스캐너 종류에 따라 LOT 값이 달라지는 운영 오류도 반복됐습니다.',
				process: [
					'권한별 노출 페이지와 제품 판매·고객 관리·관리자 기능의 정책을 분석해 Confluence에 정리하고 전 파트의 구현 기준으로 공유했습니다.',
					'캘린더·라디오·ComboBox·테이블 공통 컴포넌트와 Storybook을 구축하고, 3개 렌즈 계산기의 입력·포커스 이동·유효성 검사 로직을 Headless 구조로 통합했습니다.',
					'배너·팝업은 날짜와 노출 조건을 DB·API로 관리하도록 기획·백엔드팀과 합의하고, LOT 값은 서버 전송 시점에 영문 변환과 특수문자 정제를 적용했습니다.'
				],
				effect:
					'운영자가 일정 변경을 프론트엔드 재배포 없이 처리할 수 있게 했고, 공통 유효성 검사로 잘못된 요청의 400 오류와 중복 구현을 줄였습니다. LOT 입력도 키보드·스캐너 환경에 맞춰 정제되도록 개선했습니다.',
				effectHighlights: [
					'프론트엔드 재배포 없이 처리',
					'400 오류와 중복 구현을 줄였습니다',
					'키보드·스캐너 환경에 맞춰 정제'
				],
				stack: ['React', 'TypeScript', 'TanStack Query', 'Emotion', 'Storybook', 'Vite']
			},
			{
				id: 'smartfitting',
				title: '지급 기기 변경에도 모바일 상담 흐름을 일정 안에 복구',
				period: '2025.05 — 2025.08',
				scope:
					'초기 UI·UX 의사결정, 주문 가능 제품·상세 화면 구현과 API 연동, FE·BE 책임 경계 문서화, 전체 QA',
				overview:
					'안경사 통합관리 시스템의 렌즈 계산기를 모바일·태블릿 현장에서 사용할 수 있도록 별도 서비스로 구현했습니다.',
				problem:
					'개인정보 동의 전에는 고객 도수 정보를 서버에 저장할 수 없었고, 운영 반영 3일 전 지급 기기가 Lenovo Tab M9으로 바뀌면서 논리적 뷰포트가 모바일로 인식돼 레이아웃이 깨졌습니다.',
				process: [
					'구면·난시·멀티포컬 주문 가능 제품과 제품 상세 바텀시트를 구현하고 백엔드 API에 연동했습니다.',
					'동의 전 도수 상태는 Zustand persist로 탭 이동과 새로고침에도 유지하도록 설계하고, 계산 로직과 FE·BE 경계를 Confluence에 정리해 백엔드팀과 이관 범위를 합의했습니다.',
					'Tab M9의 DPR과 CSS 논리적 뷰포트를 계산해 오인식 원인을 찾고 확정된 기기 너비에 맞춰 반응형 기준을 재조정했습니다.'
				],
				effect:
					'서버에 저장할 수 없는 상태에서도 상담 입력 흐름이 끊기지 않게 했고, 지급 기기 변경에 대응해 예정된 운영 일정 안에 모바일·태블릿 사용자 흐름을 완성했습니다.',
				effectHighlights: ['상담 입력 흐름이 끊기지 않게', '예정된 운영 일정 안에'],
				stack: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Emotion', 'Vite']
			},
			{
				id: 'virtual-fitting',
				title: '안경사 렌즈 판매 교육 시뮬레이터의 상태·빌드 경계 분리',
				period: '1차 2024.11 — 2025.02 · 2차 2026.04 — 2026.05',
				scope:
					'모노레포·상태 구조 설계, 공통 디자인 시스템 분리, 애플리케이션별 빌드 설정과 배포 방식 협의, 후속 개발자 인계',
				overview:
					'안경사가 고객과 대화하며 검사 결과를 확인하고 적합한 렌즈를 제안하는 판매 과정을 게임 형태로 연습하는 교육용 웹 시뮬레이터를 개발했습니다.',
				problem:
					'서버가 전체 대화 데이터를 한 번에 내려주는 구조에서 Context API와 Funnel을 함께 사용해 불필요한 리렌더링이 발생했고, 커스텀 모달을 열 때 게임 진행 대화가 초기화됐습니다. 변경 주기가 다른 안내 사이트와 시뮬레이터도 함께 배포되고 있었습니다.',
				process: [
					'1차에서 안내 사이트와 시뮬레이터를 모노레포 애플리케이션으로 나누고 공통 디자인 시스템을 shared로 분리했습니다. vite.config.ts의 빌드 파일명과 base path를 애플리케이션별로 설정하고 배포 방식을 결정해 인프라 담당자와 협의했습니다.',
					'1차에서 단계 상태를 Zustand로 통합한 뒤 비대해진 단일 store를 도메인별로 분리했습니다.',
					'2차에서 대화 상태를 localStorage에 저장해 우선 대응한 뒤 overlay-kit으로 모달의 전체 리렌더링을 막았고, 기존 기능과 기술 맥락을 문서화해 후속 개발자에게 인계했습니다.'
				],
				effect:
					'변경 주기가 다른 애플리케이션의 빌드 경계를 분리하면서 공통 UI를 재사용할 수 있게 했고, 모달 재진입과 화면 이동에도 진행 중인 대화가 초기화되지 않도록 개선했습니다.',
				effectHighlights: ['빌드 경계를 분리', '공통 UI를 재사용', '대화가 초기화되지 않도록'],
				stack: ['React', 'TypeScript', 'Zustand', 'Emotion', 'Framer Motion', 'overlay-kit', 'Okta']
			},
			{
				id: 'nonmyacuvue-promo',
				title: '응답 없는 본인인증 요청을 서버 단계까지 추적해 운영 정상화',
				period: '2024.08 — 2026.06',
				scope: '프로모션 1~5차 프론트엔드 구현, 외부 API 장애 진단과 임시 조치 후 백엔드 인계',
				overview:
					'마이아큐브 비회원 안경점의 구매 LOT 스캔과 휴대폰 본인인증 흐름을 JSP 환경에서 구현했습니다.',
				problem:
					'드림시큐리티 본인인증 요청이 응답 없이 막혔고 백엔드 담당자가 없는 상황에서 원인이 애플리케이션 코드인지 서버 보안 설정인지 구분되지 않았습니다.',
				process: [
					'서버 로그와 XML 보안 설정을 확인해 요청이 Spring Security 필터 체인의 CSRF 정책에서 차단되는 것을 특정했습니다.',
					'해당 경로를 필터 체인에서 제외해 서비스를 우선 정상화하고, 백엔드팀이 CSRF 예외 방식으로 정식 개선할 수 있도록 원인과 임시 조치를 인계했습니다.',
					'1~3차의 OCR과 4~5차의 Text Scan API, 휴대폰 인증 흐름을 연동하고 5차는 Web Components 기반 단계형 구조로 전환했습니다.'
				],
				effect:
					'담당 백엔드가 없는 상황에서도 프로모션 운영을 재개했고, 임시 조치에 머물지 않고 백엔드팀의 더 안전한 보안 예외 처리로 연결했습니다.',
				effectHighlights: ['프로모션 운영을 재개', '더 안전한 보안 예외 처리로 연결'],
				stack: [
					'JSP',
					'JavaScript',
					'Web Components',
					'Spring Security',
					'OCR API',
					'Text Scan API'
				]
			}
		]
	},
	{
		company: '샤플앤컴퍼니',
		period: '2021.04 — 2023.08',
		duration: '2년 4개월',
		role: '프론트엔드 개발자',
		summary: '현장 직원 관리 서비스 Shopl의 관리자 대시보드와 채팅 서비스를 개발·운영했습니다.',
		works: [
			{
				id: 'shopl-migration',
				title: '운영 중인 JSP 대시보드를 중단 없이 React로 점진 전환',
				period: '2022.01 — 2023.08',
				scope: '마이그레이션 제안·기술 선택, 주요 관리자 기능 구현, 동시 운영 배포 환경 구성',
				overview:
					'JSP 기반 관리자 대시보드를 운영하면서 기능 단위로 React 화면을 함께 제공하는 전환 구조를 만들었습니다.',
				problem:
					'프론트엔드 변경에도 서버와 함께 배포해야 해 반복 작업의 부담이 컸고, 대표·PM은 JSP와 React를 동시에 운영할 때 생길 배포 복잡도를 우려했습니다.',
				process: [
					'Vue와 React를 운영·유지보수 관점에서 비교해 React 선택 근거와 점진 전환 방식을 대표·PM에게 설명해 프로젝트 착수 결정을 이끌었습니다.',
					'프리온보딩·온보딩·게시판 설정·결제 관리 등 기존 기능을 React로 전환하고 신규 관리자 기능을 개발했습니다.',
					'배포 직후 발생한 무한 호출에 대응해 프론트엔드 코드를 롤백하고 오류 응답과 백엔드 리다이렉트 흐름을 추적했습니다. 잘못된 URL이 404와 index.html 재호출을 반복시키는 원인을 특정해 백엔드의 리다이렉트 URL 수정으로 연결했습니다.'
				],
				effect:
					'기존 서비스를 중단하지 않고 약 1년간 JSP와 React를 병행 운영하며 기능 단위로 전환할 수 있는 기반을 마련했습니다.',
				effectHighlights: ['기존 서비스를 중단하지 않고', '약 1년간 JSP와 React를 병행 운영'],
				stack: ['React', 'TanStack Query', 'Emotion']
			},
			{
				id: 'shopl-map',
				title: '마커 2만 개로 중단되던 작업률 지도를 데이터 흐름까지 개선',
				period: '재직 기간 중 약 1년간 개발·운영',
				scope: '국내·해외 지도 연동과 클러스터링 구현',
				overview:
					'관리자가 날짜·근무지·직원별 작업 완료율을 국내외 지도에서 확인하는 기능을 개발했습니다.',
				problem:
					'근무지 마커 2만 개를 한 번에 렌더링하면 브라우저가 멈추고 지도 대신 흰 화면이 표시됐습니다.',
				process: [
					'국내는 NAVER Maps API, 해외는 Google Maps API를 사용하고 각 지도에 맞는 클러스터링을 구현해 운영에 반영했습니다.'
				],
				effect:
					'마커 2만 개를 한 번에 렌더링할 때 발생하던 흰 화면을 정상화해, 관리자가 대량의 근무지 데이터에서도 작업 현황을 확인할 수 있게 했습니다.',
				effectHighlights: ['흰 화면을 정상화', '작업 현황을 확인할 수 있게'],
				stack: ['React', 'NAVER Maps API', 'Google Maps API']
			},
			{
				id: 'shopl-payment',
				title: '수기 인보이스 업무를 국내·해외 정기결제 기능으로 전환',
				period: '2022.11 — 2023.02',
				scope: '요금제·결제수단 관리 화면과 API 연동, 국내·해외 결제 상태 흐름 정의',
				overview: '고객이 요금제와 결제수단을 직접 등록하고 관리하는 정기결제 기능을 개발했습니다.',
				problem:
					'수기로 처리하던 인보이스 업무를 제품 기능으로 전환해야 했지만, Stripe의 결제수단 사전 등록과 후불 정기결제 흐름은 공식 문서만으로 확정하기 어려웠습니다.',
				process: [
					'아임포트와 Stripe를 연동하고 요금제·결제수단 등록과 결제 관리 화면을 구현했습니다.',
					'불명확한 해외 결제 동작은 Stripe 고객센터에 직접 문의하고 백엔드 개발자와 상태별 역할을 합의했습니다.'
				],
				effect:
					'국내·해외 고객이 요금제와 결제수단을 직접 관리할 수 있게 하며 수기 인보이스 절차를 제품 흐름으로 옮겼습니다.',
				effectHighlights: ['직접 관리', '수기 인보이스 절차를 제품 흐름으로'],
				stack: ['React', '아임포트', 'Stripe', 'TanStack Query']
			}
		]
	},
	{
		company: '아이티키',
		period: '2018.07 — 2020.11',
		duration: '2년 4개월',
		role: 'SI 개발팀 사원',
		summary:
			'Spring·Java 기반으로 여러 고객사의 웹 서비스와 관리자 화면을 개발하고 운영 장애에 대응했습니다.',
		works: [
			{
				id: 'itkey-si',
				title: '여러 고객사의 주문·결제 운영과 반복 인수인계를 함께 개선',
				period: '2018.07 — 2020.11',
				scope: '관리자 화면·API와 회원·주문·결제 화면 개발, 운영 오류 대응, 신규 팀원 가이드 작성',
				overview:
					'신한DS LMS, 롯데마트 웹·웹앱, 공공기관 사이트와 미스터피자 리뉴얼 등 여러 SI 프로젝트를 수행했습니다.',
				problem:
					'고객사별 환경과 업무가 달라 운영 중 데이터·주문·결제 오류에 대응해야 했고, 프로젝트가 바뀔 때마다 신규 팀원이 같은 실행 절차를 다시 파악해야 했습니다.',
				process: [
					'Spring·Java·JavaScript로 직원용 관리자 화면과 API, 회원·주문·결제 화면을 구현하고 현업 요청과 운영 장애를 처리했습니다.',
					'프로젝트별 업무 프로세스와 단위 테스트 방법을 가이드로 작성해 신규 팀원에게 공유했습니다.'
				],
				effect:
					'여러 고객사의 운영 요청과 주문·결제 장애를 지속적으로 처리하고, 반복되던 프로젝트 실행·인수인계 정보를 팀 문서로 남겼습니다.',
				effectHighlights: ['주문·결제 장애를 지속적으로 처리', '팀 문서로 남겼습니다'],
				stack: ['Spring', 'Java', 'JavaScript', 'jQuery', 'Oracle', 'MySQL']
			}
		]
	}
];

export const PRINT_ORGANIZATION_CONTRIBUTIONS: PrintContribution[] = [
	{
		title: '6명 규모 프론트엔드 파트의 업무·진행 기준 정리',
		problem:
			'주임급 2명과 신입 4명으로 구성된 팀에서 신규 프로젝트와 운영 업무를 함께 처리해야 해 담당 범위와 진행 상황을 지속적으로 조율해야 했습니다.',
		process: [
			'기획 리뷰에서 개발 범위를 확인한 뒤 Jira 티켓과 담당자를 정리하고 업무별 맨먼스를 산정해 기획팀과 일정을 협의했습니다.',
			'팀·개발실·TF 주간보고에서 진행 상황과 이슈를 공유하고, 기술 문제와 타 팀 커뮤니케이션 이슈의 해결을 지원했습니다.'
		],
		effect:
			'프로젝트별 담당자를 정해 운영 이슈를 적절한 담당자에게 빠르게 배분할 수 있게 했고, 타 팀도 담당자에게 직접 이슈를 전달할 수 있는 협업 흐름을 만들었습니다.'
	},
	{
		title: 'JSP 경험이 없는 신입의 단계적 온보딩',
		problem:
			'신입 팀원들은 React 경험만 있어 JSP 프로젝트의 세팅 방법과 전체 실행 흐름을 알기 어려웠습니다.',
		process: [
			'프로젝트 초기 세팅을 지원하고 프로젝트별 세팅·개발 방법과 JSP 실행 흐름을 Confluence에 문서화해 설명했습니다.',
			'신입 4명 모두 입사 후 첫 업무로 분기별 웹·앱 이벤트 프로모션을 맡게 하고, 이후 3명은 안경사 통합관리 시스템 관리자 기능으로 범위를 넓혔습니다. 나머지 1명은 영업사원용 모바일 시스템의 초기 설정과 React 리뉴얼의 결제·주문 영역을 맡도록 배치했습니다.'
		],
		effect:
			'신입 4명이 JSP 기반 프로모션으로 레거시 환경에 진입한 뒤 관리자 기능, 모바일 시스템, React 리뉴얼까지 독립적으로 담당 범위를 넓혔습니다.'
	},
	{
		title: '주임급 개발자의 React 프로젝트 리드 역할 확대',
		problem:
			'신입을 지원할 주임급 팀원에게도 신규 React 프로젝트를 독립적으로 맡기 위한 역량 보완이 필요했습니다.',
		process: [
			'주임급 팀원들이 React 스터디를 함께 진행하도록 유도하고, 주임급을 중심으로 신입의 업무와 질문을 지원하는 팀 배치를 구성했습니다.',
			'학습 이후 모바일·태블릿용 렌즈 계산기인 스마트피팅 프로젝트의 리드를 맡겼습니다.'
		],
		effect:
			'주임급 팀원이 스마트피팅 프로젝트를 리드해 운영 반영까지 완료하고, 이후 유지보수도 독립적으로 담당했습니다.'
	}
];

export const PRINT_EDUCATION: PrintEducation[] = [
	{
		title: '대진대학교',
		period: '2012.02~2017.08',
		details: ['문헌정보학과 전공 · 컴퓨터소프트웨어융합 부전공']
	}
];

export const PRINT_COMPACT_EXPERIENCES: PrintExperience[] = [
	{
		company: '라텔앤드파트너즈',
		period: '2024.04 — 2026.06',
		duration: '2년 2개월',
		role: '프론트엔드 파트 리더',
		summary:
			'아큐브 소비자 웹·앱, 안경사용 프로그램, 영업·CS 내부 시스템의 개발·운영과 프론트엔드 파트 운영을 맡았습니다.',
		works: [
			{
				id: 'acuvue-renewal',
				title: '하드코딩 운영과 입력 오류를 동적 관리·공통 구조로 전환',
				period: '2025.10 — 2026.03',
				scope: '권한별 정책 분석, 공통 컴포넌트·렌즈 계산 구조 설계, 주요 화면 구현',
				overview:
					'안경사가 제품 판매·고객 관리·렌즈 계산에 사용하는 JSP 기반 통합관리 시스템을 React로 전환했습니다.',
				problem:
					'권한별 정책과 하드코딩된 배너·팝업으로 일정 변경마다 재배포해야 했고, 입력 환경에 따른 LOT 오류도 반복됐습니다.',
				process: [
					'정책을 문서화해 구현 기준으로 공유하고 공통 UI와 렌즈 입력·검증 구조를 통합했습니다. 배너·팝업은 DB·API 관리로 전환하고 LOT 값은 전송 전에 정제했습니다.'
				],
				effect:
					'운영자가 일정 변경을 재배포 없이 처리할 수 있게 했고, 공통 검증과 입력값 정제로 운영 오류와 중복 구현을 줄였습니다.',
				effectHighlights: ['재배포 없이 처리', '운영 오류와 중복 구현을 줄였습니다'],
				stack: ['React', 'TypeScript', 'TanStack Query', 'Emotion', 'Storybook', 'Vite']
			},
			{
				id: 'smartfitting',
				title: '지급 기기 변경에도 모바일 상담 흐름을 일정 안에 복구',
				period: '2025.05 — 2025.08',
				scope: 'UI·UX 결정, 주문 가능 제품·상세 화면과 API 연동, 전체 QA',
				overview:
					'안경사 통합관리 시스템의 렌즈 계산기를 모바일·태블릿 현장에서 사용할 수 있도록 별도 서비스로 구현했습니다.',
				problem:
					'동의 전 도수 정보를 서버에 저장할 수 없었고, 운영 3일 전 지급 기기 변경으로 화면이 깨졌습니다.',
				process: [
					'입력 상태가 탭 이동·새로고침에도 유지되도록 설계하고 제품 화면을 API와 연동했습니다. 지급 기기의 논리적 뷰포트를 확인해 반응형 기준을 재조정했습니다.'
				],
				effect:
					'서버 저장 전에도 상담 입력을 유지하고, 기기 변경에 대응해 예정된 일정 안에 모바일·태블릿 흐름을 완성했습니다.',
				effectHighlights: ['상담 입력을 유지', '예정된 일정 안에'],
				stack: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Emotion', 'Vite']
			},
			{
				id: 'virtual-fitting',
				title: '렌즈 판매 교육 시뮬레이터의 상태·빌드 경계 분리',
				period: '1차 2024.11 — 2025.02 · 2차 2026.04 — 2026.05',
				scope: 'site·simulator 모노레포 분리, 공통 UI·빌드·상태 구조 설계, 기술 인계',
				overview:
					'안경사가 고객과 대화하며 렌즈를 제안하는 판매 과정을 게임 형태로 연습하는 교육용 웹 시뮬레이터를 개발했습니다.',
				problem:
					'안내 사이트와 시뮬레이터가 함께 배포되고 단계 상태가 비대했으며, 2차에는 모달 진입 시 대화가 초기화됐습니다.',
				process: [
					'1차에서 두 애플리케이션과 공통 UI를 분리하고 Vite 빌드 설정과 Zustand store를 재구성했습니다. 2차에서 모달 렌더링 구조를 조정하고 기능·기술 맥락을 문서화해 인계했습니다.'
				],
				effect:
					'빌드 경계와 공통 UI 재사용 구조를 마련하고, 모달 재진입에도 교육 대화가 유지되도록 개선했습니다.',
				effectHighlights: ['빌드 경계와 공통 UI 재사용 구조', '교육 대화가 유지'],
				stack: ['React', 'TypeScript', 'Zustand', 'Emotion', 'Vite']
			},
			{
				id: 'nonmyacuvue-promo',
				title: '응답 없는 본인인증 요청을 서버 단계까지 추적해 운영 정상화',
				period: '2024.08 — 2026.06',
				scope: '프로모션 1~5차 구현, 외부 API 장애 진단과 백엔드 인계',
				overview:
					'마이아큐브 비회원 안경점의 구매 LOT 스캔과 휴대폰 본인인증 흐름을 JSP 환경에서 구현했습니다.',
				problem:
					'본인인증 요청이 응답 없이 막혀 애플리케이션 코드와 서버 보안 설정 중 원인을 구분해야 했습니다.',
				process: [
					'로그·보안 설정으로 CSRF 차단을 특정해 서비스를 정상화하고 백엔드팀에 인계했습니다. OCR·Text Scan API와 인증을 연동하고 마지막 프로모션을 단계형 구조로 전환했습니다.'
				],
				effect: '프로모션 운영을 재개하고 백엔드팀의 안전한 보안 예외 처리로 연결했습니다.',
				effectHighlights: ['프로모션 운영을 재개', '안전한 보안 예외 처리로 연결'],
				stack: ['JSP', 'JavaScript', 'Web Components', 'Spring Security']
			}
		]
	},
	{
		company: '샤플앤컴퍼니',
		period: '2021.04 — 2023.08',
		duration: '2년 4개월',
		role: '프론트엔드 개발자',
		summary: '현장 직원 관리 서비스 Shopl의 관리자 대시보드와 채팅 서비스를 개발·운영했습니다.',
		works: [
			{
				id: 'shopl-migration',
				title: '운영 중인 JSP 대시보드를 중단 없이 React로 점진 전환',
				period: '2022.01 — 2023.08',
				scope: '마이그레이션 제안·기술 선택, 주요 관리자 기능 구현, 동시 운영 구조 구성',
				overview:
					'JSP 기반 관리자 대시보드를 운영하면서 기능 단위로 React 화면을 함께 제공하는 전환 구조를 만들었습니다.',
				problem:
					'프론트엔드 변경에도 서버와 함께 배포해야 했고, JSP와 React를 동시에 운영할 때의 복잡도를 해소해야 했습니다.',
				process: [
					'기술 선택 근거와 점진 전환 방식을 대표·PM에게 설명하고, 주요 관리자 기능을 React로 전환했습니다.',
					'배포 직후 무한 호출이 발생했을 때 롤백 후 오류·리다이렉트 흐름을 추적해 백엔드 URL 수정으로 연결했습니다.'
				],
				effect:
					'기존 서비스를 중단하지 않고 약 1년간 JSP와 React를 병행 운영하며 기능 단위로 전환할 기반을 마련했습니다.',
				effectHighlights: ['기존 서비스를 중단하지 않고', '기능 단위로 전환할 기반'],
				stack: ['React', 'TanStack Query', 'Emotion']
			},
			{
				id: 'shopl-map',
				title: '마커 2만 개로 중단되던 작업률 지도를 클러스터링으로 개선',
				period: '재직 기간 중 약 1년간 개발·운영',
				scope: '국내·해외 지도 연동과 클러스터링 구현',
				overview:
					'관리자가 날짜·근무지·직원별 작업 완료율을 국내외 지도에서 확인하는 기능을 개발했습니다.',
				problem:
					'근무지 마커 2만 개를 한 번에 렌더링하면 브라우저가 멈추고 흰 화면이 표시됐습니다.',
				process: ['국내·해외 지도 API에 맞는 클러스터링을 구현해 대량의 마커를 묶어 표시했습니다.'],
				effect:
					'흰 화면을 정상화해 관리자가 대량의 근무지 데이터에서도 작업 현황을 확인할 수 있게 했습니다.',
				effectHighlights: ['흰 화면을 정상화', '작업 현황을 확인'],
				stack: ['React', 'NAVER Maps API', 'Google Maps API']
			},
			{
				id: 'shopl-payment',
				title: '수기 인보이스 업무를 국내·해외 정기결제 기능으로 전환',
				period: '2022.11 — 2023.02',
				scope: '요금제·결제수단 관리 화면과 API 연동, 국내·해외 결제 상태 흐름 정의',
				overview: '고객이 요금제와 결제수단을 직접 등록하고 관리하는 정기결제 기능을 개발했습니다.',
				problem:
					'수기로 처리하던 인보이스 업무를 제품 기능으로 옮겨야 했지만, Stripe의 결제수단 사전 등록과 후불 정기결제 흐름은 공식 문서만으로 확정하기 어려웠습니다.',
				process: [
					'아임포트와 Stripe를 연동해 요금제·결제수단 등록과 결제 관리 화면을 구현했습니다.',
					'불명확한 해외 결제 동작은 Stripe 고객센터에 직접 문의하고 백엔드 개발자와 결제 상태별 역할을 합의했습니다.'
				],
				effect:
					'국내·해외 고객이 요금제와 결제수단을 직접 관리할 수 있게 하며 수기 인보이스 절차를 제품 흐름으로 전환했습니다.',
				effectHighlights: ['직접 관리', '수기 인보이스 절차를 제품 흐름으로 전환'],
				stack: ['React', '아임포트', 'Stripe', 'TanStack Query']
			}
		]
	},
	{
		company: '아이티키',
		period: '2018.07 — 2020.11',
		duration: '2년 4개월',
		role: 'SI 개발팀 사원',
		summary: '여러 고객사의 웹 서비스·관리자 화면을 개발하고 운영 장애에 대응했습니다.',
		works: [
			{
				id: 'itkey-si',
				title: '고객사 주문·결제 운영과 인수인계 개선',
				period: '2018.07 — 2020.11',
				scope: '관리자·회원·주문·결제 화면과 API 개발, 운영 대응, 가이드 작성',
				overview:
					'신한DS LMS, 롯데마트 웹·웹앱, 공공기관 사이트와 미스터피자 리뉴얼 등 여러 SI 프로젝트를 수행했습니다.',
				problem:
					'고객사마다 운영 방식이 달라 장애 대응과 신규 팀원의 반복적인 실행 절차 파악이 필요했습니다.',
				process: [
					'관리자·회원·주문·결제 화면과 API를 구현하고 장애를 처리했으며, 업무·테스트 절차를 가이드로 남겼습니다.'
				],
				effect: '운영 대응을 지속하고 반복되던 실행·인수인계 정보를 팀 문서로 정리했습니다.',
				effectHighlights: ['운영 대응을 지속', '팀 문서로 정리했습니다'],
				stack: ['Java', 'JavaScript', 'JSP']
			}
		]
	}
];

export const PRINT_COMPACT_ORGANIZATION_CONTRIBUTIONS: PrintContribution[] = [
	{
		title: '6명 규모 프론트엔드 파트의 업무·진행 기준 정리',
		problem:
			'신규 프로젝트와 운영 업무를 함께 처리하기 위해 담당 범위와 진행 상황을 지속적으로 조율해야 했습니다.',
		process: [
			'기획 리뷰 후 Jira 티켓·담당자·일정을 정리하고, 주간보고에서 진행 상황과 이슈를 공유했습니다.'
		],
		effect:
			'프로젝트별 담당자를 정해 운영 이슈를 빠르게 배분하고, 타 팀도 담당자에게 직접 이슈를 전달할 수 있게 했습니다.'
	},
	{
		title: '경험에 맞춘 온보딩과 프로젝트 역할 확대',
		problem:
			'React 경험만 있는 신입의 JSP 적응과 주임급 개발자의 프로젝트 리드 경험이 필요했습니다.',
		process: [
			'JSP 실행 흐름을 문서화하고 신입은 프로모션부터 관리자·모바일·리뉴얼 업무로 범위를 넓혔습니다.',
			'주임급은 React 학습과 신입 지원을 거쳐 모바일·태블릿 프로젝트 리드와 유지보수를 맡도록 배치했습니다.'
		],
		effect:
			'팀원이 경험에 맞춰 독립적인 프로젝트 담당과 운영 역할로 성장할 수 있는 업무 흐름을 만들었습니다.'
	}
];
