'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// CSS(globals.css)는 구 +layout.svelte의 top-nav / drawer 구조를 그대로 물려받는다.
// 클래스 이름을 바꾸면 스타일이 통째로 깨지므로 마크업 구조를 원본에 맞춘다.
const LINKS = [
	{ href: '/#career', label: '경력' },
	{ href: '/#work', label: '프로젝트' },
	{ href: '/#trouble', label: '트러블슈팅' },
	{ href: '/#skills', label: '기술' },
	{ href: '/#ai', label: 'AI 활용' }
];

export function PortfolioNav() {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		function closeWithEscape(event: KeyboardEvent) {
			if (event.key === 'Escape') setMenuOpen(false);
		}
		window.addEventListener('keydown', closeWithEscape);
		return () => window.removeEventListener('keydown', closeWithEscape);
	}, []);

	const closeMenu = () => setMenuOpen(false);

	return (
		<>
			<nav className="top-nav portfolio-index-nav" aria-label="주요 메뉴">
				<div className="nav-inner">
					<Link className="brand" href="/" aria-label="송누리 홈" onClick={closeMenu}>
						<span className="brand-name">송누리</span>
						<span className="brand-role">Frontend Engineer</span>
					</Link>
					<ul className="nav-links">
						{LINKS.map((link) => (
							<li key={link.href}>
								<Link href={link.href}>{link.label}</Link>
							</li>
						))}
						<li>
							<a className="nav-cta" href="mailto:gloriosd@gmail.com">
								연락하기
							</a>
						</li>
					</ul>
					<button
						className="hamburger"
						type="button"
						onClick={() => setMenuOpen((open) => !open)}
						aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
						aria-expanded={menuOpen}
					>
						<span className={menuOpen ? 'bar open' : 'bar'} />
						<span className={menuOpen ? 'bar open' : 'bar'} />
						<span className={menuOpen ? 'bar open' : 'bar'} />
					</button>
				</div>
			</nav>

			{menuOpen && <div className="drawer-overlay" onClick={closeMenu} aria-hidden="true" />}

			<div className={menuOpen ? 'drawer drawer-open' : 'drawer'} aria-hidden={!menuOpen}>
				<button className="drawer-close" type="button" onClick={closeMenu} aria-label="메뉴 닫기">
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
						<line
							x1="1"
							y1="1"
							x2="17"
							y2="17"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<line
							x1="17"
							y1="1"
							x2="1"
							y2="17"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button>
				<ul className="drawer-links">
					{LINKS.map((link) => (
						<li key={link.href}>
							<Link href={link.href} onClick={closeMenu}>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
				<a className="drawer-cta" href="mailto:gloriosd@gmail.com" onClick={closeMenu}>
					연락하기
				</a>
			</div>
		</>
	);
}
