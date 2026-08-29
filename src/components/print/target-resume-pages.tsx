import {
	PRINT_COMPACT_EXPERIENCES,
	PRINT_EDUCATION,
	PRINT_SKILLS,
	PRINT_TOTAL_EXPERIENCE,
	type PrintTargetResume
} from '@/data/print-profile';
import { InlineHighlights } from './inline-highlights';
import { SheetMeta, TargetWorkCard, toPrintPeriod, type TargetWork } from './resume-parts';

/** workIds 순서대로 경력 전체에서 해당 프로젝트를 찾아, workText가 있으면 덮어쓴다 */
function getTargetWorks(profile: PrintTargetResume): TargetWork[] {
	return profile.workIds.flatMap((workId) => {
		for (const experience of PRINT_COMPACT_EXPERIENCES) {
			const work = experience.works.find((item) => item.id === workId);
			if (work) return [{ experience, work: { ...work, ...profile.workText?.[workId] } }];
		}
		return [];
	});
}

/** 지원 직무마다 다른 강조색을 준다 */
function accentFor(id: PrintTargetResume['id']): string {
	if (id === 'product') return 'carrot-orange';
	if (id === 'millie') return 'millie-yellow';
	return 'toss-blue';
}

function TargetCareerSummary({ profileId }: { profileId: PrintTargetResume['id'] }) {
	return (
		<section
			className="resume-overview target-career-summary"
			aria-labelledby={`target-career-${profileId}`}
		>
			<h2 id={`target-career-${profileId}`} className="pr-label">
				경력
			</h2>
			<p className="resume-total-experience">
				<strong>총 경력</strong>
				{PRINT_TOTAL_EXPERIENCE}
			</p>
			<table className="resume-summary-table">
				<thead>
					<tr>
						<th scope="col">회사</th>
						<th scope="col">역할 및 담당업무</th>
						<th scope="col">기간</th>
					</tr>
				</thead>
				<tbody>
					{PRINT_COMPACT_EXPERIENCES.map((experience) => (
						<tr key={experience.company}>
							<td>
								<strong>{experience.company}</strong>
							</td>
							<td>
								<strong>{experience.role}</strong>
								<span className="resume-summary-responsibilities">
									{experience.responsibilities}
								</span>
							</td>
							<td className="resume-summary-period">
								{toPrintPeriod(experience.period)}
								<br />
								<span className="resume-summary-duration">(총 {experience.duration})</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

function TargetResumeDetails({ profileId }: { profileId: PrintTargetResume['id'] }) {
	return (
		<div className="target-resume-facts">
			<section className="resume-overview" aria-labelledby={`target-skills-${profileId}`}>
				<h2 id={`target-skills-${profileId}`} className="pr-label">
					기술
				</h2>
				<div className="resume-skill-list">
					{PRINT_SKILLS.map((skill) => (
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
					{PRINT_EDUCATION.map((education) => (
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

/** 1장에 자기소개·경력을 함께 싣고 대표 경험을 3장에 걸쳐 펼치는 버전 */
function isLongForm(id: PrintTargetResume['id']): boolean {
	return id !== 'product';
}

/** 지원 직무별 이력서(product만 2장, 나머지는 3장) */
export function TargetResumePages({
	profile,
	dark
}: {
	profile: PrintTargetResume;
	dark: boolean;
}) {
	const accent = accentFor(profile.id);
	const sheetClass = dark
		? 'page resume-document resume-sheet target-resume-sheet dark'
		: 'page resume-document resume-sheet target-resume-sheet';
	const works = getTargetWorks(profile);
	const longForm = isLongForm(profile.id);
	const totalPages = longForm ? '03' : '02';
	// 1장은 자기소개·경력·핵심 역량이 차지하므로 대표 경험은 1개만 두고,
	// 2장을 카드 3개까지 채운 뒤 남는 것을 3장으로 넘긴다
	const firstPageEnd = longForm ? 1 : Math.ceil(profile.workIds.length / 2);
	const secondPageEnd = longForm
		? Math.min(profile.workIds.length, firstPageEnd + WORKS_PER_MIDDLE_PAGE)
		: profile.workIds.length;

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
					<p className="target-resume-meta">
						<a href="tel:010-5108-5493">010-5108-5493</a>
						<span aria-hidden="true">•</span>
						<a href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
					</p>
				</section>

				{longForm && (
					<>
						<section className="resume-thesis" aria-label="자기소개">
							<p>
								<InlineHighlights text={profile.intro} highlights={profile.introHighlights} />
							</p>
						</section>

						<TargetCareerSummary profileId={profile.id} />
					</>
				)}

				<section
					className="resume-overview target-sentence-strip"
					aria-labelledby={`target-sentences-${profile.id}`}
				>
					<h2 id={`target-sentences-${profile.id}`} className="pr-label">
						핵심 역량
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

				{!longForm && (
					<>
						<TargetCareerSummary profileId={profile.id} />
						<TargetResumeDetails profileId={profile.id} />
					</>
				)}
			</article>

			{longForm && (
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

					<TargetResumeDetails profileId={profile.id} />
				</article>
			)}
		</>
	);
}
