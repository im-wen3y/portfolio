<script lang="ts">
	import PrintShell from '$lib/components/print/PrintShell.svelte';
	import type { PrintProfileConfig } from '$lib/components/print/print-profile';

	const company: PrintProfileConfig = {
		companyLabel: '미리캔버스',
		roleLine: 'Product Frontend Developer · 7년차',
		theme: 'miricanvas',
		resumeAbout:
			'복잡하게 얽힌 화면도 사용자가 어디에서 막히는지부터 살펴보면 해결의 실마리를 찾을 수 있다고 믿습니다. 7년 동안 오래된 코드와 서버 로그를 끝까지 파고들어 React 전환, 입력 오류, 상태 유지와 기기별 화면 문제를 해결해 왔습니다. 코드를 고치는 데서 멈추지 않고 왜 그렇게 판단했는지 문서와 대화로 남겨, 동료가 다음 변화를 더 편하게 이어갈 수 있는 프론트엔드를 만들고 싶습니다.',
		portfolioAbout:
			'사용 흐름을 시각화한 단계형 시뮬레이터, 입력·키보드·태블릿 환경을 함께 개선한 렌즈 계산기, 60개 이상 레거시 화면을 변경 가능한 React 구조로 전환한 사례입니다. 문제를 발견한 맥락부터 판단, 구현, 운영 결과까지 정리했습니다.',
		strengths: [
			{
				tag: 'PERSONALIZED FLOW',
				title: '사용 흐름을 상태와 인터랙션으로 설계',
				description:
					'상담 단계에 따라 달라지는 화면을 Zustand와 Framer Motion으로 구현하고, 새로고침·모달 재진입에서도 사용자의 진행 맥락이 유지되도록 개선했습니다.'
			},
			{
				tag: 'RESILIENT UI',
				title: '변화에 유연하고 접근 가능한 UI',
				description:
					'입력 유효성, 키보드 이동, 기기별 뷰포트를 하나의 흐름으로 다루고, 기능 단위 React 전환과 UI 규칙 문서화로 다음 변경의 비용을 낮췄습니다.'
			}
		],
		featuredProjectIds: ['lens-simulator', 'smartfitting', 'acuvue-renewal'],
		workHighlights: [
			{
				tag: 'INTERACTION · STATE',
				title: '단계형 렌즈 시뮬레이터 FE 단독 개발',
				description:
					'기획 1명·백엔드 2명과 협업해 고객 상담과 렌즈 맞춤 과정을 연습하는 웹 시뮬레이터의 프론트엔드 전반을 개발했습니다. 깊게 중첩된 대화 데이터를 단계별 UI로 구성하고 Zustand로 진행 상태를 통합했습니다.',
				result:
					'새로고침 후에도 진행 단계를 유지하고, stepNumber로 모달 재진입 시 완료된 타이핑 애니메이션이 반복되는 문제를 해결했습니다.'
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
				tag: 'MIGRATION · DELIVERY',
				title: '60개 이상 화면의 React 전환 리드',
				description:
					'FE 3명의 업무를 배분하고 6개 사용자 역할의 라우팅, 결제 성공·실패, 인증·보안, S3 정적 리소스 규칙을 정리했습니다. 15,000줄 제품판매 JavaScript를 기능 단위 React 구조로 전환했습니다.',
				result:
					'프론트엔드 독립 배포 구조를 구축해 젠킨스 기준 운영 배포 시간을 약 20분에서 1분 30초로 단축했습니다.'
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
