<script lang="ts">
	import PrintShell from '$lib/components/print/PrintShell.svelte';
	import type { PrintProfileConfig } from '$lib/components/print/print-profile';

	const company: PrintProfileConfig = {
		companyLabel: '미리캔버스 시니어',
		roleLine: 'Frontend Developer · 파트 리더 · 7년차',
		resumeAbout:
			'레거시의 운영 맥락을 분석해 서비스가 멈추지 않는 전환 계획을 만들고, 팀이 함께 유지할 수 있는 구조와 규칙으로 남기는 7년차 프론트엔드 파트 리더입니다. 팀원의 성장을 고려해 결정 배경을 공유하고, 기획·디자인·서버팀과 사용자 흐름을 구체적으로 조율합니다.',
		portfolioAbout:
			'JSP·React 동시 운영을 설득해 시작한 경험에서 60개 이상의 화면 전환을 리드하는 역할까지 확장했습니다. 아래 사례는 전환 범위와 배포 개선, 이해관계자 설득, 대용량 지도 장애 대응처럼 시니어 개발자에게 필요한 판단과 실행을 보여줍니다.',
		strengths: [
			{
				tag: 'INCREMENTAL MIGRATION',
				title: '점진적 레거시 마이그레이션 리드',
				description:
					'JSP·React를 약 1년간 동시 운영한 경험과 15,000줄 제품판매 JavaScript를 기능 단위 React 구조로 전환한 경험이 있습니다.'
			},
			{
				tag: 'LEADERSHIP · PRODUCTIVITY',
				title: '기술 리더십 & 팀 생산성',
				description:
					'FE 3명의 업무를 배분하고 기획·디자인·서버팀과 역할별 라우팅, 결제, 배너·정적 리소스의 공통 기준을 만들었습니다.'
			}
		],
		featuredProjectIds: ['acuvue-renewal', 'legacy-react', 'shopl-dashboard']
	};
</script>

<PrintShell {company} />
