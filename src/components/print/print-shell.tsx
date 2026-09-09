'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type {
	PrintCareerData,
	PrintPortfolioData,
	PrintResumeData,
	PrintSharedResumeData,
	PrintTargetResume,
	PrintTargetResumeId
} from '@/data/print-profile';
import { usePrintTheme } from '@/lib/use-print-theme';
import { CareerPages } from './career-pages';
import { PortfolioPages } from './portfolio-pages';
import { ResumePages } from './resume-pages';
import { TargetCareerPages } from './target-career-pages';
import { TargetResumePages } from './target-resume-pages';

export type PrintVariant = 'v1' | 'career' | 'portfolio' | 'career-org-3' | PrintTargetResumeId;

const TOAST_DURATION_MS = 3000;

const DOCUMENTS = [
	{ label: '이력서', id: 'resume', href: '/print/v1' },
	{ label: '경력기술서', id: 'career', href: '/print/career' },
	{ label: '지원용', id: 'target', href: '/print/senior' }
];

// 지원 대상 이름·강조 문구는 각 페이지 서버 컴포넌트가 조회해 props로 내려준다.
// 여기서는 탭 이동에 필요한 라벨만 갖는다 (print-profile.ts 전체를 import하지 않는다).
// 탭에 없는 지원용 문서도 URL로는 그대로 열린다.
const TARGET_NAV: { id: PrintTargetResumeId; label: string; href: string }[] = [
	{ id: 'senior', label: '시니어 FE', href: '/print/senior' },
	{ id: 'org-1', label: '지원처 1 FE', href: '/print/org-1' },
	{ id: 'org-2', label: '지원처 2 FE', href: '/print/org-2' },
	{ id: 'org-3', label: '지원처 3 FE', href: '/print/org-3' }
];

// 탭 목록(TARGET_NAV)과 분리한다. 탭에서 빼는 것은 화면에서 감추는 일이고,
// 여기서 빼는 것은 그 라우트를 지원용 이력서가 아닌 것으로 만드는 일이다.
// Record로 두면 새 지원처를 추가할 때 컴파일러가 빠뜨린 항목을 잡아준다.
const TARGET_RESUME_IDS: Record<PrintTargetResumeId, true> = {
	senior: true,
	'org-1': true,
	product: true,
	'org-2': true,
	'org-3': true
};

function isTargetVariant(variant: PrintVariant): variant is PrintTargetResumeId {
	return variant in TARGET_RESUME_IDS;
}

// 문서 제목은 각 라우트의 metadata가 갖는다. 여기서는 탭 활성화만 판단한다.
function resolveDocumentId(variant: PrintVariant): string {
	if (isTargetVariant(variant)) return 'target';
	if (variant === 'career') return 'career';
	if (variant === 'career-org-3') return 'target-career';
	if (variant === 'portfolio') return 'portfolio';
	return 'resume';
}

/** 문서 종류 탭과, 지원용 문서일 때만 나오는 버전 탭 */
function DocumentTabs({ variant }: { variant: PrintVariant }) {
	const currentDocumentId = resolveDocumentId(variant);

	return (
		<>
			<nav className="doc-switch" aria-label="문서 종류">
				{DOCUMENTS.map((doc) => (
					<Link
						href={doc.href}
						className={doc.id === currentDocumentId ? 'doc-switch-item active' : 'doc-switch-item'}
						aria-current={doc.id === currentDocumentId ? 'page' : undefined}
						key={doc.id}
					>
						{doc.label}
					</Link>
				))}
			</nav>
			{isTargetVariant(variant) && (
				<nav className="target-doc-switch" aria-label="지원용 이력서 버전">
					{TARGET_NAV.map((doc) => (
						<Link
							href={doc.href}
							className={doc.id === variant ? 'active' : undefined}
							aria-current={doc.id === variant ? 'page' : undefined}
							key={doc.id}
						>
							{doc.label}
						</Link>
					))}
				</nav>
			)}
		</>
	);
}

