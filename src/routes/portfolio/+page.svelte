<section class="coming-soon">
	<div class="container">
		<p class="label">§ PORTFOLIO</p>
		<h1 class="display-lg">준비 중입니다</h1>
		<p class="sub">곧 새로운 작업물로 채워질 예정입니다.</p>
		<a href="/resume" class="btn">Resume 보기</a>
	</div>
</section>

<style>
	.container {
		max-width: 1028px;
		margin: 0 auto;
		padding: 0 var(--space-lg);
	}

	.coming-soon {
		min-height: calc(100vh - 64px);
		display: flex;
		align-items: center;
		background-color: var(--color-canvas);
	}

	.label {
		font-family: var(--font-body);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		color: var(--color-primary);
		margin-bottom: var(--space-md);
	}

	.display-lg {
		font-family: var(--font-display);
		font-size: 48px;
		font-weight: 400;
		line-height: 1.1;
		letter-spacing: -1px;
		color: var(--color-ink);
		margin-bottom: var(--space-lg);
	}

	.sub {
		font-size: 16px;
		color: var(--color-muted);
		margin-bottom: var(--space-xl);
	}

	.btn {
		display: inline-block;
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		padding: 12px 20px;
		border-radius: var(--rounded-md);
	}
</style>
