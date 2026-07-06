<script lang="ts">
	import type { SkillGroup } from '$lib/portfolio/content';

	let { groups }: { groups: SkillGroup[] } = $props();
</script>

<div class="skill-belt">
	{#each groups as group (group.title)}
		<div class="skill-slot">
			<div class="skill-slot-title">{group.title}</div>
			<div class="skill-slot-items">
				{#each group.items as item (item)}
					<span class="skill-chip">{item}</span>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.skill-belt {
		display: flex;
		flex-direction: column;
		gap: 18px;
		background: linear-gradient(
			155deg,
			rgba(255, 255, 255, 0.1) 0%,
			rgba(255, 255, 255, 0.03) 40%,
			rgba(20, 24, 23, 0.3) 100%
		);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 20px;
		padding: 20px 22px;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
	}

	.skill-slot {
		padding: 16px 0;
		border-top: 1px solid rgba(233, 255, 248, 0.1);
	}

	.skill-slot:first-child {
		border-top: none;
		padding-top: 0;
	}

	.skill-slot-title {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ac, #21f1a8);
		margin-bottom: 10px;
	}

	.skill-slot-items {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.skill-chip {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 12.5px;
		color: rgba(233, 255, 248, 0.82);
		background: rgba(33, 241, 168, 0.07);
		border: 1px solid rgba(33, 241, 168, 0.18);
		border-radius: 999px;
		padding: 6px 14px;
	}
</style>
