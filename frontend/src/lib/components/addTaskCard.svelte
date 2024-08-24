<script lang="ts">
	import Input from './ui/input/input.svelte';
	import Button from './ui/button/button.svelte';
  import X from 'lucide-svelte/icons/x';

  export let endAddingTask;
  export let category;
</script>

<div class="min-h-16">
	<form action="" method="POST" class="flex flex-col gap-1">
		<div class="bg-secondary flex flex-col justify-start rounded shadow-md">
			<div class=" pb-6 flex flex-col gap-2 ">
				<Input type="text" id="title" name="title" placeholder="My new card title" class="border-0 bg-secondary text-sm focus-visible:ring-0 focus-visible:ring-offset-0 " />
			</div>
		</div>
    <div class=" flex justify-end gap-1">
      <Button type="submit" class="" >Add</Button>
      <Button variant="ghost" class="hover:bg-input px-2" on:click={endAddingTask(category.id)} ><X class="w-5" /></Button>
    </div>
	</form>
</div>
