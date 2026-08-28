'use client';

import { useActionState } from 'react';
import { login, type LoginState } from './actions';

const INITIAL: LoginState = {};

export function LoginForm({ next }: { next: string }) {
	const [state, formAction, pending] = useActionState(login, INITIAL);

	return (
		<form action={formAction}>
			<input type="hidden" name="next" value={next} />
			<label htmlFor="owner-password">비밀번호</label>
			<div className="password-row">
				<input
					id="owner-password"
					name="password"
					type="password"
					autoComplete="current-password"
					maxLength={256}
					required
				/>
				<button type="submit" disabled={pending}>
					{pending ? '확인 중' : '문서 열기'}
				</button>
			</div>
			{state.message && (
				<p className="form-error" role="alert">
					{state.message}
				</p>
			)}
		</form>
	);
}
