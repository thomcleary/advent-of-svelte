const dayToStringMap = {
	1: 'one'
} as const;

export const dayDataUrl = (day: keyof typeof dayToStringMap) =>
	`https://advent.sveltesociety.dev/data/2023/day-${dayToStringMap[day]}.json`;
