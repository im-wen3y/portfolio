import type { PrintSharedResumeData, PrintTargetResume } from '@/data/print-profile';
import { InlineHighlights } from './inline-highlights';
import { SheetMeta, TargetCareerSummary, TargetWorkCard } from './resume-parts';
import { getTargetWorks } from './target-works';

/** 지원 직무마다 다른 강조색을 준다 */
function accentFor(id: PrintTargetResume['id']): string {
	if (id === 'product') return 'mono-ink';
	if (id === 'org-1') return 'org-1-accent';
	if (id === 'org-3') return 'org-3-accent';
	return 'toss-blue';
}

function TargetResumeDetails({
	profileId,
	shared
}: {
	profileId: PrintTargetResume['id'];
	shared: PrintSharedResumeData;
}) {
	return (
		<div className="target-resume-facts">
			<section className="resume-overview" aria-labelledby={`target-skills-${profileId}`}>
				<h2 id={`target-skills-${profileId}`} className="pr-label">
					기술
				</h2>
				<div className="resume-skill-list">
					{shared.skills.map((skill) => (
						<p key={skill.label}>
							<strong>{skill.label}</strong>
							<span className="resume-skill-value">{skill.value}</span>
						</p>
					))}
				</div>
			</section>

			<div className="target-resume-side-facts">
				<section className="resume-overview" aria-labelledby={`target-education-${profileId}`}>
					<h2 id={`target-education-${profileId}`} className="pr-label">
						학력
					</h2>
					{shared.education.map((education) => (
						<p className="target-education-entry" key={education.title}>
							<strong>{education.title}</strong>
							<span>{education.details.join(' · ')}</span>
						</p>
					))}
				</section>

				<section className="resume-overview" aria-labelledby={`target-links-${profileId}`}>
					<h2 id={`target-links-${profileId}`} className="pr-label">
						링크
					</h2>
					<ul className="target-profile-links">
						<li>
							<strong>Velog:</strong>
							<a href="https://velog.io/@imwen3y/posts" target="_blank" rel="noopener noreferrer">
								velog.io/@imwen3y
							</a>
						</li>
						<li>
							<strong>LinkedIn:</strong>
							<a
								href="https://www.linkedin.com/in/im-wen3y"
								target="_blank"
								rel="noopener noreferrer"
							>
								linkedin.com/in/im-wen3y
							</a>
						</li>
					</ul>
				</section>
			</div>
		</div>
	);
}

/** 2장에 들어가는 대표 경험 카드 수 */
const WORKS_PER_MIDDLE_PAGE = 3;

/** 1장에 자기소개·경력을 함께 싣고 대표 경험을 3장에 걸쳐 펼치는 지원 직무별 이력서 */
export function TargetResumePages({
	profile,
	shared,
	dark,
	showContact = true
}: {
	profile: PrintTargetResume;
	shared: PrintSharedResumeData;
	/** 인증 없이 열리는 경로에서는 연락처를 싣지 않는다 */
	showContact?: boolean;
	dark: boolean;
}) {
	const accent = accentFor(profile.id);
	const sheetClass = dark
		? 'page resume-document resume-sheet target-resume-sheet dark'
		: 'page resume-document resume-sheet target-resume-sheet';
	const works = getTargetWorks(profile, shared);
	const totalPages = '03';
	// 1장은 자기소개·경력·핵심 역량이 차지하므로 대표 경험은 1개만 두고,
	// 2장을 카드 3개까지 채운 뒤 남는 것을 3장으로 넘긴다
	const firstPageEnd = 1;
	const secondPageEnd = Math.min(profile.workIds.length, firstPageEnd + WORKS_PER_MIDDLE_PAGE);

	return (
		<>
			<article
				className={sheetClass}
				data-resume-version="compact"
				data-target-resume={profile.id}
				data-accent={accent}
				data-target-page="1"
			>
				<SheetMeta page="01" total={totalPages} section={profile.label} />

				<section className="target-resume-hero" aria-labelledby={`target-title-${profile.id}`}>
					<h2 id={`target-title-${profile.id}`} className="target-resume-title">
						송누리
					</h2>
					<p className="target-resume-role">프론트엔드 개발자</p>
					{showContact && (
						<p className="target-resume-meta">
							<a href={`tel:${shared.phone}`}>{shared.phone}</a>
							<span aria-hidden="true">•</span>
							<a href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
						</p>
					)}
				</section>

				<section className="resume-thesis" aria-label="자기소개">
					<p>
						<InlineHighlights text={profile.intro} highlights={profile.introHighlights} />
					</p>
				</section>

				<TargetCareerSummary profileId={profile.id} shared={shared} />

				<section
					className="resume-overview target-sentence-strip"
					aria-labelledby={`target-sentences-${profile.id}`}
				>
					<h2 id={`target-sentences-${profile.id}`} className="pr-label">
						{profile.competencyLabel ?? '핵심 역량'}
					</h2>
					<ul className="target-sentence-list">
						{profile.sentences?.map((sentence) => (
							<li key={sentence}>
								<InlineHighlights text={sentence} highlights={profile.sentenceHighlights} />
							</li>
						))}
					</ul>
				</section>

				<section
					className="resume-overview target-work-section"
					aria-labelledby={`target-work-${profile.id}`}
				>
					<h2 id={`target-work-${profile.id}`} className="pr-label">
						대표 경험
					</h2>
					{works.slice(0, firstPageEnd).map((item) => (
						<TargetWorkCard item={item} key={item.work.id} />
					))}
				</section>
			</article>

			<article
				className={sheetClass}
				data-resume-version="compact"
				data-target-resume={profile.id}
				data-accent={accent}
				data-target-page="2"
			>
				<SheetMeta page="02" total={totalPages} section={`${profile.label} 대표 경험`} />

				<section
					className="resume-overview target-work-section target-page-lead"
					aria-label="대표 경험 계속"
				>
					{works.slice(firstPageEnd, secondPageEnd).map((item) => (
						<TargetWorkCard item={item} key={item.work.id} />
					))}
				</section>
			</article>

			<article
				className={sheetClass}
				data-resume-version="compact"
				data-target-resume={profile.id}
				data-accent={accent}
				data-target-page="3"
			>
				<SheetMeta page="03" total={totalPages} section={`${profile.label} 경력과 기본 정보`} />

				<section
					className="resume-overview target-work-section target-page-lead"
					aria-label="대표 경험 계속"
				>
					{works.slice(secondPageEnd).map((item) => (
						<TargetWorkCard item={item} key={item.work.id} />
					))}
				</section>

				<TargetResumeDetails profileId={profile.id} shared={shared} />
			</article>
		</>
	);
}
