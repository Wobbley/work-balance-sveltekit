<script lang="ts">
	import { fetchDiff } from '$lib/fetchDiff';
	import { humanReadableTime } from '$lib/timeUtils';
	import type { DiffRequest } from '$lib/types';

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
	let loading = false;
	let diffDisplay = {
		workedInHours: '',
		expectedHours: '',
		diffHours: ''
	};

	function getDiff() {
		loading = true;
		fetchDiff(diffRequest)
			.then((diffData) => {
				diffDisplay.workedInHours = humanReadableTime(diffData.workedHours);
				diffDisplay.expectedHours = humanReadableTime(diffData.expectedHours);
				diffDisplay.diffHours = humanReadableTime(diffData.diffHours);
				loading = false;
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<svelte:head>
	<title>Work Balance</title>
</svelte:head>

<div class="flex flex-col items-center">
	<div class="w-1/2 form-control">
		<label class="input-group input-group-vertical input-group">
			<span>Workspace ID</span>
			<input
				type="text"
				id="workspaceId"
				class="input"
				bind:value={diffRequest.workspaceId}
				placeholder="Enter your workspace ID"
			/>
		</label>
		<label class="input-group input-group-vertical">
			<span>API Key</span>
			<input
				type="password"
				id="apiKey"
				class="input"
				bind:value={diffRequest.apiKey}
				placeholder="Enter your API Key"
			/>
		</label>
		<label class="input-group input-group-vertical">
			<span>Start Date</span>
			<input type="date" id="startDate" class="input" bind:value={diffRequest.startDate} />
		</label>
		<label class="input-group input-group-vertical">
			<span>End Date</span>
			<input type="date" id="endDate" class="input" bind:value={diffRequest.endDate} />
		</label>
		<label class="input-group input-group-vertical">
			<span>Hours in Workday</span>
			<input
				type="number"
				id="hoursInWorkday"
				class="input"
				bind:value={diffRequest.workdayLength}
			/>
		</label>
		<button class:loading class="btn btn-primary btn-outline" on:click={getDiff}>Get Hours</button>

		{#if diffDisplay.diffHours}
			<div class="w-full shadow stats">
				<div class="stat place-items-center place-content-center">
					<div class="stat-title">Difference</div>
					<div class="stat-value">{diffDisplay.diffHours}</div>
				</div>
				<div class="stat place-items-center place-content-center">
					<div class="stat-title">Worked</div>
					<div class="stat-value">{diffDisplay.workedInHours}</div>
				</div>
				<div class="stat place-items-center place-content-center">
					<div class="stat-title">Expected</div>
					<div class="stat-value">{diffDisplay.expectedHours}</div>
				</div>
			</div>
		{/if}
	</div>
</div>
