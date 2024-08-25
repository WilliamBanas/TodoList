<script lang="ts">
	import Input from './ui/input/input.svelte';
	import Button from './ui/button/button.svelte';
  import X from 'lucide-svelte/icons/x';
	import { enhance } from '$app/forms';
	import Textarea from './ui/textarea/textarea.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	
  export let endAddingTask;
  export let category;
  export let tableId;
  export let dataForm;

  const {form, errors} = superForm(dataForm);

  let isBeingCreated;

  function addingTask() {

  }

</script>

<div class="min-h-16">
	<form method="POST" action="?/createTask" use:enhance class="flex flex-col gap-1" on:submit={() => {$errors ? null : endAddingTask(category.id)}}>
		<div class="bg-secondary flex flex-col justify-start rounded shadow-md">
			<div class="flex flex-col ">
				<Textarea autofocus id="title" name="title" placeholder="My new card title" class=" border-0 bg-secondary text-sm focus-visible:ring-0 focus-visible:ring-offset-0 resize-none" bind:value={$form.title} />
        {#if $errors.title}
					<span class=" text-red-600 text-sm p-3">{$errors.title}</span> 
        {/if}
			</div>
      <div class="hidden">
        <Input value={category.id}  type="text" id="categoryId" name="categoryId" />
      </div>
      <div class="hidden">
        <Input value={tableId} type="text" id="tableId" name="tableId" />
      </div>
		</div>
    <div class=" flex justify-end gap-1">
      <Button type="submit" class="" >Add</Button>
      <Button variant="ghost" class="hover:bg-input px-2" on:click={endAddingTask(category.id)} ><X class="w-5" /></Button>
    </div>
	</form>
</div>
