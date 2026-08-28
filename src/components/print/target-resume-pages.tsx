import {
	PRINT_COMPACT_EXPERIENCES,
	PRINT_EDUCATION,
	PRINT_SKILLS,
	type PrintTargetResume
} from '@/data/print-profile';
import {
	DocumentHeader,
	SheetMeta,
	TargetWorkCard,
	toPrintPeriod,
	type TargetWork
} from './resume-parts';

/** workIds 순서대로 경력 전체에서 해당 프로젝트를 찾아온다 */
function getTargetWorks(profile: PrintTargetResume): TargetWork[] {
	return profile.workIds.flatMap((workId) => {
		for (const experience of PRINT_COMPACT_EXPERIENCES) {
			const work = experience.works.find((item) => item.id === workId);
			if (work) return [{ experience, work }];
		}
		return [];
	});
}

/** 지원 직무별 이력서(senior/lead/product): A4 2장 */
export function TargetResumePages({
	profile,
	dark
}: {
	profile: PrintTargetResume;
	dark: boolean;
}) {
	const sheetClass = dark
		? 'page resume-document resume-sheet target-resume-sheet dark'
		: 'page resume-document resume-sheet target-resume-sheet';
	const works = getTargetWorks(profile);
	const splitAt = Math.ceil(profile.workIds.length / 2);

	return (
		<>
			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page="01" total="02" section={profile.label} />
				<DocumentHeader />

				<section className="target-resume-intro" aria-labelledby={`target-title-${profile.id}`}>
					<h2 id={`target-title-${profile.id}`}>{profile.headline}</h2>
					<p>{profile.intro}</p>
				</section>

				<section className="resume-overview" aria-labelledby={`target-strengths-${profile.id}`}>
					<h2 id={`target-strengths-${profile.id}`} className="pr-label">
						핵심 강점
					</h2>
					<ul className="target-strength-list">
						{profile.strengths.map((strength) => (
							<li key={strength}>{strength}</li>
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
					{works.slice(0, splitAt).map((item) => (
						<TargetWorkCard item={item} key={item.work.id} />
					))}
				</section>
			</article>

			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page="02" total="02" section={`${profile.label} 대표 경험과 기본 정보`} />

				<section
					className="resume-overview target-work-section target-page-lead"
					aria-label="대표 경험 계속"
				>
					{works.slice(splitAt).map((item) => (
						<TargetWorkCard item={item} key={item.work.id} />
					))}
				</section>

				<section
					className="resume-overview target-career-summary"
					aria-labelledby={`target-career-${profile.id}`}
				>
					<h2 id={`target-career-${profile.id}`} className="pr-label">
						경력
					</h2>
					{PRINT_COMPACT_EXPERIENCES.map((experience) => (
						<article key={experience.company}>
							<strong>{experience.company}</strong>
							<span>
								{toPrintPeriod(experience.period)} · {experience.role}
							</span>
						</article>
					))}
				</section>

				<div className="target-resume-facts">
					<section className="resume-overview" aria-labelledby={`target-skills-${profile.id}`}>
						<h2 id={`target-skills-${profile.id}`} className="pr-label">
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

					<section className="resume-overview" aria-labelledby={`target-education-${profile.id}`}>
						<h2 id={`target-education-${profile.id}`} className="pr-label">
							학력
						</h2>
						{PRINT_EDUCATION.map((education) => (
							<p key={education.title}>
								<strong>{education.title}</strong> · {education.details.join(' · ')}
							</p>
						))}
					</section>
				</div>
			</article>
		</>
	);
}
