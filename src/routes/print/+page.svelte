<script lang="ts">
	import PrintShell from '$lib/components/print/PrintShell.svelte';
	import type { PrintProfileConfig } from '$lib/components/print/print-profile';

	const company: PrintProfileConfig = {
		companyLabel: '기본',
		roleLine: 'Frontend Developer · 7년차',
		resumeAbout:
			'기존 시스템의 맥락을 충분히 이해한 뒤 변경하기 쉬운 구조로 전환하는 일을 좋아합니다. 7년간 레거시 분석과 React 리뉴얼, UI·UX 및 사용자 흐름 개선, 운영 장애 해결을 경험했고, 파트 리더로 팀원이 스스로 판단할 수 있도록 결정의 배경과 공통 규칙을 문서로 남겨 왔습니다.',
		portfolioAbout:
			'기술 선택 자체보다 서비스 제약과 운영 결과를 기준으로 판단합니다. 아래 세 사례는 60개 이상의 화면을 React로 전환하고 독립 배포 구조를 구축한 과정, 입력·기기 제약을 해결한 과정, 대용량 지도와 결제 기능을 안정적으로 운영한 과정을 담았습니다.',
		strengths: [
			{
				tag: 'ANALYSIS · RENEWAL',
				title: '레거시 분석에서 구조 개선까지',
				description:
					'6개 역할과 60개 이상의 화면을 분석하고 15,000줄 JavaScript를 기능 단위 React 구조로 전환했습니다.'
			},
			{
				tag: 'TEAM · DOCUMENTATION',
				title: '함께 판단하는 팀과 반복 가능한 기준',
				description:
					'업무만 배분하지 않고 결정 배경을 공유하며 라우팅·결제·보안·정적 리소스 규칙을 팀의 문서와 시스템으로 남겼습니다.'
			}
		],
		featuredProjectIds: ['acuvue-renewal', 'smartfitting', 'lens-simulator'],
		workHighlights: [
			{
				tag: 'MIGRATION · DELIVERY',
				title: '60개 이상 화면의 React 전환 리드',
				description:
					'FE 3명의 업무를 배분하고 6개 사용자 역할의 라우팅, 결제 성공·실패, 인증·보안, S3 정적 리소스 규칙을 정리했습니다. 15,000줄 제품판매 JavaScript를 기능 단위 React 구조로 전환했습니다.',
				result:
					'프론트엔드 독립 배포 구조를 구축해 젠킨스 기준 운영 배포 시간을 약 20분에서 1분 30초로 단축했습니다.'
			},
			{
				tag: 'INPUT · RESPONSIVE',
				title: '모바일 렌즈 계산기 입력·기기 대응',
				description:
					'기술 의사결정과 UI·UX 흐름, 백엔드 API 협업을 조율하고 도수 ComboBox와 주문 가능 제품 연동을 구현했습니다. 보안팀과 협의해 개인정보를 제외한 도수 상태만 로컬에 보관했습니다.',
				result:
					'비정상 소수 입력의 400 오류를 제거하고, 운영 3일 전 변경된 Lenovo Tab M9의 DPR·논리적 뷰포트를 분석해 일정 내 반응형 대응을 완료했습니다.'
			},
			{
				tag: 'INTERACTION · STATE',
				title: '단계형 렌즈 시뮬레이터 FE 단독 개발',
				description:
					'기획 1명·백엔드 2명과 협업해 고객 상담과 렌즈 맞춤 과정을 연습하는 웹 시뮬레이터의 프론트엔드 전반을 개발했습니다. 깊게 중첩된 대화 데이터를 단계별 UI로 구성하고 Zustand로 진행 상태를 통합했습니다.',
				result:
					'새로고침 후에도 진행 단계를 유지하고, stepNumber로 모달 재진입 시 완료된 타이핑 애니메이션이 반복되는 문제를 해결했습니다.'
			},
			{
				tag: 'OPERATIONS · COMPONENT',
				title: '반복 운영을 제품 기능으로 전환',
				description:
					'날짜 조건으로 하드코딩하던 팝업·서브배너·롤링배너를 서버팀과 협의해 DB 기반 어드민 관리 방식으로 바꾸고, PC 전용 영업사원 프로그램의 약정서 체결·승인 흐름을 재사용 블록으로 공통화했습니다.',
				result:
					'배너 변경을 프론트 배포 없이 운영할 수 있게 만들고, 모바일 리뉴얼에서 반복되는 승인 UI의 구현 기준을 통일했습니다.'
			}
		]
	};
</script>

<PrintShell {company} />
