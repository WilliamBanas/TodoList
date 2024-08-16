<script lang="ts">
	import Task, { type TaskItem } from '$lib/components/Task.svelte';
	import Header from '../lib/components/Header.svelte';

	let tasksTodo: TaskItem[] = [
		{
			id: '1',
			title: 'Task 1',
			description: 'This is my description'
		},
		{
			id: '2',
			title: 'Task 2',
			description: 'This is my description'
		},
		{
			id: '3',
			title: 'Task 3',
			description: 'This is my description'
		}
		// {
		// 	id: '7',
		// 	title: 'Task 7',
		// 	description: 'This is my description'
		// },
		// {
		// 	id: '8',
		// 	title: 'Task 8',
		// 	description: 'This is my description'
		// },
		// {
		// 	id: '9',
		// 	title: 'Task 9',
		// 	description: 'This is my description'
		// },
		// {
		// 	id: '10',
		// 	title: 'Task 10',
		// 	description: 'This is my description'
		// }
	];

	let tasksThisWeek: TaskItem[] = [
		{
			id: '4',
			title: 'Task 4',
			description: 'This is my description'
		}
	];

	let tasksToday: TaskItem[] = [
		{
			id: '5',
			title: 'Task 5',
			description: 'This is my description'
		}
	];

	let tasksDone: TaskItem[] = [
		{
			id: '6',
			title: 'Task 6',
			description: 'This is my description'
		}
	];

	let isDraggingOverTodo = false;
	let isDraggingOverThisWeek = false;
	let isDraggingOverToday = false;
	let isDraggingOverDone = false;

	let taskDragging: TaskItem;

	function drop(event: DragEvent, tasksList: TaskItem[]) {
		const allTasks = [tasksToday, tasksTodo, tasksThisWeek, tasksDone];

		allTasks.forEach((tasksArray) => {
			const index = tasksArray.indexOf(taskDragging);
			if (index > -1) {
				tasksArray.splice(index, 1);
			}
		});

		const dropTarget = event.target as HTMLElement;
		if (dropTarget.nodeName === 'LI') {
			const id = dropTarget.getAttribute('id');
			const dropTargetTask = tasksList.find((task) => task.id === id);
			if (dropTargetTask) {
				const dropTargetIndex = tasksList.indexOf(dropTargetTask);
				tasksList.splice(dropTargetIndex, 0, taskDragging);
			}
		} else {
			tasksList.push(taskDragging);
		}
		tasksThisWeek = tasksThisWeek;
		tasksTodo = tasksTodo;
		tasksToday = tasksToday;
		tasksDone = tasksDone;
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
</script>

<div class="h-full">
	<Header />

	<div class="flex gap-3 mx-auto mt-48 h-fit w-fit">
		<div class="h-fit w-72 border-solid border-2 border-surface-600 rounded">
			<div class="h-16 bg-primary-600 rounded-tr rounded-tl flex items-center justify-center">
				<p class="text-2xl">To do</p>
			</div>
			<ul
				role="group"
				class="p-4 flex flex-col gap-3 h-80 overflow-y-auto transition"
				class:ring-2={isDraggingOverTodo}
				class:ring-surface-100={isDraggingOverTodo}
				class:ring-inset={isDraggingOverTodo}
				on:dragenter={() => (isDraggingOverTodo = true)}
				on:dragleave={() => (isDraggingOverTodo = false)}
				on:drop={(event) => {
					drop(event, tasksTodo), (isDraggingOverTodo = false);
				}}
				on:dragover={dragOver}
			>
				{#each tasksTodo as task}
					<Task on:drag={(event) => dragging(event, tasksTodo)} {task} />
				{/each}
			</ul>
		</div>

		<div class="h-fit w-72 border-solid border-2 border-surface-600 rounded">
			<div class="h-16 bg-error-600 rounded-tr rounded-tl flex items-center justify-center">
				<p class="text-2xl">This week</p>
			</div>
			<ul
				role="group"
				class="p-4 flex flex-col gap-3 h-80 overflow-y-auto transition"
				class:ring-2={isDraggingOverThisWeek}
				class:ring-surface-100={isDraggingOverThisWeek}
				class:ring-inset={isDraggingOverThisWeek}
				on:dragenter={() => (isDraggingOverThisWeek = true)}
				on:dragleave={() => (isDraggingOverThisWeek = false)}
				on:drop={(event) => {
					drop(event, tasksThisWeek), (isDraggingOverThisWeek = false);
				}}
				on:dragover={dragOver}
			>
				{#each tasksThisWeek as task}
					<Task on:drag={(event) => dragging(event, tasksThisWeek)} {task} />
				{/each}
			</ul>
		</div>

		<div class="h-fit w-72 border-solid border-2 border-surface-600 rounded">
			<div class="h-16 bg-warning-600 rounded-tr rounded-tl flex items-center justify-center">
				<p class="text-2xl">Today</p>
			</div>
			<ul
				role="group"
				class="p-4 flex flex-col gap-3 h-80 overflow-y-auto transition"
				class:ring-2={isDraggingOverToday}
				class:ring-surface-100={isDraggingOverToday}
				class:ring-inset={isDraggingOverToday}
				on:dragenter={() => (isDraggingOverToday = true)}
				on:dragleave={() => (isDraggingOverToday = false)}
				on:drop={(event) => {
					drop(event, tasksToday), (isDraggingOverToday = false);
				}}
				on:dragover={dragOver}
			>
				{#each tasksToday as task}
					<Task on:drag={(event) => dragging(event, tasksToday)} {task} />
				{/each}
			</ul>
		</div>

		<div class="h-fit w-72 border-solid border-2 border-surface-600 rounded">
			<div class="h-16 bg-success-600 rounded-tr rounded-tl flex items-center justify-center">
				<p class="text-2xl">Done</p>
			</div>
			<ul
				role="group"
				class="p-4 flex flex-col gap-3 h-80 overflow-y-auto transition"
				class:ring-2={isDraggingOverDone}
				class:ring-surface-100={isDraggingOverDone}
				class:ring-inset={isDraggingOverDone}
				on:dragenter={() => (isDraggingOverDone = true)}
				on:dragleave={() => (isDraggingOverDone = false)}
				on:drop={(event) => {
					drop(event, tasksDone), (isDraggingOverDone = false);
				}}
				on:dragover={dragOver}
			>
				{#each tasksDone as task}
					<Task on:drag={(event) => dragging(event, tasksDone)} {task} />
				{/each}
			</ul>
		</div>
	</div>
</div>
