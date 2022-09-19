import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load(event: any) {
	const res = await event.fetch('https://api.github.com/users/yourfavoritekyle/events/public');
	if (res.status === 200) {
		const eventData = await res.json();
		return { eventData };
	}

	throw error(404, 'Not found');
}
