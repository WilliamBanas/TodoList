<script context="module" lang="ts">
	import type { TaskItemWithTags } from '../../routes/tables/[tableId]/+page.svelte';

	export interface tag_Task {
		id: string;
		taskId: string;
		tagId: string;
	}
</script>

<script lang="ts">
	// La tâche
	export let task: TaskItemWithTags;

	let isOVerAnotherLi = false;
	let isDragging = false;
</script>

<li
	role="listitem"
	id={task.id}
	class="w-full bg-background text-foreground border hover:ring-1 hover:ring-primary relative flex min-h-20 flex-col justify-start rounded  px-3 py-2"
	draggable="true"
	on:drag
	on:dragenter={() => (isOVerAnotherLi = true)}
	on:dragleave={() => (isOVerAnotherLi = false)}
	on:drop={() => (isOVerAnotherLi = false)}
	on:dragstart={() => (isDragging = true)}
	on:dragend={() => (isDragging = false)}
	class:opacity-50={isDragging}
>
	{#if task.tags.length > 0}
		<ul
			class="mb-1 flex flex-wrap
     gap-1"
		>
			{#each task.tags as tag}
				<li class={`bg-${tag.color} rounded px-2 text-xs font-semibold shadow`}>
					{tag.name}
				</li>
			{/each}
		</ul>
	{/if}

	<p class="mb-1 text-sm">{task.title}</p>
	<!-- <div id={task.id} class="absolute h-full w-full"></div> -->
</li>
