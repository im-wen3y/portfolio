import { fail, redirect } from '@sveltejs/kit';
import {
	isOwnerAuthConfigured,
	setOwnerSession,
	verifyOwnerPassword
} from '$lib/server/owner-auth';
import type { Actions, PageServerLoad } from './$types';

function safeDestination(value: string | null): string {
	return value?.startsWith('/') && !value.startsWith('//') && !value.includes('\\')
		? value
		: '/print';
}

export const load: PageServerLoad = ({ locals, url }) => {
	const next = safeDestination(url.searchParams.get('next'));
	if (locals.isOwner) redirect(303, next);
	return { next };
};

export const actions: Actions = {
	default: async ({ cookies, request, url }) => {
		if (!isOwnerAuthConfigured()) {
			return fail(503, { message: '소유자 인증 설정을 확인해 주세요.' });
		}

		const formData = await request.formData();
		const password = formData.get('password');
		if (typeof password !== 'string' || password.length === 0 || password.length > 256) {
			return fail(400, { message: '비밀번호를 입력해 주세요.' });
		}

		if (!verifyOwnerPassword(password)) {
			return fail(400, { message: '비밀번호를 확인해 주세요.' });
		}

		setOwnerSession(cookies);
		redirect(303, safeDestination(url.searchParams.get('next')));
	}
};
