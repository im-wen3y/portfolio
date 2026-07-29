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
	highlights?: string[];
	resumeImpact?: {
		label: string;
		detail: string;
	};
	bullets: string[];
}

export const projects: Project[] = [
	{
		id: 'acuvue-renewal',
		title: '안경사 통합관리 시스템 React 리뉴얼',
		company: '라텔앤드파트너즈',
		period: '2025.10 — 2026.03',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: '기획 1명 · 디자인 1명 · FE 3명 · BE 2~5명',
		tags: ['팀 리딩', '웹 프로젝트', '코드'],
		stack: ['React', 'TypeScript', 'TanStack Query', 'Emotion', 'Storybook', 'Vite'],
		summary: 'JSP 기반 화면과 제품 판매 기능을 React로 전환',
		problem:
			'제품 판매 화면이 15,000줄 규모의 단일 JavaScript로 구성돼 기능 간 결합도가 높았고, 배너·팝업은 프론트엔드에 하드코딩돼 운영 변경에도 배포가 필요했음. LOT 스캔은 키보드 언어와 스캐너 종류에 따라 한글·특수문자·중복 문자가 전달되는 운영 오류가 있었음.',
		solution:
			'권한 정책과 레거시 구조를 Confluence에 문서화하고 공통 UI와 화면을 React로 전환함. 배너·팝업은 관리자에서 운영하도록 데이터와 정책을 정의했으며, LOT 값은 서버 전송 직전에 영문 변환과 특수문자 정제를 적용하도록 처리 순서를 개선함.',
		result:
			'이미지 운영은 프론트엔드 배포 없이 처리하고, LOT 입력은 키보드·스캐너 환경에 맞춰 정제한 뒤 서버에 전달되도록 개선함.',
		highlights: [
			'15,000줄 규모의 단일 JavaScript',
			'한글·특수문자·중복 문자',
			'Confluence에 문서화',
			'공통 컴포넌트를 구현하고 Storybook에 정리',
			'서버 전송 직전에 영문 변환과 특수문자 정제',
			'프론트엔드 배포 없이 처리'
		],
		resumeImpact: {
			label: '하드코딩 운영을 관리자 기반의 동적 관리로 전환',
			detail:
				'JSP 기반 화면과 15,000줄 제품판매 JavaScript를 기능 단위 React 구조로 전환하고, 배너 운영을 어드민으로 이관'
		},
		bullets: [
			'권한별 노출 페이지와 제품 판매·고객 관리·관리자 기능의 레거시 코드를 분석해 Confluence에 문서화하고 공유',
			'캘린더·라디오·콤보박스·테이블 공통 컴포넌트를 구현하고 Storybook에 정리',
			'쿠폰 큐레이션·최대 혜택가와 판매 내역·공지사항·이벤트·대량 결제 화면을 마크업하고 API 연동',
			'하드코딩된 서브배너·롤링배너·팝업을 관리자가 직접 운영하도록 데이터와 정책을 정의',
			'LOT 스캔의 한글 입력·스캐너별 특수문자·첫 글자 중복 원인을 단계적으로 확인하고 서버 전송 전 변환·정제 순서를 보강'
		]
	},
	{
		id: 'lens-simulator',
		title: '안경사 렌즈 판매 교육 시뮬레이터',
		company: '라텔앤드파트너즈',
		period: '2024.11 — 2025.02 · 2026.04 — 2026.05',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution:
			'모노레포·상태 구조 설계, 공통 디자인 시스템과 애플리케이션별 빌드 설정, 후속 개발자 인계',
		tags: ['웹 프로젝트', '코드'],
		stack: [
			'React',
			'TypeScript',
			'Zustand',
			'TanStack Query',
			'Emotion',
			'Framer Motion',
			'Storybook',
			'Okta'
		],
		summary:
			'안경사가 고객과 대화하며 검사 결과를 확인하고 렌즈를 제안하는 판매 과정을 게임 형태로 연습하는 교육용 웹 시뮬레이터를 개발',
		problem:
			'서버가 전체 대화·문제 데이터를 깊게 중첩된 객체로 한 번에 전달해 단계별 상태 처리가 복잡했음. Context·Funnel 기반 단계는 새로고침 시 유지되지 않았고, 모달을 열고 닫을 때 완료된 메시지의 타이핑 애니메이션이 다시 실행됐음.',
		solution:
			'시뮬레이션 게임 전체 화면과 API·Okta 로그인을 연동하고, 단계 상태를 Zustand로 통합함. 메시지별 stepNumber로 애니메이션 실행 여부를 제어했으며, 2차에서는 기존 기능과 기술 맥락을 Confluence에 정리해 인계함.',
		result:
			'새로고침하거나 화면에 다시 진입해도 진행 단계를 유지하고, 완료된 대화의 애니메이션이 반복되지 않도록 개선함. 2차 개발에 필요한 기존 기능과 기술 맥락을 후속 개발자에게 인계함.',
		highlights: [
			'API·Okta 로그인을 연동',
			'새로고침 시 유지되지 않았',
			'타이핑 애니메이션이 다시 실행됐',
			'단계 상태를 Zustand로 통합',
			'메시지별 stepNumber',
			'진행 단계를 유지',
			'애니메이션이 반복되지 않도록 개선',
			'후속 개발자에게 인계'
		],
		resumeImpact: {
			label: '1차 FE 단독 구축 · 2차 기술 인계',
			detail: '새로고침 상태 유지와 모달 재진입 시 타이핑 애니메이션 반복 문제를 해결'
		},
		bullets: [
			'1차에서 site와 simulator를 모노레포로 분리하고 공통 디자인 시스템을 shared로 구성',
			'1차에서 vite.config.ts의 애플리케이션별 빌드 파일명과 base path를 설정하고 배포 방식을 인프라 담당자와 협의',
			'1차에서 깊게 중첩된 대화 데이터를 단계별 UI로 구성하고 Zustand 상태를 도메인별로 분리',
			'2차에서 모달 재진입 시 대화가 초기화되는 문제를 개선하고 기존 기능과 기술 맥락을 후속 개발자에게 인계'
		]
	},
	{
		id: 'smartfitting',
		title: '모바일·태블릿용 렌즈 계산기',
		company: '라텔앤드파트너즈',
		period: '2025.05 — 2025.08',
		featured: true,
		role: '프론트엔드 파트 리더',
		contribution: '기획 1명 · 디자인 1명 · FE 3~4명 · BE 2명',
		tags: ['모바일 앱', '코드'],
		stack: ['React', 'TypeScript', 'Zustand', 'TanStack Query', 'Emotion', 'Vite'],
		summary: '안경사 통합관리 시스템의 렌즈 계산기를 모바일·태블릿 환경에 맞춰 별도 서비스로 구현',
		problem:
			'iOS의 input type="number"가 도수 입력에 필요한 -/+/. 기호를 받지 못했음. 게다가 운영 반영 3일 전, 지급 기기가 아이폰13미니~아이패드 프로 기준에서 Lenovo Tab M9으로 바뀌며 반응형이 모바일로 오인식돼 레이아웃이 깨졌음.',
		solution:
			'도수 입력 콤보박스에 기호·소수 유효성 검사를 적용하고, Tab M9의 DPR과 논리적 뷰포트를 분석해 반응형 기준을 재조정함. 기존 데이터의 UI 노출 규칙과 프론트엔드 계산 로직을 문서화하고 백엔드로 이관할 책임 범위를 협의함.',
		result:
			'제품 조회부터 상세 확인까지 모바일 사용자 흐름을 완성하고 계산 로직의 책임 경계와 이관 기준을 정립함. 입력 오류와 지급 기기 변경에도 대응해 일정에 맞춰 운영함.',
		highlights: [
			'운영 반영 3일 전',
			'레이아웃이 깨졌',
			'기호·소수 유효성 검사',
			'DPR과 논리적 뷰포트',
			'백엔드로 이관할 책임 범위',
			'책임 경계와 이관 기준을 정립',
			'400 오류 제거',
			'일정에 맞춰 운영'
		],
		resumeImpact: {
			label: '입력 400 오류 제거 · 기한 내 배포',
			detail: '콤보박스 유효성 검사와 Lenovo Tab M9 DPR 대응을 완료'
		},
		bullets: [
			'초기 UI·UX 의사결정에 참여하고 구면·난시·멀티포컬 주문 가능 제품 영역과 제품 상세 바텀시트를 마크업·API 연동',
			'기존 데이터를 기준으로 UI 노출 규칙과 프론트엔드 계산 로직을 문서화하고, 백엔드로 이관할 로직과 책임 경계를 회의에서 공유',
			'도수 입력 콤보박스에 기호·소수 유효성 검사를 적용해 400 오류 제거',
			'Lenovo Tab M9의 DPR·논리적 뷰포트를 분석해 반응형 기준을 재조정하고 전체 프로세스 QA와 버그 수정 수행'
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
			'마커는 국내·해외 지도별 클러스터링을 적용해 운영에 반영함. 정기결제는 고객센터 문의와 서버 개발자 협의로 흐름을 확정.',
		result:
			'클러스터링을 운영에 반영해 흰 화면이 발생하던 마커 2만 개를 정상 노출하고 국내·해외 결제를 연동함. JSP·React를 약 1년간 병행 운영함.',
		resumeImpact: {
			label: '지도 마커 2만 개 정상 노출',
			detail: '지도별 클러스터링으로 브라우저 다운을 해결하고 국내·해외 결제를 연동'
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
		period: '2024.08 — 2026.06 · 총 5차',
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
		result: '기획 1·BE 1과 협업하며 FE를 단독 담당해 5차례 캠페인을 운영함.',
		bullets: [
			'1차 본인인증·OCR 연동부터 5차 HBS·Web Components 전환까지 총 5차례 FE를 단독 담당',
			'구매 LOT 스캔을 1~3차 네이버 OCR에서 4~5차 AWS 텍스트 스캔 API로 전환해 제품 재학습과 APP KEY 변경 부담 축소',
			'백엔드팀도 원인을 못 찾던 드림시큐리티 API 연동 장애를, 서버 로그를 직접 뜯어보며 Spring Security 필터 체인의 CSRF 차단으로 특정'
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
		title: '관리자 대시보드 JSP → React 전환',
		company: '샤플앤컴퍼니',
		period: '2022.01 — 2023.08',
		role: '프론트엔드 개발자',
		contribution: '기획 4명 · 디자인 3명 · FE 3~5명 · BE 3~4명',
		tags: ['웹 프로젝트', '코드'],
		stack: ['React', 'JavaScript', 'TanStack Query', 'JSP'],
		summary: 'JSP 기반 관리자 대시보드를 운영 중단 없이 React로 점진 전환',
		problem:
			'JSP 레거시라 유지보수·개발 속도가 느렸지만, 대표·PM은 서버·프론트 동시 배포 부담 때문에 마이그레이션에 반대했음. 실제로 React/JSP를 같이 띄우면 무한 호출 이슈도 났음.',
		solution:
			'운영·유지보수 관점을 근거로 대표·PM을 설득해 착수 결정을 이끌고 Vue 대신 React를 선택함. 배포 직후 프론트엔드 코드를 롤백하고 오류 응답과 백엔드 리다이렉트 흐름을 추적해, 잘못된 URL이 404와 index.html 재호출을 반복시키는 원인을 특정하고 백엔드 수정으로 연결함.',
		result:
			'기존 서비스를 유지하면서 약 1년간 JSP와 React를 병행 운영할 수 있는 점진적 전환 기반을 마련함.',
		highlights: [
			'마이그레이션에 반대했',
			'착수 결정을 이끌고',
			'Vue 대신 React를 선택',
			'JSP·React 동시 구동 구조',
			'할 일·게시판·설정·온보딩 기능을 신규 개발',
			'약 1년간 JSP와 React를 병행 운영',
			'점진적 전환 기반'
		],
		resumeImpact: {
			label: 'JSP·React 약 1년 동시 운영',
			detail: '기존 서비스를 유지하면서 기능 단위로 React 화면을 제공하는 점진적 전환 기반 마련'
		},
		bullets: [
			'사내 운영 환경을 고려해 Vue 대신 React를 선택하고 JSP·React 동시 구동 구조를 설계',
			'기존 관리자 기능을 React로 전환하고 할 일·게시판·설정·온보딩 기능을 신규 개발',
			'배포 직후 발생한 무한 호출에 프론트엔드 롤백으로 대응하고 404와 index.html 재호출이 반복되는 원인을 특정해 백엔드 리다이렉트 URL 수정으로 연결'
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
