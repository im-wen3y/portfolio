'use server';

import { revalidatePath } from 'next/cache';
import { hasOwnerSession } from '@/lib/owner-session';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { isApplicationStatus } from '@/lib/tracker/status';

const MAX_TEXT_LENGTH = 500;

// proxy가 /tracker 를 막지만 서버 액션도 스스로 세션을 확인한다.
// 액션은 라우트와 별개 진입점이라 인증을 프록시 한 곳에만 두지 않는다.
async function assertOwner() {
	if (!(await hasOwnerSession())) throw new Error('권한이 없습니다.');
}

function text(formData: FormData, key: string): string | null {
	const value = formData.get(key);
	if (typeof value !== 'string') return null;
	const trimmed = value.trim().slice(0, MAX_TEXT_LENGTH);
	return trimmed.length > 0 ? trimmed : null;
}

export async function addApplication(formData: FormData): Promise<void> {
	await assertOwner();

	const company = text(formData, 'company');
	if (!company) throw new Error('기업명을 입력해 주세요.');

	const status = formData.get('status');
	const { error } = await supabaseAdmin.from('job_applications').insert({
		company,
		position: text(formData, 'position'),
		company_grade: text(formData, 'companyGrade'),
		match_grade: text(formData, 'matchGrade'),
		status: isApplicationStatus(status) ? status : '미지원',
		applied_on: text(formData, 'appliedOn'),
		note: text(formData, 'note')
	});

	if (error) throw new Error(`추가하지 못했습니다: ${error.message}`);
	revalidatePath('/tracker');
}

/** 표에서 바꿀 수 있는 값은 지원상태 하나뿐이다 */
export async function updateStatus(id: string, status: string): Promise<void> {
	await assertOwner();

	if (!isApplicationStatus(status)) throw new Error('상태 값이 올바르지 않습니다.');
	if (!id) throw new Error('id가 없습니다.');

	const { error } = await supabaseAdmin.from('job_applications').update({ status }).eq('id', id);

	if (error) throw new Error(`저장하지 못했습니다: ${error.message}`);
	revalidatePath('/tracker');
}
