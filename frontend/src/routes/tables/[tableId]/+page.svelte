<script lang="ts" context="module">
	export interface Category {
		id: string;
		name: string;
		userId: string;
		createdAt: Date;
		updatedAt: Date;
	}

	export interface Tag {
		id: string;
		name: string;
		color: string;
		tableId: string;
	}

	export interface TaskItemWithTags {
		id: string;
		title: string;
		description: string | null;
		endAt: string | null;
		links: string[];
		tag_Task: tag_Task[];
		tags: Tag[];
		categoryId: string;
		createdAt: Date;
		updatedAt: Date;
	}
</script>

<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { tag_Task } from '$lib/components/Task.svelte';
	import Task from '$lib/components/Task.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import AddTaskCard from '$lib/components/addTaskCard.svelte';
	// import UnlistedTasks from '$lib/components/UnlistedTasks.svelte';

	let isDraggingOverCategory: string | false = false;
	// La tâche en cours de drag
	let taskDragging: TaskItemWithTags;
	// Données de la page
	export let data: any;
	let tableId = data.tableId;
	let tags: Tag[] = data.tags;
	// Toutes les tâches
	let tasks: TaskItemWithTags[] = data.tasks;
	let dataForm = data.form;
	// Toutes les tâches avec leurs tags respectifs
	let tasksWithTags = tasks.map((task) => {
		const tagsAssocies = task.tag_Task
			.map((tagTask: tag_Task) => {
				return tags.find((tag) => tag.id === tagTask.tagId);
			})
			.filter((tag) => tag !== undefined);
		return {
			...task,
			tags: tagsAssocies.map((tag: Tag) => ({
				id: tag.id,
				name: tag.name,
				color: tag.color,
				tableId: tag.tableId
			}))
		};
	});

	// Catégories
	let categories: Category[] = data.categories;

	const updateTaskCategory = async (id: string, categoryId: string) => {
		const response = await fetch('/api/task', {
			method: 'PATCH',
			body: JSON.stringify({
				id,
				categoryId
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const changedCategoryId = await response.json();
	};

	function drop(event: DragEvent, tasksList: TaskItemWithTags[], id: string) {
		const dropTarget = event.target as HTMLElement;
		if (dropTarget.getAttribute('id') === taskDragging.id) {
			return null;
		} else if (dropTarget.parentNode?.nodeName === 'LI') {
			const id = dropTarget.getAttribute('id');
			const dropTargetTask = tasksList.find((task) => task.id === id);
			if (dropTargetTask) {
				const dropTargetIndex = tasksList.indexOf(dropTargetTask);
				tasksList.splice(dropTargetIndex, 0, taskDragging);
			}
		}
		taskDragging.categoryId = id;
		updateTaskCategory(taskDragging.id, id);
		tasksWithTags = tasksWithTags;
	}

	function dragging(event: DragEvent, tasksList: TaskItemWithTags[]) {
		const id = (event.target as HTMLElement).getAttribute('id');
		const task = tasksList.find((task) => task.id === id);
		if (task) {
			taskDragging = task;
		}
	}

	function dragOver(event: DragEvent) {
		event.preventDefault();
	}

	let isAddingTask = categories.reduce(
		(acc, category) => {
			acc[category.id] = false;
			return acc;
		},
		{} as { [key: string]: boolean }
	);

	function startAddingTask(categoryId: string) {
		for (const key in isAddingTask) {
			isAddingTask[key] = false;
			console.log('yo');
		}
		isAddingTask[categoryId] = true;
	}

	function endAddingTask(categoryId: string) {
		isAddingTask[categoryId] = false;
	}

	function addingTask(categoryId: string) {
		endAddingTask(categoryId);
		tasksWithTags = tasksWithTags;
	}
</script>

<div class="h-full">
	<Header nickname={data.nickname} />

	<main class="bg-background box-border flex h-3/4 h-fit h-full gap-4 overflow-x-auto px-8">
		{#each categories as category}
			{@const categoryTasks = tasksWithTags.filter((task) => task.categoryId === category.id)}
			<div
				role="group"
				class="mt-24 h-fit"
				on:dragenter={() => (isDraggingOverCategory = category.id)}
				on:dragleave={() => (isDraggingOverCategory = false)}
				on:drop={(event) => {
					drop(event, categoryTasks, category.id), (isDraggingOverCategory = false);
				}}
				on:dragover={dragOver}
			>
				<Card.Root
					role="contentinfo"
					class="bg-card text-card-foreground min-h-34 flex h-fit w-72 min-w-72 flex-col justify-between shadow-lg"
				>
					<Card.Header class="p-4">
						<Card.Title class="text-xl">{category.name}</Card.Title>
					</Card.Header>
					<Card.Content class="p-4 pt-0">
						<ul 
              class="flex flex-col gap-4 overflow-y-auto rounded transition py-2"
            >
							{#if isAddingTask[category.id]}
								<AddTaskCard
									{dataForm}
									{tableId}
									{category}
									{endAddingTask}
									{addingTask}
									{categoryTasks}
								/>
							{/if}
							{#each categoryTasks as task}
								<Task on:drag={(event) => dragging(event, categoryTasks)} {task} />
							{/each}
						</ul>
					</Card.Content>
					<Card.Footer class="p-4 pt-0">
						<Button
							variant="ghost"
							on:click={() => startAddingTask(category.id)}
							class="hover:bg-primary/10 w-full rounded px-2 transition"
						>
							<div class="flex w-full items-center justify-start gap-3">
								<Plus class="w-5" />
								<span>Add a new card</span>
							</div>
						</Button>
					</Card.Footer>
				</Card.Root>
			</div>
		{/each}
		<Card.Root
			class="bg-card text-card-foreground mt-24 flex h-fit w-72 min-w-72 flex-col shadow-lg"
		>
			<Card.Header class="p-4">
				<Button variant="ghost" class="hover:bg-primary/10 w-full rounded px-2 "
					><div class="flex w-full items-center justify-start gap-3">
						<Plus class="w-5" />
						<span>Add a new list</span>
					</div></Button
				>
			</Card.Header>
		</Card.Root>
	</main>
	<!-- <UnlistedTasks
			{isDraggingOverCategory}
			{unlistedTasks}
      tags={data.tags}
			on:dragover={dragOver}
			on:drop={(event) => {
				drop(event, unlistedTasks, unlistedCategoryId), (isDraggingOverCategory = false);
			}}
      on:drag={(event) => dragging(event, unlistedTasks)}
		/> -->
</div>
