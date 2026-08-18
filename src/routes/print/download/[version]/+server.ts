import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// ?inline로 번들에 base64로 심는다 — static/에 두면 공개 URL이 되어 소유자 인증을 우회한다
import compactPdf from '$lib/server/pdf/resume-compact.pdf?inline';
import detailedPdf from '$lib/server/pdf/resume-detailed.pdf?inline';

const PDFS: Record<string, string> = {
	detailed: detailedPdf,
	compact: compactPdf
};

export const GET: RequestHandler = ({ params, locals }) => {
	// hooks.server.ts가 /print/* 를 막고 있지만, 파일 전송이라 여기서도 확인한다
	if (!locals.isOwner) {
		error(403, '소유자만 내려받을 수 있습니다.');
	}

	const dataUri = PDFS[params.version];
	if (!dataUri) {
		error(404, '없는 이력서 버전입니다.');
	}

	const body = Buffer.from(dataUri.slice(dataUri.indexOf(',') + 1), 'base64');
	return new Response(body, {
		headers: {
			'content-type': 'application/pdf',
			'content-disposition': `attachment; filename="resume-${params.version}.pdf"`,
			'cache-control': 'private, no-store'
		}
	});
};
