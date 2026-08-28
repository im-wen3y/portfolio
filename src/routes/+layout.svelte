<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import '../app.css';

	let { children, data }: LayoutProps = $props();

	let scrolled = $state(false);
	let scrollProgress = $state(0);
	let menuOpen = $state(false);

	const isPortfolioActive = false;
	const isPortfolioIndex = false;
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
	<link rel="icon" href="/favicon.ico" sizes="any" />
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
	<nav
		class="top-nav"
		class:portfolio-nav={isPortfolioActive}
		class:portfolio-index-nav={isPortfolioIndex}
		class:scrolled
	>
		<div class="nav-inner">
			<a
				href="https://im-wen3yz.vercel.app/portfolio"
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
					<li><a href="https://im-wen3yz.vercel.app/portfolio">포트폴리오</a></li>
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

	<div
		class="drawer"
		class:portfolio-drawer={isPortfolioActive}
		class:drawer-open={menuOpen}
		aria-hidden={!menuOpen}
	>
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
				<li>
					<a href="https://im-wen3yz.vercel.app/portfolio" onclick={closeMenu}>포트폴리오</a>
				</li>
			{/if}
			{#if data.showPrintMenu}
				<li><a href={resolve('/print')} onclick={closeMenu}>PDF</a></li>
			{/if}
		</ul>
		<a class="drawer-cta" href="mailto:gloriosd@gmail.com" onclick={closeMenu}>연락하기</a>
	</div>
{/if}

<main
	class:portfolio-page={isPortfolioActive}
	class:portfolio-index-page={isPortfolioIndex}
	class:print-page={isPrintActive}
>
	{@render children()}
</main>

{#if isShareablePage}
	<footer
		class="site-footer"
		class:portfolio-footer={isPortfolioActive}
		class:portfolio-index-footer={isPortfolioIndex}
	>
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

	/* Portfolio is presented as a focused mobile-width reading surface on every viewport. */
	.portfolio-nav {
		left: 50%;
		z-index: 250;
		width: min(100%, 540px);
		right: auto;
		transform: translateX(-50%);
		box-shadow: 0 1px 0 var(--color-hairline);
	}

	:global(body:has(main.portfolio-page)) {
		background:
			radial-gradient(circle, rgb(46 51 64 / 12%) 1px, transparent 1.5px) 0 0 / 18px 18px,
			#eeeaff;
	}

	.portfolio-nav .nav-inner {
		padding-inline: 20px;
	}

	.portfolio-nav .brand-role,
	.portfolio-nav .nav-links {
		display: none;
	}

	.portfolio-nav .hamburger {
		display: flex;
		gap: 6px;
		align-items: center;
	}

	.portfolio-drawer {
		top: 64px;
		right: 50%;
		width: min(100%, 540px);
		height: auto;
		max-height: calc(100dvh - 64px);
		padding: 20px 24px 28px;
		border-top: 1px solid var(--color-hairline-soft);
		border-left: 0;
		border-radius: 0 0 16px 16px;
		opacity: 0;
		overflow-y: auto;
		visibility: hidden;
		transform: translate(50%, -12px) scale(0.98);
		transform-origin: top center;
		transition:
			opacity 180ms ease,
			transform 180ms ease,
			visibility 180ms ease;
	}

	.portfolio-drawer.drawer-open {
		opacity: 1;
		visibility: visible;
		transform: translate(50%, 0) scale(1);
	}

	.portfolio-drawer .drawer-close {
		display: none;
	}

	.portfolio-nav .bar {
		width: 20px;
	}

	.portfolio-nav .bar:nth-child(3) {
		display: none;
	}

	.portfolio-nav .bar:nth-child(1).open {
		transform: translateY(4px) rotate(45deg);
	}

	.portfolio-nav .bar:nth-child(2).open {
		opacity: 1;
		transform: translateY(-4px) rotate(-45deg);
	}

	.portfolio-drawer .drawer-links {
		gap: 0;
	}

	.portfolio-drawer .drawer-links a {
		padding: 14px 0;
		font-size: 18px;
	}

	.portfolio-drawer .drawer-cta {
		margin-top: 20px;
		border-radius: 10px;
	}

	main.portfolio-page {
		width: min(100%, 540px);
		margin-inline: auto;
		background: var(--color-canvas);
		box-shadow: 0 0 48px color-mix(in srgb, var(--color-ink) 14%, transparent);
	}

	.portfolio-footer {
		width: min(100%, 540px);
		margin-inline: auto;
		padding-inline: 28px;
	}

	.portfolio-footer .site-footer-inner,
	.portfolio-footer .site-footer-links {
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: var(--space-sm);
	}

	.portfolio-nav {
		border-inline: 2px solid #2e3340;
		border-bottom: 2px solid #2e3340;
		background: #fffdf8;
		box-shadow: 5px 5px 0 #77deb9;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
	}

	.portfolio-nav::after {
		display: none;
	}

	.portfolio-nav.scrolled {
		background: #fffdf8;
	}

	.portfolio-nav .brand-name {
		display: inline-block;
		padding: 4px 9px;
		border: 1.5px solid #2e3340;
		border-radius: 8px;
		background: #fff4bf;
		box-shadow: 2px 2px 0 #2e3340;
		font-size: 15px;
		transform: rotate(-1deg);
	}

	.portfolio-nav .hamburger {
		border: 2px solid #2e3340;
		border-radius: 10px;
		background: #dff8ef;
		box-shadow: 3px 3px 0 #2e3340;
	}

	.portfolio-nav .bar {
		background: #2e3340;
	}

	.portfolio-index-nav {
		left: 0;
		right: 0;
		width: 100%;
		border-inline: 0;
		border-bottom: 1px solid var(--color-hairline);
		background: rgb(244 247 246 / 92%);
		box-shadow: none;
		transform: none;
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	.portfolio-index-nav.scrolled {
		background: rgb(244 247 246 / 97%);
	}

	.portfolio-index-nav .brand-name {
		padding: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		box-shadow: none;
		font-size: 15px;
		transform: none;
	}

	.portfolio-drawer {
		border: 2px solid #2e3340;
		border-top: 0;
		background: #fffdf8;
		box-shadow: 6px 6px 0 #b9a7ec;
	}

	.portfolio-drawer .drawer-links a {
		border-bottom: 1.5px dashed #7a7f89;
	}

	.portfolio-drawer .drawer-cta {
		border: 2px solid #2e3340;
		background: #77deb9;
		box-shadow: 3px 3px 0 #2e3340;
		color: #2e3340;
	}

	/* 포트폴리오에서는 링크·버튼·텍스트 등 모든 상태를 같은 스티커 커서로 통일한다 */
	@media (pointer: fine) {
		:global(body:has(main.portfolio-page)),
		:global(body:has(main.portfolio-page) *) {
			cursor:
				url('/cursor-isometric.png') 4 4,
				auto;
		}

		:global(body:has(main.portfolio-index-page)),
		:global(body:has(main.portfolio-index-page) *) {
			cursor: auto;
		}

		:global(body:has(main.portfolio-index-page) :is(a, button)) {
			cursor: pointer;
		}
	}

	@media (min-width: 900px) {
		.portfolio-nav,
		main.portfolio-page,
		.portfolio-footer {
			width: min(100%, 1040px);
		}

		.portfolio-index-nav,
		main.portfolio-index-page,
		.portfolio-index-footer {
			width: 100%;
			max-width: none;
		}

		.portfolio-index-nav .nav-inner {
			width: min(100%, 1280px);
			margin-inline: auto;
			padding-inline: clamp(24px, 6vw, 80px);
		}

		.portfolio-index-nav .brand-role,
		.portfolio-index-nav .nav-links {
			display: flex;
		}

		.portfolio-index-nav .hamburger {
			display: none;
		}

		.portfolio-index-nav {
			top: 24px;
			bottom: 24px;
			left: 24px;
			right: auto;
			width: 184px;
			height: auto;
			border: 2px solid #11100f;
			border-radius: 26px;
			background: #f2e8df;
			overflow: hidden;
		}

		.portfolio-index-nav.scrolled {
			background: #f2e8df;
		}

		.portfolio-index-nav .nav-inner {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			justify-content: flex-start;
			gap: 14px;
			width: 100%;
			height: 100%;
			padding: 18px;
		}

		.portfolio-index-nav .brand {
			display: block;
			padding: 8px 2px 12px;
		}

		.portfolio-index-nav .brand-name {
			font-size: 24px;
			font-weight: 900;
			letter-spacing: -0.06em;
		}

		.portfolio-index-nav .brand-role {
			margin-top: 3px;
			font-size: 9px;
			font-weight: 700;
			text-transform: uppercase;
		}

		.portfolio-index-nav .nav-links {
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: stretch;
			gap: 8px;
			width: 100%;
		}

		.portfolio-index-nav .nav-links li {
			width: 100%;
		}

		.portfolio-index-nav .nav-links a {
			display: flex;
			align-items: flex-end;
			width: 100%;
			min-height: 58px;
			padding: 10px;
			border: 1.5px solid #11100f;
			border-radius: 11px;
			background: #238fe8;
			font-size: 12px;
			font-weight: 800;
			color: #11100f;
		}

		.portfolio-index-nav .nav-links li:nth-child(2) a {
			background: #ffc21c;
		}

		.portfolio-index-nav .nav-links li:nth-child(3) a {
			background: #ff5422;
		}

		.portfolio-index-nav .nav-links li:nth-child(4) a {
			background: #14bc43;
		}

		.portfolio-index-nav .nav-links li:nth-child(5) a {
			background: #b55cf0;
		}

		.portfolio-index-nav .nav-links .nav-cta {
			min-height: 44px;
			background: #11100f;
			color: #f2e8df;
		}

		main.portfolio-index-page {
			padding-left: 208px;
			background: #1378df;
		}

		.portfolio-index-footer {
			padding-left: 232px;
		}
	}

	@media (prefers-color-scheme: dark) {
		main.portfolio-index-page {
			background: #0d4384;
		}
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
