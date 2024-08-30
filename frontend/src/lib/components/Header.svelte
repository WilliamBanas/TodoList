<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './ui/button/button.svelte';
	import LogOut from 'lucide-svelte/icons/log-out';

	export let nickname: string;

	function openDrawer() {}
</script>

<header class=" flex items-center justify-between px-8 py-4">
	<h1 class=" text-5xl font-bold">Kanban</h1>
	<div class="flex gap-10">
		<button on:click={openDrawer}>Hello {nickname} !</button>
		<form action="?/logout" method="POST" use:enhance class="flex items-center gap-6">
			<Button variant="ghost" class="hover:bg-input flex items-center gap-2" type="submit" >
				<LogOut class="w-5" />
				<p>Logout</p>
			</Button>
		</form>
	</div>
</header>
