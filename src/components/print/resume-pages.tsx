import {
	PRINT_COMPACT_EXPERIENCES,
	PRINT_CORE_COMPETENCIES,
	PRINT_RESUME_SUMMARY,
	PRINT_SKILLS,
	PRINT_TOTAL_EXPERIENCE
} from '@/data/print-profile';
import { CareerPages } from './career-pages';
import { InlineHighlights } from './inline-highlights';
import { DocumentHeader, SheetMeta, toPrintPeriod } from './resume-parts';

/** 기본 이력서(v1): 요약 1장 + 경력기술서 4장 */
export function ResumePages({ dark }: { dark: boolean }) {
	return (
		<>
			<article
				className={
					dark ? 'page resume-document resume-sheet dark' : 'page resume-document resume-sheet'
				}
				data-resume-version="compact"
			>
				<SheetMeta page="01" total="05" section="프로필과 경력 요약" />
				<DocumentHeader />

				<section className="resume-thesis" aria-label="요약">
					{PRINT_RESUME_SUMMARY.map((paragraph) => (
						<p key={paragraph.text}>
							<InlineHighlights text={paragraph.text} highlights={paragraph.highlights} />
						</p>
					))}
				</section>

				<section
					className="resume-career-history resume-overview"
					aria-labelledby="resume-career-history"
				>
					<h2 id="resume-career-history" className="pr-label">
						경력
					</h2>
					<p className="resume-total-experience">
						<strong>총 경력</strong>
						{PRINT_TOTAL_EXPERIENCE}
					</p>
					<table className="resume-summary-table">
						<thead>
							<tr>
								<th scope="col">기간</th>
								<th scope="col">회사</th>
								<th scope="col">역할 및 담당업무</th>
							</tr>
						</thead>
						<tbody>
							{PRINT_COMPACT_EXPERIENCES.map((experience) => (
								<tr key={experience.company}>
									<td className="resume-summary-period">
										{toPrintPeriod(experience.period)}
										<br />
										<span className="resume-summary-duration">(총 {experience.duration})</span>
									</td>
									<td>
										<strong>{experience.company}</strong>
									</td>
									<td>
										<strong>{experience.role}</strong>
										<span className="resume-summary-responsibilities">
											{experience.responsibilities}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<p className="resume-detail-pointer">
						프로젝트별 문제·조치·결과는 <a href="#career-detail">경력기술서</a>에서 확인할 수
						있습니다.
					</p>
				</section>

				<section className="pr-section resume-overview" aria-labelledby="resume-competency">
					<h2 id="resume-competency" className="pr-label">
						핵심 역량
					</h2>
					<ul className="resume-competency-list">
						{PRINT_CORE_COMPETENCIES.map((competency) => (
							<li key={competency.label}>
								<strong>{competency.label}</strong>
								{competency.value}
							</li>
						))}
					</ul>
				</section>

				<section className="pr-section resume-overview" aria-labelledby="resume-skills">
					<h2 id="resume-skills" className="pr-label">
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
			</article>

			<CareerPages pages={['02', '03', '04', '05']} total="05" dark={dark} withResumeInfo />
		</>
	);
}
