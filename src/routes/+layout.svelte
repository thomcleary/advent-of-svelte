<script>
	import { page } from '$app/stores';
	import AdventOfSvelteImg from '$lib/components/AdventOfSvelteImg.svelte';
	import '$lib/css/global.css';
	import { slide } from 'svelte/transition';

	let showInfo = false;
</script>

<div style="display: flex; flex-direction: column; min-height: 100dvh;">
	<header>
		<nav>
			<div class="breadcrumbs">
				<a class="home" href="/"><AdventOfSvelteImg /></a>
				{#if $page.data.year}
					<span>/</span>
					{#if $page.data.day}
						<a href="../">{$page.data.year}</a>
						<span>/</span>
						<span>Day {$page.data.day}</span>
					{:else}
						<span>{$page.data.year}</span>
					{/if}
				{:else}
					<span>Advent of Svelte</span>
				{/if}
			</div>
			<button
				style:visibility={$page.data.title || $page.data.description?.length > 0 ? '' : 'hidden'}
				on:click={() => (showInfo = !showInfo)}>i</button
			>
		</nav>
		{#if ($page.data.title || $page.data.description?.length > 0) && showInfo}
			<div transition:slide={{ duration: 250 }}>
				<h1>{$page.data.title}</h1>
				{#each $page.data.description as paragraph}
					<p>
						{paragraph}
					</p>
				{/each}
			</div>
		{/if}
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	header {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 2rem;
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	a {
		color: var(--orange);
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}

	a:hover {
		color: var(--black);
		background-color: var(--orange);
		border-radius: 0.25rem;
	}

	header button,
	main :global(button) {
		color: var(--white);
		background-color: transparent;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		font-size: 1.25rem;
		touch-action: manipulation;
	}

	header button:hover,
	main :global(button:hover) {
		border-color: var(--orange);
		cursor: pointer;
	}

	header button:focus,
	main :global(button:focus) {
		outline: var(--orange) solid 1px;
		border-color: transparent;
	}

	p {
		max-width: 75ch;
		text-wrap: pretty;
		color: var(--grey);
	}

	.home {
		display: flex;
		align-items: center;
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 1ch;
		color: var(--orange);
		overflow-x: auto;
	}

	.breadcrumbs > span {
		color: var(--border);
	}

	.breadcrumbs span:last-child {
		color: var(--white);
	}

	@media screen and (max-width: 600px) {
		header {
			padding: 0.5rem 1rem;
		}

		main {
			padding: 2rem 1rem;
		}
	}

	@media screen and (max-width: 400px) {
		main {
			padding: 1rem 0.5rem;
		}
	}
</style>
