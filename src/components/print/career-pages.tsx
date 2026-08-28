import {
	PRINT_COMPACT_EXPERIENCES,
	PRINT_COMPACT_ORGANIZATION_CONTRIBUTIONS,
	PRINT_EDUCATION
} from '@/data/print-profile';
import { CompanySection, ResumeLinks, SheetMeta } from './resume-parts';

const EXPERIENCES = PRINT_COMPACT_EXPERIENCES;

// 경력기술서는 A4 4장에 회사·프로젝트를 나눠 담는다. 어느 프로젝트가 몇 페이지에
// 들어가는지는 인쇄 결과를 보고 맞춘 값이라 slice 범위를 임의로 바꾸면 페이지가 깨진다.
type CareerPagesProps = {
	pages: [string, string, string, string];
	total: string;
	dark: boolean;
	withResumeInfo?: boolean;
};

export function CareerPages({ pages, total, dark, withResumeInfo = false }: CareerPagesProps) {
	const sheetClass = dark
		? 'page resume-document resume-sheet dark'
		: 'page resume-document resume-sheet';
	const [pageA, pageB, pageC, pageD] = pages;

	return (
		<>
			<article className={sheetClass} data-resume-version="compact" id="career-detail">
				<SheetMeta page={pageA} total={total} section="팀 리드와 최근 경력" />

				<section
					className="resume-additional-work resume-overview"
					aria-labelledby="career-contributions"
				>
					<h2 id="career-contributions" className="pr-label">
						팀 리드
					</h2>
					<div className="template-contribution-list">
						{PRINT_COMPACT_ORGANIZATION_CONTRIBUTIONS.map((contribution) => (
							<article className="template-contribution" key={contribution.title}>
								<h3>{contribution.title}</h3>
								<ul className="template-contribution-details">
									<li>{contribution.problem}</li>
									{contribution.process.map((process) => (
										<li key={process}>{process}</li>
									))}
									<li>{contribution.effect}</li>
								</ul>
							</article>
						))}
					</div>
				</section>

				<section className="resume-selected-work resume-overview" aria-labelledby="career-recent">
					<h2 id="career-recent" className="pr-label">
						경력 상세
					</h2>
					<div className="template-company-list">
						<CompanySection experience={EXPERIENCES[0]} works={EXPERIENCES[0].works.slice(0, 1)} />
					</div>
				</section>
			</article>

			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page={pageB} total={total} section="최근 경력 상세" />
				<section
					className="resume-selected-work resume-overview resume-page-lead"
					aria-label="최근 경력 상세 계속"
				>
					<div className="template-company-list">
						<CompanySection
							experience={EXPERIENCES[0]}
							works={EXPERIENCES[0].works.slice(1, 4)}
							showHeader={false}
						/>
					</div>
				</section>
			</article>

			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page={pageC} total={total} section="최근 경력과 이전 경력" />
				<section
					className="resume-selected-work resume-overview resume-page-lead"
					aria-label="최근 경력 상세 계속"
				>
					<div className="template-company-list">
						<CompanySection
							experience={EXPERIENCES[0]}
							works={EXPERIENCES[0].works.slice(4)}
							showHeader={false}
						/>
					</div>
				</section>

				<section className="resume-selected-work resume-overview" aria-label="이전 경력">
					<div className="template-company-list">
						<CompanySection experience={EXPERIENCES[1]} works={EXPERIENCES[1].works.slice(0, 2)} />
					</div>
				</section>
			</article>

			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page={pageD} total={total} section="이전 경력과 기본 정보" />
				<section
					className="resume-selected-work resume-overview resume-page-lead"
					aria-label="이전 경력 계속"
				>
					<div className="template-company-list">
						<CompanySection
							experience={EXPERIENCES[1]}
							works={EXPERIENCES[1].works.slice(2)}
							showHeader={false}
						/>
						{EXPERIENCES.slice(2).map((experience) => (
							<CompanySection
								experience={experience}
								works={experience.works}
								key={experience.company}
							/>
						))}
					</div>
				</section>
				{withResumeInfo && (
					<div className="resume-fact-grid">
						<section className="resume-overview" aria-labelledby="resume-education">
							<h2 id="resume-education" className="pr-label">
								학력
							</h2>
							<div className="template-education-list">
								{PRINT_EDUCATION.map((education) => (
									<article className="template-education" key={education.title}>
										<header>
											<h3>{education.title}</h3>
											<span>{education.period}</span>
										</header>
										<ul className="template-contribution-details">
											{education.details.map((detail) => (
												<li key={detail}>{detail}</li>
											))}
										</ul>
									</article>
								))}
							</div>
						</section>

						<section className="resume-overview" aria-labelledby="resume-links">
							<h2 id="resume-links" className="pr-label">
								링크
							</h2>
							<ResumeLinks />
						</section>
					</div>
				)}
			</article>
		</>
	);
}
