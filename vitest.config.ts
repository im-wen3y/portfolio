import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
	resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
	test: {
		expect: { requireAssertions: true },
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		// SvelteKit 잔여 스펙 — 4단계에서 owner-auth 를 이식하며 되살리고, 5단계에서 원본을 지운다
		exclude: ['src/lib/stores/**', 'src/lib/server/**']
	}
});
