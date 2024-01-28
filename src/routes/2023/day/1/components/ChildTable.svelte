<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import type { PageData } from '../$types';

	export let children: PageData['children'];

	let sortBy: 'name' | 'tally' | undefined = undefined;
	let sortUp = false;

	$: sortedChildren = (() => {
		switch (sortBy) {
			case 'name':
				return children.sort((a, b) => a.name.localeCompare(b.name) * (sortUp ? 1 : -1));
			case 'tally':
				return children.sort((a, b) => (b.tally - a.tally) * (sortUp ? 1 : -1));
			default:
				return children;
		}
	})();

	let filterInput: HTMLInputElement | undefined;
	let leftPageButton: HTMLButtonElement | undefined;
	let rightPageButton: HTMLButtonElement | undefined;

	let filter = '';
	let page = 1;
	const pageSize = 10;

	$: filteredChildren = sortedChildren.filter((c) =>
		c.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	);

	$: pagedChildren = filteredChildren.slice((page - 1) * pageSize, page * pageSize);

	function updateSort(by: typeof sortBy) {
		sortBy = by;
		sortUp = !sortUp;
		page = 1;
	}

	function updateTally(child: PageData['children'][number], by: -1 | 1) {
		child.tally += by;
		children = children;
	}

	function deleteChild(child: PageData['children'][number]) {
		if (!confirm(`Delete ${child.name}?`)) return;
		const childIndex = children.indexOf(child);
		children = [...children.slice(0, childIndex), ...children.slice(childIndex + 1)];

		if (page !== 1 && pagedChildren.length === 1) {
			page--;
		}
	}
</script>

<div class="container">
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
					<th style:text-align="left"
						><button
							style:outline={sortBy === 'name' ? '1px solid var(--orange)' : ''}
							on:click={() => updateSort('name')}>Name</button
						></th
					>
					<th
						><button
							style:outline={sortBy === 'tally' ? '1px solid var(--orange)' : ''}
							on:click={() => updateSort('tally')}>Tally</button
						></th
					>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#if pagedChildren.length === 0}
					<td>0 matches found</td>
				{:else}
					{#each pagedChildren as child (child.id)}
						<tr animate:flip={{ duration: 250 }} in:fly={{ y: 24 }}>
							<td>{child.name}</td>
							<td
								style:color={`var(--${child.tally < 0 ? 'red' : 'green'})`}
								style:text-align="center">{child.tally}</td
							>
							<td class="actions"
								><button
									class:disabled={child.tally === 100}
									disabled={child.tally === 100}
									on:click={() => updateTally(child, 1)}>+</button
								>
								<button
									class:disabled={child.tally === -100}
									disabled={child.tally === -100}
									on:click={() => updateTally(child, -1)}>-</button
								>
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
</div>

<style>
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

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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
	}

	@media screen and (max-width: 400px) {
		th,
		td {
			padding: 0.5em 0 0.5rem 0.5rem;
		}
	}
</style>
