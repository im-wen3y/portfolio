import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

// 프레임워크에 의존하지 않는 순수 토큰 로직. 쿠키를 다루는 쪽은 owner-session.ts.
export const OWNER_SESSION_COOKIE = 'owner_session';
export const OWNER_SESSION_DURATION_SECONDS = 60 * 60 * 8;
const DEV_SESSION_SECRET = 'local-owner-session';

export function isDev(): boolean {
	return process.env.NODE_ENV !== 'production';
}

export function ownerSessionSecret(): string | undefined {
	return process.env.OWNER_SESSION_SECRET || (isDev() ? DEV_SESSION_SECRET : undefined);
}

function digest(value: string): Buffer {
	return createHash('sha256').update(value, 'utf8').digest();
}

export function secretsMatch(candidate: string, expected: string): boolean {
	return timingSafeEqual(digest(candidate), digest(expected));
}

function sign(expiresAt: string, secret: string): string {
	return createHmac('sha256', secret).update(expiresAt, 'utf8').digest('base64url');
}

export function createSessionToken(secret: string, now = Date.now()): string {
	const expiresAt = Math.floor(now / 1000) + OWNER_SESSION_DURATION_SECONDS;
	const encodedExpiry = expiresAt.toString(36);
	return `${encodedExpiry}.${sign(encodedExpiry, secret)}`;
}

export function verifySessionToken(token: string, secret: string, now = Date.now()): boolean {
	const [encodedExpiry, signature, extra] = token.split('.');
	if (!encodedExpiry || !signature || extra) return false;

	const expiresAt = Number.parseInt(encodedExpiry, 36);
	if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(now / 1000)) return false;

	return secretsMatch(signature, sign(encodedExpiry, secret));
}

export function isOwnerAuthConfigured(): boolean {
	return isDev() || Boolean(process.env.OWNER_PASSWORD && process.env.OWNER_SESSION_SECRET);
}

export function verifyOwnerPassword(candidate: string): boolean {
	return (
		isDev() ||
		Boolean(process.env.OWNER_PASSWORD && secretsMatch(candidate, process.env.OWNER_PASSWORD))
	);
}

/** 쿠키에서 꺼낸 토큰 문자열만 받는다 — proxy(NextRequest)와 서버 액션(next/headers)이 함께 쓴다. */
export function hasOwnerSessionToken(token: string | undefined): boolean {
	const secret = ownerSessionSecret();
	return Boolean(token && secret && verifySessionToken(token, secret));
}

/** 로그인 후 돌아갈 경로. 외부 도메인으로 튕기지 않도록 내부 절대경로만 허용한다. */
export function safeDestination(value: string | null | undefined): string {
	return value?.startsWith('/') && !value.startsWith('//') && !value.includes('\\')
		? value
		: '/print';
}
