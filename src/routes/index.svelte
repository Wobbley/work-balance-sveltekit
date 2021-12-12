<script lang="ts">
	import { DateTime } from "luxon";
	import { fetchDiff } from '$lib/diffclient';
	import { humanReadableTime } from '$lib/timeUtils';
	import type { DiffRequest } from '$lib/types';

	let endDate = new Date()
	let startDate = new Date(endDate);
	startDate.setDate(1);
	let diffRequest: DiffRequest = {
		startDate: DateTime.fromJSDate(startDate).toISODate(),
		endDate: DateTime.fromJSDate(endDate).toISODate(),
		workdayLength: 7.5,
		workspaceId: undefined,
		apiKey: undefined
		
	}
	let loading = false;
	let diffDisplay = {
		workedInHours: "",
		expectedHours: "",
		diffHours: "",
	};

	function getDiff() {
		loading = true
        fetchDiff(diffRequest)
            .then(diffData => {
                diffDisplay.workedInHours = humanReadableTime(diffData.workedInHours)
                diffDisplay.expectedHours = humanReadableTime(diffData.expectedHours)
                diffDisplay.diffHours = humanReadableTime(diffData.diffHours)
                loading = false;
				console.log(diffData)
            })
            .catch(err => {
                console.log(err)
            })
    }
	
</script>

<div class="flex flex-col items-center">
	<div class="w-1/2 form-control space-y-1 ">
		<label class="input-group input-group-vertical input-group">
			<span class="text-primary">Workspace ID</span> 
			<input type="text" id="workspaceId" class="input" bind:value={diffRequest.workspaceId} placeholder="Enter your workspace ID"/>
		</label>
		<label class="input-group input-group-vertical">
			<span class="text-primary">API Key</span> 
			<input type="password" id="apiKey" class="input" bind:value={diffRequest.apiKey} placeholder="Enter your API Key">
		</label>
		<label class="input-group input-group-vertical">
			<span class="text-primary">Start Date</span> 
			<input type="date" id="startDate" class="input" bind:value={diffRequest.startDate}>
		</label>
		<label class="input-group input-group-vertical">
			<span class="text-primary">End Date</span> 
			<input type="date" id="endDate" class="input" bind:value={diffRequest.endDate}>
		</label>
		<label class="input-group input-group-vertical">
			<span class="text-primary">Hours in Workday</span> 
			<input type="number" id="hoursInWorkday" class="input" bind:value={diffRequest.workdayLength}>
		</label>
		<button class="btn btn-primary btn-outline" on:click={getDiff}>Have I worked enough?</button> 

		<p>
			&nbsp;&nbsp;{ diffDisplay.expectedHours } (Expected)
		  </p>
		  <p>
			- { diffDisplay.workedInHours } (Logged)
		  </p>
		  <p>
			= { diffDisplay.diffHours } (Diff)
		  </p>
	</div>
</div>