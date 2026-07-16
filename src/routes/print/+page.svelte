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
		featuredProjectIds: ['acuvue-renewal', 'smartfitting', 'shopl-dashboard']
	};
</script>

<PrintShell {company} />
