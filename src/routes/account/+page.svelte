<script lang="ts">
	import {
		IconClockDollar,
		IconIdBadge2,
		IconKey
	} from '@tabler/icons-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';


	export let data
	export let form

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	let profileForm: HTMLFormElement
	let loading = false
	let workspaceId: string = profile?.workspace_id ?? ''
	let apiKey: string = profile?.api_key ?? ''
	let overtimeHourlyRatePostTax: number = profile?.overtime_hourly_rate_post_tax ?? 0

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}

</script>

<div class="container h-full mx-auto flex justify-center items-center max-w-[50%] gap-x-3">
	<form class="flex flex-col gap-y-1"
				method="POST"
				use:enhance={handleSubmit}
				bind:this={profileForm}>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<IconIdBadge2 />
			</div>
			<input id="workspaceId" name="workspaceId" type="text" placeholder="Workspace ID" value={form?.workspaceId ?? workspaceId}  />
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<IconKey />
			</div>
			<input id="apiKey" name="apiKey" type="password" placeholder="API Key" value={form?.apiKey ?? apiKey} />
		</div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<IconClockDollar />
			</div>
			<input
				id="overtimeHourlyRatePostTax"
				name="overtimeHourlyRatePostTax"
				type="number"
				step="0.01"
				placeholder="Overtime Rate"
				value={form?.overtimeHourlyRatePostTax ?? overtimeHourlyRatePostTax}
			/>
		</div>
		<input type="submit" class="btn variant-filled-primary" disabled={loading} value={loading ? 'Loading...' : 'Update'} />
	</form>
</div>
