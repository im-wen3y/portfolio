import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

export const OWNER_SESSION_COOKIE = 'owner_session';
export const OWNER_SESSION_DURATION_SECONDS = 60 * 60 * 8;

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
	return Boolean(env.OWNER_PASSWORD && env.OWNER_SESSION_SECRET);
}

export function verifyOwnerPassword(candidate: string): boolean {
	return Boolean(env.OWNER_PASSWORD && secretsMatch(candidate, env.OWNER_PASSWORD));
}

export function hasOwnerSession(cookies: Cookies): boolean {
	const token = cookies.get(OWNER_SESSION_COOKIE);
	return Boolean(
		token && env.OWNER_SESSION_SECRET && verifySessionToken(token, env.OWNER_SESSION_SECRET)
	);
}

export function setOwnerSession(cookies: Cookies): void {
	if (!env.OWNER_SESSION_SECRET) throw new Error('Owner authentication is not configured.');

	cookies.set(OWNER_SESSION_COOKIE, createSessionToken(env.OWNER_SESSION_SECRET), {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'strict',
		maxAge: OWNER_SESSION_DURATION_SECONDS
	});
}

export function clearOwnerSession(cookies: Cookies): void {
	cookies.delete(OWNER_SESSION_COOKIE, { path: '/' });
}
