<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors } = superForm(data.form);

</script>

<div class="h-full relative">
	<div class="absolute w-fit transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
		<h2 class="h2 text-center mb-16">Register</h2>
		<form method="POST" class="flex flex-col gap-6">
			<div class="w-80">
				<label for="nickname" class="label">
					<span class="text-xl">Nickname</span>
					<input
						class="input"
						type="text"
						id="nickname"
						name="nickname"
						bind:value={$form.nickname}
					/>
				</label>
				{#if $errors.nickname}
					<span class="text-error-500">{$errors.nickname}</span>
				{/if}
			</div>

			<div class="w-80">
				<label for="password" class="label">
					<span class="text-xl">Password</span>
					<input
						class="input"
						type="password"
						id="password"
						name="password"
						bind:value={$form.password}
					/>
				</label>
				{#if $errors.password}
					<span class="text-error-500">{$errors.password}</span>
				{/if}
			</div>

			<div class="w-80">
				<label for="confirmPassword" class="label">
					<span class="text-xl">Confirm password</span>
					<input
						class="input"
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						bind:value={$form.confirmPassword}
					/>
				</label>
				{#if $errors.confirmPassword}
					<span class="text-error-500">{$errors.confirmPassword}</span>
				{/if}
			</div>

			<button type="submit" class="btn variant-filled mt-8">Register</button>

      <a href="/login" class="text-center decoration-1 underline"> I'm already registered</a>
		</form>
	</div>
</div>
