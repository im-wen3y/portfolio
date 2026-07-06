import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrintTheme } from './print-theme.svelte.ts';

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

describe('PrintTheme', () => {
	it('저장된 값이 없으면 light를 유지한다', () => {
		const theme = new PrintTheme();
		theme.hydrate();
		expect(theme.value).toBe('light');
	});

	it('localStorage에 저장된 값으로 복원한다', () => {
		localStorage.setItem('resume-print-theme', 'dark');
		const theme = new PrintTheme();
		theme.hydrate();
		expect(theme.value).toBe('dark');
	});

	it('유효하지 않은 저장값은 무시하고 기본값을 유지한다', () => {
		localStorage.setItem('resume-print-theme', 'blue');
		const theme = new PrintTheme();
		theme.hydrate();
		expect(theme.value).toBe('light');
	});

	it('toggle은 light/dark를 번갈아 바꾸고 localStorage에 저장한다', () => {
		const theme = new PrintTheme();

		theme.toggle();
		expect(theme.value).toBe('dark');
		expect(localStorage.getItem('resume-print-theme')).toBe('dark');

		theme.toggle();
		expect(theme.value).toBe('light');
		expect(localStorage.getItem('resume-print-theme')).toBe('light');
	});
});
