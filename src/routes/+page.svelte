<script>
	import LinkCard from '$lib/components/LinkCard.svelte';
</script>

<div>
	<ol>
		<LinkCard href="2023"><span>2023</span></LinkCard>
	</ol>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	ol {
		width: min(600px, 100%);
		text-align: center;
	}

	span {
		color: var(--white);
	}
</style>
