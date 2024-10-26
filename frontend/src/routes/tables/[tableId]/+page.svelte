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
	import AddCategoryCard from '$lib/components/addCategoryCard.svelte';
	import { Star } from 'lucide-svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
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

	function drop(event: DragEvent, tasksList: TaskItemWithTags[], categoryId: string) {
		event.preventDefault();
		const dropTarget = event.target as HTMLElement;
		
		// Vérifier si on ne dépose pas la tâche sur elle-même
		if (dropTarget.getAttribute('id') === taskDragging.id) {
			return;
		}

		// Trouver l'index de la tâche en cours de déplacement dans la liste originale
		const draggedTaskIndex = tasksWithTags.findIndex(task => task.id === taskDragging.id);

		// Supprimer la tâche de sa position originale
		if (draggedTaskIndex > -1) {
			tasksWithTags.splice(draggedTaskIndex, 1);
		}

		// Trouver la tâche cible et son index
		let targetTask = tasksList.find(task => task.id === dropTarget.getAttribute('id'));
		let targetIndex = targetTask ? tasksList.findIndex(task => task.id === targetTask.id) : -1;

		// Si on n'a pas trouvé de tâche cible, ajouter à la fin de la liste
		if (targetIndex === -1) {
			targetIndex = tasksList.length;
		} else {
			// Si on déplace vers le bas, incrémenter l'index cible
			if (draggedTaskIndex < targetIndex) {
				targetIndex++;
			}
		}

		// Mettre à jour la catégorie de la tâche déplacée
		taskDragging.categoryId = categoryId;

		// Insérer la tâche à sa nouvelle position
		tasksWithTags.splice(targetIndex, 0, taskDragging);

		// Mettre à jour la catégorie dans la base de données
		updateTaskCategory(taskDragging.id, categoryId);

		// Forcer la mise à jour de l'interface
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

	function addingTask(categoryId: string, updatedCategoryTasks: TaskItemWithTags[]) {
		tasksWithTags = tasksWithTags.map(task => 
			task.categoryId === categoryId ? updatedCategoryTasks.find(t => t.id === task.id) || task : task
		);
		endAddingTask(categoryId);
	}

	let isAddingCategory = false;

	function toggleAddingCategory() {
		isAddingCategory = !isAddingCategory;
	}

	let favorite = false;
	function toggleFavorite() {
		if (favorite) {
			favorite = false;
			console.log('false');
		} else {
			favorite = true;
			console.log('true');
		}
	}

	function handleTaskAdded(event: CustomEvent) {
		const newTask = event.detail;
		tasksWithTags = [...tasksWithTags, newTask];
	}

	function handleCategoryAdded(event: CustomEvent) {
		const newCategory = event.detail;
		categories = [...categories, newCategory];
		isAddingTask = { ...isAddingTask, [newCategory.id]: false };
	}
</script>

<div class="flex h-full flex-col">
	<Header nickname={data.nickname} />

	<main class="bg-mountain flex shrink grow basis-0 bg-cover bg-center">
		<div class="relative flex grow flex-col overflow-y-auto outline-none">
			<div class="bg-card/70 flex h-16 items-center gap-6 px-8">
				<h2 class="text-2xl">My table</h2>
				<Button on:click={toggleFavorite} variant="ghost" class="p-0 hover:bg-transparent">
					<Star
						fill={favorite ? '#FFEA00' : 'transparent'}
						class="w-5"
						strokeWidth={favorite ? 0 : 1.5}
					/>
				</Button>
			</div>
			<div class="relative mt-3 grow">
				<div
					class="absolute bottom-0 left-0 right-0 top-0 mb-2 flex max-w-full gap-3 overflow-x-auto overflow-y-hidden px-3 py-2"
				>
					{#each categories as category}
						{@const categoryTasks = tasksWithTags.filter((task) => task.categoryId === category.id)}
						<div
							role="group"
							class="h-full w-72 min-w-72"
							on:dragenter={() => (isDraggingOverCategory = category.id)}
							on:dragleave={() => (isDraggingOverCategory = false)}
							on:drop={(event) => {
								drop(event, categoryTasks, category.id), (isDraggingOverCategory = false);
							}}
							on:dragover={dragOver}
						>
							<Card.Root
								role="contentinfo"
								class="flex max-h-full min-h-28 w-full flex-col justify-between rounded border text-white shadow-lg"
							>
								<Card.Header class="p-2 pb-0">
									<Card.Title class="text-md p-2 pl-3">{category.name}</Card.Title>
								</Card.Header>
								{#if categoryTasks.length > 0}
									{#if categoryTasks.length > 0}
										<ul class="flex flex-col items-center gap-2 overflow-y-auto px-2 py-1">
											{#each categoryTasks as task}
												<Task on:drag={(event) => dragging(event, categoryTasks)} {task} />
											{/each}
										</ul>
									{/if}
								{/if}
								{#if isAddingTask[category.id]}
									<AddTaskCard
										{dataForm}
										{tableId}
										{category}
										{endAddingTask}
										{addingTask}
										categoryTasks={categoryTasks}
										on:taskAdded={handleTaskAdded}
									/>
								{/if}
								<Card.Footer class="p-2">
									<Button
										variant="ghost"
										on:click={() => startAddingTask(category.id)}
										class=" hover:bg-secondary/40 text-foreground w-full rounded px-2 transition"
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
					{#if isAddingCategory}
						<AddCategoryCard 
							{toggleAddingCategory} 
							{tableId} 
							on:categoryAdded={handleCategoryAdded}
						/>
					{:else}
						<Button
							on:click={toggleAddingCategory}
							class="flex h-fit min-w-72 flex-col rounded rounded px-2 shadow-lg "
							><div class="flex w-full items-center justify-start gap-3">
									<Plus class="w-5" />
									<span>Add a new list</span>
								</div></Button
						>
					{/if}
				</div>
			</div>
		</div>
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
