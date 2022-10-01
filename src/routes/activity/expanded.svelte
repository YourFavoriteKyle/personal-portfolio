<script lang="ts">
	import type { NamedEvent } from './+page.svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut, circInOut } from 'svelte/easing';
	import { comment } from 'postcss';

	export let activity: NamedEvent;
</script>

<div
	transition:slide={{ duration: 1000, easing: circInOut }}
	class="col-span-full w-full mb-4 mx-[4%] whitespace-pre-wrap leading-normal relative"
>
	<div class="z-[1] dark:bg-primary-dark bg-primary-light absolute">
		<a href={activity.event.repo.url.replace('https://api.github.com/repos', 'https://github.com')}
			>{activity.event.repo.name}</a
		>{#if activity.event.created_at}
			<span>: {new Date(activity.event.created_at).toLocaleDateString()}</span>
		{/if}
	</div>
	{#if activity.event.payload.commits}
		{#each activity.event.payload.commits as commit}
			<div class="container">
				<span in:slide={{ duration: 2000, easing: cubicInOut }} class="commit-line" />
				<span class="flex mt-4">
					<div class="z-[1] my-auto dark:bg-primary-dark bg-primary-light">
						<svg
							class="dark:fill-primary-light fill-primary-dark"
							height="16"
							viewBox="0 0 16 16"
							version="1.1"
							width="16"
						>
							<path
								fill-rule="evenodd"
								d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"
							/>
						</svg>
					</div>
					<a
						class="ml-2"
						href={`${activity.event.repo.url.replace(
							'https://api.github.com/repos',
							'https://github.com'
						)}${'/commit/'}${commit.sha}`}>{commit.sha.substring(0, 7)}</a
					>
				</span>
				<p class="ml-8">{commit.message}</p>
			</div>
		{/each}
	{/if}
	{#if activity.event.payload.issue}
		<div class="container mt-10 ml-6">
			<h3>
				<a href={activity.event.payload.issue.html_url}>#{activity.event.payload.issue.number}</a>
				{activity.event.payload.issue.title}
			</h3>
			<p class="ml-2">
				{#if activity.event.payload.comment}
					{activity.event.payload.comment.body}
				{:else}
					{activity.event.payload.issue.body}
				{/if}
			</p>
		</div>
	{/if}
	{#if activity.event.payload.pull_request}
		<div class="container mt-10 ml-6">
			<h3>
				<a href={activity.event.payload.pull_request.html_url}
					>#{activity.event.payload.pull_request.number}</a
				>
				{#if activity.event.payload.pull_request.commits}
					<span class="whitespace-normal"
						>I merged {activity.event.payload.pull_request.commits} commits into
						<span>{activity.event.payload.pull_request.base.ref}</span>
						from <span>{activity.event.payload.pull_request.head.ref}</span>
					</span>
				{/if}
			</h3>

			<p class="ml-2">
				{#if activity.event.payload.comment}
					{activity.event.payload.comment.body}
				{:else}
					{activity.event.payload.pull_request.body}
				{/if}
			</p>
		</div>
	{/if}
	{#if (activity.event.type == 'CreateEvent' || activity.event.type == 'DeleteEvent') && activity.event.payload}
		<div class="container mt-10 ml-6">
			<h3>
				<a
					href={`${activity.event.repo.url.replace(
						'https://api.github.com/repos',
						'https://github.com'
					)}${'/tree/'}${activity.event.payload.ref}`}>{activity.event.payload.ref}</a
				>
			</h3>
			<p class="ml-2">
				{#if activity.event.payload.description}
					{activity.event.payload.description}
				{:else}
					There was no description given.
				{/if}
			</p>
		</div>
	{/if}
</div>

<style>
	.commit-line {
		background-color: gray;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		display: block;
		width: 2px;
		content: '';
		margin-left: 7px;
	}
</style>
