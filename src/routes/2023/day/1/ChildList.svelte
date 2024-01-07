<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { PageData } from './$types';
	import { receive, send, transitionDuration } from './transitions';

	export let children: PageData['children'];
	export let filter: (child: (typeof children)[number]) => boolean;
	export let heading: 'Naughty' | 'Nice';
</script>

<div class="container" style:--naughty-or-nice={heading === 'Nice' ? 'var(--green)' : 'var(--red)'}>
	<h2>{heading}</h2>
	<ol>
		{#each children.filter(filter) as child (child.id)}
			<li
				in:receive={{ key: child.id }}
				out:send={{ key: child.id }}
				animate:flip={{ duration: transitionDuration }}
			>
				<div class="tally-toggle">
					<button
						on:click={() => {
							child.tally++;
							children = children;
						}}>+</button
					>
					<button
						on:click={() => {
							child.tally--;
							children = children;
						}}>-</button
					>
				</div>
				<div class="child-info">
					<span class="name">{child.name}</span>
					<span>{child.tally}</span>
				</div>
				<button
					class="delete"
					on:click={() => {
						children = children.filter((c) => c.id !== child.id);
					}}>X</button
				>
			</li>
		{/each}
	</ol>
</div>

<style>
	h2 {
		text-align: center;

		color: var(--col-heading);
	}

	ol {
		display: flex;
		flex-direction: column;
		gap: 32px;

		margin: 0;
		padding: 0 24px 24px 24px;
	}

	li {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		justify-items: center;
		gap: 16px;

		list-style-type: none;

		color: var(--naughty-or-nice);
		background-color: var(--col-bg2);

		padding: 16px;

		/* border: 2px solid var(--col-body); */
	}

	button {
		color: var(--col-bg2);
		background-color: var(--naughty-or-nice);

		padding: 8px;

		border: none;
	}

	button:hover {
		cursor: pointer;
		touch-action: manipulation;
	}

	.container {
		display: flex;
		flex-direction: column;
		flex: 1;

		background-color: var(--col-bg);

		border: 4px solid var(--naughty-or-nice);
		box-shadow: -4px 5px var(--naughty-or-nice);
	}

	.tally-toggle {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 24px;
	}

	.tally-toggle button {
		min-width: 48px;
		min-height: 48px;
		padding: 8px;
		font-size: 40px;
		line-height: 32px;
	}

	.child-info {
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 8px;
	}

	.name {
		color: var(--col-body);
	}

	.delete {
		align-self: flex-start;
		justify-self: flex-end;
	}
</style>
