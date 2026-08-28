import { PRINT_ROLE, type PrintExperience, type PrintWork } from '@/data/print-profile';
import { InlineHighlights } from './inline-highlights';

export type TargetWork = { experience: PrintExperience; work: PrintWork };

/** period 표기는 화면(2024.04 - 2026.06)과 인쇄(2024.04~2026.06)가 다르다 */
export function toPrintPeriod(period: string): string {
	return period.replace(' - ', '~');
}

/** A4 한 장의 머리말. 문서 종류와 무관하게 같은 형태를 쓴다. */
export function SheetMeta({
	page,
	total,
	section
}: {
	page: string;
	total: string;
	section: string;
}) {
	return (
		<header className="resume-sheet-meta" aria-label={`문서 ${page}페이지, ${section}`}>
			<span>Song Nuri · Frontend Engineer</span>
			<span>
				{page} / {total}
			</span>
		</header>
	);
}

/** 첫 장에만 들어가는 이름·연락처 블록 */
export function DocumentHeader() {
	return (
		<div className="document-header-group">
			<header className="pr-header">
				<h1 className="pr-name">송누리</h1>
				<p className="pr-role">{PRINT_ROLE}</p>
				<div className="pr-contact">
					<a href="tel:010-5108-5493">010-5108-5493</a>
					<span className="pr-sep" aria-hidden="true">
						·
					</span>
					<a href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
				</div>
			</header>

			<hr className="pr-divider" />
		</div>
	);
}

export function ResumeLinks() {
	return (
		<ul className="resume-link-list">
			<li>
				<span className="resume-link-label">GitHub</span>
				<a href="https://github.com/im-wen3y" target="_blank" rel="noopener noreferrer">
					github.com/im-wen3y
				</a>
			</li>
			<li>
				<span className="resume-link-label">LinkedIn</span>
				<a href="https://www.linkedin.com/in/im-wen3y" target="_blank" rel="noopener noreferrer">
					linkedin.com/in/im-wen3y
				</a>
			</li>
			<li>
				<span className="resume-link-label">Portfolio</span>
				<a href="https://im-wen3yz.vercel.app" target="_blank" rel="noopener noreferrer">
					im-wen3yz.vercel.app
				</a>
			</li>
		</ul>
	);
}

/** 회사 한 곳과 그 아래 프로젝트들. 페이지가 넘어갈 때는 헤더를 생략한다. */
export function CompanySection({
	experience,
	works,
	showHeader = true
}: {
	experience: PrintExperience;
	works: PrintWork[];
	showHeader?: boolean;
}) {
	return (
		<section className="template-company" aria-labelledby={`company-${experience.company}`}>
			{showHeader && (
				<>
					<header className="template-company-header">
						<h3 id={`company-${experience.company}`}>{experience.company}</h3>
						<h4>
							<span className="template-role">{experience.role}</span>
							<span className="template-role-separator" aria-hidden="true">
								{' '}
								·{' '}
							</span>
							<span className="template-role-period">
								{toPrintPeriod(experience.period)} (총 {experience.duration})
							</span>
						</h4>
					</header>
					<p className="template-company-summary">{experience.summary}</p>
				</>
			)}
			<div className="resume-work-list">
				{works.map((work) => (
					<article className="resume-work" key={work.id}>
						<header className="resume-work-header">
							{work.title && (
								<p className="template-work-title">
									<strong>{work.title}</strong>
								</p>
							)}
							<div className="template-work-meta">
								{work.period !== experience.period && (
									<p>
										<span className="template-work-meta-label">프로젝트 기간</span>
										<span>{toPrintPeriod(work.period)}</span>
									</p>
								)}
								{work.team && (
									<p>
										<span className="template-work-meta-label">팀 구성</span>
										<span>{work.team}</span>
									</p>
								)}
								<p>
									<span className="template-work-meta-label">역할</span>
									<span>{work.role}</span>
								</p>
								<p>
									<span className="template-work-meta-label">담당 업무</span>
									<span>{work.scope}</span>
								</p>
							</div>
						</header>
						<dl className="resume-work-details">
							<div>
								<dt>문제</dt>
								<dd>{work.problem}</dd>
							</div>
							<div>
								<dt>처리</dt>
								<dd>{work.process.join(' ')}</dd>
							</div>
							<div className="resume-work-result">
								<dt>효과</dt>
								<dd>
									<InlineHighlights text={work.effect} highlights={work.effectHighlights} />
								</dd>
							</div>
							{work.takeaway && (
								<div>
									<dt>배운 점</dt>
									<dd>{work.takeaway}</dd>
								</div>
							)}
						</dl>
						<p className="resume-work-stack">{work.stack.join(' · ')}</p>
					</article>
				))}
			</div>
		</section>
	);
}

/** 지원용 이력서의 압축된 경험 카드 */
export function TargetWorkCard({ item }: { item: TargetWork }) {
	const roleLabel =
		item.experience.company === '라텔앤드파트너즈' && item.work.id !== 'nonmyacuvue-promo'
			? ' ・파트 리더'
			: '';

	return (
		<article className="target-resume-work">
			<header>
				<div className="target-work-title-row">
					<h3>{item.work.title}</h3>
					<span>{item.work.period}</span>
				</div>
				<p>
					{item.experience.company}
					{roleLabel} | {item.work.role}
				</p>
				<p className="resume-work-stack">{item.work.stack.join(' · ')}</p>
			</header>
			<dl>
				<div>
					<dt>문제</dt>
					<dd>{item.work.problem}</dd>
				</div>
				<div>
					<dt>해결</dt>
					<dd>{item.work.process[0]}</dd>
				</div>
				<div>
					<dt>결과</dt>
					<dd>
						<InlineHighlights text={item.work.effect} highlights={item.work.effectHighlights} />
					</dd>
				</div>
				{item.work.takeaway && (
					<div>
						<dt>배운 점</dt>
						<dd>{item.work.takeaway}</dd>
					</div>
				)}
			</dl>
		</article>
	);
}
