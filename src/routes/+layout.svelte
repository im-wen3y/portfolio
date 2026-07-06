<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import iconDownload from '$lib/assets/icon-download.png';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { printTheme } from '$lib/stores/print-theme.svelte';
	import '../app.css';

	let { children } = $props();

	let scrolled = $state(false);
	let menuOpen = $state(false);

	let isPrintPage = $derived(page.url.pathname === '/resume/print');
	let isResumeActive = $derived(page.url.pathname.startsWith('/resume'));
	let isPortfolioActive = $derived(page.url.pathname === '/portfolio');
	let showPdfButton = $derived(page.url.pathname === '/resume');

	function handleScroll() {
		scrolled = window.scrollY > 10;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') menuOpen = false;
	}

	function closeMenu() {
		menuOpen = false;
	}

	onMount(() => {
		printTheme.hydrate();
	});
</script>

<svelte:window onscroll={handleScroll} onkeydown={handleKeydown} />

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans+KR:wght@300;400;500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&family=Noto+Serif+KR:wght@400;500&display=swap"
		rel="stylesheet"
	/>
	<title>im-wen3y</title>
</svelte:head>

<nav class="top-nav" class:scrolled>
	<div class="nav-inner">
		<a href={resolve('/resume')} class="wordmark">im-wen3y</a>
		{#if isPrintPage}
			<button
				type="button"
				class="theme-switch"
				onclick={() => printTheme.toggle()}
				role="switch"
				aria-checked={printTheme.value === 'dark'}
			>
				<span class="theme-switch-track" class:is-dark={printTheme.value === 'dark'}>
					<span class="theme-switch-thumb">
						{#if printTheme.value === 'dark'}
							<svg
								class="theme-switch-icon"
								viewBox="0 0 16 16"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a.5.5 0 0 0-.65-.62A6.5 6.5 0 1 0 14.12 10.15a.5.5 0 0 0-.62-.65Z"
								/>
							</svg>
						{:else}
							<svg
								class="theme-switch-icon"
								viewBox="0 0 16 16"
								fill="currentColor"
								aria-hidden="true"
							>
								<circle cx="8" cy="8" r="3.2" />
								<g stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
									<line x1="8" y1="0.8" x2="8" y2="2.4" />
									<line x1="8" y1="13.6" x2="8" y2="15.2" />
									<line x1="0.8" y1="8" x2="2.4" y2="8" />
									<line x1="13.6" y1="8" x2="15.2" y2="8" />
									<line x1="2.7" y1="2.7" x2="3.8" y2="3.8" />
									<line x1="12.2" y1="12.2" x2="13.3" y2="13.3" />
									<line x1="2.7" y1="13.3" x2="3.8" y2="12.2" />
									<line x1="12.2" y1="3.8" x2="13.3" y2="2.7" />
								</g>
							</svg>
						{/if}
					</span>
				</span>
				<span class="theme-switch-label">{printTheme.value === 'dark' ? 'Dark' : 'Light'}</span>
			</button>
		{:else}
			<ul class="nav-links">
				<li><a href={resolve('/resume')} class:active={isResumeActive}>Resume</a></li>
				<li><a href={resolve('/portfolio')} class:active={isPortfolioActive}>Portfolio</a></li>
				{#if showPdfButton}
					<li>
						<a href={resolve('/resume/print')} target="_blank" class="nav-pdf">
							<img src={iconDownload} alt="PDF 다운로드" class="nav-pdf-icon" />
							PDF
						</a>
					</li>
				{/if}
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
		{/if}
	</div>
</nav>

{#if !isPrintPage}
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
			<li>
				<a href={resolve('/resume')} onclick={closeMenu} class:active={isResumeActive}>
					<span class="drawer-en">Resume</span>
					<span class="drawer-ko">이력서</span>
				</a>
			</li>
			<li>
				<a href={resolve('/portfolio')} onclick={closeMenu} class:active={isPortfolioActive}>
					<span class="drawer-en">Portfolio</span>
					<span class="drawer-ko">포트폴리오</span>
				</a>
			</li>
		</ul>
		{#if showPdfButton}
			<a href={resolve('/resume/print')} target="_blank" onclick={closeMenu} class="drawer-pdf-btn">
				<img src={iconDownload} alt="" class="nav-pdf-icon" />
				이력서 저장
			</a>
		{/if}
	</div>
{/if}

<main>
	{@render children()}
</main>

<style>
	.top-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: 64px;
		background-color: rgba(23, 23, 23, 0.72);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		transition: box-shadow 0.3s ease;
	}

	.top-nav::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 100%;
		height: 24px;
		background-color: rgba(23, 23, 23, 0.72);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		mask-image: linear-gradient(to bottom, #000, transparent);
		-webkit-mask-image: linear-gradient(to bottom, #000, transparent);
		pointer-events: none;
	}

	.top-nav.scrolled {
		box-shadow: 0 1px 3px rgba(33, 241, 168, 0.12);
	}

	.nav-inner {
		max-width: 1028px;
		margin: 0 auto;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--space-lg);
	}

	.wordmark {
		font-family: var(--font-display);
		font-size: 22px;
		font-weight: 500;
		color: var(--color-ink);
		letter-spacing: -0.5px;
	}

	.nav-links {
		display: flex;
		gap: var(--space-xl);
		list-style: none;
	}

	.nav-links a {
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.4;
		color: var(--color-muted);
		transition: color 0.2s ease;
	}

	.nav-links a:hover {
		color: var(--color-ink);
	}

	.nav-links a.active {
		color: var(--color-primary);
	}

	.nav-pdf-icon {
		width: 13px;
		height: 13px;
		display: inline-block;
		vertical-align: middle;
		margin-bottom: 1px;
		filter: brightness(0) invert(1);
	}

	.nav-links .nav-pdf {
		color: var(--color-ink);
		border: 1px solid var(--color-hairline);
		padding: 6px 12px;
		border-radius: var(--rounded-md);
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.nav-links .nav-pdf:hover {
		background-color: var(--color-surface-card);
		color: var(--color-ink);
	}

	.theme-switch {
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font-family: var(--font-body);
	}

	.theme-switch-track {
		display: flex;
		align-items: center;
		width: 44px;
		height: 24px;
		padding: 2px;
		border-radius: var(--rounded-pill);
		background-color: color-mix(in srgb, var(--color-accent-amber) 30%, transparent);
		transition: background-color 0.2s ease;
	}

	.theme-switch-track.is-dark {
		background-color: var(--color-surface-dark);
	}

	.theme-switch-thumb {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: var(--color-accent-amber);
		color: var(--color-on-primary);
		transform: translateX(0);
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;
	}

	.theme-switch-track.is-dark .theme-switch-thumb {
		background-color: var(--color-primary);
		transform: translateX(20px);
	}

	.theme-switch-icon {
		width: 12px;
		height: 12px;
	}

	.theme-switch-label {
		font-size: 13px;
		font-weight: 500;
		color: var(--color-muted);
		transition: color 0.15s ease;
	}

	.theme-switch:hover .theme-switch-label {
		color: var(--color-ink);
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
		box-shadow: -4px 0 24px rgba(33, 241, 168, 0.18);
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

	.drawer-pdf-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		width: 100%;
		padding: 14px;
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		border-radius: var(--rounded-md);
		transition: background-color 0.15s ease;
	}

	.drawer-pdf-btn:hover {
		background-color: var(--color-primary-active);
	}

	.drawer-pdf-btn .nav-pdf-icon {
		filter: brightness(0);
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
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: var(--space-sm) 0;
		border-bottom: 1px solid var(--color-hairline-soft);
		transition: color 0.15s ease;
		color: var(--color-muted);
	}

	.drawer-links a:hover {
		color: var(--color-ink);
	}

	.drawer-links a.active {
		color: var(--color-primary);
	}

	.drawer-links a.active .drawer-ko {
		color: var(--color-primary);
	}

	.drawer-en {
		font-family: var(--font-body);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.drawer-ko {
		font-family: var(--font-display);
		font-size: 28px;
		font-weight: 400;
		letter-spacing: -0.5px;
		line-height: 1.1;
		color: var(--color-ink);
	}

	main {
		padding-top: 64px;
	}

	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.hamburger {
			display: flex;
		}
	}
</style>
