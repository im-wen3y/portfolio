'use client';

import { overlay } from 'overlay-kit';
import { useEffect, useRef, useState } from 'react';
import { addApplication } from './actions';

// 포커스 가둠·ESC 닫기·백드롭은 <dialog>가 이미 해준다. overlay-kit은 여는 시점과
// 언마운트만 관리하므로 둘을 겹쳐 쓰지 않는다.
function AddApplicationDialog({ isOpen, close }: { isOpen: boolean; close: () => void }) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (isOpen && !dialog.open) dialog.showModal();
		if (!isOpen && dialog.open) dialog.close();
	}, [isOpen]);

	async function submit(formData: FormData) {
		try {
			await addApplication(formData);
			close();
		} catch {
			setMessage('추가하지 못했습니다. 입력값을 확인해 주세요.');
		}
	}

	return (
		<dialog className="tracker-dialog" ref={dialogRef} onClose={close} aria-labelledby="add-title">
			<h2 id="add-title">지원 정보 등록</h2>
			<form action={submit} className="tracker-add-form">
				<label>
					<span className="tracker-field-label">기업명</span>
					<input type="text" name="company" required maxLength={100} autoFocus />
				</label>
				<label>
					<span className="tracker-field-label">직무·공고</span>
					<input type="text" name="position" maxLength={200} />
				</label>
				<label>
					<span className="tracker-field-label">지원일</span>
					<input type="date" name="appliedOn" />
				</label>
				<label>
					<span className="tracker-field-label">비고</span>
					<textarea name="note" rows={3} />
				</label>
				{message && <p className="tracker-dialog-error">{message}</p>}
				<div className="tracker-dialog-actions">
					<button type="button" className="tracker-cancel" onClick={close}>
						취소
					</button>
					<button type="submit" className="tracker-add">
						추가
					</button>
				</div>
			</form>
		</dialog>
	);
}

export function AddApplicationButton() {
	function openDialog() {
		overlay.open(({ isOpen, close, unmount }) => (
			<AddApplicationDialog
				isOpen={isOpen}
				close={() => {
					close();
					unmount();
				}}
			/>
		));
	}

	return (
		<button type="button" className="tracker-add" onClick={openDialog}>
			지원 정보 등록
		</button>
	);
}
