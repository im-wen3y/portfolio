'use client';

import { useTransition } from 'react';
import { APPLICATION_STATUSES, type ApplicationStatus } from '@/lib/tracker/status';
import { updateStatus } from './actions';

// 저장 버튼 없이 고르는 즉시 반영한다. 전송 중에는 잠가서 중복 요청을 막는다.
export function StatusSelect({ id, status }: { id: string; status: ApplicationStatus }) {
	const [pending, startTransition] = useTransition();

	return (
		<select
			className="tracker-status-select"
			defaultValue={status}
			disabled={pending}
			aria-label="지원상태"
			onChange={(event) => {
				const next = event.target.value;
				startTransition(async () => {
					await updateStatus(id, next);
				});
			}}
		>
			{APPLICATION_STATUSES.map((option) => (
				<option value={option} key={option}>
					{option}
				</option>
			))}
		</select>
	);
}
