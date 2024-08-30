<script context="module" lang="ts">
	import type { TaskItemWithTags } from '../../routes/tables/[tableId]/+page.svelte';
  import Badge from './ui/badge/badge.svelte';

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
	class="w-full bg-background text-foreground border border-secondary/50 hover:ring-2 hover:ring-primary relative flex min-h-20 flex-col justify-start rounded px-3 py-2 transition"
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
			class="mb-2 flex flex-wrap
     gap-1"
		>
			{#each task.tags as tag}
				<Badge class={`bg-${tag.color} rounded text-xs font-semibold shadow`}>
					{tag.name}
				</Badge>
			{/each}
		</ul>
	{/if}

	<p class="mb-2 text-sm">{task.title}</p>
	<div id={task.id} class="absolute inset-0 h-full w-full"></div>
</li>
