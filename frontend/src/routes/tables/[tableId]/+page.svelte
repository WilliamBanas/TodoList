<script lang="ts" context="module">
	interface Category {
		id: string;
		name: string;
		task: TaskItem[];
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
	import Header from '$lib/components/Header.svelte';
	import type { tag_Task } from '$lib/components/Task.svelte';
	import Task from '$lib/components/Task.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import CreateTaskModal from '$lib/components/CreateTaskModal.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { onMount } from 'svelte';
	import UnlistedTasks from '$lib/components/UnlistedTasks.svelte';

	let isDraggingOverCategory: string | false = false;

	// La tâche en cours de drag
	let taskDragging: TaskItem;

	// Données de la page
	export let data: any;

	// Toutes les tâches
	let tasks: TaskItem[] = data.tasks;

	// Toutes les tâches sans categorie
	// let unlistedTasks: TaskItem[] = tasks.filter((task: TaskItem) => task.id === '');

	// let unlistedCategoryId = '';

	// Toutes les categories
	let categories: Category[] = data.categories;

	export let actualTags: Tag[];

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

	function drop(event: DragEvent, tasksList: TaskItem[], id: string) {
		// 1. On stocke la cible de l'évenement dans une variable
		const dropTarget = event.target as HTMLElement;
		// 2. Si son parent est un 'li', on récupère son id qu'on stocke dans une variable.
		if (dropTarget.getAttribute('id') === taskDragging.id) {
			return null;
		} else if (dropTarget.parentNode?.nodeName === 'LI') {
			const id = dropTarget.getAttribute('id');
			// 3. On verifie que l'id de la cible corresponde bien a l'id de l'une des tâches.
			const dropTargetTask = tasksList.find((task) => task.id === id);
			// 4. Si c'est vrai on stocke dans une variable l'index de la cible.
			if (dropTargetTask) {
				const dropTargetIndex = tasksList.indexOf(dropTargetTask);
				// 5. Puis on ajoute dans le tableau la tâche qui devait être insérée.
				// Elle prendra dans le tableau, l'index de la cible de l'évenement.
				// Exemple: tasksList = [tache1, tacheCible, tache3, tache4, tache5],
				// deviendra tasksList = [tache1, tacheInsérée, tacheCible, tache3, tache4, tache5].
				tasksList.splice(dropTargetIndex, 0, taskDragging);
			}
		} else {
			// 6. Si la cible n'est pas un 'li', on ajoute la tâche dans le tableau correspondant.
			tasksList.push(taskDragging);
		}
		// 7. On change le categoryId de la tâche insérée pour actualiser la tâche en base de données ainsi que dans le DOM.
		taskDragging.categoryId = id;
		updateTaskCategory(taskDragging.id, id);
		// 8. On re-render les tableaux pour actualiser l'affichage.
		actualTags = actualTags;
		tasks = tasks;
	}

	function dragging(event: DragEvent, tasksList: TaskItem[]) {
		// 1. On récupère l'id de la cible que l'on stocke dans une variable.
		const id = (event.target as HTMLElement).getAttribute('id');
		// 2. On verifie que l'id de la cible corresponde bien a l'id de l'une des tâches.
		const task = tasksList.find((task) => task.id === id);
		// 3. Si c'est vrai on stocke dans une variable "taskDragging" la tâche qui est en cours d'édition.
		if (task) {
			taskDragging = task;
		}

		console.log(taskDragging);
	}

	function dragOver(event: DragEvent) {
		event.preventDefault();
	}
</script>

<Dialog.Root>
	<div class="h-full">
		<Header nickname={data.nickname} />

		<main class="bg-secondary box-border flex h-3/4 h-fit h-full gap-4 overflow-x-auto px-8">
			{#each categories as category}
				{@const categoryTasks = tasks.filter((task) => task.categoryId === category.id)}
				<Card.Root
					role="contentinfo"
					class="bg-background mt-24 flex h-fit w-72 min-w-72 flex-col shadow-lg"
				>
					<Card.Header class="p-4">
						<Card.Title class="text-xl">{category.name}</Card.Title>
					</Card.Header>
					<Card.Content class="p-4 pt-0">
						<ul
							role="group"
							class="flex min-h-20 flex-col gap-4 overflow-y-auto rounded transition"
							class:ring-2={isDraggingOverCategory === category.id ? true : false}
							class:ring={isDraggingOverCategory === category.id ? true : false}
							class:border-dashed={categoryTasks.length === 0}
							class:border-2={categoryTasks.length === 0}
							class:border-border={categoryTasks.length === 0}
							class:justify-center={categoryTasks.length === 0}
							on:dragenter={() => (isDraggingOverCategory = category.id)}
							on:dragleave={() => (isDraggingOverCategory = false)}
							on:drop={(event) => {
								drop(event, categoryTasks, category.id), (isDraggingOverCategory = false);
							}}
							on:dragover={dragOver}
						>
							{#if categoryTasks.length === 0}
								<p
									class="text-input text-primary-foreground/40 flex h-full items-center justify-center"
								>
									slide here
								</p>
							{:else}
								{#each categoryTasks as task}
									<Task
										on:drag={(event) => dragging(event, categoryTasks)}
										{task}
										tags={data.tags}
									/>
								{/each}
							{/if}
						</ul>
					</Card.Content>
					<Card.Footer class="p-4 pt-0">
						<Button variant="ghost" class="hover:bg-input w-full rounded p-0 transition">
							<div class="flex w-full items-center justify-start gap-3 px-3">
								<Plus class="w-6" />
								<span>Add new task</span>
							</div>
						</Button>
						<CreateTaskModal />
					</Card.Footer>
				</Card.Root>
			{/each}
			<Card.Root class="bg-background mt-24 flex h-fit w-72 min-w-72 flex-col shadow-lg">
				<Card.Header class="p-4">
					<Button variant="ghost" class="hover:bg-input w-full rounded p-0 transition"
						><div class="flex w-full items-center justify-start gap-3 px-3">
							<Plus class="w-6" />
							<span>Add new list</span>
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
</Dialog.Root>
