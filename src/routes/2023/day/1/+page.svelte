<script lang="ts">
	import ChildInput from './components/ChildInput.svelte';
	import ChildTable from './components/ChildTable.svelte';

	export let data;

	/* 
	TODO
		- Add check boxes to toggle filtering naughty/nice children
	*/
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div class="container">
	<section>
		<ChildInput
			onAddChild={(child) =>
				(data.children = [...data.children, { ...child, id: data.children.length.toString() }])}
		/>
		<hr />
		<ChildTable bind:children={data.children} />
	</section>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: min(100%, 600px);
	}

	hr {
		width: 100%;
		margin: 0;
		border: 1px solid var(--border);
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
