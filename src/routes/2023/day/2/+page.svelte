<script lang="ts">
	import { fly } from 'svelte/transition';

	let total = 0;
	let cookies: number[] = [];
	let progress: HTMLDivElement | undefined = undefined;

	function onFeed() {
		const newCookie = Math.max(...cookies, 0) + 1;
		cookies = [...cookies, newCookie];
		setTimeout(() => {
			const cookieIndex = cookies.indexOf(newCookie);
			if (cookieIndex >= 0) {
				cookies = [...cookies.slice(0, cookieIndex), ...cookies.slice(cookieIndex + 1)];
				setTimeout(() => {
					total = Math.min(total + 1, 100);
				}, 250);
			}
		}, 1000);
	}

	/* 
  TODO:
  - Extract: remove 1 cookie at a time, make cookie transition fly out of top
  - Purge: remove all cookies at once, make each cookies transition fly out of top (disable other buttons while purging)
  - Show a stats panel in the middle (current total, cookies in total added, cookies extracted, cookies purged)
  - Look at tweening the value of 'total' to make the increase look smoother? svelte/motion
  - Try get colour to transition over gradient as each cookie is added removed
  */
</script>

<div class="container">
	<div class="progress">
		<div class="progress-top">
			<div
				style:height={`${total}%`}
				style:background-color={total < 33
					? 'var(--red)'
					: total < 66
						? 'var(--orange)'
						: 'var(--green)'}
				bind:this={progress}
			></div>
		</div>
		<div class="progress-bottom">
			{#each cookies as cookie (cookie)}
				<div
					class="cookie"
					in:fly={{ x: window.innerWidth, opacity: 1 }}
					out:fly={{ y: -100, duration: 500 }}
				></div>
			{/each}
		</div>
	</div>
	<div class="actions">
		<button disabled={total === 100} on:click={onFeed}>Feed</button>
		<button>Extract</button>
		<button>Purge</button>
	</div>
</div>

<style>
	.container {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		row-gap: 2rem;
	}

	.progress {
		display: flex;
		flex-direction: column;
	}

	.progress-top {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		flex: 1;
		min-height: 200px;
		width: 4rem;
		padding-top: 1rem;
		border: 4px solid var(--border);
		border-top: none;
		border-bottom: none;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
	}

	.progress-bottom {
		display: flex;
		align-items: center;
		min-height: 3.5rem;
		width: 100%;
		padding: 0.5rem;
		border: 4px solid var(--border);
		border-right: none;
		border-bottom-left-radius: 4px;
	}

	.cookie {
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--orange);
		border-radius: 100%;
		position: absolute;
	}

	.actions {
		grid-column: span 2;
		display: flex;
		justify-content: space-around;
		gap: 1rem;
	}

	.actions button {
		flex: 1;
		padding: 1rem;
	}
</style>
