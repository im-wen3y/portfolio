// /print 화면을 그대로 A4 PDF로 굽는다. 개발 서버가 떠 있어야 한다.
//   터미널 1: pnpm dev
//   터미널 2: pnpm pdf
// 결과물은 static/이 아니라 src/lib/server/에 둔다 — 공개 URL이 되면 소유자 인증이 무의미해진다.
// ponytail: 로컬 Chrome을 그대로 쓴다(playwright-core). 브라우저 별도 설치 없음.
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASE_URL = process.env.PDF_BASE_URL ?? 'http://localhost:5173';
const OUT_DIR = 'src/lib/server/pdf';

const TARGETS = [
	{ radio: /기존 상세/, out: `${OUT_DIR}/resume-detailed.pdf` },
	{ radio: /페이지 맞춤/, out: `${OUT_DIR}/resume-compact.pdf` }
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();

try {
	// /print는 소유자 전용이라 먼저 로그인한다
	await page.goto(`${BASE_URL}/print`, { waitUntil: 'networkidle' });
	if (new URL(page.url()).pathname === '/owner') {
		const password = process.env.OWNER_PASSWORD;
		if (!password) {
			throw new Error('OWNER_PASSWORD가 없습니다. pnpm pdf는 .env.local을 읽습니다.');
		}
		await page.fill('#owner-password', password);
		await page.click('button[type="submit"]');
		await page.waitForURL('**/print');
	}
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => document.fonts.ready);

	for (const target of TARGETS) {
		await page.getByRole('radio', { name: target.radio }).click();
		// page.pdf()는 print 미디어로 렌더하므로 컨트롤바는 자동으로 빠진다
		await page.pdf({
			path: target.out,
			printBackground: true,
			preferCSSPageSize: true
		});
		console.log(`rendered ${target.out}`);
	}
} finally {
	await browser.close();
}
