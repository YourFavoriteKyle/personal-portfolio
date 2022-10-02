<script lang="ts">
	import { navigating } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
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
	<div in:fly={{ y: window.innerHeight, duration: 1000, delay: 1050, easing: cubicOut }}>
		{#key $navigating?.to?.url.pathname != $navigating?.from?.url.pathname}
			<div
				in:fly={{
					y: window.innerHeight,
					duration: 1000,
					delay: 1050,
					easing: cubicOut
				}}
				out:fly={{ y: window.innerHeight, duration: 1000, easing: cubicOut }}
			>
				<slot />
			</div>
		{/key}
	</div>
{:else}
	<slot />
{/if}
