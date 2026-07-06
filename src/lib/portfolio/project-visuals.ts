import type { PixelFrame, PixelPalette } from './pixel-pet';

export type DiagramVisual = { kind: 'diagram'; nodes: string[] };
export type CodeVisual = { kind: 'code'; filename: string; lines: string[] };
export type TerminalVisual = { kind: 'terminal'; lines: string[] };
export type SpriteVisual = {
	kind: 'sprite';
	frame: PixelFrame;
	palette: PixelPalette;
	caption: string;
};

export type ProjectVisual = DiagramVisual | CodeVisual | TerminalVisual | SpriteVisual;

const GLASSES_FRAME: PixelFrame = [
	'..........',
	'.OOO..OOO.',
	'O...OO...O',
	'O...OO...O',
	'.OOO..OOO.',
	'..........'
];
const GLASSES_PALETTE: PixelPalette = { O: '#21f1a8' };

// Every visual below is a paraphrase of the real project data (stack, summary, bullets) —
// no screenshots exist for these internal/confidential projects, so each project gets an
// honest, abstracted representation of what it actually did instead of a fabricated stat.
export const projectVisuals: Record<string, ProjectVisual> = {
	'acuvue-lead': {
		kind: 'diagram',
		nodes: ['기획·디자인·개발팀', '요구사항 정의·우선순위 조율', '전사 서비스 개발·운영']
	},
	'promotion-event': {
		kind: 'code',
		filename: 'tracking.ts',
		lines: [
			"track('coupon_issue', {",
			"  channel: 'GA' | 'Meta' | 'Kakao',",
			'});',
			'issueCoupon(userId, campaignId);'
		]
	},
	'max-discount': {
		kind: 'code',
		filename: 'max-benefit.ts',
		lines: [
			'class MaxBenefitPrice {',
			'  constructor(scan, coupon, payment) {}',
			'  calculate() {',
			'    // 기존 로직과 독립적으로 모듈화',
			'  }',
			'}'
		]
	},
	'lens-simulator': {
		kind: 'sprite',
		frame: GLASSES_FRAME,
		palette: GLASSES_PALETTE,
		caption: 'SIMULATOR.exe'
	},
	'sales-mobile': {
		kind: 'diagram',
		nodes: ['PC 전용 내부 시스템', 'React 리팩터링', '모바일 친화적 UI']
	},
	'shopl-dashboard': {
		kind: 'terminal',
		lines: [
			'$ connect payment-api --provider=iamport,stripe',
			'✓ linked',
			'$ migrate maps --to=naver,google',
			'✓ clustered by 근무지/직원'
		]
	},
	'legacy-react': {
		kind: 'terminal',
		lines: [
			'$ convert jsp/* --to=react',
			'✓ 재사용 가능한 컴포넌트로 설계',
			'$ deploy --target=aws-s3 --pipeline=aws-pipeline',
			'✓ JSP + React 동시 운영 확인'
		]
	},
	'chat-v2': {
		kind: 'terminal',
		lines: [
			'$ migrate chat --from=electron+uikit@2.0 \\',
			'    --to=vite+uikit@3.0',
			'> progress: 90%',
			'> team: 2'
		]
	}
};
