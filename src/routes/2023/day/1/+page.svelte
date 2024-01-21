<script lang="ts">
	import ChildInput from './components/ChildInput.svelte';
	import ChildTable from './components/ChildTable.svelte';

	export let data;

	/* 
	TODO
		- Add inputs to add new children to the list
		- Add check boxes to toggle filtering naughty/nice children
		- Make +/- buttons toggle tally
		- Make name button sort table by name
		- Make tally button sort table by tally
		- Separate stuff into components
	*/
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div class="container">
	<section>
		<ChildInput />
		<ChildTable bind:children={data.children} />
	</section>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: min(100%, 600px);
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
