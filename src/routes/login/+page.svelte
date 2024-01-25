<script lang="ts">
	import { IconMail } from '@tabler/icons-svelte';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	export let form;

	const handleSubmit: SubmitFunction = () => {
		return async ({ result }) => {
			await applyAction(result);
		};
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center max-w-[50%] gap-x-3">
	<form method="POST" use:enhance={handleSubmit}>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<IconMail />
			</div>
			<input name="email" type="email" placeholder="name@email.com" />
			<button class="variant-filled-secondary" type="submit">Send Magic Link</button>
		</div>
	</form>

	{#if form?.error}
		<div class="alert-message">
			<p>{form.error}</p>
		</div>
	{/if}
	{#if form?.message}
		<div class="alert-message">
			<p>{form.message}</p>
		</div>
	{/if}
</div>
