<script lang="ts">
	export let value: number = 0;
</script>

<input style:flex={'1'} type="range" min="-100" max="100" bind:value />

<style>
	input[type='range'] {
		margin: 0;
		background-color: var(--black);
		-webkit-appearance: none;
	}

	input[type='range']:focus {
		outline: none;
	}

	input[type='range']::-webkit-slider-runnable-track {
		height: 1rem;
		border-radius: 0.25rem;
		border: 1px solid var(--border);
		cursor: pointer;
	}

	input[type='range']::-webkit-slider-thumb {
		height: 2rem;
		width: 1rem;
		margin-top: -0.5rem;
		background: var(--orange);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		cursor: pointer;
		-webkit-appearance: none;
	}

	input[type='range']::-moz-range-track {
		border-radius: 0.25rem;
		border: 1px solid var(--border);
		cursor: pointer;
	}

	input[type='range']::-moz-range-thumb {
		height: 2rem;
		width: 1rem;
		margin-top: -0.5rem;
		background: var(--orange);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		cursor: pointer;
	}

	input[type='range']::-ms-track {
		height: 2rem;
		width: 1rem;
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		cursor: pointer;
	}

	input[type='range']::-ms-fill-lower {
		border: 1px solid var(--border);
		border-radius: 0.25rem;
	}

	input[type='range']::-ms-fill-upper {
		border: 1px solid var(--border);
		border-radius: 0.25rem;
	}

	input[type='range']::-ms-thumb {
		height: 2rem;
		width: 1rem;
		margin-top: -0.5rem;
		background: var(--orange);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		cursor: pointer;
	}
</style>
