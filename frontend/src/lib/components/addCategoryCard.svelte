<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Input from './ui/input/input.svelte';
  import Button from './ui/button/button.svelte';
  import X from 'lucide-svelte/icons/x';
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

  export let toggleAddingCategory: () => void;
  export let tableId: string;

	const dispatch = createEventDispatcher();

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const response = await fetch('?/createCategory', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			const newCategory = await response.json();
			dispatch('categoryAdded', newCategory);
			toggleAddingCategory();
		} else {
			// Handle error
			console.error('Failed to add category');
		}
	}
</script>

<div class="h-fit">
	<Card.Root
		class="min-h-28 flex h-fit w-72 flex-col justify-between rounded border text-white shadow-lg"
	>
		<Card.Content class=" p-2">
      <form on:submit={handleSubmit} action="" method="POST" use:enhance class="flex flex-col gap-1 ">
        <Input class="rounded max-h-10 border border-secondary/50 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="My new category title" autofocus />
        <Input value={tableId} type="text" id="tableId" name="tableId" class="hidden" />
        <div class=" flex justify-end gap-2">
          <Button type="submit" class="rounded text-semibold text-background">Add the category</Button>
          <Button variant="ghost" class="bg-secondary hover:bg-secondary/80 rounded px-3 " on:click={toggleAddingCategory}
            ><X class="w-5 " /></Button
          >
        </div>

      </form>
		</Card.Content>
	</Card.Root>
</div>
