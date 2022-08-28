import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const themeState = (() => {
	const { set, update, subscribe } = writable(init());

	function init() {
		if (browser) {
			return localStorage.getItem('theme');
		}
	}

	return {
		set,
		update,
		subscribe,
		useLocalStorage: () => {
			const data = localStorage.getItem('theme');
			if (data) {
				set(data);
			}

			subscribe((current) => {
				if (current) {
					localStorage.setItem('theme', current);
					current == 'dark'
						? document.documentElement.classList.add('dark')
						: document.documentElement.classList.remove('dark');
				}
			});
		}
	};
})();
