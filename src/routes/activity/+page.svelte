<script lang="ts">
	import type { Endpoints } from '@octokit/types';

	type PublicUserEvents = Endpoints['GET /users/{username}/events/public']['response'];
	type NamedEvent = {
		display: string;
		verboseAction: string;
		event: PublicUserEvents['data'][0];
	};

	/** @type {import('./$types').PageData} */
	export let data: PublicUserEvents;

	let actions = data.data.map(getEventType);

	function createNamedEvent(
		event: PublicUserEvents['data'][0],
		display: string,
		verboseAction: string = ''
	): NamedEvent {
		return { display, event, verboseAction };
	}

	function getEventAction(event: PublicUserEvents['data'][1]): string {
		switch (event.payload.action) {
			case undefined: {
				return '';
			}
			case 'review_requested': {
				return 'requested a review on';
			}
			case 'review_request_removed': {
				return 'removed my review request from';
			}
			// TODO: Figure out what synchronize refers to
			case 'synchronize': {
				return 'synchronized';
			}
			default: {
				return event.payload.action;
			}
		}
	}

	function getEventType(event: PublicUserEvents['data'][1]): NamedEvent | undefined {
		switch (event.type) {
			// Is an action event
			// {action: 'created'}
			case 'CommitCommentEvent': {
				return createNamedEvent(event, 'I commented on a commit.', getEventAction(event));
			}
			// {ref_type: 'branch' | 'tag'}
			case 'CreateEvent': {
				return createNamedEvent(event, 'I created $d a on', event.payload.ref_type);
			}
			// {ref_type: 'branch' | 'tag'}
			case 'DeleteEvent': {
				return createNamedEvent(event, 'I deleted a $d on', getEventAction(event));
			}
			// Only payload is link to forkee
			case 'ForkEvent': {
				return createNamedEvent(event, 'I ', 'forked');
			}
			// This is for wiki events
			case 'GollumEvent': {
				console.error('This event is not implemented yet: ' + event);
				break;
			}
			// Is an action event
			// {action: 'created' | 'edited' | 'deleted'}
			case 'IssueCommentEvent': {
				return createNamedEvent(event, 'I $d a comment on an issue.', getEventAction(event));
			}
			// Is an action event
			// {action: 'opened' | 'edited' | 'closed' | 'reopened' | 'assigned' | 'unassigned' | 'labeled' | 'unlabled'}
			case 'IssuesEvent': {
				return createNamedEvent(event, 'I $d an issue.', getEventAction(event));
			}
			//  Is an action event
			// {action: 'added'}
			case 'MemberEvent': {
				break;
			}
			// Payload will be empty
			case 'PublicEvent': {
				return createNamedEvent(event, 'I made a repository public.');
			}
			// Is an action event
			// {action: 'opened' | 'edited' | 'closed' | 'reopened' | 'assigned' | 'unassigned' | 'review_requested' | 'review_request_removed' | 'labled' | 'unlabeled' | 'synchronize'}
			case 'PullRequestEvent': {
				return createNamedEvent(event, 'I $d a pull request.', getEventAction(event));
			}
			// Is an action event
			// {action: 'created'}
			case 'PullRequestReviewEvent': {
				return createNamedEvent(event, 'I $d a pull request review.', getEventAction(event));
			}
			// Is an action event
			// {action: 'created'}
			case 'PullRequestReviewCommentEvent': {
				return createNamedEvent(event, 'I commented on a pull request review.');
			}
			// Is an action event
			// {action: 'resolved' | 'unresolved'}
			case 'PullRequestReviewThreadEvent': {
				// TODO: Come back to this display text
				return createNamedEvent(event, 'I $d a pull request.', getEventAction(event));
			}
			case 'PushEvent': {
				return createNamedEvent(event, `I pushed ${event.payload.distinct_size} commits.`);
			}
			// Is an action event
			// {action: 'published'}
			case 'ReleaseEvent': {
				return createNamedEvent(event, 'I $d a release.', getEventAction(event));
			}
			// Is an action event
			// {action: 'created'}
			case 'SponsorshipEvent': {
				// TODO: Come back to this display text
				return createNamedEvent(event, 'I started sponsoring a repository.');
			}
			// Is an action event
			// {action: 'started'}
			case 'WatchEvent': {
				return createNamedEvent(event, 'I started watching a repository.', getEventAction(event));
			}
			default: {
				console.error('An unexpected event was returned: ' + event);
				break;
			}
		}
	}
</script>

<h1 class="font-bold my-12">What I've Been Working On...</h1>

<div class="flex flex-wrap">
	{#each actions as action}
		{@const re = new RegExp('\\$\\w', 'gm')}
		{#if action}
			<div
				class="w-[46%] mt-auto mb-8 mx-[1%] p-4 text-center text-primary-dark dark:text-primary-light relative"
			>
				<h4 class="bar-parent leading-normal pb-4 relative z-[3]">
					{action.display.replace(re, action.verboseAction)} <br /><a href="github.com"
						>{action?.event.repo.name}</a
					>
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
			</div>
		{/if}
	{/each}
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
