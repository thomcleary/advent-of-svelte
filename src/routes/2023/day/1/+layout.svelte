<main>
	<div>
		<h1>
			<a href="../"> 2023 </a> - Day 1
		</h1>
		<details>
			<summary>Description</summary>
			<p>
				The Elves have been tirelessly creating presents all year round. They're right on schedule,
				but today they've run into a big problem; the ancient system for tracking who's been naughty
				or nice is out of commission. With the hundreds of thousands of letters from children piling
				up alongside their records of good and bad deeds, the Elves are in dire need of a modern
				solution.
			</p>
			<p>
				Your mission is to build a system for the elves, enabling them to input names and tally each
				childs deeds to keep track of whether they're good or bad. You could even categorise these
				automatically as “naughty” and “nice.” Fortunately, the elves have been meticulous in their
				record-keeping and have a backup of all the current data in JSON format. You'll need to
				import this data into your newly developed system.
			</p>
		</details>
	</div>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;

		background-color: var(--col-bg);
	}

	div {
		padding: 16px;
		border-bottom: 4px solid var(--orange);
	}

	h1 {
		display: flex;
		gap: 8px;

		color: var(--col-heading);
		background-color: inherit;

		margin: 0;
		padding-bottom: 16px;
	}

	a {
		display: flex;
		align-items: center;

		color: var(--orange);
	}
</style>
