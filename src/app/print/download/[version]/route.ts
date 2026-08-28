import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { hasOwnerSession } from '@/lib/owner-session';

// PDF는 public/ 이 아니라 src/server-assets/ 에 둔다 — 공개 URL이 되면 소유자 인증이 무의미해진다.
// 서버 번들에 포함시키는 설정은 next.config.ts 의 outputFileTracingIncludes 에 있다.
const VERSIONS: Record<string, string> = {
	detailed: 'resume-detailed.pdf',
	compact: 'resume-compact.pdf'
};

export async function GET(_request: Request, { params }: { params: Promise<{ version: string }> }) {
	// proxy가 /print/* 를 막고 있지만, 파일 전송이라 여기서도 확인한다
	if (!(await hasOwnerSession())) {
		return new Response('소유자만 내려받을 수 있습니다.', { status: 403 });
	}

	const { version } = await params;
	const filename = VERSIONS[version];
	if (!filename) {
		return new Response('없는 이력서 버전입니다.', { status: 404 });
	}

	const body = await readFile(path.join(process.cwd(), 'src/server-assets', filename));
	return new Response(new Uint8Array(body), {
		headers: {
			'content-type': 'application/pdf',
			'content-disposition': `attachment; filename="resume-${version}.pdf"`,
			'cache-control': 'private, no-store'
		}
	});
}
