<script context="module" lang="ts">
	export interface TaskItem {
		id: string;
		title: string;
		description: string;
		userId: string;
		categoryId: string;
		createdAt: Date;
		updatedAt: Date;
	}
</script>

<script lang="ts">
	export let task: TaskItem;

	let isOVerAnotherLi = false;
	let isDragging = false;
</script>

<li
	role="listitem"
	id={task.id}
	class="shadow-md bg-secondary relative flex min-h-16 flex-col justify-start rounded"
	draggable="true"
	on:drag
	on:dragenter={() => (isOVerAnotherLi = true)}
	on:dragleave={() => (isOVerAnotherLi = false)}
	on:drop={() => (isOVerAnotherLi = false)}
	on:dragstart={() => (isDragging = true)}
	on:dragend={() => (isDragging = false)}
	class:opacity-50={isDragging}
>
	<ul class="p-2 flex flex-wrap gap-2 ">
    <li class="text-sm bg-primary rounded px-1">Frontend</li>
    <li class="text-sm bg-rose-600 rounded px-1">Backend</li>
    <li class="text-sm bg-lime-700 rounded px-1">Api</li>
  </ul>
	<p class="p-3 text-sm">{task.title}</p>
	<div id={task.id} class="absolute h-full w-full"></div>
</li>
