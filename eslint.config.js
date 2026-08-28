import prettier from 'eslint-config-prettier';
import path from 'node:path';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},
	{
		// 코드 품질 기준(가독성·예측 가능성·응집도·결합도) 중 기계로 검증 가능한 항목만 규칙화한다.
		// 판단이 필요한 나머지 기준은 .claude/skills/code-quality/SKILL.md 를 따른다.
		rules: {
			// 가독성 — 읽으면서 동시에 들고 있어야 하는 맥락을 줄인다
			'no-nested-ternary': 'error',
			complexity: ['error', 10],
			'max-depth': ['error', 3],
			'max-params': ['error', 3],
			// 가독성 — 비교식은 주체를 왼쪽에 둔다 (price > MAX_PRICE)
			yoda: 'error',
			// 예측 가능성 — 같은 이름이 스코프마다 다른 값을 가리키지 않게 한다
			'@typescript-eslint/no-shadow': 'error'
		}
	}
);
