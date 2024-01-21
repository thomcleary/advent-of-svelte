<script lang="ts">
	import LinkCard from '$lib/components/LinkCard.svelte';
	import { days2023 } from '$lib/data/days.js';

	export let data;

	const dayHref = (day: number) => `${data.year}/day/${day}`;
</script>

<div>
	<ol>
		{#each days2023 as day, index}
			<li>
				<LinkCard href={dayHref(index + 1)} disabled={!day.completed}>
					<span style:color={`var(--${day.completed ? 'orange' : 'muted'})`}>{index + 1}</span>
					<span style:color={`var(--${day.completed ? 'white' : 'muted'})`} style:flex="1"
						>{day.title}</span
					>
				</LinkCard>
			</li>
		{/each}
	</ol>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	ol {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: 1rem;
		width: 100%;
	}

	@media screen and (max-width: 600px) {
		ol {
			grid-template-columns: 1fr;
		}
	}
</style>
