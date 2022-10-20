<script lang="ts">
	import { page } from '$app/stores';
	import { FloatingLabelInput, Button } from 'flowbite-svelte';
	import type { ActionData } from '.svelte-kit/types/src/routes/$types';

	export let form: ActionData;
	export let data;

	let workspaceId: string;
	let apiKey: string;

	if (data?.profileData) {
		workspaceId = data.profileData.workspace_id;
		apiKey = data.profileData.api_key;
	}
</script>

{#if !$page.data.session}
	You need to log in
{:else}
	<div class="flex flex-col items-center mt-2">
		<form class="flex flex-col space-y-2.5" method="POST">
			<FloatingLabelInput
				id="workspaceId"
				name="workspaceId"
				type="text"
				label="Workspace ID"
				bind:value={workspaceId}
			/>
			<FloatingLabelInput
				id="apiKey"
				name="apiKey"
				type="password"
				label="API Key"
				bind:value={apiKey}
			/>
			<Button type="submit">Save Credentials</Button>
		</form>
	</div>
{/if}
