import Link from 'next/link';
import { PortfolioFeed } from '@/components/portfolio-feed';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio-projects';
import { CAREERS, EDUCATION, SKILL_GROUPS, TAG_GROUPS, TROUBLES } from '@/data/profile';

const PRACTICES = [
	{
		label: '개발 기준',
		title: '컨벤션 문서를 자동 적용되는 스킬로 이관',
		text: '반복해서 확인하던 코드 컨벤션 문서를 AI 에이전트가 자동으로 적용하는 스킬 12종으로 옮겨, 읽어야 지켜지던 기준을 작업 중 적용되는 기준으로 바꿨습니다. 규칙 본체는 도구 중립 경로에 두고 도구별 설정은 링크로만 연결했습니다.'
	},
	{
		label: '지식 관리',
		title: 'AI 기반 개인 커리어 위키 구축',
		text: 'AI를 활용해 이력서·Notion·GitHub 기록을 수집하고 프로젝트·스킬별로 구조화하는 스킬을 직접 구현했습니다. 생성된 변경을 검토한 뒤 커밋·푸시하도록 지시하는 방식으로 커리어 위키를 운영하고 있습니다.'
	},
	{
		label: '검증 자동화',
		title: '셀프 리뷰와 계획·코드 대조를 절차로 고정',
		text: 'PR 전 점검, 계획 문서와 실제 코드의 대조, 테스트 코드 검토를 각각 스킬로 만들어 매번 같은 기준으로 실행되게 했습니다. AI가 제시한 근거는 반증 실험으로 확인한 뒤 반영합니다.',
		evidence:
			'학습 프로젝트에서 홈 화면 LCP 8.3초 → 2.3초, 찜 버튼 INP 107.2ms → 35.6ms로 개선했습니다. 효과가 없거나 명세와 상충한 변경은 되돌리거나 원인만 기록했습니다.'
	}
];

const FOOTER_STICKERS = [
	{ file: 'footer-sticker-laptop.png', modifier: 'footer-laptop', size: 332 },
	{ file: 'footer-sticker-browser.png', modifier: 'footer-browser', size: 288 },
	{ file: 'footer-sticker-keyboard.svg', modifier: 'footer-keyboard', size: 128 },
	{ file: 'footer-sticker-mouse.svg', modifier: 'footer-mouse', size: 128 },
	{ file: 'footer-sticker-components.png', modifier: 'footer-components', size: 302 },
	{ file: 'footer-sticker-cursor.png', modifier: 'footer-cursor', size: 187 },
	{ file: 'footer-sticker-braces.png', modifier: 'footer-braces', size: 228 },
	{ file: 'footer-sticker-glasses.png', modifier: 'footer-glasses', size: 202 },
	{ file: 'footer-sticker-peace.png', modifier: 'footer-peace', size: 182 },
	{ file: 'footer-sticker-heart.png', modifier: 'footer-heart', size: 160 }
];

