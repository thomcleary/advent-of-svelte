<script lang="ts">
	import type { PageData } from './$types.js';

	export let data;

	let newChildNameInput: HTMLInputElement | undefined;
	let filterInput: HTMLInputElement | undefined;
	let newChild: Omit<PageData['children'][number], 'id'> = { name: '', tally: 0 };

	let page = 1;
	const pageSize = 10;
	let leftPageButton: HTMLButtonElement | undefined;
	let rightPageButton: HTMLButtonElement | undefined;

	let filter = '';

	$: filteredChildren = data.children.filter((c) =>
		c.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	);

	$: pagedChildren = filteredChildren.slice((page - 1) * pageSize, page * pageSize);

	function deleteChild(child: PageData['children'][number]) {
		if (!confirm(`Delete ${child.name}?`)) return;
		const childIndex = data.children.indexOf(child);
		data.children = [...data.children.slice(0, childIndex), ...data.children.slice(childIndex + 1)];

		if (page !== 1 && pagedChildren.length === 1) {
			page--;
		}
	}

	/* 
	TODO
		- Cleanup what you've got first lol
		- Add inputs to add new children to the list
		- Add check boxes to toggle filtering naughty/nice children
		- Make +/- buttons toggle tally
		- Make name button sort table by name
		- Make tally button sort table by tally
		- Separate stuff into components
	*/
</script>

<svelte:head>
	<title>Day 1: Naughty or Nice</title>
</svelte:head>

<div class="container">
	<section>
		<div style="display: flex; gap: 1rem;">
			<div style="display: flex; flex-direction: column; flex: 1; gap: 0.5rem;">
				<input
					type="text"
					maxlength="64"
					placeholder="New name..."
					bind:value={newChild.name}
					bind:this={newChildNameInput}
					style="width: 100%; background-color: var(--black); border: 1px solid var(--border); border-radius: 0.25rem; padding: 0.5rem; color: var(--white); outline: none;"
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
				<col />
				<col style="width: 8ch;" />
				<col />
				<thead>
					<tr>
						<td colspan="3">
							<label
								>Naughty
								<input type="checkbox" checked />
							</label>
							<label
								>Nice
								<input type="checkbox" checked />
							</label>
						</td>
					</tr>
					<tr>
						<td colspan="3" style="padding: 0.5rem;">
							<div style="display: flex; gap: 1rem;">
								<input
									type="text"
									maxlength="64"
									bind:value={filter}
									bind:this={filterInput}
									on:input={() => (page = 1)}
									placeholder="Filter children..."
									style="width: 100%; background-color: var(--black); border: none; padding: 0.5rem; color: var(--grey); outline: none;"
								/>
							</div>
						</td>
					</tr>
					<tr>
						<th style:text-align="left"><button>Name</button></th>
						<th><button>Tally</button></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#if pagedChildren.length === 0}
						<td>0 matches found</td>
					{:else}
						{#each pagedChildren as child (child.id)}
							<tr>
								<td>{child.name}</td>
								<td
									style:color={`var(--${child.tally < 0 ? 'red' : 'green'})`}
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
		<div class="pager" style="display: flex; alignItems: center; justifyContent: center;">
			<button
				disabled={page === 1}
				class:disabled={page === 1}
				on:click={() => {
					page--;
				}}
				bind:this={leftPageButton}
			>
				{'<'}
			</button>
			<span style="vertical-align: middle;">{page}</span>
			<button
				disabled={page * pageSize >= filteredChildren.length}
				class:disabled={page * pageSize >= filteredChildren.length}
				bind:this={rightPageButton}
				on:click={() => {
					page++;
				}}
			>
				{'>'}
			</button>
		</div>
	</section>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: min(100%, 600px);
	}

	input {
		font-size: 1rem;
	}

	table {
		padding: 0.5rem 1rem;
		border-collapse: collapse;
		width: 100%;
		table-layout: fixed;
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

	tbody > tr:hover {
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
		padding: 2rem;
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

	.pager > * {
		flex: 1;
		text-align: center;
		padding: 0;
		padding: 0.5rem;
	}

	.disabled,
	.disabled:hover,
	.disabled:focus {
		color: var(--border);
		outline: none;
		border-color: var(--border);
		cursor: auto;
	}

	@media screen and (max-width: 600px) {
		.actions {
			gap: 1rem;
		}

		.container {
			padding: 2rem 1rem;
		}
	}

	@media screen and (max-width: 400px) {
		th,
		td {
			padding: 0.5em 0 0.5rem 0.5rem;
		}

		.container {
			padding: 1rem 0.5rem;
		}
	}
</style>
