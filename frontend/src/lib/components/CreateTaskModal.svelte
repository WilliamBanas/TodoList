<script lang="ts">
	import Label from './ui/label/label.svelte';
	import Input from './ui/input/input.svelte';
	import Button from './ui/button/button.svelte';
	import * as Select from './ui/select/index.js';

  let isCreateTaskModalOpen = false;

	function openCreateTaskModal() {
		isCreateTaskModalOpen = true;
	}

	function closeCreateTaskModal() {
		isCreateTaskModalOpen = false;
	}


</script>

<!-- <Dialog.Root>
  <Dialog.Trigger class="w-full">
    <Button variant="ghost" class="hover:bg-input w-full rounded p-0 transition">
      <div class="flex w-full items-center justify-start gap-3 px-2">
        <Plus class="w-6" />
        <span>Add new task</span>
      </div>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Header>Add a task in "{category.name}"</Dialog.Header>
    </Dialog.Header>
    <form method="POST" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <Label for="title">Title</Label>
        <Input name="title" id="title" type="text" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="description">Description</Label>
        <Textarea name="description" id="description" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="endDate">Deadline</Label>
        <Input name="enDate" id="endDate" type="date" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="links">Links</Label>
        <div class="flex">
          <Input name="links" id="links" type="text" />
          <Button>add link</Button>
        </div>
      </div>
    </form>
    <Dialog.Footer>
      <Button>Create</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root> -->