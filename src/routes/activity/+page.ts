import type { Endpoints } from '@octokit/types';
import { error } from '@sveltejs/kit';

type PublicUserEvents = Endpoints['GET /users/{username}/events/public']['response'];

/** @type {import('./$types').PageLoad} */
export async function load(event: any) {
	const res = await event.fetch('https://api.github.com/users/yourfavoritekyle/events/public');
	if (res.status === 200) {
		const data: PublicUserEvents = await res.json();
		return { data };
	}

	throw error(404, 'Not found');
}
