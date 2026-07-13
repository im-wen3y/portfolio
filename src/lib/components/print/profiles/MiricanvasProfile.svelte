<script lang="ts">
	import PrintShell from '$lib/components/print/PrintShell.svelte';
	import type { PrintProfileConfig } from '$lib/components/print/print-profile';

	const company: PrintProfileConfig = {
		companyLabel: '미리캔버스',
		roleLine: 'Frontend Developer · 7년차',
		resumeAbout:
			'React·TypeScript를 중심으로 복잡한 입력과 단계형 상태, 인터랙션을 설계해 온 7년차 프론트엔드 개발자입니다. 사용자 흐름을 먼저 이해하고 변경하기 쉬운 코드로 구현하며, 판단의 배경과 UI 규칙을 문서화해 팀원이 같은 기준으로 개선을 이어갈 수 있게 만드는 것을 중요하게 생각합니다.',
		portfolioAbout:
			'아래 세 사례는 단계형 시뮬레이터의 상태·애니메이션 설계, 모바일 렌즈 계산기의 입력·보안·반응형 대응, 60개 이상 레거시 화면의 React 전환을 다룹니다. 구현뿐 아니라 실패에서 얻은 구조적 판단과 운영 결과까지 함께 정리했습니다.',
		strengths: [
			{
				tag: 'ANIMATION · INTERACTION',
				title: '애니메이션 & 인터랙션 구현',
				description:
					'Framer Motion으로 상담 흐름을 시각화하고 메시지별 stepNumber로 모달 재진입 시 애니메이션이 반복되는 문제를 해결했습니다.'
			},
			{
				tag: 'COMPONENT · STATE',
				title: 'UI 컴포넌트 & 상태 설계',
				description:
					'Context·Funnel을 Zustand로 전환해 새로고침 상태를 유지하고, ComboBox 유효성 검사로 입력 400 오류를 제거했습니다.'
			}
		],
		featuredProjectIds: ['lens-simulator', 'smartfitting', 'acuvue-renewal']
	};
</script>

<PrintShell {company} />
