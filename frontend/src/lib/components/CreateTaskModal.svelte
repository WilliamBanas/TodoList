<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Label from './ui/label/label.svelte';
	import Input from './ui/input/input.svelte';
	import Button from './ui/button/button.svelte';
	import * as Select from './ui/select/index.js';

	export let categories;
	export let category;
</script>

<Dialog.Content>
  <Dialog.Header>
    <Dialog.Title>Add a new task</Dialog.Title>
  </Dialog.Header>
	<form action="">
		<Select.Root selected={category.name}>
			<Select.Label>Category</Select.Label>
			<Select.Trigger>
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each categories as category}
						<Select.Item value={category.id}>{category.name}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input value={category.id} name="categoryId" />
		</Select.Root>
	</form>
</Dialog.Content>
