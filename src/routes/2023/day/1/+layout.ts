import { days2023 } from '$lib/data/days';

const day = 1;

export const load = async () => ({ day, ...days2023[day - 1] });
