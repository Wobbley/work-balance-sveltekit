<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { Label, Input, Button } from 'flowbite-svelte';
    import type { ActionData } from './$types';

	export let form: ActionData;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			await applyAction(result);
		};
	};
</script>

<div>
	<form method="post" use:enhance={handleSubmit}>
		<div class="mb-6">
			<Label for="input-group-1" class="block mb-2">Your Email</Label>
			<Input id="email" name="email" type="email" placeholder="name@flowbite.com">
				<svg
					slot="left"
					aria-hidden="true"
					class="w-5 h-5 text-gray-500 dark:text-gray-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path
						d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
					/></svg
				>
			</Input>
		</div>
		<Button type="submit">Get Hours</Button>
	</form>
	{#if form?.error}
		<div class="block notification is-danger">{form.error}</div>
	{/if}
	{#if form?.message}
		<div class="block notification is-primary">{form.message}</div>
	{/if}
</div>
