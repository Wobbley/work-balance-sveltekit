<!-- https://github.com/skeletonlabs/skeleton/blob/54f4ecedabf2be6d94a670b56dc8821095ca3fc9/sites/skeleton.dev/src/routes/(inner)/elements/forms/%2Bpage.svelte#L465 -->

<script lang="ts">
	import type { DiffRequest } from '$lib/types';
	import DiffResults from '$lib/DiffResults.svelte';
	import {
		IconIdBadge2,
		IconKey,
		IconCalendar,
		IconCalendarDue,
		IconHourglass
	} from '@tabler/icons-svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

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
</script>

<div class="container h-full mx-auto flex justify-center items-center max-w-[50%] gap-x-3">
	<form class="flex flex-col gap-y-1" method="POST">
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim"><IconIdBadge2 /></div>
			<input
				name="workspaceId"
				type="text"
				placeholder="Workspace ID"
				bind:value={diffRequest.workspaceId}
			/>
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim"><IconKey /></div>
			<input name="apiKey" type="password" placeholder="API Key" bind:value={diffRequest.apiKey} />
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim"><IconCalendar /></div>
			<input name="startDate" type="date" bind:value={diffRequest.startDate} />
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim"><IconCalendarDue /></div>
			<input name="endDate" type="date" bind:value={diffRequest.endDate} />
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim"><IconHourglass /></div>
			<input name="workdayLength" type="number" step="0.5" bind:value={diffRequest.workdayLength} />
		</div>
		<button type="submit" class="btn variant-filled-primary">Get Hours</button>
	</form>
	{#if form?.success}
		<DiffResults diffResponse={form.diffResponse} />
	{/if}
</div>

<style lang="postcss">
</style>
