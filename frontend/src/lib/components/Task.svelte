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
	class="bg-secondary text-primary-foreground relative flex min-h-16 flex-col justify-start rounded shadow-md"
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
		<ul class="flex flex-wrap gap-2 p-2">
			{#each task.tags as tag}
				<li class={`bg-${tag.color} rounded px-2 text-sm font-semibold shadow`}>
					{tag.name}
				</li>
			{/each}
		</ul>
	{/if}

	<p class="p-3 text-sm text-foreground">{task.title}</p>
	<div id={task.id} class="absolute h-full w-full"></div>
</li>
