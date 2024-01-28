<script lang="ts">
	import type { PageData } from '../$types';

	export let onAddChild: ((child: Omit<PageData['children'][number], 'id'>) => void) | undefined =
		undefined;

	let newChildNameInput: HTMLInputElement | undefined;
	let newChild: Omit<PageData['children'][number], 'id'> = { name: '', tally: 0 };
</script>

<div class="form">
	<div class="inputs">
		<input
			type="text"
			maxlength="64"
			placeholder="New name..."
			required
			bind:value={newChild.name}
			bind:this={newChildNameInput}
		/>
		<div class="tally">
			<input style:flex={'1'} type="range" min="-100" max="100" bind:value={newChild.tally} />
			<span style:width="4ch" style="align-self: center;">{newChild.tally}</span>
		</div>
	</div>
	<button
		style:width="4ch"
		class:disabled={!newChild.name}
		disabled={!newChild.name}
		on:click={() => {
			if (newChildNameInput) {
				onAddChild?.(newChild);
				newChild.name = '';
				newChild.tally = 0;
				newChildNameInput.focus();
			}
		}}>+</button
	>
</div>

<style>
	input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		color: var(--white);
		background-color: var(--black);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		outline: none;
	}

	.form {
		display: flex;
		gap: 1rem;
	}

	.inputs {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 0.5rem;
	}

	.tally {
		display: flex;
		text-align: right;
	}

	.disabled,
	.disabled:hover,
	.disabled:focus {
		color: var(--border);
		outline: none;
		border-color: var(--border);
		cursor: auto;
	}
</style>
