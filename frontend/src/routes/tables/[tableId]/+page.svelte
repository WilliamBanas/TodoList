<script lang="ts" context="module">
	interface Category {
		id: string;
		name: string;
		userId: string;
		task: TaskItem[];
		createdAt: Date;
		updatedAt: Date;
	}

	export interface Tag {
		id: string;
		name: string;
		color: string;
		tableId: string;
	}
</script>

<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Task, { type TaskItem } from '$lib/components/Task.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import CreateTaskModal from '$lib/components/CreateTaskModal.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	let isDraggingOverCategory: string | false = false;

	// La tâche en cours de drag
	let taskDragging: TaskItem;

	// Données de la page
	export let data: any;

	// Categories de tâches
	let categories: Category[] = data.categories;

	// Tout les tags
	let tags: Tag[] = data.tags;

	let selectedCategory: Category;

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
		// 1. Création d'un tableau de tout les tableau de taches.
		// Exemple: array = [[tache1, tache2], [tache3], [tache4]].
		const allArraysOfTasks = categories.map((category) => category.task);

		// 2.Boucle qui verifie dans chaque tableau si la tâche est dedans puis la supprime du tableau correspondant.
		allArraysOfTasks.forEach((tasksArray: TaskItem[]) => {
			const index = tasksArray.indexOf(taskDragging);
			if (index > -1) {
				tasksArray.splice(index, 1);
			}
		});

		// 3. On stocke la cible de l'évenement dans une varaiable
		const dropTarget = event.target as HTMLElement;
		// 4. Si son parent est un 'li', on récupère son id qu'on stocke dans une variable.
		if (dropTarget.parentNode?.nodeName === 'LI') {
			const id = dropTarget.getAttribute('id');
			// 5. On verifie que l'id de la cible corresponde bien a l'id de l'une des tâches.
			const dropTargetTask = tasksList.find((task) => task.id === id);
			// 6. Si c'est vrai on stocke dans une variable l'index de la cible.
			if (dropTargetTask) {
				const dropTargetIndex = tasksList.indexOf(dropTargetTask);
				// 7. Puis on ajoute dans le tableau la tâche qui devait être insérée.
				// Elle prendra dans le tableau, l'index de la cible de l'évenement.
				// Exemple: tasksList = [tache1, tacheCible, tache3, tache4, tache5],
				// deviendra tasksList = [tache1, tacheInsérée, tacheCible, tache3, tache4, tache5].
				tasksList.splice(dropTargetIndex, 0, taskDragging);
			}
		} else {
			// 8. Si la cible n'est pas un 'li', on ajoute la tâche dans le tableau correspondant.
			tasksList.push(taskDragging);
			// 9. On change le categoryId de la tâche insérée pour actualiser en base de données.
			updateTaskCategory(taskDragging.id, id);
		}
		// 10. On re-render les tableaux pour actualiser l'affichage.

		updateTaskCategory(taskDragging.id, id);

		categories = categories;
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
	}

	function dragOver(event: DragEvent) {
		event.preventDefault();
	}
</script>

<Dialog.Root>
	<div class="h-full">
		<Header nickname={data.nickname} />

		<main
			class=" mt-24 box-border flex h-3/4 h-fit gap-4 border-2 px-8 overflow-x-auto"
		>
			{#each categories as category}
				{#if category.task}
					<Card.Root role="contentinfo" class="bg-background flex h-fit w-72 min-w-72 flex-col shadow-lg">
						<Card.Header class="p-4">
							<Card.Title class="text-xl">{category.name}</Card.Title>
						</Card.Header>
						<Card.Content class="p-4 pt-0">
							<ul
								role="group"
								class="flex min-h-20 flex-col gap-4 overflow-y-auto rounded transition"
								class:ring-2={isDraggingOverCategory === category.id ? true : false}
								class:ring={isDraggingOverCategory === category.id ? true : false}
								class:border-dashed={category.task.length === 0}
								class:border-2={category.task.length === 0}
								class:border-border={category.task.length === 0}
								class:justify-center={category.task.length === 0}
								on:dragenter={() => (isDraggingOverCategory = category.id)}
								on:dragleave={() => (isDraggingOverCategory = false)}
								on:drop={(event) => {
									drop(event, category.task, category.id), (isDraggingOverCategory = false);
								}}
								on:dragover={dragOver}
							>
								{#if category.task.length === 0}
									<p class="text-primary } flex h-full items-center justify-center opacity-80">
										slide here
									</p>
								{:else}
									{#each category.task as task}
										<Task on:drag={(event) => dragging(event, category.task)} {task} {tags} />
									{/each}
								{/if}
							</ul>
						</Card.Content>
						<Card.Footer class="p-4 pt-0">
							<Button
								variant="ghost"
								class="hover:bg-secondary w-full rounded p-0 transition"
								on:click={() => {
									selectedCategory = category;
								}}
							>
								<div class="flex w-full items-center justify-start gap-3 px-3">
									<Plus class="w-6" />
									<span>Add new task</span>
								</div>
							</Button>
							<CreateTaskModal category={selectedCategory} {categories} />
						</Card.Footer>
					</Card.Root>
				{/if}
			{/each}
			<Card.Root class="bg-background flex h-fit w-72 min-w-72 flex-col shadow-lg">
				<Card.Header class="p-4">
					<Button variant="ghost" class="hover:bg-secondary w-full rounded p-0 transition"
						><div class="flex w-full items-center justify-start gap-3 px-3">
							<Plus class="w-6" />
							<span>Add new list</span>
						</div></Button
					>
				</Card.Header>
			</Card.Root>
		</main>
	</div>
</Dialog.Root>
