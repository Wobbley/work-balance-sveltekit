<script lang="ts">
    import { Card, FloatingLabelInput } from 'flowbite-svelte';
    import { humanReadableTime } from '$lib/timeUtils';

    let payout: number = 0;

    export let diffResponse;
    export let hourlyRate;

    $: if (hourlyRate && diffResponse?.diffHours) {
        payout = diffResponse.diffHours * hourlyRate;
    }


</script>


<Card padding="sm">
    <FloatingLabelInput
        style="filled"
        id="workedInHours"
        name="workedInHours"
        type="text"
        label="Worked"
        value={humanReadableTime(diffResponse.workedHours)}
        disabled
    />
    <FloatingLabelInput
        style="filled"
        id="expectedHours"
        name="expectedHours"
        type="text"
        label="Expected"
        value={humanReadableTime(diffResponse.expectedHours)}
        disabled
    />
    <FloatingLabelInput
        style="filled"
        id="diffHours"
        name="diffHours"
        type="text"
        label="Difference (Hours)"
        value={humanReadableTime(diffResponse.diffHours)}
        disabled
        color={diffResponse.diffHours >= 0 ? 'green' : 'red'}
    />
    {#if hourlyRate}
    <FloatingLabelInput
        style="filled"
        id="diffPayout"
        name="diffPayout"
        type="text"
        label="Difference (Payout)"
        value={payout + ' NOK'}
        disabled
        color={diffResponse.diffHours >= 0 ? 'green' : 'red'}
    />
    {/if}
</Card>