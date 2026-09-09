import type {
	PrintContribution,
	PrintSharedResumeData,
	PrintTargetResume
} from '@/data/print-profile';
import { CompanySection, ResumeLinks, SheetMeta, TargetCareerSummary } from './resume-parts';
import { getTargetWorks, groupTargetWorksByCompany } from './target-works';

// 지원용 경력기술서. 기본 경력기술서(career-pages.tsx)가 전체 경력을 4장에 담는 것과 달리,
// 지원용 이력서가 고른 workIds만 회사별로 묶어 3장에 담는다.
// 1장 = 이름·연락처와 경력 요약 표 + 최근 회사 첫 프로젝트, 2장 = 최근 회사 나머지,
// 3장 = 이전 경력 + 조직기여 + 학력·링크.
// 첨부파일로 단독 제출되는 문서라 1장 머리에 이력서와 같은 인적사항을 다시 싣는다.
export function TargetCareerPages({
	profile,
	shared,
	organizationContributions,
	dark
}: {
	profile: PrintTargetResume;
	shared: PrintSharedResumeData;
	organizationContributions: PrintContribution[];
	dark: boolean;
}) {
	const sheetClass = dark
		? 'page resume-document resume-sheet dark'
		: 'page resume-document resume-sheet';
	const groups = groupTargetWorksByCompany(getTargetWorks(profile, shared));
	const [recent, ...previous] = groups;

	return (
		<>
			<article
				className={`${sheetClass} target-resume-sheet`}
				data-resume-version="compact"
				data-target-resume={profile.id}
				data-target-page="1"
				id="career-detail"
			>
				<SheetMeta page="01" total="03" section={`${profile.label} 경력기술서`} />

				<section className="target-resume-hero" aria-labelledby="target-career-name">
					<h2 id="target-career-name" className="target-resume-title">
						송누리
					</h2>
					<p className="target-resume-role">프론트엔드 개발자</p>
					<p className="target-resume-meta">
						<a href={`tel:${shared.phone}`}>{shared.phone}</a>
						<span aria-hidden="true">•</span>
						<a href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
					</p>
				</section>

				<TargetCareerSummary profileId={profile.id} shared={shared} />

				<section
					className="resume-selected-work resume-overview"
					aria-labelledby="target-career-recent"
				>
					<h2 id="target-career-recent" className="pr-label">
						경력 상세
					</h2>
					<div className="template-company-list">
						<CompanySection experience={recent.experience} works={recent.works.slice(0, 1)} />
					</div>
				</section>
			</article>

			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page="02" total="03" section="최근 경력 상세" />
				<section
					className="resume-selected-work resume-overview resume-page-lead"
					aria-label="최근 경력 상세 계속"
				>
					<div className="template-company-list">
						<CompanySection
							experience={recent.experience}
							works={recent.works.slice(1)}
							showHeader={false}
						/>
					</div>
				</section>
			</article>

			<article className={sheetClass} data-resume-version="compact">
				<SheetMeta page="03" total="03" section="이전 경력과 기본 정보" />
				<section
					className="resume-selected-work resume-overview resume-page-lead"
					aria-label="이전 경력"
				>
					<div className="template-company-list">
						{previous.map((group) => (
							<CompanySection
								experience={group.experience}
								works={group.works}
								key={group.experience.company}
							/>
						))}
					</div>
				</section>

				<section
					className="resume-additional-work resume-overview"
					aria-labelledby="target-career-contributions"
				>
					<h2 id="target-career-contributions" className="pr-label">
						조직기여
					</h2>
					<div className="template-contribution-list">
						{organizationContributions.map((contribution) => (
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

				<div className="resume-fact-grid">
					<section className="resume-overview" aria-labelledby="target-career-education">
						<h2 id="target-career-education" className="pr-label">
							학력
						</h2>
						<div className="template-education-list">
							{shared.education.map((item) => (
								<article className="template-education" key={item.title}>
									<header>
										<h3>{item.title}</h3>
										<span>{item.period}</span>
									</header>
									<ul className="template-contribution-details">
										{item.details.map((detail) => (
											<li key={detail}>{detail}</li>
										))}
									</ul>
								</article>
							))}
						</div>
					</section>

					<section className="resume-overview" aria-labelledby="target-career-links">
						<h2 id="target-career-links" className="pr-label">
							링크
						</h2>
						<ResumeLinks />
					</section>
				</div>
			</article>
		</>
	);
}
