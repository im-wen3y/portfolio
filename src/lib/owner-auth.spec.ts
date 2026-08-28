import { describe, expect, it } from 'vitest';
import {
	createSessionToken,
	OWNER_SESSION_DURATION_SECONDS,
	secretsMatch,
	verifySessionToken
} from './owner-auth';

describe('owner auth', () => {
	it('비밀값을 일정 시간 비교한다', () => {
		expect(secretsMatch('correct horse battery staple', 'correct horse battery staple')).toBe(true);
		expect(secretsMatch('wrong', 'correct horse battery staple')).toBe(false);
	});

	it('유효한 서명 토큰을 검증한다', () => {
		const now = Date.UTC(2026, 6, 13);
		const token = createSessionToken('session-secret', now);

		expect(verifySessionToken(token, 'session-secret', now)).toBe(true);
		expect(verifySessionToken(token, 'different-secret', now)).toBe(false);
	});

	it('변조되거나 만료된 토큰을 거부한다', () => {
		const now = Date.UTC(2026, 6, 13);
		const token = createSessionToken('session-secret', now);
		const expiredAt = now + (OWNER_SESSION_DURATION_SECONDS + 1) * 1000;

		expect(verifySessionToken(`${token}tampered`, 'session-secret', now)).toBe(false);
		expect(verifySessionToken(token, 'session-secret', expiredAt)).toBe(false);
	});
});
