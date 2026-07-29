<script lang="ts">
	let { text, highlights = [] }: { text: string; highlights?: string[] } = $props();

	const escapedHighlights = $derived(
		highlights.map((highlight) => highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
	);
	const parts = $derived(
		escapedHighlights.length > 0
			? text.split(new RegExp(`(${escapedHighlights.join('|')})`, 'g'))
			: [text]
	);
</script>

{#each parts as part, index (`${part}-${index}`)}
	{#if highlights.includes(part)}
		<strong class="document-emphasis">{part}</strong>
	{:else}
		{part}
	{/if}
{/each}
