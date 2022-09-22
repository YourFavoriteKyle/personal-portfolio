<script lang="ts">
	import type { NamedEvent } from './+page.svelte';
	import Expanded from './expanded.svelte';
	export let action: NamedEvent;
	export let expanded: boolean = false;
</script>

<div
	class="w-[44%] mt-auto mb-8 mx-[3%] p-4 text-center text-primary-dark dark:text-primary-light relative"
>
	<h4 class="bar-parent leading-normal pb-4 relative z-[3]">
		{action.display[0]}
		{action.verboseAction}{action.display[1]}<a href="github.com">{action.item}</a>{action
			.display[2]}
		<span class="swipe-down dark:bg-primary-dark bg-primary-light" />
	</h4>
	<span class="bar z-[4] dark:bg-primary-light bg-primary-dark" />
	<div class="flex justify-around pt-3 relative bottom-text z-[2]">
		<p class="px-2">193 Watchers</p>
		<p class="px-2">193 Stargazers</p>
		<span class="swipe-up dark:bg-primary-dark bg-primary-light" />
	</div>
	<div class="arrow w-1/2 p-2 inline-block text-center cursor-pointer">
		<figure
			class="border-r-2 border-b-2 inline-block origin-center rotate-45 dark:border-primary-light border-primary-dark"
		/>
	</div>
	<!-- <Expanded {action} /> -->
</div>

<style>
	/* Arrow Styles */
	@keyframes Bounce {
		0% {
			transform: translateY(0%) rotate(45deg);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
		50% {
			transform: translateY(-50%) rotate(45deg);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		100% {
			transform: translateY(0%) rotate(45deg);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}
	.arrow > figure {
		transition: border 1s;
		padding: 6px;
	}
	.arrow:hover > figure {
		animation: Bounce 1.25s infinite alternate;
		border-color: #e16c46;
		transition: border 1s;
	}
	/* END Arrow Styles */
	/* Bar styles */
	@keyframes SplitOutward {
		0% {
			width: 0%;
			left: 50%;
			animation-timing-function: cubic-bezier(0.4, 0, 0.4, 1);
		}
		100% {
			width: 95%;
			left: 0;
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
	}
	.bar-parent {
		border: 0;
		padding: 7px 0;
	}
	.bar-parent ~ .bar {
		position: absolute;
		margin-left: 2.5%;
		left: 50%;
		width: 0;
		height: 2px;
		animation-name: SplitOutward;
		animation-delay: 1s;
		animation-duration: 0.75s;
		animation-fill-mode: forwards;
	}
	/* END Bar styles */
	/* Text Reveal */
	@keyframes RevealTextUp {
		0% {
			transform: translateY(100%);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
		100% {
			transform: translateY(0%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
	}
	@keyframes RevealTextDown {
		0% {
			transform: translateY(-100%);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
		100% {
			transform: translateY(0%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
	}
	@keyframes BoxDown {
		0% {
			height: 125%;
			bottom: -25%;
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
		100% {
			height: 0%;
			bottom: 0%;
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
	}
	@keyframes BoxUp {
		0% {
			height: 100%;
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
		1% {
			bottom: 0%;
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
		99% {
			height: 0%;
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		100% {
			height: 0%;
			bottom: 100%;
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
	}
	.bar-parent {
		transform: translateY(100%);
		animation-name: RevealTextUp;
		animation-delay: 1.75s;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}
	.bottom-text {
		transform: translateY(-100%);
		animation-name: RevealTextDown;
		animation-delay: 1.75s;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}
	.swipe-down {
		position: absolute;
		height: 125%;
		width: 100%;
		left: 0;
		bottom: -25%;
		animation-name: BoxDown;
		animation-delay: 1.75s;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}
	.swipe-up {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		bottom: 0;
		animation-name: BoxUp;
		animation-delay: 1.75s;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}
	/* END Text Reveal */
</style>
