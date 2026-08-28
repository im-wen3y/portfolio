'use server';

import { redirect } from 'next/navigation';
import { isOwnerAuthConfigured, safeDestination, verifyOwnerPassword } from '@/lib/owner-auth';
import { setOwnerSession } from '@/lib/owner-session';

const MAX_PASSWORD_LENGTH = 256;

export type LoginState = { message?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
	if (!isOwnerAuthConfigured()) {
		return { message: '소유자 인증 설정을 확인해 주세요.' };
	}

	const password = formData.get('password');
	if (
		typeof password !== 'string' ||
		password.length === 0 ||
		password.length > MAX_PASSWORD_LENGTH
	) {
		return { message: '비밀번호를 입력해 주세요.' };
	}

	if (!verifyOwnerPassword(password)) {
		return { message: '비밀번호를 확인해 주세요.' };
	}

	await setOwnerSession();
	redirect(safeDestination(formData.get('next') as string | null));
}
