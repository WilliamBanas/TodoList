<!-- <script lang="ts">
	import * as Card from '$lib/components/ui/card';
  import Button from './ui/button/button.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import type { TaskItem } from '../../routes/tables/[tableId]/+page.svelte';
  import Task from './Task.svelte';

  export let unlistedTasks;

  export let tags;

  export let isDraggingOverCategory: string | false;

</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Unlisted tasks</Card.Title>
	</Card.Header>
	<Card.Content>
		<ul
			role="group"
			class="flex min-h-20 flex-col gap-4 overflow-y-auto rounded transition"
			class:ring-2={isDraggingOverCategory === '' ? true : false}
			class:ring={isDraggingOverCategory === '' ? true : false}
			class:border-dashed={unlistedTasks.length === 0}
			class:border-2={unlistedTasks.length === 0}
			class:border-border={unlistedTasks.length === 0}
			class:justify-center={unlistedTasks.length === 0}
			on:dragenter={() => (isDraggingOverCategory = '')}
			on:dragleave={() => (isDraggingOverCategory = false)}
			on:drop
			on:dragover
		>
			{#if unlistedTasks.length === 0}
				<p class="text-input text-primary-foreground/40 flex h-full items-center justify-center">
					slide here
				</p>
			{:else}
				{#each unlistedTasks as task}
					<Task on:drag {task} {tags} />
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
	</Card.Footer>
</Card.Root> -->
