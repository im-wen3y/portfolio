<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import '../app.css';

	let { children, data }: LayoutProps = $props();

	let scrolled = $state(false);
	let scrollProgress = $state(0);
	let menuOpen = $state(false);

	let isPortfolioActive = $derived(page.url.pathname.startsWith('/portfolio'));
	let isPortfolioIndex = $derived(page.url.pathname === '/portfolio');
	let isPrintActive = $derived(page.url.pathname.startsWith('/print'));
	let isShareablePage = $derived(isPortfolioActive);
	const socialTitle = '프론트엔드 개발자 · 송누리 · 포트폴리오';
	const socialDescription =
		'레거시 분석과 React 리뉴얼, UI·UX, 사용자 흐름과 운영 문제 해결 과정을 담은 송누리의 프론트엔드 포트폴리오입니다.';
	let socialUrl = $derived(`${page.url.origin}${page.url.pathname}`);
	let socialImageUrl = $derived(`${page.url.origin}${data.socialImagePath}`);

	function handleScroll() {
		scrolled = window.scrollY > 10;
		const scrollable = document.documentElement.scrollHeight - window.innerHeight;
		scrollProgress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') menuOpen = false;
	}

	function closeMenu() {
		menuOpen = false;
	}

	// 이미 포트폴리오에 있으면 같은 주소로의 이동 대신 맨 위로 올린다.
	function handleBrandClick(event: MouseEvent) {
		if (!isPortfolioIndex) return;
		event.preventDefault();
		closeMenu();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window onscroll={handleScroll} onkeydown={handleKeydown} />

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="alternate icon" href="/favicon.ico" sizes="any" />
	{#if isShareablePage}
		<meta name="description" content={socialDescription} />
		<meta property="og:type" content="website" />
		<meta property="og:locale" content="ko_KR" />
		<meta property="og:site_name" content="im-wen3y" />
		<meta property="og:title" content={socialTitle} />
		<meta property="og:description" content={socialDescription} />
		<meta property="og:url" content={socialUrl} />
		<meta property="og:image" content={socialImageUrl} />
		<meta property="og:image:type" content="image/png" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:alt" content="코드 괄호와 별 모양이 있는 im-wen3y 아이콘" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={socialTitle} />
		<meta name="twitter:description" content={socialDescription} />
		<meta name="twitter:image" content={socialImageUrl} />
		<meta name="twitter:image:alt" content="코드 괄호와 별 모양이 있는 im-wen3y 아이콘" />
	{/if}
	<title>{isShareablePage ? socialTitle : 'im-wen3y'}</title>
</svelte:head>

{#if !isPrintActive}
	<nav class="top-nav" class:scrolled>
		<div class="nav-inner">
			<a
				href={resolve('/portfolio')}
				class="brand"
				aria-label="송누리 홈"
				onclick={handleBrandClick}
			>
				<span class="brand-name">송누리</span>
				<span class="brand-role">Frontend Engineer</span>
			</a>
			<ul class="nav-links">
				{#if isPortfolioIndex}
					<li><a href="#career">경력</a></li>
					<li><a href="#work">프로젝트</a></li>
					<li><a href="#trouble">트러블슈팅</a></li>
					<li><a href="#skills">기술</a></li>
					<li><a href="#ai">AI 활용</a></li>
				{:else if isPortfolioActive}
					<li><a href={resolve('/portfolio')}>포트폴리오</a></li>
				{/if}
				{#if data.showPrintMenu}
					<li><a href={resolve('/print')}>PDF</a></li>
				{/if}
				<li><a class="nav-cta" href="mailto:gloriosd@gmail.com">연락하기</a></li>
			</ul>
			<button
				class="hamburger"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
				aria-expanded={menuOpen}
			>
				<span class="bar" class:open={menuOpen}></span>
				<span class="bar" class:open={menuOpen}></span>
				<span class="bar" class:open={menuOpen}></span>
			</button>
		</div>
		<div
			class="scroll-progress"
			style="transform: scaleX({scrollProgress})"
			aria-hidden="true"
		></div>
	</nav>

	{#if menuOpen}
		<div class="drawer-overlay" onclick={closeMenu} aria-hidden="true"></div>
	{/if}

	<div class="drawer" class:drawer-open={menuOpen} aria-hidden={!menuOpen}>
		<button class="drawer-close" onclick={closeMenu} aria-label="메뉴 닫기">
			<svg
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<line
					x1="1"
					y1="1"
					x2="17"
					y2="17"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
				<line
					x1="17"
					y1="1"
					x2="1"
					y2="17"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
		</button>
		<ul class="drawer-links">
			{#if isPortfolioIndex}
				<li><a href="#career" onclick={closeMenu}>경력</a></li>
				<li><a href="#work" onclick={closeMenu}>프로젝트</a></li>
				<li><a href="#trouble" onclick={closeMenu}>트러블슈팅</a></li>
				<li><a href="#skills" onclick={closeMenu}>기술</a></li>
				<li><a href="#ai" onclick={closeMenu}>AI 활용</a></li>
			{:else if isPortfolioActive}
				<li><a href={resolve('/portfolio')} onclick={closeMenu}>포트폴리오</a></li>
			{/if}
			{#if data.showPrintMenu}
				<li><a href={resolve('/print')} onclick={closeMenu}>PDF</a></li>
			{/if}
		</ul>
		<a class="drawer-cta" href="mailto:gloriosd@gmail.com" onclick={closeMenu}>연락하기</a>
	</div>
{/if}

<main class:print-page={isPrintActive}>
	{@render children()}
</main>

{#if isShareablePage}
	<footer class="site-footer">
		<div class="site-footer-inner">
			<div>
				<strong>송누리</strong>
				<p>Frontend Developer · 7년차</p>
			</div>
			<div class="site-footer-links">
				<a href="mailto:gloriosd@gmail.com">gloriosd@gmail.com</a>
				<a href="https://www.linkedin.com/in/im-wen3y" target="_blank" rel="noopener noreferrer"
					>LinkedIn</a
				>
				<a href="https://velog.io/@imwen3y/posts" target="_blank" rel="noopener noreferrer">Velog</a
				>
			</div>
		</div>
	</footer>
{/if}

<style>
	.top-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: 64px;
		background-color: rgba(241, 247, 245, 0.92);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		transition: background-color 0.2s ease;
	}

	.top-nav::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background-color: var(--color-hairline);
		pointer-events: none;
	}

	.scroll-progress {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		height: 3px;
		background: var(--color-primary);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 80ms linear;
	}

	.top-nav.scrolled {
		background-color: rgba(241, 247, 245, 0.98);
	}

	.nav-inner {
		max-width: var(--container-max, 1200px);
		margin: 0 auto;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
		padding: 0 clamp(20px, 5vw, 64px);
	}

	.brand {
		position: relative;
		display: inline-flex;
		align-items: baseline;
		gap: var(--space-sm);
	}

	.brand-name {
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.01em;
		color: var(--color-ink);
	}

	.brand-role {
		font-size: 13px;
		font-weight: 600;
		line-height: 1;
		color: var(--color-muted);
	}

	.brand::after {
		position: absolute;
		bottom: -7px;
		left: 0;
		width: 2.6em;
		height: 2px;
		border-radius: var(--rounded-pill);
		background: var(--color-primary);
		content: '';
		opacity: 0;
		transform: scaleX(0.4);
		transform-origin: left;
		transition:
			opacity 0.18s ease,
			transform 0.18s ease;
	}

	.brand:hover::after,
	.brand:focus-visible::after {
		opacity: 1;
		transform: scaleX(1);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: clamp(16px, 2.2vw, 28px);
		list-style: none;
	}

	.nav-links a {
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 600;
		line-height: 1.4;
		color: var(--color-ink);
		transition: color 0.2s ease;
	}

	.nav-links a:hover {
		color: var(--color-primary-strong);
	}

	.nav-cta {
		display: inline-flex;
		align-items: center;
		padding: 8px 16px;
		border-radius: var(--radius-default);
		background: var(--color-primary);
		font-weight: 700;
	}

	.nav-links a.nav-cta,
	.nav-links a.nav-cta:hover {
		color: var(--color-on-primary);
	}

	.nav-cta:hover {
		background: var(--color-primary-active);
	}

	/* Hamburger */
	.hamburger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 36px;
		height: 36px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
	}

	.bar {
		display: block;
		width: 22px;
		height: 2px;
		background-color: var(--color-ink);
		border-radius: 2px;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
		transform-origin: center;
	}

	.bar:nth-child(1).open {
		transform: translateY(7px) rotate(45deg);
	}

	.bar:nth-child(2).open {
		opacity: 0;
	}

	.bar:nth-child(3).open {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Drawer overlay */
	.drawer-overlay {
		position: fixed;
		inset: 0;
		z-index: 150;
		background-color: rgba(0, 0, 0, 0.55);
	}

	/* Drawer */
	.drawer {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 200;
		width: 260px;
		height: 100dvh;
		background-color: var(--color-canvas);
		border-left: 1px solid var(--color-hairline);
		transform: translateX(100%);
		transition: transform 0.25s ease;
		display: flex;
		flex-direction: column;
		padding: 80px var(--space-xl) var(--space-xl);
	}

	.drawer-open {
		transform: translateX(0);
	}

	.drawer-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		flex: 1;
	}

	.drawer-close {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-muted);
		border-radius: var(--rounded-md);
		transition:
			color 0.15s ease,
			background-color 0.15s ease;
	}

	.drawer-close:hover {
		color: var(--color-ink);
		background-color: var(--color-surface-soft);
	}

	.drawer-links a {
		display: block;
		padding: var(--space-sm) 0;
		border-bottom: 1px solid var(--color-hairline-soft);
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 700;
		letter-spacing: -0.4px;
		color: var(--color-ink);
		transition: color 0.15s ease;
	}

	.drawer-links a:hover {
		color: var(--color-primary-strong);
	}

	.drawer-cta {
		display: block;
		padding: var(--space-sm);
		border-radius: var(--radius-default);
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-size: 15px;
		font-weight: 700;
		text-align: center;
	}

	main {
		padding-top: 64px;
	}

	main.print-page {
		padding-top: 0;
	}

	.site-footer {
		padding: 40px var(--space-lg);
		background: var(--color-surface-dark);
		color: var(--color-on-dark);
	}

	.site-footer-inner {
		display: flex;
		justify-content: space-between;
		gap: var(--space-xl);
		max-width: 1028px;
		margin: 0 auto;
	}

	.site-footer strong {
		font-size: 18px;
	}

	.site-footer p {
		margin-top: 4px;
		color: var(--color-on-dark-soft);
		font-size: 13px;
	}

	.site-footer-links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		gap: var(--space-lg);
		font-size: 13px;
		color: var(--color-on-dark-soft);
	}

	.site-footer-links a:hover {
		color: #ffffff;
	}

	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.hamburger {
			display: flex;
		}

		.site-footer-inner,
		.site-footer-links {
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			gap: var(--space-sm);
		}
	}
</style>
