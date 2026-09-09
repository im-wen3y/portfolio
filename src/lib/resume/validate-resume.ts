import type {
	PrintCareerData,
	PrintExperience,
	PrintPortfolioData,
	PrintResumeData,
	PrintSharedResumeData,
	PrintTargetResume,
	PrintTargetResumeId,
	PrintWork
} from '@/data/print-profile';

function fail(documentId: string, reason: string): never {
	throw new Error(`이력서 문서(${documentId}) 형식이 올바르지 않습니다: ${reason}`);
}

function isString(value: unknown): value is string {
	return typeof value === 'string';
}

function isStringArray(value: unknown): value is string[] {
	return Array.isArray(value) && value.every(isString);
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function isWork(value: unknown): value is PrintWork {
	if (!isRecord(value)) return false;
	return (
		isString(value.id) &&
		isString(value.title) &&
		isString(value.period) &&
		isString(value.role) &&
		isString(value.scope) &&
		isString(value.problem) &&
		isStringArray(value.process) &&
		isString(value.effect) &&
		isStringArray(value.stack)
	);
}

function isExperience(value: unknown): value is PrintExperience {
	if (!isRecord(value)) return false;
	return (
		isString(value.company) &&
		isString(value.period) &&
		isString(value.duration) &&
		isString(value.role) &&
		isString(value.responsibilities) &&
		isString(value.summary) &&
		Array.isArray(value.works) &&
		value.works.every(isWork)
	);
}

/** `shared` 문서(content jsonb)를 렌더링 전에 검증한다. 구조가 어긋나면 즉시 오류를 던진다 */
export function validateSharedResumeData(
	documentId: string,
	content: unknown
): PrintSharedResumeData {
	if (!isRecord(content)) fail(documentId, '객체가 아닙니다.');

	if (!isString(content.phone)) fail(documentId, 'phone이 없습니다.');
	if (!isString(content.totalExperience)) fail(documentId, 'totalExperience가 없습니다.');
	if (!Array.isArray(content.skills)) fail(documentId, 'skills가 배열이 아닙니다.');
	if (!Array.isArray(content.education)) fail(documentId, 'education이 배열이 아닙니다.');
	if (
		!Array.isArray(content.compactExperiences) ||
		!content.compactExperiences.every(isExperience)
	) {
		fail(documentId, 'compactExperiences 형식이 올바르지 않습니다.');
	}
	if (!Array.isArray(content.targetOnlyWorks))
		fail(documentId, 'targetOnlyWorks가 배열이 아닙니다.');

	return content as unknown as PrintSharedResumeData;
}

/** `target` 문서(content jsonb)를 렌더링 전에 검증한다. 문서 id는 라우트 기준으로 덧붙인다 */
export function validateTargetResume(id: PrintTargetResumeId, content: unknown): PrintTargetResume {
	if (!isRecord(content)) fail(id, '객체가 아닙니다.');

	if (!isString(content.label)) fail(id, 'label이 없습니다.');
	if (!isString(content.headline)) fail(id, 'headline이 없습니다.');
	if (!isString(content.intro)) fail(id, 'intro가 없습니다.');
	if (!isStringArray(content.strengths)) fail(id, 'strengths가 배열이 아닙니다.');
	if (!isStringArray(content.workIds)) fail(id, 'workIds가 배열이 아닙니다.');

	return { ...content, id } as unknown as PrintTargetResume;
}

/** `resume` 문서(content jsonb)를 렌더링 전에 검증한다 */
export function validateResumeData(content: unknown): PrintResumeData {
	if (!isRecord(content)) fail('resume', '객체가 아닙니다.');

	if (!Array.isArray(content.coreCompetencies))
		fail('resume', 'coreCompetencies가 배열이 아닙니다.');
	if (!Array.isArray(content.summary)) fail('resume', 'summary가 배열이 아닙니다.');

	return content as unknown as PrintResumeData;
}

/** `career` 문서(content jsonb)를 렌더링 전에 검증한다 */
export function validateCareerData(content: unknown): PrintCareerData {
	if (!isRecord(content)) fail('career', '객체가 아닙니다.');

	if (!Array.isArray(content.organizationContributions)) {
		fail('career', 'organizationContributions가 배열이 아닙니다.');
	}

	return content as unknown as PrintCareerData;
}

/** `portfolio` 문서(content jsonb)를 렌더링 전에 검증한다 */
export function validatePortfolioData(content: unknown): PrintPortfolioData {
	if (!isRecord(content)) fail('portfolio', '객체가 아닙니다.');

	if (!isStringArray(content.intro)) fail('portfolio', 'intro가 배열이 아닙니다.');
	if (!isStringArray(content.stack)) fail('portfolio', 'stack이 배열이 아닙니다.');
	if (!Array.isArray(content.experiences)) fail('portfolio', 'experiences가 배열이 아닙니다.');
	if (!isStringArray(content.collaboration)) fail('portfolio', 'collaboration이 배열이 아닙니다.');

	return content as unknown as PrintPortfolioData;
}