/** 인쇄 미리보기 화면에만 있는 조작부. 문서 자체가 아니라 화면 UI라 인쇄 시에는 CSS로 감춘다 */
function PrintChrome({
	variant,
	isDark,
	toggle
}: {
	variant: PrintVariant;
	isDark: boolean;
	toggle: () => void;
}) {
	const [floatingMenuOpen, setFloatingMenuOpen] = useState(false);
	const [toastVisible, setToastVisible] = useState(false);
	const toastTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	useEffect(() => {
		function handleKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') setFloatingMenuOpen(false);
		}
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	}, []);

	useEffect(() => () => clearTimeout(toastTimeout.current), []);

	function handlePrint() {
		// 다크 배경은 브라우저 인쇄 설정을 켜야 나오므로 미리 알려준다
		if (isDark) {
			setToastVisible(true);
			clearTimeout(toastTimeout.current);
			toastTimeout.current = setTimeout(() => setToastVisible(false), TOAST_DURATION_MS);
		}
		window.print();
	}

	return (
		<>
			<div className="controls">
				<Link href="/" className="back-link">
					← 포트폴리오로
				</Link>
				<DocumentTabs variant={variant} />
				<div className="document-tools">
					<button type="button" onClick={handlePrint} className="save-btn">
						PDF 다운로드
					</button>
				</div>
			</div>

			<div className="floating-actions">
				{floatingMenuOpen && (
					<div id="print-floating-menu" className="floating-menu" aria-label="문서 설정">
						<button
							type="button"
							className="floating-action"
							onClick={toggle}
							aria-label={isDark ? '라이트 테마로 변경' : '다크 테마로 변경'}
						>
							<span className="floating-action-label">{isDark ? '라이트 테마' : '다크 테마'}</span>
							<span className="floating-action-icon" aria-hidden="true">
								{isDark ? (
									<svg viewBox="0 0 24 24">
										<circle cx="12" cy="12" r="4" />
										<path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
									</svg>
								) : (
									<svg viewBox="0 0 24 24">
										<path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
									</svg>
								)}
							</span>
						</button>

						<form method="POST" action="/owner/logout">
							<button type="submit" className="floating-action" aria-label="로그아웃">
								<span className="floating-action-label">로그아웃</span>
								<span className="floating-action-icon" aria-hidden="true">
									<svg viewBox="0 0 24 24">
										<path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 8l4 4-4 4M8 12h10" />
									</svg>
								</span>
							</button>
						</form>
					</div>
				)}

				<button
					type="button"
					className={floatingMenuOpen ? 'floating-trigger open' : 'floating-trigger'}
					onClick={() => setFloatingMenuOpen((open) => !open)}
					aria-expanded={floatingMenuOpen}
					aria-controls="print-floating-menu"
					aria-label={floatingMenuOpen ? '문서 설정 닫기' : '문서 설정 열기'}
				>
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<circle cx="12" cy="12" r="3" />
						<path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.1-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.1 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.12.37.34.7.6 1 .3.28.68.42 1.1.4h.09a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.7.6Z" />
					</svg>
				</button>
			</div>

			<div
				className={toastVisible ? 'print-toast print-toast-visible' : 'print-toast'}
				role="status"
				aria-hidden={!toastVisible}
			>
				다크 배경이 보이려면 인쇄 설정에서 &apos;배경 그래픽&apos;을 켜주세요.
			</div>
		</>
	);
}

export function PrintShell({
	variant = 'v1',
	targetResume,
	sharedResumeData,
	resumeData,
	careerData,
	portfolioData,
	publicView = false
}: {
	variant?: PrintVariant;
	/**
	 * 인증 없이 열리는 경로(/resume)용. 연락처와 문서 전환·설정 조작부를 모두 감춘다.
	 * 다른 문서 버전의 존재가 링크로 드러나지 않게 하기 위한 것이다
	 */
	publicView?: boolean;
	targetResume?: PrintTargetResume;
	sharedResumeData?: PrintSharedResumeData;
	resumeData?: PrintResumeData;
	careerData?: PrintCareerData;
	portfolioData?: PrintPortfolioData;
}) {
	const { isDark, toggle } = usePrintTheme();

	return (
		<>
			{!publicView && <PrintChrome variant={variant} isDark={isDark} toggle={toggle} />}

			<div className="preview-wrap">
				<div className="resume-pages">
					<PrintDocument
						variant={variant}
						targetResume={targetResume}
						sharedResumeData={sharedResumeData}
						resumeData={resumeData}
						careerData={careerData}
						portfolioData={portfolioData}
						dark={isDark}
						showContact={!publicView}
					/>
				</div>
			</div>
		</>
	);
}

function CareerDocument({
	sharedResumeData,
	careerData,
	dark
}: {
	sharedResumeData?: PrintSharedResumeData;
	careerData?: PrintCareerData;
	dark: boolean;
}) {
	if (!sharedResumeData || !careerData) {
		throw new Error('경력기술서 데이터가 전달되지 않았습니다.');
	}
	return (
		<CareerPages
			pages={['01', '02', '03', '04']}
			total="04"
			dark={dark}
			experiences={sharedResumeData.compactExperiences}
			organizationContributions={careerData.organizationContributions}
			education={sharedResumeData.education}
		/>
	);
}

