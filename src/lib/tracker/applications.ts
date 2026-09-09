import 'server-only';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { isApplicationStatus, type ApplicationStatus, type JobApplication } from './status';

type JobApplicationRow = {
	id: string;
	company: string;
	position: string | null;
	company_grade: string | null;
	match_grade: string | null;
	status: string;
	applied_on: string | null;
	resulted_on: string | null;
	note: string | null;
	sort_order: number;
};

function toApplication(row: JobApplicationRow): JobApplication {
	return {
		id: row.id,
		company: row.company,
		position: row.position,
		companyGrade: row.company_grade,
		matchGrade: row.match_grade,
		// DB는 자유 문자열이라 화면에서 쓰는 목록에 없으면 '미지원'으로 떨어뜨린다
		status: isApplicationStatus(row.status) ? row.status : '미지원',
		appliedOn: row.applied_on,
		resultedOn: row.resulted_on,
		note: row.note,
		sortOrder: row.sort_order
	};
}

export async function getApplications(): Promise<JobApplication[]> {
	const { data, error } = await supabaseAdmin
		.from('job_applications')
		.select('*')
		.order('sort_order', { ascending: true })
		.order('created_at', { ascending: true });

	if (error) throw new Error(`지원 현황을 조회하지 못했습니다: ${error.message}`);

	return (data as JobApplicationRow[]).map(toApplication);
}

/** 지원한 것으로 세는 상태 — 통계의 분모가 된다 */
const APPLIED_STATUSES: ApplicationStatus[] = ['지원 완료', '결과 대기', '서류 탈락', '합격'];

export type ApplicationStats = {
	total: number;
	applied: number;
	waiting: number;
	rejected: number;
	passed: number;
	passRate: number;
};

export function summarize(applications: JobApplication[]): ApplicationStats {
	const count = (predicate: (item: JobApplication) => boolean) =>
		applications.filter(predicate).length;

	const applied = count((item) => APPLIED_STATUSES.includes(item.status));
	const passed = count((item) => item.status === '합격');

	return {
		total: applications.length,
		applied,
		waiting: count((item) => item.status === '결과 대기'),
		rejected: count((item) => item.status === '서류 탈락'),
		passed,
		passRate: applied === 0 ? 0 : Math.round((passed / applied) * 100)
	};
}
