<script context="module" lang="ts">
	export interface TaskItem {
		id: string;
		title: string;
		description: string;
	}
</script>

<script lang="ts">
	export let task: TaskItem;

	let isOVerAnotherLi = false;
  let isDragging = false

  // class:after:top-[-7px]={isOVerAnotherLi}
	// class:after:absolute={isOVerAnotherLi}
	// class:after:w-full={isOVerAnotherLi}
	// class:after:border-dashed={isOVerAnotherLi}
	// class:after:border-t-2={isOVerAnotherLi}
	// class:after:border-surface-100={isOVerAnotherLi}

</script>

<li
	role="listitem"
	id={task.id}
	class="card min-h-12 flex items-center gap-2 px-2 relative transition"
	draggable="true"
	on:drag
	on:dragenter={() => {isOVerAnotherLi = true}}
	on:dragleave={() => isOVerAnotherLi = false}
  on:drop={() => isOVerAnotherLi = false}
  on:dragstart={() => isDragging = true}
  on:dragend={() => isDragging = false}
  class:opacity-50={isDragging}
>
	<p>{task.title}</p>
</li>
