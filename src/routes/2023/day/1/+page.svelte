<script lang="ts">
	import type { PageData } from './$types.js';

	export let data;

	let newChild: Omit<PageData['children'][number], 'id'> = { name: '', tally: 0 };
	$: console.log(newChild);

	let newChildNameInput: HTMLInputElement | undefined = undefined;
	let filterInput: HTMLInputElement | undefined = undefined;

	let filter = '';
	$: children = data.children.filter((c) =>
		c.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	);

	function deleteChild(child: PageData['children'][number]) {
		if (!confirm(`Delete ${child.name}?`)) return;
		const childIndex = children.indexOf(child);
		children = [...children.slice(0, childIndex), ...children.slice(childIndex + 1)];
	}

	/* 
	TODO
		- Style the filter input
		- Make name button sort table by name
		- Make +/- buttons toggle tally
		- Make tally button sort table by tally
		- Style the "add children" inputs
		- Make the add children inputs add a new child
		- Separate stuff into components
		- Cleanup CSS
		- Done?...
	*/
</script>

<svelte:head>
	<title>Day 1: Naughty or Nice</title>
</svelte:head>

<div class="container">
	<section>
		<div style="display: flex; gap: 1rem;">
			<div style="display: flex; flex-direction: column; flex: 1;">
				<input
					type="text"
					maxlength="64"
					placeholder="New name..."
					bind:value={newChild.name}
					bind:this={newChildNameInput}
				/>
				<div style="display: flex; text-align: right;">
					<input style="flex: 1;" type="range" min="-100" max="100" bind:value={newChild.tally} />
					<span style:width="4ch">{newChild.tally}</span>
				</div>
			</div>
			<button
				on:click={() => {
					if (newChildNameInput) {
						newChild.name = '';
						newChild.tally = 0;
						newChildNameInput.focus();
					}
				}}>👶</button
			>
		</div>

		<div class="data-table">
			<table>
				<thead>
					<tr>
						<td colspan="3" style="padding: 0.5rem;">
							<div style="display: flex; gap: 1rem;">
								<input
									type="text"
									maxlength="64"
									bind:value={filter}
									bind:this={filterInput}
									placeholder="Filter children..."
									style="width: 100%; background-color: var(--black); border: none; padding: 0.5rem; color: var(--grey);"
								/><button
									on:click={() => {
										filter = '';
										filterInput?.focus();
									}}>x</button
								>
							</div>
						</td>
					</tr>
					<tr>
						<th style:text-align="left"><button>Name</button></th>
						<th><button>Tally</button></th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#if children.length === 0}
						<td>0 matches found</td>
					{:else}
						{#each children as child (child.id)}
							<tr>
								<td>{child.name}</td>
								<td
									style:color={`var(--${
										child.tally === 0 ? 'orange' : child.tally < 0 ? 'red' : 'green'
									})`}
									style:text-align="center">{child.tally}</td
								>
								<td class="actions"
									><button>+</button>
									<button>-</button>
									<button on:click={() => deleteChild(child)}>x</button></td
								>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</section>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: min(100%, 600px);
	}

	input {
		font-size: 1rem;
	}

	table {
		padding: 0.5rem 1rem;
		border-collapse: collapse;
		width: 100%;
	}

	th,
	th > button {
		color: var(--grey);
		font-size: 0.8rem;
	}

	td {
		color: var(--white);
	}

	th,
	td {
		padding: 1em 0 1em 1em;
	}

	tr {
		border-bottom: 1px solid var(--border);
	}

	tr:hover {
		background-color: var(--muted);
	}

	button {
		color: var(--white);
		background-color: var(--black);
		padding: 0.25rem 0.5rem;
		font-size: 1.25rem;
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		touch-action: manipulation;
	}

	button:hover {
		border-color: var(--orange);
		cursor: pointer;
	}

	button:focus {
		outline: var(--orange) solid 1px;
		border-color: transparent;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 32px;
	}

	.data-table {
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		overflow-x: auto;
	}

	.actions {
		display: flex;
		justify-content: space-evenly;
		gap: 2rem;
	}

	@media screen and (max-width: 600px) {
		.actions {
			gap: 1rem;
		}

		.container {
			padding: 1rem;
		}
	}

	@media screen and (max-width: 400px) {
		section {
			gap: 0.5rem;
		}

		th,
		td {
			padding: 0.5em 0 0.5rem 0.5rem;
		}

		.container {
			padding: 0.5rem;
		}
	}
</style>
