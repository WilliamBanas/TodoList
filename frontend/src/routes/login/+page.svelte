<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	export let data: PageData;

	const { form, errors } = superForm(data.form);
</script>

<div class="relative h-full bg-background">
	<div class="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 transform">
		<h2 class="mb-16 text-center text-3xl font-semibold">Login</h2>
		<form method="POST" use:enhance class="flex flex-col gap-6">

			<div class="w-80 flex flex-col gap-2">
				<Label class="text-xl" for="nickname">Nickname</Label>
				<Input type="text" id="nickname" name="nickname" bind:value={$form.nickname} />
				{#if $errors.nickname}
					<span class=" text-red-600">{$errors.nickname}</span>
				{/if}
			</div>

			<div class="w-80 flex flex-col gap-2">
				<Label class="text-xl" for="password">Password</Label>
				<Input type="password" id="password" name="password" bind:value={$form.password} />
				{#if $errors.password}
					<span class=" text-red-600">{$errors.password}</span>
				{/if}
			</div>

			<Button type="submit" class="mt-12">Login</Button>

			<a href="/register" class="text-center underline decoration-1">I'm not registered</a>
		</form>
	</div>
</div>
