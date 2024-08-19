<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './ui/button/button.svelte';
	import { toggleMode } from 'mode-watcher';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
  import LogOut from 'lucide-svelte/icons/log-out'

	export let nickname: string;

	function openDrawer() {}
</script>

<div class="flex items-center justify-between border-b-2 px-8 py-4 bg-background">
	<h1 class="text-5xl font-bold">Kanban</h1>
	<div class="flex gap-10">
		<!-- <Button on:click={toggleMode} variant="outline" size="icon" class="border-0 rounded" >
			<Sun class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button> -->
		<button on:click={openDrawer}>Hello {nickname} !</button>
		<form action="/?/logout" method="POST" use:enhance class="flex items-center gap-6">
			<Button variant="ghost" class="flex items-center gap-2" > <LogOut class="w-5" /><p>Logout</p> </Button>
		</form>
	</div>
</div>
