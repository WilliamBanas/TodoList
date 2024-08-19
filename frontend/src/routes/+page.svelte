<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Task, { type TaskItem } from '$lib/components/Task.svelte';
	import plus from '$lib/assets/icon-plus.png';

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

	export let data;

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
						class=" flex min-h-16 flex-col gap-2 overflow-y-auto transition rounded"
						class:ring-2={isDraggingOverCategory === category.id ? true : false}
						class:ring-surface-100={isDraggingOverCategory === category.id ? true : false}
						class:ring={isDraggingOverCategory === category.id ? true : false}
						class:bg-surface-800={category.task.length === 0}
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
						class="flex items-center mt-2 p-3 w-full gap-3 rounded transition hover:bg-surface-800"
					>
						<img class="w-4" src={plus} alt="" />
						<span>Add a task</span>
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>
