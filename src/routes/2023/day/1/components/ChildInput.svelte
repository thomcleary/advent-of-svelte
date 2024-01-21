<script lang="ts">
	import type { PageData } from '../$types';

	let newChildNameInput: HTMLInputElement | undefined;
	let newChild: Omit<PageData['children'][number], 'id'> = { name: '', tally: 0 };
</script>

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
