<script lang="ts">
	export let data;

	let children = data.children;
</script>

<div class="container">
	<div class="data-table">
		<table>
			<thead>
				<tr>
					<th style:text-align="left"><button>Name</button></th>
					<th style:text-align="center"><button>Tally</button></th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each children as child (child.id)}
					<tr>
						<td>{child.name}</td>
						<td
							style:color={`var(--${child.tally < 0 ? 'red' : 'green'})`}
							style:text-align="center">{child.tally}</td
						>
						<td class="actions"
							><button>+</button>
							<button>-</button>
							<button>x</button></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	table {
		padding: 0.5rem 1rem;
		border-collapse: collapse;
	}

	th {
		color: var(--grey);
		font-size: 0.8rem;
	}

	td {
		color: var(--white);
	}

	th,
	td {
		padding: 0.5em 1em;
	}

	tr {
		border-bottom: 1px solid var(--border);
	}

	tr:hover {
		background-color: var(--muted);
	}

	button {
		color: var(--white);
		background-color: transparent;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--border);
		border-radius: 0.25rem;
	}

	button:hover {
		color: var(--black);
		background-color: var(--orange);
		cursor: pointer;
	}

	button:focus {
		outline: var(--orange) solid 1px;
		border-color: transparent;
	}

	.container {
		display: flex;
		justify-content: center;

		padding: 32px;
	}

	.data-table {
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		overflow-x: auto;
	}

	.actions {
		display: flex;
		gap: 1rem;
	}

	.actions > button {
		font-size: 1.25rem;
	}
</style>
