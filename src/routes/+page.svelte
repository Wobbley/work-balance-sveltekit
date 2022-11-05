<script lang="ts">
	import { Card, FloatingLabelInput, Button } from 'flowbite-svelte';
	import DiffResults  from '$lib/DiffResults.svelte';
	import type { DiffRequest } from '$lib/types';
	import type { ActionData } from './$types';

	export let form: ActionData;
	export let data;

	let endDate = new Date();
	let startDate = new Date(endDate);
	startDate.setDate(1);

	let diffRequest: DiffRequest = {
		startDate: startDate.toISOString().substring(0, 10),
		endDate: endDate.toISOString().substring(0, 10),
		workdayLength: 7.5,
		workspaceId: undefined,
		apiKey: undefined
	};

	if (data?.profileData) {
		diffRequest.workspaceId = data.profileData.workspace_id;
		diffRequest.apiKey = data.profileData.api_key;
	}
</script>

<div class="flex flex-col items-center mt-2">
	<Card padding="sm">
		<form class="flex flex-col space-y-2.5" method="POST">
			<FloatingLabelInput
				id="workspaceId"
				name="workspaceId"
				type="text"
				label="Workspace ID"
				bind:value={diffRequest.workspaceId}
			/>
			<FloatingLabelInput
				id="apiKey"
				name="apiKey"
				type="password"
				label="API Key"
				bind:value={diffRequest.apiKey}
			/>
			<FloatingLabelInput
				id="startDate"
				name="startDate"
				type="date"
				label="Start Date"
				bind:value={diffRequest.startDate}
			/>
			<FloatingLabelInput
				id="endDate"
				name="endDate"
				type="date"
				label="End Date"
				bind:value={diffRequest.endDate}
			/>
			<FloatingLabelInput
				id="workdayLength"
				name="workdayLength"
				type="number"
				step="0.5"
				label="Hours in Workday"
				bind:value={diffRequest.workdayLength}
			/>
			<Button type="submit">Get Hours</Button>
		</form>
	</Card>

	{#if form?.success}
		<DiffResults diffResponse="{form.diffResponse}" hourlyRate="{data?.profileData?.overtime_hourly_rate_post_tax}" />
	{/if}
</div>
