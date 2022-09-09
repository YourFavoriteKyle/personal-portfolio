<script lang="ts">
	import { themeState } from '../../stores/theme';

	let themeInput: boolean;

	themeState.subscribe(() => {
		themeInput = $themeState == 'dark' ? false : true;
	});

	function toggleTheme() {
		themeInput ? themeState.set('dark') : themeState.set('light');
	}
</script>

<!-- Pin to top right corner -->
<div
	class="flex flex-col items-center absolute md:fixed top-0 right-0 p-8"
	animation-type="animate__fadeInDown"
	animation-delay="1000ms"
>
	<div />
	<label class="switch bg-primary-dark dark:bg-primary-light">
		<input on:click={toggleTheme} bind:checked={themeInput} type="checkbox" />
		<div>
			<svg
				class="fill-primary-dark"
				id="moon"
				viewBox="0 0 29 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M28.0039 1.6659C25.553 0.594427 22.8459 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C22.8459 40 25.553 39.4056 28.0039 38.3341C23.0809 33.7682 20 27.2439 20 20C20 12.7561 23.0809 6.23175 28.0039 1.6659Z"
				/>
			</svg>
			<svg
				class="fill-primary-light"
				id="sun"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="20" cy="20" r="20" />
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

	/* The :checked state does not trigger when the checked value is driven via store updates */

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
</style>
