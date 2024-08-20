<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import type { Tag } from '../../routes/tables/[tableId]/+page.svelte';

	interface tag_Task {
		id: string;
		taskId: string;
		tagId: string;
	}

	export interface TaskItem {
		id: string;
		title: string;
		description: string | null;
		endAt: string | null;
		links: string[];
		tag_Task: tag_Task[];
		categoryId: string;
		createdAt: Date;
		updatedAt: Date;
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

	onMount(() => {
    console.log(actualTags);
	});
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
	<ul class="flex flex-wrap gap-2 p-2">
    {#each actualTags as actualTag}
		  <li class="rounded bg-pink-500 px-1 font-semibold text-sm shadow">{actualTag.name}</li>
    {/each}
	</ul>
	<p class="p-3 text-sm">{task.title}</p>
	<div id={task.id} class="absolute h-full w-full"></div>
</li>
