<script lang="ts">
	import type { Contact } from '$lib/portfolio/content';

	let { contacts }: { contacts: Contact[] } = $props();
</script>

<div class="contact-list">
	{#each contacts as contact (contact.label)}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- contact.href is always an external mailto:/https: URL, never an app route -->
		<a class="contact-item" href={contact.href} target="_blank" rel="noopener">
			<span class="contact-label">{contact.label}</span>
			<span class="contact-value">{contact.value}</span>
		</a>
	{/each}
	<div class="contact-footer-note">
		&gt; AI TOOLS: Cursor · Claude · ChatGPT<br />&gt; STATUS: OPEN TO WORK
	</div>
</div>

<style>
	.contact-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.contact-item {
		display: flex;
		flex-direction: column;
		gap: 3px;
		background: linear-gradient(
			155deg,
			rgba(255, 255, 255, 0.1) 0%,
			rgba(255, 255, 255, 0.03) 40%,
			rgba(20, 24, 23, 0.3) 100%
		);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 16px;
		padding: 12px 14px;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
		transition: border-color 0.15s;
	}

	.contact-item:hover {
		border-color: var(--ac, #21f1a8);
	}

	.contact-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10.5px;
		letter-spacing: 0.1em;
		color: var(--ac, #21f1a8);
	}

	.contact-value {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 13px;
		color: #eafdf6;
	}

	.contact-footer-note {
		margin-top: 6px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		line-height: 1.7;
		color: rgba(233, 255, 248, 0.4);
	}
</style>
