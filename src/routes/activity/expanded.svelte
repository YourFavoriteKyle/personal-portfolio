<script lang="ts">
	import type { NamedEvent } from './+page.svelte';
	import { slide } from 'svelte/transition';

	export let activity: NamedEvent;
</script>

<div
	in:slide={{ duration: 500 }}
	out:slide={{ duration: 500 }}
	class="col-span-full w-full mb-8 mx-[3%] px-4 pb-4"
>
	<a href={activity.event.repo.url.replace('https://api.github.com/repos', 'https://github.com')}
		>{activity.event.repo.name}</a
	>
	{#if activity.event.payload.commits}
		{#each activity.event.payload.commits as commit}
			<p>{commit.message}</p>
		{/each}
	{/if}
	{#if activity.event.created_at}
		<p>Performed on: {new Date(activity.event.created_at).toLocaleDateString()}</p>
	{/if}
</div>