export default function PortfolioPage() {
	return (
		<main className="portfolio-index-page">
			<div className="page portfolio-redesign">
				<section className="hero container">
					<div className="profile-card">
						<img
							className="profile-avatar"
							src="/avatar-profile-3d.png"
							alt="송누리 캐릭터 아바타"
							width={512}
							height={512}
						/>
						<p className="profile-role">Frontend Developer</p>
						<h1>송누리</h1>
						<p className="profile-headline">
							레거시의 맥락을 읽고, 팀이 계속 운영할 수 있는 프론트엔드를 만듭니다.
						</p>
						<p className="lede">
							사용자와 운영자가 막히는 흐름을 기준으로 정책과 제약을 분석합니다. React 전환과 모바일
							리뉴얼을 이끌고, 팀이 반복해서 사용할 기준을 정리해왔습니다.
						</p>
						<div className="hero-links">
							<a className="btn-primary" href="mailto:gloriosd@gmail.com">
								이메일
							</a>
							<a
								className="btn-ghost"
								href="https://github.com/im-wen3y"
								target="_blank"
								rel="noreferrer"
							>
								GitHub
							</a>
							<a
								className="btn-ghost"
								href="https://velog.io/@imwen3y/posts"
								target="_blank"
								rel="noreferrer"
							>
								기술 블로그
							</a>
						</div>
					</div>
					<div className="profile-facts" aria-label="프로필 요약">
						<div>
							<span>역할</span>
							<strong>프론트엔드 파트 리더</strong>
						</div>
						<div>
							<span>주력 기술</span>
							<strong>React / TypeScript</strong>
						</div>
						<div>
							<span>경력</span>
							<strong>6년 10개월</strong>
						</div>
					</div>
				</section>

				<PortfolioFeed>
					<section id="career" className="container">
						<h2>경력</h2>
						<div className="career-list">
							{CAREERS.map((career) => (
								<article className="career-row" key={career.company}>
									<div>
										<div className="career-period">{career.period}</div>
										<div className="career-duration">{career.duration}</div>
										{career.lead && <span className="pill pill-primary">Lead</span>}
									</div>
									<div>
										<h3>{career.company}</h3>
										<div className="career-role">{career.role}</div>
										<p className="career-summary">{career.summary}</p>
										{career.bullets.length > 0 && (
											<ul className="bullets">
												{career.bullets.map((bullet) => (
													<li key={bullet}>{bullet}</li>
												))}
											</ul>
										)}
									</div>
								</article>
							))}
						</div>
					</section>

					<section id="work" className="container">
						<h2>대표 프로젝트</h2>
						<p className="section-note">
							각 프로젝트의 문제 정의 · 직접 맡은 범위 · 결과를 확인할 수 있습니다.
						</p>
						<div className="card-grid two">
							{PORTFOLIO_PROJECTS.map((project) => (
								<article
									className={
										project.badge?.label === 'Lead'
											? 'card project-card project-card-lead'
											: 'card project-card'
									}
									key={project.id}
								>
									<div className="card-head">
										<span className="card-meta">{project.meta}</span>
										{project.badge && (
											<span className={`pill pill-${project.badge.tone}`}>
												{project.badge.label}
											</span>
										)}
									</div>
									<h3>{project.title}</h3>
									<p className="card-summary">{project.summary}</p>
									<div className="chips">
										{project.stack.map((tech) => (
											<span className="chip" key={tech}>
												{tech}
											</span>
										))}
									</div>
									<Link
										className="project-link"
										href={`/project/${project.id}`}
										aria-label={`${project.title} 상세 보기`}
									>
										<span className="project-link-icon" aria-hidden="true" />
									</Link>
								</article>
							))}
						</div>
					</section>

					<section id="trouble" className="case-notes">
						<div className="container">
							<h2>직접 원인을 특정해 해결한 문제들</h2>
							<p className="section-note">
								증상만 고치지 않고 로그·기기 스펙·데이터 규모를 확인해 문제가 발생한 경계를
								좁혔습니다.
							</p>
							<div className="case-grid">
								{TROUBLES.map((trouble) => (
									<article className="case-card" key={trouble.label}>
										<p className="case-label">{trouble.label}</p>
										<h3>{trouble.title}</h3>
										<p>{trouble.text}</p>
									</article>
								))}
							</div>
						</div>
					</section>

					<section id="skills" className="container">
						<h2>기술 스택</h2>
						<div className="skills-layout">
							{SKILL_GROUPS.map((group) => (
								<section
									className="skill-group"
									aria-labelledby={`skill-${group.title}`}
									key={group.title}
								>
									<h3 id={`skill-${group.title}`}>{group.title}</h3>
									<ul className="skill-list">
										{group.skills.map((skill) => (
											<li key={skill}>
												<span>{skill}</span>
											</li>
										))}
									</ul>
								</section>
							))}
							{TAG_GROUPS.map((group) => (
								<section
									className="tag-group"
									aria-labelledby={`tool-${group.title}`}
									key={group.title}
								>
									<h3 id={`tool-${group.title}`}>{group.title}</h3>
									<ul className="skill-list">
										{group.tags.map((tag) => (
											<li key={tag}>{tag}</li>
										))}
									</ul>
								</section>
							))}
						</div>
					</section>

					<section id="ai" className="container">
						<h2>AI를 프로세스에 편입시킨 방식</h2>
						<p className="section-note">
							코드 자동완성에 그치지 않고 개발 기준과 커리어 기록을 구조화하고, 생성된 변경을 직접
							검토하는 흐름에 활용합니다.
						</p>
						<div className="practice-grid">
							{PRACTICES.map((practice) => (
								<article className="practice-item" key={practice.title}>
									<span className="practice-label">{practice.label}</span>
									<h3>{practice.title}</h3>
									<p>{practice.text}</p>
									{practice.evidence && <p className="practice-evidence">{practice.evidence}</p>}
								</article>
							))}
						</div>
					</section>

					<section id="edu" className="container">
						<h2>학력</h2>
						<div className="education-list">
							{EDUCATION.map((edu) => (
								<article className="card" key={edu.title}>
									<div className="card-head start">
										<span className="card-meta">{edu.period}</span>
										{edu.ongoing && <span className="pill pill-secondary">Ongoing</span>}
									</div>
									<h3>{edu.title}</h3>
									{edu.topics ? (
										<ul className="education-topics">
											{edu.topics.map((topic) => (
												<li key={topic.title}>
													<strong>{topic.title}</strong>
													<span>{topic.text}</span>
												</li>
											))}
										</ul>
									) : (
										edu.text && <p>{edu.text}</p>
									)}
								</article>
							))}
						</div>
					</section>

					<div className="container closing">
						<div className="closing-title">함께 일할 이야기를 나눠요</div>
						<a className="closing-mail" href="mailto:gloriosd@gmail.com">
							gloriosd@gmail.com
						</a>
					</div>

					<div className="sticker-stage sticker-footer">
						<div className="footer-sticker-collage" aria-hidden="true">
							{/* 장식용 정적 자산이라 next/image 최적화가 필요 없다 */}
							{FOOTER_STICKERS.map((sticker) => (
								<img
									className={`footer-sticker ${sticker.modifier}`}
									src={`/${sticker.file}`}
									alt=""
									width={sticker.size}
									height={sticker.size}
									key={sticker.file}
								/>
							))}
						</div>
						<p className="footer-copyright">© 2026 송누리. All rights reserved.</p>
					</div>
				</PortfolioFeed>
			</div>
		</main>
	);
}
