<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Task, { type TaskItem } from '$lib/components/Task.svelte';
	import plus from '$lib/assets/icon-plus.png';
	import { onMount } from 'svelte';

	interface Category {
		id: string;
		name: string;
		userId: string;
		task: TaskItem[];
		createdAt: Date;
		updatedAt: Date;
	}

	let isDraggingOverCategory: string | false = false;

	let taskDragging: TaskItem;

	const deleteTask = async (id: string) => {
		const result = await fetch('/deleteTask');
	};
	const changeTaskCategory = async (id: string, categoryId: string) => {
		const result = await fetch('/changeTaskCategory', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id, categoryId: categoryId }) // Pass the task ID in the request body
		});
	};

	function drop(event: DragEvent, tasksList: TaskItem[], id: string) {
		const allArraysOfTasks = categories.map((category) => category.task);

		allArraysOfTasks.forEach((tasksArray: TaskItem[]) => {
			const index = tasksArray.indexOf(taskDragging);
			if (index > -1) {
				tasksArray.splice(index, 1);
				//deleteTask(taskDragging.id);
			}
		});

		const dropTarget = event.target as HTMLElement;
		if (dropTarget.parentNode?.nodeName === 'LI') {
			const id = dropTarget.getAttribute('id');
			const dropTargetTask = tasksList.find((task) => task.id === id);
			if (dropTargetTask) {
				const dropTargetIndex = tasksList.indexOf(dropTargetTask);
				tasksList.splice(dropTargetIndex, 0, taskDragging);
			}
		} else {
			tasksList.push(taskDragging);
			changeTaskCategory(taskDragging.id, id);
		}
		// TODO: re-render all task arrays
		categories = categories;
	}

	function dragging(event: DragEvent, tasksList: TaskItem[]) {
		const id = (event.target as HTMLElement).getAttribute('id');
		const task = tasksList.find((task) => task.id === id);
		if (task) {
			taskDragging = task;
		}
	}

	function dragOver(event: DragEvent) {
		event.preventDefault();
	}

	export let data;

	let categories: Category[] = data.categories;
</script>

<div class="h-full">
	<Header nickname={data.nickname} />

	<div class="flex gap-4 mx-auto mt-24 h-fit px-8 box-border h-3/4">
		{#each categories as category}
			{#if category.task}
				<div
					role="contentinfo"
					class="h-fit w-72 border-solid border-2 border-surface-500 rounded bg-surface-700 p-2"
				>
					<p class="text-xl p-3">{category.name}</p>
					<ul
						role="group"
						class=" flex min-h-16 flex-col gap-2 overflow-y-auto transition"
						class:ring-2={isDraggingOverCategory === category.id ? true : false}
						class:ring-surface-100={isDraggingOverCategory === category.id ? true : false}
						class:ring={isDraggingOverCategory === category.id ? true : false}
						class:bg-surface-600={category.task.length === 0}
						class:justify-center={category.task.length === 0}
						on:dragenter={() => (isDraggingOverCategory = category.id)}
						on:dragleave={() => (isDraggingOverCategory = false)}
						on:drop={(event) => {
							drop(event, category.task, category.id), (isDraggingOverCategory = false);
						}}
						on:dragover={dragOver}
					>
						{#if category.task.length === 0}
							<p class="flex items-center justify-center h-full text-slate-500">slide here</p>
						{:else}
							{#each category.task as task}
								<Task on:drag={(event) => dragging(event, category.task)} {task} />
							{/each}
						{/if}
					</ul>
					<button
						class="flex items-center p-3 w-full gap-3 rounded transition hover:bg-surface-800"
					>
						<img class="w-4" src={plus} alt="" />
						<span>Add a task</span>
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>
