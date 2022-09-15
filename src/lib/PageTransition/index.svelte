<script lang="ts">
	import { navigating } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let animations = false;

	onMount(
		() =>
			(animations =
				window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true ||
				window.matchMedia(`(prefers-reduced-motion: reduce)`).matches !== true)
	);
</script>

{#if !!animations}
	<div in:fly={{ x: -50, duration: 1000, delay: 500, easing: quintOut }}>
		{#key $navigating?.type}
			<div
				in:fly={{ y: 50, duration: 1000, delay: 1000, easing: quintOut }}
				out:fly={{ y: 50, duration: 1000, easing: quintOut }}
			>
				<slot />
			</div>
		{/key}
	</div>
{:else}
	<slot />
{/if}
