<script lang="ts">
	import type { SkillGroup } from '$lib/portfolio/content';
	import type { Project } from '$lib/data/projects';

	let { groups, projects }: { groups: SkillGroup[]; projects: Project[] } = $props();

	function usageCount(skill: string): number {
		return projects.filter((p) => p.stack.includes(skill)).length;
	}

	const enriched = $derived(
		groups.map((group) => ({
			title: group.title,
			items: group.items
				.map((name) => ({ name, count: usageCount(name) }))
				.sort((a, b) => b.count - a.count)
		}))
	);
</script>

<div class="skill-belt">
	{#each enriched as group (group.title)}
		<div class="skill-slot">
			<div class="skill-slot-head">
				<span class="skill-slot-title">{group.title}</span>
				<span class="skill-slot-count">{group.items.length} ITEMS</span>
			</div>
			<div class="skill-grid">
				{#each group.items as skill (skill.name)}
					<span class="skill-item">
						{skill.name}
						{#if skill.count > 0}<span class="skill-item-count">×{skill.count}</span>{/if}
					</span>
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

	.skill-slot-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 10px;
	}

	.skill-slot-title {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ac, #21f1a8);
	}

	.skill-slot-count {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 10px;
		letter-spacing: 0.06em;
		color: rgba(233, 255, 248, 0.32);
		white-space: nowrap;
	}

	.skill-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
		gap: 8px;
	}

	.skill-item {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 12px;
		line-height: 1.3;
		text-align: center;
		color: rgba(233, 255, 248, 0.78);
		background: rgba(33, 241, 168, 0.05);
		border: 1px solid rgba(233, 255, 248, 0.14);
		clip-path: polygon(9px 0, 100% 0, 100% 100%, 0 100%, 0 9px);
		padding: 8px 10px;
		transition:
			border-color 0.15s ease,
			background-color 0.15s ease,
			color 0.15s ease,
			transform 0.15s ease;
	}

	.skill-item-count {
		display: inline-block;
		margin-left: 4px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 9.5px;
		color: rgba(233, 255, 248, 0.4);
	}

	.skill-item:hover .skill-item-count {
		color: var(--ac, #21f1a8);
	}

	.skill-item:hover {
		border-color: var(--ac, #21f1a8);
		background: rgba(33, 241, 168, 0.14);
		color: #eafdf6;
		transform: translateY(-2px);
	}

	@media (prefers-reduced-motion: reduce) {
		.skill-item {
			transition: none;
		}

		.skill-item:hover {
			transform: none;
		}
	}
</style>
