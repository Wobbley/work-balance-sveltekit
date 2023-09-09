<script lang="ts">
	import { humanReadableTime } from '$lib/time-utils';
	import type { DiffResponse } from '$lib/types';
	import { IconClockPlus, IconClockMinus, IconClockCode, IconClockDollar } from '@tabler/icons-svelte';
	let payout: number = 0;

	export let diffResponse: DiffResponse;
	export let hourlyRate = 480;

	$: if (hourlyRate && diffResponse?.diffHours) {
		payout = diffResponse.diffHours * hourlyRate;
	}
</script>

<div class="flex flex-col gap-y-1">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim"><IconClockPlus /></div>
		<input
			type="text"
			placeholder="Worked"
			value={humanReadableTime(diffResponse.workedHours)}
			disabled
		/>
	</div>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim"><IconClockMinus /></div>
		<input type="text" placeholder="Expected" value={humanReadableTime(diffResponse.expectedHours)} disabled />
	</div>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim"><IconClockCode /></div>
		<input type="text" placeholder="Difference (Hours)" value={humanReadableTime(diffResponse.diffHours)} disabled />
	</div>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim"><IconClockDollar /></div>
		<input type="text" placeholder="Difference (Payout)" value={payout} disabled />
        <div class="input-group-shim">NOK</div>
	</div>
</div>
