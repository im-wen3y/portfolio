import 'server-only';
import { cookies } from 'next/headers';
import {
	createSessionToken,
	hasOwnerSessionToken,
	isDev,
	OWNER_SESSION_COOKIE,
	OWNER_SESSION_DURATION_SECONDS,
	ownerSessionSecret
} from './owner-auth';

export async function hasOwnerSession(): Promise<boolean> {
	const store = await cookies();
	return hasOwnerSessionToken(store.get(OWNER_SESSION_COOKIE)?.value);
}

export async function setOwnerSession(): Promise<void> {
	const secret = ownerSessionSecret();
	if (!secret) throw new Error('Owner authentication is not configured.');

	const store = await cookies();
	store.set(OWNER_SESSION_COOKIE, createSessionToken(secret), {
		path: '/',
		httpOnly: true,
		secure: !isDev(),
		sameSite: 'strict',
		maxAge: OWNER_SESSION_DURATION_SECONDS
	});
}

export async function clearOwnerSession(): Promise<void> {
	const store = await cookies();
	store.delete(OWNER_SESSION_COOKIE);
}