function TargetCareerDocument({
	targetResume,
	sharedResumeData,
	careerData,
	dark
}: {
	targetResume?: PrintTargetResume;
	sharedResumeData?: PrintSharedResumeData;
	careerData?: PrintCareerData;
	dark: boolean;
}) {
	if (!targetResume || !sharedResumeData || !careerData) {
		throw new Error('지원용 경력기술서 데이터가 전달되지 않았습니다.');
	}
	return (
		<TargetCareerPages
			profile={targetResume}
			shared={sharedResumeData}
			organizationContributions={careerData.organizationContributions}
			dark={dark}
		/>
	);
}

function TargetResumeDocument({
	targetResume,
	sharedResumeData,
	dark,
	showContact
}: {
	targetResume?: PrintTargetResume;
	sharedResumeData?: PrintSharedResumeData;
	dark: boolean;
	showContact: boolean;
}) {
	if (!targetResume || !sharedResumeData) {
		throw new Error('지원용 이력서 데이터가 전달되지 않았습니다.');
	}
	return (
		<TargetResumePages
			profile={targetResume}
			shared={sharedResumeData}
			dark={dark}
			showContact={showContact}
		/>
	);
}

function ResumeDocument({
	sharedResumeData,
	resumeData,
	careerData,
	dark
}: {
	sharedResumeData?: PrintSharedResumeData;
	resumeData?: PrintResumeData;
	careerData?: PrintCareerData;
	dark: boolean;
}) {
	if (!sharedResumeData || !resumeData || !careerData) {
		throw new Error('이력서 데이터가 전달되지 않았습니다.');
	}
	return (
		<ResumePages
			dark={dark}
			phone={sharedResumeData.phone}
			totalExperience={sharedResumeData.totalExperience}
			skills={sharedResumeData.skills}
			coreCompetencies={resumeData.coreCompetencies}
			summary={resumeData.summary}
			experiences={sharedResumeData.compactExperiences}
			organizationContributions={careerData.organizationContributions}
			education={sharedResumeData.education}
		/>
	);
}

function PortfolioDocument({
	sharedResumeData,
	portfolioData,
	dark
}: {
	sharedResumeData?: PrintSharedResumeData;
	portfolioData?: PrintPortfolioData;
	dark: boolean;
}) {
	if (!sharedResumeData || !portfolioData) {
		throw new Error('포트폴리오 데이터가 전달되지 않았습니다.');
	}
	return (
		<PortfolioPages
			dark={dark}
			phone={sharedResumeData.phone}
			totalExperience={sharedResumeData.totalExperience}
			skills={sharedResumeData.skills}
			education={sharedResumeData.education}
			intro={portfolioData.intro}
			stack={portfolioData.stack}
			experiences={portfolioData.experiences}
			collaboration={portfolioData.collaboration}
		/>
	);
}

function PrintDocument({
	variant,
	targetResume,
	sharedResumeData,
	resumeData,
	careerData,
	portfolioData,
	dark,
	showContact
}: {
	variant: PrintVariant;
	targetResume?: PrintTargetResume;
	sharedResumeData?: PrintSharedResumeData;
	resumeData?: PrintResumeData;
	careerData?: PrintCareerData;
	portfolioData?: PrintPortfolioData;
	dark: boolean;
	showContact: boolean;
}) {
	if (variant === 'career') {
		return (
			<CareerDocument sharedResumeData={sharedResumeData} careerData={careerData} dark={dark} />
		);
	}
	if (variant === 'career-org-3') {
		return (
			<TargetCareerDocument
				targetResume={targetResume}
				sharedResumeData={sharedResumeData}
				careerData={careerData}
				dark={dark}
			/>
		);
	}
	if (isTargetVariant(variant)) {
		return (
			<TargetResumeDocument
				targetResume={targetResume}
				sharedResumeData={sharedResumeData}
				dark={dark}
				showContact={showContact}
			/>
		);
	}
	if (variant === 'portfolio') {
		return (
			<PortfolioDocument
				sharedResumeData={sharedResumeData}
				portfolioData={portfolioData}
				dark={dark}
			/>
		);
	}
	return (
		<ResumeDocument
			sharedResumeData={sharedResumeData}
			resumeData={resumeData}
			careerData={careerData}
			dark={dark}
		/>
	);
}
