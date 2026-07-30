const ACCENT_STORAGE_KEY = 'resume-print-accent';

const ACCENTS = [
	'wanted-blue',
	'wanted-orange',
	'wanted-pink',
	'wanted-sky-blue',
	'wanted-violet',
	'portfolio-green',
	'velog-green',
	'toss-blue',
	'baemin-mint',
	'carrot-orange'
] as const;
type Accent = (typeof ACCENTS)[number];

export const ACCENT_OPTIONS: { value: Accent; label: string; dot: string }[] = [
	{ value: 'wanted-blue', label: '뮤트 블루', dot: '#0650C0' },
	{ value: 'wanted-orange', label: '뮤트 오렌지', dot: '#BD4908' },
	{ value: 'wanted-pink', label: '뮤트 핑크', dot: '#BD6DC0' },
	{ value: 'wanted-sky-blue', label: '뮤트 스카이 블루', dot: '#0684C0' },
	{ value: 'wanted-violet', label: '뮤트 바이올렛', dot: '#644FC0' },
	{ value: 'portfolio-green', label: '포트폴리오 민트', dot: '#47D7A4' },
	{ value: 'velog-green', label: '벨로그 그린', dot: '#20C997' },
	{ value: 'toss-blue', label: '토스 블루', dot: '#3182F6' },
	{ value: 'baemin-mint', label: '배달의민족 민트', dot: 'rgb(12, 239, 211)' },
	{ value: 'carrot-orange', label: '당근 오렌지', dot: '#FF6F0F' }
];

function isAccent(value: string): value is Accent {
	return (ACCENTS as readonly string[]).includes(value);
}

export class AccentThemeStore {
	value = $state<Accent>('wanted-blue');

	hydrate() {
		const saved = localStorage.getItem(ACCENT_STORAGE_KEY);
		if (!saved) return;
		this.value = isAccent(saved) ? saved : 'wanted-blue';
	}

	set(accent: Accent) {
		this.value = accent;
		localStorage.setItem(ACCENT_STORAGE_KEY, accent);
	}
}

export const accentTheme = new AccentThemeStore();
