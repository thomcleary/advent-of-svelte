<script lang="ts">
	export let data;

	let children = data.children;
</script>

<div>
	<table>
		<tr>
			<th>Tally</th>
			<th>Name</th>
		</tr>
		{#each children as child (child.id)}
			<tr>
				<td style:color={`var(--${child.tally < 0 ? 'red' : 'green'})`}>{child.tally}</td>
				<td>{child.name}</td>
			</tr>
		{/each}
	</table>
</div>

<style>
	div {
		display: flex;
		justify-content: center;
	}

	th {
		text-align: left;

		color: var(--grey);

		font-size: 0.8rem;
	}

	td {
		color: var(--white);
	}
</style>
