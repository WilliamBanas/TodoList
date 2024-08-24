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

