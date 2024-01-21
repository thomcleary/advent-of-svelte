import { dayDataUrl } from '$lib/utils';
import { type Child, dayOneBackup } from '$lib/data/backup/2023/dayOne.js';

export const load = async ({ fetch }) => {
	let children: Child[];

	const url = dayDataUrl(1);

	try {
		const response = await fetch(url);
		children = (await response.json()) as Child[];
	} catch {
		console.warn(`Failed to fetch data from ${url}. Using backup data instead.`);
		children = dayOneBackup;
	}

	return {
		children: children.map((child, i) => ({
			id: `${i}${child.name}`,
			...child
		}))
	};
};
