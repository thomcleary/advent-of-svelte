<script lang="ts">
	export let checked = true;
	export let label: string;
	export let onClick:
		| ((event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void)
		| undefined = undefined;
</script>

<!--
	This should probably be a checkbox, but those are hard to style 🙃
-->
<button
	class="checkbox"
	class:checked
	on:click={(e) => {
		onClick?.(e);
		checked = !checked;
	}}
>
	{label}
</button>

<style>
	.checkbox {
		padding: 0.25rem 0.5rem;
		font-size: 0.8rem;
		color: var(--grey);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		outline: none;
		cursor: pointer;
	}

	.checkbox:focus {
		outline: none;
		border: 1px solid var(--border);
	}

	.checked {
		background-color: var(--orange);
		color: var(--black);
	}
</style>
