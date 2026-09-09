// 서버·클라이언트가 함께 쓰는 순수 상수와 타입. 여기에 server-only 의존을 두지 않는다
// (클라이언트 컴포넌트가 상태 목록을 쓰려면 Supabase 클라이언트까지 번들에 끌려온다).

/** 현재 상태. 통계와 필터가 이 목록을 기준으로 계산된다 */
export const APPLICATION_STATUSES = [
	'미지원',
	'지원 보류',
	'지원 완료',
	'결과 대기',
	'서류 탈락',
	'합격'
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export type JobApplication = {
	id: string;
	company: string;
	position: string | null;
	companyGrade: string | null;
	matchGrade: string | null;
	status: ApplicationStatus;
	appliedOn: string | null;
	resultedOn: string | null;
	note: string | null;
	sortOrder: number;
};

export function isApplicationStatus(value: unknown): value is ApplicationStatus {
	return APPLICATION_STATUSES.some((status) => status === value);
}
