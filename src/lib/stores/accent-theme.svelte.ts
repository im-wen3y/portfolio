const ACCENT_STORAGE_KEY = 'resume-print-accent';

const ACCENTS = [
	'wanted-blue',
	'wanted-orange',
	'wanted-pink',
	'wanted-sky-blue',
	'wanted-violet'
] as const;
type Accent = (typeof ACCENTS)[number];

export const ACCENT_OPTIONS: { value: Accent; label: string; dot: string }[] = [
	{ value: 'wanted-blue', label: '뮤트 블루', dot: '#0650C0' },
	{ value: 'wanted-orange', label: '뮤트 오렌지', dot: '#BD4908' },
	{ value: 'wanted-pink', label: '뮤트 핑크', dot: '#BD6DC0' },
	{ value: 'wanted-sky-blue', label: '뮤트 스카이 블루', dot: '#0684C0' },
	{ value: 'wanted-violet', label: '뮤트 바이올렛', dot: '#644FC0' }
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
