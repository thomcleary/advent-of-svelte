<script lang="ts">
	export let href: string;
	export let disabled: boolean | undefined = false;
</script>

<a {href} aria-disabled={disabled} class:disabled>
	<slot />
</a>

<style>
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;

		height: 100%;

		padding: 1rem;

		border: 1px solid var(--border);
		border-radius: 0.25rem;

		text-decoration: none;
	}

	a:hover {
		border-color: var(--orange);
	}

	a.disabled,
	a.disabled:hover {
		border-color: var(--muted);
		pointer-events: none;
		cursor: default;
	}
</style>
