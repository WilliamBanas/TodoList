<script lang="ts">
	import Header from '../lib/Header.svelte';

	const tasksTodo = [
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
		},
		{
			id: '7',
			title: 'Task 7',
			description: 'This is my description'
		},
		{
			id: '8',
			title: 'Task 8',
			description: 'This is my description'
		},
		{
			id: '9',
			title: 'Task 9',
			description: 'This is my description'
		},
		{
			id: '10',
			title: 'Task 10',
			description: 'This is my description'
		}
	];

	const tasksThisWeek = [
		{
			id: '4',
			title: 'Task 4',
			description: 'This is my description'
		}
	];

	const tasksToday = [
		{
			id: '5',
			title: 'Task 5',
			description: 'This is my description'
		}
	];

	const tasksDone = [
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

	function todoDragEnter() {
		isDraggingOverTodo = true;
	}

	function todoDragLeave() {
		isDraggingOverTodo = false;
	}

	function thisWeekDragEnter() {
		isDraggingOverThisWeek = true;
	}

	function thisWeekDragLeave() {
		isDraggingOverThisWeek = false;
	}

	function todayDragEnter() {
		isDraggingOverToday = true;
	}

	function todayDragLeave() {
		isDraggingOverToday = false;
	}

	function doneDragEnter() {
		isDraggingOverDone = true;
	}

	function doneDragLeave() {
		isDraggingOverDone = false;
	}

	let todoArea: [];
	let thisWeekArea: [];
	let todayArea: [];
	let doneArea: [];
</script>

<div class="h-full">
	<Header />

	<div class="flex gap-3 mx-auto mt-48 h-fit w-fit">

		<div class="h-fit w-72 border-solid border-2 border-surface-600 rounded">
			<div
				class="h-16 bg-primary-600 rounded-tr rounded-tl border-b-2 border-surface-600 flex items-center justify-center"
			>
				<p class="text-2xl">To do</p>
			</div>
			<div
				role="group"
				class="p-2 flex flex-col gap-2 h-80 overflow-y-auto"
				class:ring-2={isDraggingOverTodo}
				class:ring-surface-100={isDraggingOverTodo}
				class:ring-inset={isDraggingOverTodo}
				on:dragenter={todoDragEnter}
				on:dragleave={todoDragLeave}
			>
				{#each tasksTodo as task}
					<div id={task.id} class="card min-h-12 flex items-center gap-2 px-2" draggable="true">
						<p>{task.title}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="h-fit w-72 border-solid border-2 border-surface-600 rounded">
			<div class="h-16 bg-error-600 rounded-tr rounded-tl flex items-center justify-center">
				<p class="text-2xl">This week</p>
			</div>
			<div
				role="group"
				class="p-2 flex flex-col gap-2 h-80 overflow-y-auto"
				class:ring-2={isDraggingOverThisWeek}
				class:ring-surface-100={isDraggingOverThisWeek}
				class:ring-inset={isDraggingOverThisWeek}
				on:dragenter={thisWeekDragEnter}
				on:dragleave={thisWeekDragLeave}
			>
				{#each tasksThisWeek as task}
					<div id={task.id} class="card min-h-12 flex items-center gap-2 px-2" draggable="true">
						<p>{task.title}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="h-fit w-72 border-solid border-2 border-surface-600 rounded">
			<div class="h-16 bg-warning-600 rounded-tr rounded-tl flex items-center justify-center">
				<p class="text-2xl">Today</p>
			</div>
			<div
				role="group"
				class="p-2 flex flex-col gap-2 h-80 overflow-y-auto"
				class:ring-2={isDraggingOverToday}
				class:ring-surface-100={isDraggingOverToday}
				class:ring-inset={isDraggingOverToday}
				on:dragenter={todayDragEnter}
				on:dragleave={todayDragLeave}
			>
				{#each tasksToday as task}
					<div id={task.id} class="card min-h-12 flex items-center gap-2 px-2">
						<p>{task.title}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="h-fit w-72 border-solid border-2 border-surface-600 rounded">
			<div class="h-16 bg-success-600 rounded-tr rounded-tl flex items-center justify-center">
				<p class="text-2xl">Done</p>
			</div>
			<div
				role="group"
				class="p-2 flex flex-col gap-2 h-80 overflow-y-auto"
				class:ring-2={isDraggingOverDone}
				class:ring-surface-100={isDraggingOverDone}
				class:ring-inset={isDraggingOverDone}
				on:dragenter={doneDragEnter}
				on:dragleave={doneDragLeave}
			>
				{#each tasksDone as task}
					<div id={task.id} class="card min-h-12 flex items-center gap-2 px-2" draggable="true">
						<p>{task.title}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
