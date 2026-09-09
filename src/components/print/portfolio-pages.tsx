import type { PrintEducation, PrintPortfolioExperience, PrintSkill } from '@/data/print-profile';
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
export function PortfolioPages({
	dark,
	phone,
	totalExperience,
	skills,
	education,
	intro,
	stack,
	experiences,
	collaboration
}: {
	dark: boolean;
	phone: string;
	totalExperience: string;
	skills: PrintSkill[];
	education: PrintEducation[];
	intro: string[];
	stack: string[];
	experiences: PrintPortfolioExperience[];
	collaboration: string[];
}) {
	const sheetClass = dark
		? 'page resume-document resume-sheet portfolio-resume-sheet dark'
		: 'page resume-document resume-sheet portfolio-resume-sheet';

	return (
		<>
			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page="01" total="02" section="소개와 최근 경력" />
				<DocumentHeader phone={phone} />

				<section className="portfolio-resume-intro" aria-label="소개">
					<h2>안녕하세요. 7년 차 프론트엔드 개발자 송누리입니다.</h2>
					{intro.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
					<p className="portfolio-stack-line">{stack.join(' · ')}</p>
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
						{totalExperience}
					</p>
					<PortfolioExperience experience={experiences[0]} />
				</section>
			</article>

			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page="02" total="02" section="이전 경력과 기본 정보" />

				<section
					className="resume-overview portfolio-project-summary portfolio-page-lead"
					aria-label="경력 계속"
				>
					<PortfolioExperience experience={experiences[1]} />
					<PortfolioExperience experience={experiences[2]} />
				</section>

				<div className="portfolio-resume-facts">
					<section className="resume-overview" aria-labelledby="portfolio-skills">
						<h2 id="portfolio-skills" className="pr-label">
							기술
						</h2>
						<div className="resume-skill-list">
							{skills.map((skill) => (
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
							{collaboration.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</section>

					<section className="resume-overview" aria-labelledby="portfolio-education">
						<h2 id="portfolio-education" className="pr-label">
							교육
						</h2>
						{education.map((item) => (
							<article className="portfolio-education-item" key={item.title}>
								<header>
									<h3>{item.title}</h3>
									<span>{item.period}</span>
								</header>
								<p>{item.details.join(' · ')}</p>
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
