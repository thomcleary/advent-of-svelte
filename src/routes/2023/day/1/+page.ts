import type { Child } from './children';

const dayOneUrl = 'https://advent.sveltesociety.dev/data/2023/day-one.json';

export const load = async ({ fetch }) => {
	let children: Child[];

	try {
		const response = await fetch(dayOneUrl);
		children = (await response.json()) as Child[];
	} catch {
		console.warn(`Failed to fetch data from ${dayOneUrl}. Using backup data instead.`);
		children = (await import('./children')).backupChildren;
	}

	return {
		children: children.map((child, i) => ({
			id: `${i}${child.name}`,
			...child
		}))
	};
};
