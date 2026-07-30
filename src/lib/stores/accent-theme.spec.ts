import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AccentThemeStore } from './accent-theme.svelte.ts';

function createLocalStorageStub() {
	const store = new Map<string, string>();
	return {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => {
			store.set(key, value);
		},
		removeItem: (key: string) => {
			store.delete(key);
		}
	};
}

beforeEach(() => {
	vi.stubGlobal('localStorage', createLocalStorageStub());
});

describe('AccentThemeStore', () => {
	it('저장된 값이 없으면 원티드 블루를 유지한다', () => {
		const theme = new AccentThemeStore();
		theme.hydrate();
		expect(theme.value).toBe('wanted-blue');
	});

	it('localStorage에 저장된 유효한 값으로 복원한다', () => {
		localStorage.setItem('resume-print-accent', 'wanted-violet');
		const theme = new AccentThemeStore();
		theme.hydrate();
		expect(theme.value).toBe('wanted-violet');
	});

	it('유효하지 않은 저장값은 원티드 블루로 마이그레이션한다', () => {
		localStorage.setItem('resume-print-accent', 'chartreuse');
		const theme = new AccentThemeStore();
		theme.hydrate();
		expect(theme.value).toBe('wanted-blue');
	});

	it('set은 값을 바꾸고 localStorage에 저장한다', () => {
		const theme = new AccentThemeStore();

		theme.set('wanted-orange');
		expect(theme.value).toBe('wanted-orange');
		expect(localStorage.getItem('resume-print-accent')).toBe('wanted-orange');

		theme.set('portfolio-green');
		expect(theme.value).toBe('portfolio-green');
		expect(localStorage.getItem('resume-print-accent')).toBe('portfolio-green');

		theme.set('velog-green');
		expect(theme.value).toBe('velog-green');
		expect(localStorage.getItem('resume-print-accent')).toBe('velog-green');

		theme.set('toss-blue');
		expect(theme.value).toBe('toss-blue');
		expect(localStorage.getItem('resume-print-accent')).toBe('toss-blue');

		theme.set('baemin-mint');
		expect(theme.value).toBe('baemin-mint');
		expect(localStorage.getItem('resume-print-accent')).toBe('baemin-mint');

		theme.set('carrot-orange');
		expect(theme.value).toBe('carrot-orange');
		expect(localStorage.getItem('resume-print-accent')).toBe('carrot-orange');
	});
});
