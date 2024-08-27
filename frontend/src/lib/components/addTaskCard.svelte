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

<div class=" py-1 p-4">
	<form
		method="POST"
		action="?/createTask"
		use:enhance
		class="flex flex-col gap-2"
		on:submit={() => ($errors ? null : addingTask(categoryId, categoryTasks))}
	>
		<div class="bg-background flex flex-col justify-start rounded border-2 border-secondary/50 h-fit">
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
