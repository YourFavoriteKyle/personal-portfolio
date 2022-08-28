<script lang="ts" context="module">
	import { browser } from '$app/environment';

	let themeState: boolean = true;

	// On page load or when changing themes, best to add inline in `head` to avoid FOUC
	if (browser) {
		if (
			localStorage.getItem('color-theme') === 'dark' ||
			(!('color-theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			themeState = false;
			document.body.classList.add('dark');
		} else {
			themeState = true;
			document.body.classList.remove('dark');
		}
	}

	function toggleTheme() {
		if (themeState) {
			document.body.classList.add('dark');
		}
		if (!themeState) {
			document.body.classList.remove('dark');
		}
	}
</script>

<!-- Pin to top right corner -->
<div class="flex flex-col items-center absolute top-0 right-0 p-8">
	<div />
	<label class="switch bg-[#2d2f31] dark:bg-[#dce0e3]">
		<input on:click={toggleTheme} bind:checked={themeState} type="checkbox" />
		<div>
			<svg id="moon" viewBox="0 0 29 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M28.0039 1.6659C25.553 0.594427 22.8459 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C22.8459 40 25.553 39.4056 28.0039 38.3341C23.0809 33.7682 20 27.2439 20 20C20 12.7561 23.0809 6.23175 28.0039 1.6659Z"
					fill="#2d2f31"
				/>
			</svg>
			<svg id="sun" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="20" cy="20" r="20" fill="#dce0e3" />
			</svg>
		</div>
	</label>
</div>

<style>
	.switch {
		display: inline-block;
		font-size: 20px;
		height: 1.5em;
		width: 3em;
		border-radius: 1em;
	}

	.switch input {
		display: none;
		opacity: 0;
		height: 1.5em;
		width: 3em;
	}

	.switch div {
		padding: 0 0.3em;
		height: 1.5em;
		width: 3em;
		align-items: center;
		display: flex;
		-webkit-transition: all 250ms ease-in-out;
		-moz-transition: all 250ms ease-in-out;
		-ms-transition: all 250ms ease-in-out;
		-o-transition: all 250ms ease-in-out;
		transition: all 250ms ease-in-out;
	}

	.switch div svg {
		height: 1em;
		width: 1em;
		-webkit-transition: opacity 175ms ease-in-out 75ms;
		-moz-transition: opacity 175ms ease-in-out 75ms;
		-ms-transition: opacity 175ms ease-in-out 75ms;
		-o-transition: opacity 175ms ease-in-out 75ms;
		transition: opacity 175ms ease-in-out 75ms;
	}

	.switch div > #moon {
		opacity: 1;
	}

	.switch div > #sun {
		opacity: 0;
	}

	.switch input:checked + div > #sun {
		opacity: 1;
	}

	.switch input:checked + div > #moon {
		opacity: 0;
	}

	.switch input:checked + div {
		-webkit-transform: translate3d(10%, 0, 0);
		-moz-transform: translate3d(10%, 0, 0);
		transform: translate3d(10%, 0, 0);
	}

	:root {
		--gray-5: #010101; /*dark*/
		--gray-10: #040404;
		--gray-15: #070808;
		--gray-20: #0d0d0e;
		--gray-25: #141516;
		--gray-30: #1e2022;
		--gray-35: #2d2f31;
		--gray-40: #404346;
		--gray-45: #5b5e62;
		--gray-50: #7c8084;
		--gray-55: #9da1a5;
		--gray-60: #b9bdc1;
		--gray-65: #cdd1d5;
		--gray-70: #dce0e3;
		--gray-75: #e7eaed;
		--gray-80: #eff2f5;
		--gray-85: #f4f7fa;
		--gray-90: #f7fafd;
		--gray-95: #fcfefe; /*light*/
		--animate: 200ms;
	}
</style>
