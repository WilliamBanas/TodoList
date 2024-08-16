<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors } = superForm(data.form);
</script>

<div class="h-full relative">
	<div class="absolute w-1/3 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
		<h2 class="h2">Sign up</h2>
		<form action="?/createUser" method="POST">
			<label class="label">
				<span>Nickname</span>
				<input
					class="input"
					type="text"
					id="nickname"
					name="nickname"
					bind:value={$form.nickName}
				/>
				{#if $errors.nickName}
					<span>{$errors.nickName}</span>
				{/if}
			</label>

			<label class="label">
				<span>Password</span>
				<input
					class="input"
					type="password"
					id="password"
					name="password"
					bind:value={$form.password}
				/>
				{#if $errors.password}
					<span>{$errors.password}</span>
				{/if}
			</label>

			<label class="label">
				<span>Confirm password</span>
				<input
					class="input"
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					bind:value={$form.confirmPassword}
				/>
				{#if $errors.confirmPassword}
					<span>{$errors.confirmPassword}</span>
				{/if}
			</label>

      <button type="submit" class="btn variant-filled">Sign up</button>
		</form>
	</div>
</div>
