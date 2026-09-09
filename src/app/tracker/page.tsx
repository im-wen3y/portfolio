import Link from 'next/link';
import { getApplications, summarize } from '@/lib/tracker/applications';
import { type ApplicationStatus, type JobApplication } from '@/lib/tracker/status';
import { AddApplicationButton } from './add-application-dialog';
import { StatusSelect } from './status-select';

export const dynamic = 'force-dynamic';

type FilterKey = 'all' | 'applied' | 'waiting' | 'rejected' | 'passed';

/** 통계 카드가 곧 필터다. key는 쿼리스트링 값으로 쓴다 */
const FILTERS: { key: FilterKey; label: string; statuses: ApplicationStatus[] | null }[] = [
	{ key: 'all', label: '전체 트래킹 기업', statuses: null },
	{ key: 'applied', label: '지원 완료', statuses: ['지원 완료', '결과 대기', '서류 탈락', '합격'] },
	{ key: 'waiting', label: '결과 대기', statuses: ['결과 대기'] },
	{ key: 'rejected', label: '서류 탈락', statuses: ['서류 탈락'] },
	{ key: 'passed', label: '합격', statuses: ['합격'] }
];

function resolveFilter(value: string | string[] | undefined) {
	return FILTERS.find((filter) => filter.key === value) ?? FILTERS[0];
}

/** 상태별 배지 색을 CSS에 넘기는 값 */
function statusTone(status: ApplicationStatus): string {
	if (status === '합격') return 'pass';
	if (status === '서류 탈락') return 'reject';
	if (status === '결과 대기') return 'wait';
	if (status === '지원 완료') return 'done';
	return 'idle';
}

function countFor(
	applications: JobApplication[],
	key: FilterKey,
	stats: ReturnType<typeof summarize>
) {
	if (key === 'applied') return stats.applied;
	if (key === 'waiting') return stats.waiting;
	if (key === 'rejected') return stats.rejected;
	if (key === 'passed') return stats.passed;
	return applications.length;
}

function ApplicationRow({ application, index }: { application: JobApplication; index: number }) {
	return (
		<tr>
			<td className="tracker-num">{index + 1}</td>
			<td>
				<strong>{application.company}</strong>
				{application.companyGrade && (
					<span className="tracker-grade">{application.companyGrade}</span>
				)}
			</td>
			<td className="tracker-position">{application.position ?? '—'}</td>
			<td className="tracker-date">{application.appliedOn ?? '—'}</td>
			<td className="tracker-status-cell" data-tone={statusTone(application.status)}>
				<StatusSelect id={application.id} status={application.status} />
			</td>
			<td className="tracker-note">{application.note ?? '—'}</td>
		</tr>
	);
}

export default async function TrackerPage({
	searchParams
}: {
	searchParams: Promise<{ filter?: string | string[] }>;
}) {
	const [applications, params] = await Promise.all([getApplications(), searchParams]);
	const stats = summarize(applications);
	const activeFilter = resolveFilter(params.filter);
	const rows = applications.filter(
		(application) =>
			activeFilter.statuses === null || activeFilter.statuses.includes(application.status)
	);

	return (
		<>
			<header className="tracker-header">
				<div>
					<h1>이직 지원 트래커</h1>
					<p className="tracker-subtitle">지원 현황 대시보드</p>
				</div>
				<AddApplicationButton />
			</header>

			<nav className="tracker-stats" aria-label="상태 필터">
				{FILTERS.map((filter) => {
					const active = filter.key === activeFilter.key;
					return (
						<Link
							className={active ? 'tracker-stat tracker-stat-active' : 'tracker-stat'}
							href={filter.key === 'all' ? '/tracker' : `/tracker?filter=${filter.key}`}
							aria-current={active ? 'page' : undefined}
							key={filter.key}
						>
							<strong>{countFor(applications, filter.key, stats)}</strong>
							<span>{filter.label}</span>
						</Link>
					);
				})}
				<p className="tracker-stat tracker-stat-plain">
					<strong>{stats.passRate}%</strong>
					<span>합격률</span>
				</p>
			</nav>

			<section className="tracker-group" aria-labelledby="tracker-list">
				<h2 id="tracker-list">
					{activeFilter.label} <span className="tracker-count">{rows.length}</span>
				</h2>
				{rows.length === 0 ? (
					<p className="tracker-empty">해당하는 기업이 없습니다.</p>
				) : (
					<div className="tracker-table-wrap">
						<table className="tracker-table">
							<thead>
								<tr>
									<th scope="col">순번</th>
									<th scope="col">기업명</th>
									<th scope="col">직무·공고</th>
									<th scope="col">지원일</th>
									<th scope="col">지원상태</th>
									<th scope="col">비고</th>
								</tr>
							</thead>
							<tbody>
								{rows.map((application, index) => (
									<ApplicationRow application={application} index={index} key={application.id} />
								))}
							</tbody>
						</table>
					</div>
				)}
			</section>
		</>
	);
}
