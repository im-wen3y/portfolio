// 인쇄 화면의 라이트/다크 저장 로직. React 밖에서 테스트할 수 있도록 순수 함수로 둔다.
export const PRINT_THEME_STORAGE_KEY = 'resume-print-theme';

export type PrintThemeValue = 'light' | 'dark';

export const DEFAULT_PRINT_THEME: PrintThemeValue = 'light';

function isPrintTheme(value: string | null): value is PrintThemeValue {
	return value === 'light' || value === 'dark';
}

/** 저장된 값을 읽는다. 없거나 유효하지 않으면 기본값. */
export function readPrintTheme(): PrintThemeValue {
	const saved = localStorage.getItem(PRINT_THEME_STORAGE_KEY);
	return isPrintTheme(saved) ? saved : DEFAULT_PRINT_THEME;
}

export function savePrintTheme(value: PrintThemeValue): void {
	localStorage.setItem(PRINT_THEME_STORAGE_KEY, value);
}

export function nextPrintTheme(value: PrintThemeValue): PrintThemeValue {
	return value === 'dark' ? 'light' : 'dark';
}
