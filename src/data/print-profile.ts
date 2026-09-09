export interface PrintWork {
	id: string;
	title: string;
	period: string;
	/** 함께한 팀 구성 (기여도 포함). 기록이 없으면 생략한다 */
	team?: string;
	/** 그 팀 안에서 맡은 역할 */
	role: string;
	scope: string;
	problem: string;
	process: string[];
	effect: string;
	effectHighlights?: string[];
	takeaway?: string;
	stack: string[];
}

export interface PrintExperience {
	company: string;
	period: string;
	duration: string;
	role: string;
	/** 경력 요약 표의 "역할 및 담당업무" 한 줄 */
	responsibilities: string;
	summary: string;
	works: PrintWork[];
}

export interface PrintSkill {
	label: string;
	value: string;
}

export interface PrintContribution {
	title: string;
	problem: string;
	process: string[];
	effect: string;
}

export interface PrintEducation {
	title: string;
	period: string;
	details: string[];
}

/** Supabase의 `shared` 문서와 대응하는 형태. 지원용 이력서가 공통으로 참조하는 데이터를 묶는다 */
export interface PrintSharedResumeData {
	phone: string;
	totalExperience: string;
	skills: PrintSkill[];
	education: PrintEducation[];
	compactExperiences: PrintExperience[];
	targetOnlyWorks: { company: string; work: PrintWork }[];
}

export interface PrintPortfolioProject {
	title: string;
	details: string[];
}

export interface PrintPortfolioExperience {
	company: string;
	period: string;
	role: string;
	summary: string;
	projects: PrintPortfolioProject[];
}

export interface PrintResumeSummaryParagraph {
	text: string;
	highlights?: string[];
}

/** Supabase의 `resume` 문서. 경력·학력 등 공유 데이터는 `shared` 문서에서 따로 조회한다 */
export interface PrintResumeData {
	coreCompetencies: PrintSkill[];
	summary: PrintResumeSummaryParagraph[];
}

/** Supabase의 `career` 문서. 경력·학력은 `shared` 문서를 재사용한다 */
export interface PrintCareerData {
	organizationContributions: PrintContribution[];
}

/** Supabase의 `portfolio` 문서. 총 경력·기술·학력은 `shared` 문서를 재사용한다 */
export interface PrintPortfolioData {
	intro: string[];
	stack: string[];
	experiences: PrintPortfolioExperience[];
	collaboration: string[];
}

// 회사별 지원용 이력서가 늘어날 때는 'org-3'처럼 순번 코드를 추가한다. 실제 회사명은
// 이 union·라우트·CSS 클래스 어디에도 두지 않고 Supabase 문서 content에만 넣는다.
export type PrintTargetResumeId = 'senior' | 'org-1' | 'product' | 'org-2' | 'org-3';

export interface PrintTargetResume {
	id: PrintTargetResumeId;
	label: string;
	headline: string;
	intro: string;
	/** intro 안에서 굵게 표시할 구절 */
	introHighlights?: string[];
	/** 기본값인 '핵심 역량' 대신 이 이력서에서 사용할 섹션 제목 */
	competencyLabel?: string;
	sentences?: string[];
	/** sentences 안에서 굵게 표시할 구절 */
	sentenceHighlights?: string[];
	/**
	 * 이 이력서에서만 다르게 쓰는 대표 경험 문구. 사실은 그대로 두고 문체만 바꿀 때 쓴다.
	 * (예: 지원 대상의 인재상 문서가 합니다체라 카드도 합니다체로 맞춘다)
	 */
	workText?: Record<
		string,
		Partial<
			Pick<PrintWork, 'role' | 'problem' | 'process' | 'effect' | 'effectHighlights' | 'takeaway'>
		>
	>;
	strengths: string[];
	workIds: string[];
}

export const PRINT_ROLE = '프론트엔드 개발자';

// 이력서 본문(경력·학력·기술·지원용 문구 등)은 Supabase `private_resume_documents`로 이전했다.
// 조회는 src/lib/resume/get-private-resume.ts, 검증은 src/lib/resume/validate-resume.ts를 본다.
