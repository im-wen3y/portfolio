'use client';

import { useEffect, useState } from 'react';
import {
	DEFAULT_PRINT_THEME,
	nextPrintTheme,
	readPrintTheme,
	savePrintTheme,
	type PrintThemeValue
} from './print-theme';

export function usePrintTheme() {
	// 서버 렌더 결과와 맞추려고 기본값으로 시작하고, 저장값은 마운트 후에 읽는다
	const [theme, setTheme] = useState<PrintThemeValue>(DEFAULT_PRINT_THEME);

	useEffect(() => {
		setTheme(readPrintTheme());
	}, []);

	function toggle() {
		setTheme((current) => {
			const next = nextPrintTheme(current);
			savePrintTheme(next);
			return next;
		});
	}

	return { theme, isDark: theme === 'dark', toggle };
}
