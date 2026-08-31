import {
	PRINT_EDUCATION,
	PRINT_PORTFOLIO_COLLABORATION,
	PRINT_PORTFOLIO_EXPERIENCES,
	PRINT_PORTFOLIO_INTRO,
	PRINT_PORTFOLIO_STACK,
	PRINT_SKILLS,
	PRINT_TOTAL_EXPERIENCE,
	type PrintPortfolioExperience
} from '@/data/print-profile';
import { DocumentHeader, ResumeLinks, SheetMeta } from './resume-parts';

function PortfolioExperience({ experience }: { experience: PrintPortfolioExperience }) {
	return (
		<article className="portfolio-summary-company">
			<header>
				<div>
					<h3>{experience.company}</h3>
					<p>{experience.role}</p>
				</div>
				<span>{experience.period}</span>
			</header>
			<p className="portfolio-company-summary">{experience.summary}</p>
			<div className="portfolio-project-list">
				{experience.projects.map((project) => (
					<section key={project.title}>
						<h4>{project.title}</h4>
						<ul>
							{project.details.map((detail) => (
								<li key={detail}>{detail}</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</article>
	);
}

/** 인쇄용 포트폴리오: A4 2장 */
export function PortfolioPages({ dark }: { dark: boolean }) {
	const sheetClass = dark
		? 'page resume-document resume-sheet portfolio-resume-sheet dark'
		: 'page resume-document resume-sheet portfolio-resume-sheet';

	return (
		<>
			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page="01" total="02" section="소개와 최근 경력" />
				<DocumentHeader />

				<section className="portfolio-resume-intro" aria-label="소개">
					<h2>안녕하세요. 7년 차 프론트엔드 개발자 송누리입니다.</h2>
					{PRINT_PORTFOLIO_INTRO.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
					<p className="portfolio-stack-line">{PRINT_PORTFOLIO_STACK.join(' · ')}</p>
				</section>

				<section
					className="resume-overview portfolio-project-summary"
					aria-labelledby="portfolio-career-recent"
				>
					<h2 id="portfolio-career-recent" className="pr-label">
						경험
					</h2>
					<p className="resume-total-experience">
						<strong>총 경력</strong>
						{PRINT_TOTAL_EXPERIENCE}
					</p>
					<PortfolioExperience experience={PRINT_PORTFOLIO_EXPERIENCES[0]} />
				</section>
			</article>

			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page="02" total="02" section="이전 경력과 기본 정보" />

				<section
					className="resume-overview portfolio-project-summary portfolio-page-lead"
					aria-label="경력 계속"
				>
					<PortfolioExperience experience={PRINT_PORTFOLIO_EXPERIENCES[1]} />
					<PortfolioExperience experience={PRINT_PORTFOLIO_EXPERIENCES[2]} />
				</section>

				<div className="portfolio-resume-facts">
					<section className="resume-overview" aria-labelledby="portfolio-skills">
						<h2 id="portfolio-skills" className="pr-label">
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

					<section className="resume-overview" aria-labelledby="portfolio-collaboration">
						<h2 id="portfolio-collaboration" className="pr-label">
							협업 및 리더십
						</h2>
						<ul className="portfolio-collaboration-list">
							{PRINT_PORTFOLIO_COLLABORATION.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</section>

					<section className="resume-overview" aria-labelledby="portfolio-education">
						<h2 id="portfolio-education" className="pr-label">
							교육
						</h2>
						{PRINT_EDUCATION.map((education) => (
							<article className="portfolio-education-item" key={education.title}>
								<header>
									<h3>{education.title}</h3>
									<span>{education.period}</span>
								</header>
								<p>{education.details.join(' · ')}</p>
							</article>
						))}
					</section>

					<section className="resume-overview" aria-labelledby="portfolio-links">
						<h2 id="portfolio-links" className="pr-label">
							링크
						</h2>
						<ResumeLinks />
					</section>
				</div>
			</article>
		</>
	);
}
