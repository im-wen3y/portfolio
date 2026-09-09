import type { PrintSharedResumeData, PrintTargetResume } from '@/data/print-profile';
import type { TargetWork } from './resume-parts';

/** 경력기술서에 실린 경험 · 지원용 이력서 전용 경험 순으로 찾는다 */
function findWork(workId: string, shared: PrintSharedResumeData): TargetWork | null {
	for (const experience of shared.compactExperiences) {
		const work = experience.works.find((item) => item.id === workId);
		if (work) return { experience, work };
	}

	const targetOnly = shared.targetOnlyWorks.find((item) => item.work.id === workId);
	const owner = shared.compactExperiences.find((item) => item.company === targetOnly?.company);
	if (targetOnly && owner) return { experience: owner, work: targetOnly.work };

	return null;
}

/** workIds 순서대로 해당 프로젝트를 찾아, workText가 있으면 덮어쓴다 */
export function getTargetWorks(
	profile: PrintTargetResume,
	shared: PrintSharedResumeData
): TargetWork[] {
	return profile.workIds.flatMap((workId) => {
		const found = findWork(workId, shared);
		if (!found) return [];
		return [{ ...found, work: { ...found.work, ...profile.workText?.[workId] } }];
	});
}

/** 지원용 경력기술서는 회사별로 묶어 싣는다. 회사 순서는 shared의 경력 순서(최신순)를 따른다 */
export function groupTargetWorksByCompany(works: TargetWork[]) {
	const groups: { experience: TargetWork['experience']; works: TargetWork['work'][] }[] = [];

	for (const { experience, work } of works) {
		const group = groups.find((item) => item.experience.company === experience.company);
		if (group) group.works.push(work);
		else groups.push({ experience, works: [work] });
	}

	return groups;
}
