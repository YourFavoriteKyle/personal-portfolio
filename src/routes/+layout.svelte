<script lang="ts">
	import '../app.postcss';
	import ThemeButton from '../lib/themeButton.svelte';
</script>

<div
	class="main-container font-sans text-gray-700 bg-[#E0E2DC] dark:text-gray-100 dark:bg-[#2d2f31] h-min-screen"
>
	<div class="flex flex-wrap p-16">
		<div class="w-full md:w-1/2 md:pr-32 order-3 md:order-1">
			<div
				class="max-w-md md:float-right md:text-right leading-loose tracking-tight md:sticky md:top-0 "
			>
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
				</ul>
			</div>
		</div>
		<div class="w-full md:w-1/2 order-1 md:order-2">
			<div class="max-w-md leading-loose tracking-tight">
				<slot />
			</div>
		</div>
	</div>

	<ThemeButton />

	<style>
		.main-container {
			-webkit-transition: all 300ms ease-in-out;
			-moz-transition: all 300ms ease-in-out;
			-ms-transition: all 300ms ease-in-out;
			-o-transition: all 300ms ease-in-out;
			transition: all 300ms ease-in-out;
		}
		::selection {
			background: #e9d8fd;
			color: #202684;

			/* WebKit/Blink Browsers */
		}

		::-moz-selection {
			background: #e9d8fd;
			color: #202684;
			/* Gecko Browsers */
		}

		a:not(.nav) {
			font-weight: bold;
			text-decoration: none;
			padding: 2px;
			background: linear-gradient(to right, #5a67d8, #5a67d8);
			background-repeat: repeat-x;
			background-size: 100% 2px;
			background-position: 0 95%;
			-webkit-transition: all 150ms ease-in-out;
			-moz-transition: all 150ms ease-in-out;
			-ms-transition: all 150ms ease-in-out;
			-o-transition: all 150ms ease-in-out;
			transition: all 150ms ease-in-out;
		}

		a:hover {
			color: #b794f4;
			font-weight: bold;
			text-decoration: none;
			padding-bottom: 2px;
			background: linear-gradient(to right, #9f7aea, #e9d8fd);
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
			outline: #9f7aea dashed 3px;
		}
	</style>
</div>
