<script lang="ts">
	import Input from './ui/input/input.svelte';
	import Button from './ui/button/button.svelte';
	import X from 'lucide-svelte/icons/x';
	import { enhance } from '$app/forms';
	import Textarea from './ui/textarea/textarea.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { Category } from '../../routes/tables/[tableId]/+page.svelte';
	import type { TaskItemWithTags } from '../../routes/tables/[tableId]/+page.svelte';
	import { createEventDispatcher } from 'svelte';

	export let endAddingTask: (categoryId: string) => void;
	export let addingTask: (categoryId: string, categoryTasks: TaskItemWithTags[]) => void;
	export let category: Category;
	export let tableId;
	export let dataForm;
	export let categoryTasks: TaskItemWithTags[];
	let categoryId: string = category.id;
	const { form, errors } = superForm(dataForm);
	const dispatch = createEventDispatcher();

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const response = await fetch('?/createTask', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			const newTask = await response.json();
			dispatch('taskAdded', newTask);
			addingTask(categoryId, [...categoryTasks, newTask]);
			$form.title = ''; // Réinitialiser le formulaire
		} else {
			// Gérer l'erreur
			console.error('Failed to add task');
		}
	}
</script>

<div class="px-2 py-1">
	<form
		on:submit={handleSubmit}
		class="flex flex-col gap-1"
	>
		<div class="bg-background flex flex-col justify-start rounded border border-secondary/50 h-fit ">
			<div class="flex flex-col">
				<Textarea
					autofocus
					id="title"
					name="title"
					placeholder="My new card title"
					class=" rounded resize-none border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
					bind:value={$form.title}
				/>
				{#if $errors.title}
					<span class=" p-3 text-sm text-red-600">{$errors.title}</span>
				{/if}
			</div>
			<div class="hidden">
				<Input value={categoryId} type="text" id="categoryId" name="categoryId" />
			</div>
			<div class="hidden">
				<Input value={tableId} type="text" id="tableId" name="tableId" />
			</div>
		</div>
		<div class=" flex justify-end gap-2">
			<Button type="submit" class="rounded text-semibold text-background">Add the card</Button>
			<Button variant="ghost" class="bg-secondary hover:bg-secondary/80 rounded px-3 " on:click={() => endAddingTask(categoryId)}
				><X class="w-5 " /></Button
			>
		</div>
	</form>
</div>
