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
	<div in:fly={{ y: 50, duration: 750, delay: 500, easing: quintOut }}>
		{#key $navigating?.to?.url.pathname != $navigating?.from?.url.pathname}
			<div
				in:fly={{ y: 50, duration: 750, delay: 775, easing: quintOut }}
				out:fly={{ y: 50, duration: 750, easing: quintOut }}
			>
				<slot />
			</div>
		{/key}
	</div>
{:else}
	<slot />
{/if}
