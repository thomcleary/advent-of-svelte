<script lang="ts">
	import ChildList from './ChildList.svelte';

	export let data;

	let children = data.children;
	$: sortedChildren = children.toSorted((a, b) => a.name.localeCompare(b.name));

	let nameFilter: string = '';

	let newChild: { name: string; tally: number } = { name: '', tally: 0 };
	$: console.log(newChild);

	let windowWidth: number;
	$: isMobile = windowWidth < 720;
</script>

<!--
	TODO:
	- Wrap new-child in form so 'Enter' key triggers submit and add new child to children
	- Only show 1 list at a time on mobile
	  - absolute position button that scrolls to top when pressed
	- When a child changes lists, the window should be refocused on the child again (desktop and mobile)
-->

<svelte:window bind:innerWidth={windowWidth} />

<div class="container">
	<div class="inputs">
		<div class="filters">
			<span>Filters</span>
			<label>Name<input type="text" bind:value={nameFilter} placeholder="Anurag" /></label>
		</div>

		<div class="new-child">
			<span>New Child</span>
			<label>Name<input type="text" bind:value={newChild.name} /></label>
			<label
				>Tally <input
					type="range"
					min="-100"
					max="100"
					bind:value={newChild.tally}
				/>{newChild.tally}</label
			>
		</div>
	</div>

	<div class="lists">
		<ChildList
			heading="Naughty"
			filter={(child) =>
				child.tally < 0 && child.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase())}
			bind:children={sortedChildren}
		/>
		<ChildList
			heading="Nice"
			filter={(child) =>
				child.tally >= 0 && child.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase())}
			bind:children={sortedChildren}
		/>
	</div>
</div>

<style>
	label {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;

		padding: 16px;
	}
	input {
		font-size: 16px;

		color: var(--col-body);
		background-color: var(--black);

		border: 1px solid var(--dim);
	}

	input::placeholder {
		color: var(--border);
	}

	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		cursor: pointer;
		width: 100%;
	}

	input[type='range']::-webkit-slider-runnable-track {
		height: 20px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		background-color: var(--orange);
		height: 20px;
		width: 20px;
	}

	.container {
		padding: 16px;
	}

	.inputs {
		display: flex;
		flex-wrap: wrap;
		gap: 32px;

		padding-top: 16px;
		padding-bottom: 32px;
	}

	.filters,
	.new-child {
		display: flex;
		flex-direction: column;
		flex: 1;

		padding: 16px;

		border: 1px solid var(--border);
	}

	.new-child span,
	.filters span {
		align-self: center;
	}

	.lists {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 32px;
	}
</style>
