<script lang="ts">
	import { page } from '$app/stores';
	import { FloatingLabelInput, Button } from 'flowbite-svelte';
	import { supabaseClient } from '$lib/db';
	import { enhance } from '$app/forms';
	import type { ActionData } from '.svelte-kit/types/src/routes/$types';

	export let form: ActionData;

	let workspaceId: string;
	let apiKey: string;

	async function loadData() {
		const { data } = await supabaseClient.from('profiles').select('*').limit(1).maybeSingle();
		if (!data) {
			return;
		}
		workspaceId = data.workspace_id;
		apiKey = data.api_key;
	}

	$: if ($page.data.session) {
		loadData();
	}

	$: workspaceId

</script>

{#if !$page.data.session}
	You need to log in
{:else}
	<div class="flex flex-col items-center mt-2">
		<form class="flex flex-col space-y-2.5" method="POST" use:enhance>
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
