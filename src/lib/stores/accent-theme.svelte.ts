const ACCENT_STORAGE_KEY = 'resume-print-accent';

const ACCENTS = ['terracotta', 'teal', 'toss', 'baemin', 'aubergine', 'forest'] as const;
type Accent = (typeof ACCENTS)[number];

export const ACCENT_OPTIONS: { value: Accent; label: string; dot: string }[] = [
	{ value: 'terracotta', label: '테라코타', dot: '#cc785c' },
	{ value: 'teal', label: '딥 틸', dot: '#0f766e' },
	{ value: 'toss', label: '토스 블루', dot: '#0064FF' },
	{ value: 'baemin', label: '배민 민트', dot: '#2AC1BC' },
	{ value: 'aubergine', label: '오베르진', dot: '#6e2a5b' },
	{ value: 'forest', label: '포레스트', dot: '#2f6b4f' }
];

function isAccent(value: string): value is Accent {
	return (ACCENTS as readonly string[]).includes(value);
}

export class AccentThemeStore {
	value = $state<Accent>('terracotta');

	hydrate() {
		const saved = localStorage.getItem(ACCENT_STORAGE_KEY);
		if (!saved) return;
		// 구버전 값(default/miricanvas/navy) 마이그레이션
		const migrated =
			saved === 'default'
				? 'terracotta'
				: saved === 'miricanvas'
					? 'teal'
					: saved === 'navy'
						? 'toss'
						: saved;
		if (isAccent(migrated)) {
			this.value = migrated;
		}
	}

	set(accent: Accent) {
		this.value = accent;
		localStorage.setItem(ACCENT_STORAGE_KEY, accent);
	}
}

export const accentTheme = new AccentThemeStore();
