<script>
	import adventOfSvelteImg from '$lib/assets/images/advent-of-svelte.png';
	import { slide } from 'svelte/transition';

	let showDescription = false;

	$: console.log({ showDescription });
</script>

<main>
	<header>
		<nav>
			<div class="breadcrumbs">
				<a href="/">
					<img src={adventOfSvelteImg} alt="Advent of Svelte" />
				</a>
				<span>/</span>
				<a href="../">2023</a>
				<span>/</span>
				day
				<span>/</span>
				1
			</div>
			<button on:click={() => (showDescription = !showDescription)}>i</button>
		</nav>
		{#if showDescription}
			<div transition:slide={{ duration: 250 }}>
				<p>
					The Elves have been tirelessly creating presents all year round. They're right on
					schedule, but today they've run into a big problem; the ancient system for tracking who's
					been naughty or nice is out of commission. With the hundreds of thousands of letters from
					children piling up alongside their records of good and bad deeds, the Elves are in dire
					need of a modern solution.
				</p>
				<p>
					Your mission is to build a system for the elves, enabling them to input names and tally
					each childs deeds to keep track of whether they're good or bad. You could even categorise
					these automatically as “naughty” and “nice.” Fortunately, the elves have been meticulous
					in their record-keeping and have a backup of all the current data in JSON format. You'll
					need to import this data into your newly developed system.
				</p>
			</div>
		{/if}
	</header>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}

	header {
		padding: 1rem;
		border-bottom: 1px solid var(--border);
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		height: 1rem;

		margin: 2px;
	}

	button {
		color: var(--white);
		background-color: transparent;

		padding: 4px 8px;

		border: 1px solid var(--border);
		border-radius: 4px;
	}

	@media (hover: hover) {
		button:hover {
			color: var(--black);
			background-color: var(--orange);

			cursor: pointer;
		}
	}

	p {
		max-width: 75ch;
		text-wrap: pretty;

		color: var(--grey);
	}

	a {
		display: flex;
		align-items: center;

		color: var(--orange);

		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}

	a:hover {
		color: var(--black);
		background-color: var(--orange);
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 1ch;

		color: var(--orange);
	}

	.breadcrumbs > span {
		color: var(--border);
	}
</style>
