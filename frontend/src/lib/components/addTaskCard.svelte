<script lang="ts">
	import Input from './ui/input/input.svelte';
	import Button from './ui/button/button.svelte';
	import X from 'lucide-svelte/icons/x';
	import { enhance } from '$app/forms';
	import Textarea from './ui/textarea/textarea.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { Category } from '../../routes/tables/[tableId]/+page.svelte';
	import type { TaskItemWithTags } from '../../routes/tables/[tableId]/+page.svelte';

	export let endAddingTask: (categoryId: string) => void;
	export let addingTask: (categoryId: string, categoryTasks: TaskItemWithTags[]) => void;
	export let category: Category;
	export let tableId;
	export let dataForm;
	export let categoryTasks;
	let categoryId: string = category.id;
	const { form, errors } = superForm(dataForm);
</script>

<div class="min-h-16">
	<form
		method="POST"
		action="?/createTask"
		use:enhance
		class="flex flex-col gap-1"
		on:submit={() => (errors ? addingTask(categoryId, categoryTasks) : null)}
	>
		<div class="bg-secondary flex flex-col justify-start rounded shadow-md">
			<div class="flex flex-col">
				<Textarea
					autofocus
					id="title"
					name="title"
					placeholder="My new card title"
					class=" bg-secondary resize-none border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
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
		<div class=" flex justify-end gap-1">
			<Button type="submit" class="">Add the card</Button>
			<Button variant="ghost" class="hover:bg-input px-2" on:click={() => endAddingTask(categoryId)}
				><X class="w-5" /></Button
			>
		</div>
	</form>
</div>
