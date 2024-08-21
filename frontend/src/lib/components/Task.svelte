<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import type { Tag } from '../../routes/tables/[tableId]/+page.svelte';
  import type { TaskItem } from '../../routes/tables/[tableId]/+page.svelte';

	export interface tag_Task {
		id: string;
		taskId: string;
		tagId: string;
	}
</script>

<script lang="ts">
	// La tâche
	export let task: TaskItem;

	// Tout les tags
	export let tags: Tag[];

	// Toutes les associassions entre tâche et tag
	let tag_Tasks: tag_Task[] = task.tag_Task;

	// Tableau des tags de la tâche
	// Pour chaque associassion entre tâche et tag on vérifie si son id est le même que l'un des tags
	// Tout les tags qui ressortent sont stockés dans ce tableau
	let actualTags = tag_Tasks.map((tag_Task) => tags.find((tag) => tag_Task.tagId === tag.id));

	let isOVerAnotherLi = false;
	let isDragging = false;
</script>

<li
	role="listitem"
	id={task.id}
	class="bg-secondary relative flex min-h-16 flex-col justify-start rounded shadow-md"
	draggable="true"
	on:drag
	on:dragenter={() => (isOVerAnotherLi = true)}
	on:dragleave={() => (isOVerAnotherLi = false)}
	on:drop={() => (isOVerAnotherLi = false)}
	on:dragstart={() => (isDragging = true)}
	on:dragend={() => (isDragging = false)}
	class:opacity-50={isDragging}
>
	{#if actualTags.length > 0}
		<ul class="flex flex-wrap gap-2 p-2">
			{#each actualTags as actualTag}
				<li class={`bg-${actualTag?.color} rounded px-1 text-xs font-semibold shadow`}>
					{actualTag?.name}
				</li>
			{/each}
		</ul>
	{/if}

	<p class="p-3 text-sm">{task.title}</p>
	<div id={task.id} class="absolute h-full w-full"></div>
</li>
