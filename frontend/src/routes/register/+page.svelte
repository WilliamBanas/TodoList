<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	export let data: PageData;

	const { form, errors } = superForm(data.form);
</script>

<div class="relative h-full bg-background">
	<div class="w-4/5 ">
  </div>
	<div class="w-3/5">
		<div class="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 transform">
			<h2 class="h2 mb-16 text-center text-3xl font-semibold">Register</h2>
			<form method="POST" class="flex flex-col gap-6">
				<div class="flex w-80 flex-col gap-2">
					<Label class="text-xl" for="nickname">Nickname</Label>
					<Input type="text" id="nickname" name="nickname" bind:value={$form.nickname} />
					{#if $errors.nickname}
						<span class=" text-red-600">{$errors.nickname}</span>
					{/if}
				</div>

				<div class="flex w-80 flex-col gap-2">
					<Label class="text-xl" for="password">Password</Label>
					<Input type="password" id="password" name="password" bind:value={$form.password} />
					{#if $errors.password}
						<span class=" text-red-600">{$errors.password}</span>
					{/if}
				</div>

				<div class="flex w-80 flex-col gap-2">
					<Label class="text-xl" for="confirmPassword">Confirm password</Label>
					<Input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						bind:value={$form.confirmPassword}
					/>
					{#if $errors.confirmPassword}
						<span class=" text-red-600">{$errors.confirmPassword}</span>
					{/if}
				</div>

				<Button type="submit" class="mt-12">Register</Button>

				<a href="/login" class="text-center underline decoration-1"> I'm already registered</a>
			</form>
		</div>
	</div>
</div>
