<script lang="ts">
	import MiricanvasProfile from '$lib/components/print/profiles/MiricanvasProfile.svelte';
	import MiricanvasSeniorProfile from '$lib/components/print/profiles/MiricanvasSeniorProfile.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.company === 'miricanvas'}
	<MiricanvasProfile />
{:else}
	<MiricanvasSeniorProfile />
{/if}
