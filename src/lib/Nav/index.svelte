<script lang="ts">
	interface Route {
		ref: string;
		name: string;
	}

	export let routes: Array<Route>;
	export let header: string = '';
</script>

<h2 class="font-bold my-4 md:my-12">{header}</h2>

<ul class="flex flex-wrap justify-between flex-col">
	{#each routes as route}
		<li>
			<a href={route.ref} class="nav">{route.name}</a>
		</li>
	{/each}
</ul>
