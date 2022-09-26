<script lang="ts" context="module">
	import type { Endpoints } from '@octokit/types';
	import Card from './card.svelte';
	import Expanded from './expanded.svelte';
	import { activityEvents } from '../../stores/activityCards';

	type PublicUserEvents = Endpoints['GET /users/{username}/events/public']['response'];

	export type NamedEvent = {
		display: string[];
		verboseAction: string;
		item: string;
		expanded: boolean;
		event: PublicUserEvents['data'][0];
	};
	export type NamedEventData = {
		display: string[];
		verboseAction: string;
		item: string;
	};
</script>

<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: PublicUserEvents;

	activityEvents.set(
		<NamedEvent[]>data.data.map(getEventType).filter((event) => event !== undefined)
	);

	function createNamedEvent(
		event: PublicUserEvents['data'][0],
		eventData: NamedEventData
	): NamedEvent {
		return {
			display: eventData.display,
			event: event,
			item: eventData.item,
			verboseAction: eventData.verboseAction,
			expanded: false
		};
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
				return createNamedEvent(event, {
					display: ['I ', ' on a ', ' on'],
					item: 'commit',
					verboseAction: 'commented'
				});
			}
			// {ref_type: 'branch' | 'tag'}
			case 'CreateEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' a ', ' on'],
					item: event.payload.ref_type,
					verboseAction: 'created'
				});
			}
			// {ref_type: 'branch' | 'tag'}
			case 'DeleteEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' a ', ' on'],
					item: event.payload.ref_type,
					verboseAction: 'deleted'
				});
			}
			// Only payload is link to forkee
			case 'ForkEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' a ', ''],
					verboseAction: 'forked',
					item: 'repository'
				});
			}
			// This is for wiki events
			case 'GollumEvent': {
				console.error('This event is not implemented yet: ' + event);
				break;
			}
			// Is an action event
			// {action: 'created' | 'edited' | 'deleted'}
			case 'IssueCommentEvent': {
				const eventAction = getEventAction(event);
				if (eventAction == 'created') {
					return createNamedEvent(event, {
						display: ['I ', ' on an ', '.'],
						verboseAction: 'commented',
						item: 'issue'
					});
				}
				return createNamedEvent(event, {
					display: ['I ', ' a comment on an ', '.'],
					verboseAction: eventAction,
					item: 'issue'
				});
			}
			// Is an action event
			// {action: 'opened' | 'edited' | 'closed' | 'reopened' | 'assigned' | 'unassigned' | 'labeled' | 'unlabled'}
			case 'IssuesEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' an ', '.'],
					verboseAction: getEventAction(event),
					item: 'issue'
				});
			}
			//  Is an action event
			// {action: 'added'}
			case 'MemberEvent': {
				break;
			}
			// Payload will be empty
			case 'PublicEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' a ', ' public.'],
					verboseAction: 'made',
					item: 'repository'
				});
			}
			// Is an action event
			// {action: 'opened' | 'edited' | 'closed' | 'reopened' | 'assigned' | 'unassigned' | 'review_requested' | 'review_request_removed' | 'labled' | 'unlabeled' | 'synchronize'}
			case 'PullRequestEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' a ', '.'],
					verboseAction: getEventAction(event),
					item: 'pull request'
				});
			}
			// Is an action event
			// {action: 'created'}
			case 'PullRequestReviewEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' a ', '.'],
					verboseAction: getEventAction(event),
					item: 'pull request review'
				});
			}
			// Is an action event
			// {action: 'created'}
			case 'PullRequestReviewCommentEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' on a ', '.'],
					verboseAction: 'commented',
					item: 'pull request review'
				});
			}
			// Is an action event
			// {action: 'resolved' | 'unresolved'}
			case 'PullRequestReviewThreadEvent': {
				// TODO: Come back to this display text
				return createNamedEvent(event, {
					display: ['I ', ' a ', '.'],
					verboseAction: getEventAction(event),
					item: 'pull request thread'
				});
			}
			case 'PushEvent': {
				if (event.payload.distinct_size > 1) {
					return createNamedEvent(event, {
						display: ['I ', ` ${event.payload.distinct_size} `, '.'],
						verboseAction: 'pushed',
						item: 'commits'
					});
				}
				return createNamedEvent(event, {
					display: ['I ', ` ${event.payload.distinct_size} `, '.'],
					verboseAction: 'pushed',
					item: 'commit'
				});
			}
			// Is an action event
			// {action: 'published'}
			case 'ReleaseEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' a ', '.'],
					verboseAction: getEventAction(event),
					item: 'release'
				});
			}
			// Is an action event
			// {action: 'created'}
			case 'SponsorshipEvent': {
				// TODO: Come back to this display text
				return createNamedEvent(event, {
					display: ['I ', ' sponsoring a ', '.'],
					verboseAction: 'started',
					item: 'repository'
				});
			}
			// Is an action event
			// {action: 'started'}
			case 'WatchEvent': {
				return createNamedEvent(event, {
					display: ['I ', ' watching a ', '.'],
					verboseAction: 'started',
					item: 'repostory'
				});
			}
			default: {
				console.error('An unexpected event was returned: ' + event);
				break;
			}
		}
	}
</script>

<h1 class="font-bold my-12">What I've Been Working On...</h1>

<div class="grid">
	{#each $activityEvents as activity (activity.event.id)}
		<Card bind:activity />
		{#if activity.expanded}
			<Expanded {activity} />
		{/if}
	{/each}
</div>

<style>
	div.grid {
		grid-template-columns: repeat(auto-fit, 50%);
		grid-auto-flow: dense;
	}
</style>
