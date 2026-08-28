import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';

// 코드 품질 기준은 .claude/skills/code-quality/SKILL.md 를 따른다.
// 기계로 검증 가능한 항목만 여기서 규칙화한다.
export default ts.config(
	{ ignores: ['.next/**', 'out/**', 'next-env.d.ts'] },
	js.configs.recommended,
	ts.configs.recommended,
	{
		files: ['src/**/*.{ts,tsx}', 'scripts/**/*.mjs'],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			'no-undef': 'off',
			// 가독성 — 한 번에 들고 있어야 하는 맥락을 줄인다
			'no-nested-ternary': 'error',
			complexity: ['error', 10],
			'max-depth': ['error', 3],
			'max-params': ['error', 3],
			yoda: 'error',
			// 예측 가능성 — 스코프 간 이름 가림 금지
			'@typescript-eslint/no-shadow': 'error'
		}
	}
);
