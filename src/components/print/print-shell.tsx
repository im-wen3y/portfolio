'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PRINT_TARGET_RESUMES, type PrintTargetResumeId } from '@/data/print-profile';
import { usePrintTheme } from '@/lib/use-print-theme';
import { CareerPages } from './career-pages';
import { PortfolioPages } from './portfolio-pages';
import { ResumePages } from './resume-pages';
import { TargetResumePages } from './target-resume-pages';

export type PrintVariant = 'v1' | 'career' | 'portfolio' | PrintTargetResumeId;

const TOAST_DURATION_MS = 3000;

const DOCUMENTS = [
	{ label: '이력서', id: 'resume', href: '/print' },
	{ label: '경력기술서', id: 'career', href: '/print/career' },
	{ label: '지원용', id: 'target', href: '/print/senior' }
];

const TARGET_DOCUMENTS = [
	{ ...PRINT_TARGET_RESUMES.senior, href: '/print/senior' },
	{ ...PRINT_TARGET_RESUMES.lead, href: '/print/lead' },
	{ ...PRINT_TARGET_RESUMES.product, href: '/print/product' }
];

function toTargetResume(variant: PrintVariant) {
	return variant === 'senior' || variant === 'lead' || variant === 'product'
		? PRINT_TARGET_RESUMES[variant]
		: undefined;
}

export function PrintShell({ variant = 'v1' }: { variant?: PrintVariant }) {
	const { isDark, toggle } = usePrintTheme();
	const [floatingMenuOpen, setFloatingMenuOpen] = useState(false);
	const [toastVisible, setToastVisible] = useState(false);
	const toastTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const targetResume = toTargetResume(variant);

	// 문서 제목은 각 라우트의 metadata가 갖는다. 여기서는 탭 활성화만 판단한다.
	function resolveDocumentId(): string {
		if (targetResume) return 'target';
		if (variant === 'career') return 'career';
		if (variant === 'portfolio') return 'portfolio';
		return 'resume';
	}
	const currentDocumentId = resolveDocumentId();

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
				<nav className="doc-switch" aria-label="문서 종류">
					{DOCUMENTS.map((doc) => (
						<Link
							href={doc.href}
							className={
								doc.id === currentDocumentId ? 'doc-switch-item active' : 'doc-switch-item'
							}
							aria-current={doc.id === currentDocumentId ? 'page' : undefined}
							key={doc.id}
						>
							{doc.label}
						</Link>
					))}
				</nav>
				{targetResume && (
					<nav className="target-doc-switch" aria-label="지원용 이력서 버전">
						{TARGET_DOCUMENTS.map((doc) => (
							<Link
								href={doc.href}
								className={doc.id === targetResume.id ? 'active' : undefined}
								aria-current={doc.id === targetResume.id ? 'page' : undefined}
								key={doc.id}
							>
								{doc.label}
							</Link>
						))}
					</nav>
				)}
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

			<div className="preview-wrap">
				<div className="resume-pages">
					<PrintDocument variant={variant} dark={isDark} />
				</div>
			</div>
		</>
	);
}

function PrintDocument({ variant, dark }: { variant: PrintVariant; dark: boolean }) {
	const targetResume = toTargetResume(variant);

	if (variant === 'career') {
		return <CareerPages pages={['01', '02', '03', '04']} total="04" dark={dark} />;
	}
	if (targetResume) return <TargetResumePages profile={targetResume} dark={dark} />;
	if (variant === 'portfolio') return <PortfolioPages dark={dark} />;
	return <ResumePages dark={dark} />;
}
