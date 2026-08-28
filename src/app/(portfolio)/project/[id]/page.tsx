import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio-projects';

type ProjectPageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return PORTFOLIO_PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
	const { id } = await params;
	const project = PORTFOLIO_PROJECTS.find((item) => item.id === id);
	return project ? { title: `${project.title} · 송누리`, description: project.summary } : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { id } = await params;
	const project = PORTFOLIO_PROJECTS.find((item) => item.id === id);
	if (!project) notFound();

	return (
		<main>
			<div className="project-page">
				<article className="project-document">
					<Link className="back-link" href="/#work">
						← 대표 프로젝트
					</Link>
					<header className="project-hero">
						<div className="project-meta">
							<span>{project.meta}</span>
							{project.badge && (
								<span className={`pill pill-${project.badge.tone}`}>{project.badge.label}</span>
							)}
						</div>
						<h1>{project.title}</h1>
						<p className="project-summary">{project.summary}</p>
						<ul className="stack-list" aria-label="사용 기술과 핵심 주제">
							{project.stack.map((tech) => (
								<li key={tech}>{tech}</li>
							))}
						</ul>
					</header>
					<div className="article-body">
						{project.detail.map((block) => (
							<section className="article-section" key={block.title}>
								<h2>{block.title}</h2>
								<div className="article-block">
									{block.paragraphs?.map((paragraph) => (
										<p key={paragraph}>{paragraph}</p>
									))}
									{block.bullets && (
										<ul>
											{block.bullets.map((bullet) => (
												<li key={bullet}>{bullet}</li>
											))}
										</ul>
									)}
								</div>
							</section>
						))}
					</div>
					<footer className="project-footer">
						<p>다른 프로젝트의 문제 정의와 해결 과정도 이어서 확인할 수 있습니다.</p>
						<Link href="/#work">다른 프로젝트 보기</Link>
					</footer>
				</article>
			</div>
		</main>
	);
}
