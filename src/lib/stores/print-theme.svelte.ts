const THEME_STORAGE_KEY = 'resume-print-theme';

export class PrintTheme {
	value = $state<'light' | 'dark'>('light');

	hydrate() {
		const saved = localStorage.getItem(THEME_STORAGE_KEY);
		if (saved === 'light' || saved === 'dark') {
			this.value = saved;
		}
	}

	toggle() {
		this.value = this.value === 'light' ? 'dark' : 'light';
		localStorage.setItem(THEME_STORAGE_KEY, this.value);
	}
}

export const printTheme = new PrintTheme();
