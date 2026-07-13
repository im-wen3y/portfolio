<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>소유자 로그인 — im-wen3y</title>
	<meta name="robots" content="noindex, nofollow, noarchive" />
	<meta name="description" content="인쇄용 이력서와 포트폴리오에 접근하기 위한 소유자 로그인" />
</svelte:head>

<section class="owner-login">
	<div class="access-panel">
		<div class="access-status" aria-hidden="true">
			<span class="status-dot"></span>
			PRIVATE / PRINT
		</div>
		<p class="eyebrow">Owner access</p>
		<h1>문서 작업실</h1>
		<p class="description">인쇄용 이력서와 포트폴리오는 소유자 인증 후 열립니다.</p>

		<form method="POST" action="?next={encodeURIComponent(data.next)}">
			<label for="owner-password">비밀번호</label>
			<div class="password-row">
				<input
					id="owner-password"
					name="password"
					type="password"
					autocomplete="current-password"
					maxlength="256"
					required
				/>
				<button type="submit">문서 열기</button>
			</div>
			{#if form?.message}
				<p class="form-error" role="alert">{form.message}</p>
			{/if}
		</form>

		<a class="back-link" href={resolve('/resume')}>공개 이력서로 돌아가기 →</a>
	</div>
</section>

<style>
	.owner-login {
		min-height: calc(100vh - 64px);
		display: grid;
		place-items: center;
		padding: clamp(40px, 8vw, 96px) var(--space-lg);
		background:
			linear-gradient(var(--color-hairline-soft) 1px, transparent 1px),
			linear-gradient(90deg, var(--color-hairline-soft) 1px, transparent 1px), var(--color-canvas);
		background-size: 32px 32px;
	}

	.access-panel {
		position: relative;
		width: min(100%, 560px);
		padding: clamp(28px, 6vw, 52px);
		border: 1px solid var(--color-hairline);
		border-left: 3px solid var(--color-primary);
		background-color: color-mix(in srgb, var(--color-surface-soft) 92%, transparent);
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
	}

	.access-status {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-bottom: var(--space-xl);
		font-family: var(--font-code);
		font-size: 11px;
		letter-spacing: 0.12em;
		color: var(--color-muted);
	}

	.status-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: var(--color-primary);
		box-shadow: 0 0 12px color-mix(in srgb, var(--color-primary) 70%, transparent);
	}

	.eyebrow {
		margin-bottom: var(--space-xs);
		font-family: var(--font-body);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-primary);
	}

	h1 {
		margin-bottom: var(--space-md);
		font-family: var(--font-display);
		font-size: clamp(40px, 8vw, 62px);
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.04em;
		color: var(--color-ink);
	}

	.description {
		margin-bottom: var(--space-xl);
		font-size: 15px;
		line-height: 1.7;
		color: var(--color-body);
	}

	form {
		margin-bottom: var(--space-xl);
	}

	label {
		display: block;
		margin-bottom: var(--space-xs);
		font-size: 13px;
		font-weight: 500;
		color: var(--color-ink);
	}

	.password-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: var(--space-xs);
	}

	input {
		min-width: 0;
		padding: 13px 14px;
		border: 1px solid var(--color-hairline);
		border-radius: var(--rounded-md);
		background-color: var(--color-surface-dark);
		color: var(--color-ink);
		font-family: var(--font-code);
		font-size: 16px;
	}

	input:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	button {
		padding: 0 20px;
		border: 0;
		border-radius: var(--rounded-md);
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--color-primary-active);
	}

	button:focus-visible {
		outline: 2px solid var(--color-ink);
		outline-offset: 3px;
	}

	.form-error {
		margin-top: var(--space-sm);
		font-size: 13px;
		color: #fda4af;
	}

	.back-link {
		font-size: 13px;
		color: var(--color-muted);
	}

	.back-link:hover {
		color: var(--color-ink);
	}

	@media (max-width: 520px) {
		.password-row {
			grid-template-columns: 1fr;
		}

		button {
			min-height: 46px;
		}
	}
</style>
