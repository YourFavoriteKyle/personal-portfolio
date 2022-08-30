<script lang="ts">
	import '../app.postcss';
	import ThemeButton from '../lib/ThemeButton/index.svelte';
	import { themeState } from '../stores/theme';
	import { onMount } from 'svelte';

	onMount(() => {
		themeState.useLocalStorage();
		if (!('theme' in localStorage)) {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				themeState.set('dark');
			} else {
				themeState.set('light');
			}
		}
	});
</script>

<svelte:head>
	<script>
		if (!('theme' in localStorage)) {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
			}
		} else {
			let $themeState = localStorage.getItem('theme');
			if ($themeState == 'dark') {
				document.documentElement.classList.add('dark');
			}
		}
	</script>
</svelte:head>

<div
	class="main-container font-sans text-primary-dark bg-primary-light dark:text-primary-light dark:bg-primary-dark h-min-screen"
>
	<div class="flex flex-wrap p-16 md:p-28">
		<div class="w-full md:w-1/3 md:pr-32 order-3 md:order-1">
			<div
				class="max-w-md md:h-[calc(100vh-14rem)] flex flex-col justify-between md:float-right md:text-right leading-loose tracking-right md:sticky md:top-28"
			>
				<div class="md:relative md:top-0">
					<h2 class="font-bold my-4 md:my-12">Article List Column</h2>
					<ul class="flex flex-wrap justify-between flex-col">
						<li>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="/" class="nav">Home</a>
						</li>
						<li>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="about" class="nav">About Me</a>
						</li>
						<li>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="experience" class="nav">Experience</a>
						</li>
						<li>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="experience" class="nav">Contact</a>
						</li>
					</ul>
				</div>
				<div class="md:relative md:bottom-0">
					<h2 class="font-bold my-4 md:my-12">Socials</h2>
					<ul class="flex flex-wrap justify-between flex-col">
						<li>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="about" class="nav">GitHub</a>
						</li>
						<li>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="/" class="nav">LinkedIn</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="w-full md:w-2/3 order-1 md:order-2">
			<div class="max-w-2xl leading-loose tracking-tight">
				<slot />
			</div>
		</div>
	</div>

	<ThemeButton />
</div>

<style>
	.main-container {
		-webkit-transition: all 300ms ease-in-out;
		-moz-transition: all 300ms ease-in-out;
		-ms-transition: all 300ms ease-in-out;
		-o-transition: all 300ms ease-in-out;
		transition: all 300ms ease-in-out;
	}
	:global(:root.dark::selection) {
		background: #e0e2dc;
		color: #2d2f31;

		/* WebKit/Blink Browsers */
	}
	:global(:root.dark::-moz-selection) {
		background: #e0e2dc;
		color: #2d2f31;
		/* Gecko Browsers */
	}
	:global(:root:not(.dark)::selection) {
		background: #2d2f31;
		color: #e0e2dc;

		/* WebKit/Blink Browsers */
	}
	:global(:root:not(.dark)::-moz-selection) {
		background: #2d2f31;
		color: #e0e2dc;

		/* WebKit/Blink Browsers */
	}
	:global(a:not(.nav)) {
		overflow-wrap: break-word;
		white-space: pre-line;
		font-weight: bold;
		text-decoration: none;
		padding: 2px;
		background: linear-gradient(to right, #e24e1b, #e24e1b);
		background-repeat: repeat-x;
		background-size: 100% 2px;
		background-position: 0 95%;
		-webkit-transition: all 150ms ease-in-out;
		-moz-transition: all 150ms ease-in-out;
		-ms-transition: all 150ms ease-in-out;
		-o-transition: all 150ms ease-in-out;
		transition: all 150ms ease-in-out;
	}
	:global(a:hover) {
		color: #e16c46;
		font-weight: bold;
		text-decoration: none;
		padding-bottom: 2px;
		background: linear-gradient(to right, #e16c46, #f0a776);
		background-repeat: repeat-x;
		background-size: 100% 2px;
		background-position: 50% 95%;
		-webkit-transition: color 150ms ease-in-out;
		-moz-transition: color 150ms ease-in-out;
		-ms-transition: color 150ms ease-in-out;
		-o-transition: color 150ms ease-in-out;
		transition: color 150ms ease-in-out;
	}
	a:focus {
		outline: #e16c46 dashed 3px;
	}
</style>
