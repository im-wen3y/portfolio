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
	it('저장된 값이 없으면 terracotta를 유지한다', () => {
		const theme = new AccentThemeStore();
		theme.hydrate();
		expect(theme.value).toBe('terracotta');
	});

	it('localStorage에 저장된 유효한 값으로 복원한다', () => {
		localStorage.setItem('resume-print-accent', 'toss');
		const theme = new AccentThemeStore();
		theme.hydrate();
		expect(theme.value).toBe('toss');
	});

	it('유효하지 않은 저장값은 무시하고 기본값을 유지한다', () => {
		localStorage.setItem('resume-print-accent', 'chartreuse');
		const theme = new AccentThemeStore();
		theme.hydrate();
		expect(theme.value).toBe('terracotta');
	});

	it('구버전 값(default/miricanvas/navy)을 새 값으로 마이그레이션한다', () => {
		localStorage.setItem('resume-print-accent', 'default');
		const legacyDefault = new AccentThemeStore();
		legacyDefault.hydrate();
		expect(legacyDefault.value).toBe('terracotta');

		localStorage.setItem('resume-print-accent', 'miricanvas');
		const legacyMiricanvas = new AccentThemeStore();
		legacyMiricanvas.hydrate();
		expect(legacyMiricanvas.value).toBe('teal');

		localStorage.setItem('resume-print-accent', 'navy');
		const legacyNavy = new AccentThemeStore();
		legacyNavy.hydrate();
		expect(legacyNavy.value).toBe('toss');
	});

	it('set은 값을 바꾸고 localStorage에 저장한다', () => {
		const theme = new AccentThemeStore();

		theme.set('aubergine');
		expect(theme.value).toBe('aubergine');
		expect(localStorage.getItem('resume-print-accent')).toBe('aubergine');

		theme.set('forest');
		expect(theme.value).toBe('forest');
		expect(localStorage.getItem('resume-print-accent')).toBe('forest');
	});
});
