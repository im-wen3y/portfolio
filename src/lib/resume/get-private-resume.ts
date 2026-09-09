import 'server-only';

import type {
	PrintCareerData,
	PrintPortfolioData,
	PrintResumeData,
	PrintSharedResumeData,
	PrintTargetResume,
	PrintTargetResumeId
} from '@/data/print-profile';
import { supabaseAdmin } from '@/lib/supabase/admin';
import {
	validateCareerData,
	validatePortfolioData,
	validateResumeData,
	validateSharedResumeData,
	validateTargetResume
} from './validate-resume';

async function fetchDocumentContent(id: string): Promise<unknown> {
	const { data, error } = await supabaseAdmin
		.from('private_resume_documents')
		.select('content')
		.eq('id', id)
		.single();

	if (error || !data) {
		throw new Error(`이력서 문서(${id})를 Supabase에서 조회하지 못했습니다.`);
	}

	return data.content;
}

/** 지원용 이력서가 공통으로 참조하는 `shared` 문서를 조회한다. 실패 시 공개 데이터로 대체하지 않는다 */
export async function getSharedResumeData(): Promise<PrintSharedResumeData> {
	return validateSharedResumeData('shared', await fetchDocumentContent('shared'));
}

/** 지원 대상별 `target` 문서를 조회한다. 실패 시 공개 데이터로 대체하지 않는다 */
export async function getTargetResume(id: PrintTargetResumeId): Promise<PrintTargetResume> {
	return validateTargetResume(id, await fetchDocumentContent(id));
}

/** 기본 이력서(v1)의 `resume` 문서를 조회한다. 경력·학력은 `shared` 문서에서 따로 조회한다 */
export async function getResumeData(): Promise<PrintResumeData> {
	return validateResumeData(await fetchDocumentContent('resume'));
}

/** 경력기술서의 `career` 문서를 조회한다. 경력·학력은 `shared` 문서에서 따로 조회한다 */
export async function getCareerData(): Promise<PrintCareerData> {
	return validateCareerData(await fetchDocumentContent('career'));
}

/** 인쇄 포트폴리오의 `portfolio` 문서를 조회한다 */
export async function getPortfolioData(): Promise<PrintPortfolioData> {
	return validatePortfolioData(await fetchDocumentContent('portfolio'));
}
