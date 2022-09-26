import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { NamedEvent } from '../routes/activity/+page.svelte';

export const activityEvents = (() => {
	const { set, update, subscribe }: Writable<NamedEvent[]> = writable();

	return {
		set,
		update,
		subscribe
	};
})();
