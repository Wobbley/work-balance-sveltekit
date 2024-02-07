<script lang="ts">
	import {
		IconIdBadge2,
		IconKey
	} from '@tabler/icons-svelte';

	let workspaceId: string;
	let apiKey: string;
	let overtimeHourlyRatePostTax: number;
</script>

<div class="container h-full mx-auto flex justify-center items-center max-w-[50%] gap-x-3">
	<form class="flex flex-col gap-y-1" method="POST">
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<IconIdBadge2 />
			</div>
			<input name="workspaceId" type="text" placeholder="Workspace ID" bind:value={workspaceId} />
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<IconKey />
			</div>
			<input name="apiKey" type="password" placeholder="API Key" bind:value={apiKey} />
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<IconKey />
			</div>
			<input
				id="overtimeHourlyRatePostTax"
				name="overtimeHourlyRatePostTax"
				type="number"
				step="0.01"
				placeholder="Overtime Rate"
				bind:value={overtimeHourlyRatePostTax}
			/>
		</div>
		<button type="submit" class="btn variant-filled-primary">Save Credentials</button>
	</form>
</div>
