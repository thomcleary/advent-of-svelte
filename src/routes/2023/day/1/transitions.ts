import { crossfade, fade } from 'svelte/transition';

export const transitionDuration = 250;

export const [send, receive] = crossfade({
	duration: transitionDuration,
	fallback(node, params) {
		return fade(
			node,
			typeof params === 'number' ? params : { ...params, duration: transitionDuration }
		);
	}
});
