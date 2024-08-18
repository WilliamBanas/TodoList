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
	class="card min-h-12 relative rounded flex flex-col gap-4 justify-center"
	draggable="true"
	on:drag
	on:dragenter={() => (isOVerAnotherLi = true)}
	on:dragleave={() => (isOVerAnotherLi = false)}
	on:drop={() => (isOVerAnotherLi = false)}
	on:dragstart={() => (isDragging = true)}
	on:dragend={() => (isDragging = false)}
	class:opacity-50={isDragging}
>
  <div ></div>
	<p class="p-3">{task.title}+{task.id}</p>
  <div id={task.id} class="absolute w-full h-full"></div>
</li>
