<script lang="ts">
	import '../app.postcss';
	import '$lib/db';
	import { startSupabaseSessionSync } from '@supabase/auth-helpers-sveltekit';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	// this sets up automatic token refreshing
	startSupabaseSessionSync({
		page,
		handleRefresh: () => invalidateAll()
	});
</script>

<svelte:head>
	<title>Work Balance</title>
</svelte:head>

<slot />
