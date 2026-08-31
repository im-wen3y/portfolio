import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_PRINT_THEME, nextPrintTheme, readPrintTheme, savePrintTheme } from './print-theme';

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

describe('print theme', () => {
	it('저장된 값이 없으면 light를 유지한다', () => {
		expect(readPrintTheme()).toBe('light');
	});

	it('localStorage에 저장된 값으로 복원한다', () => {
		localStorage.setItem('resume-print-theme', 'dark');
		expect(readPrintTheme()).toBe('dark');
	});

	it('유효하지 않은 저장값은 무시하고 기본값을 유지한다', () => {
		localStorage.setItem('resume-print-theme', 'blue');
		expect(readPrintTheme()).toBe(DEFAULT_PRINT_THEME);
	});

	it('토글은 light/dark를 번갈아 바꾸고 저장한다', () => {
		let theme = nextPrintTheme('light');
		savePrintTheme(theme);
		expect(theme).toBe('dark');
		expect(localStorage.getItem('resume-print-theme')).toBe('dark');

		theme = nextPrintTheme(theme);
		savePrintTheme(theme);
		expect(theme).toBe('light');
		expect(localStorage.getItem('resume-print-theme')).toBe('light');
	});
});
