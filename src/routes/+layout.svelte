<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { IconLogin, IconUser } from '@tabler/icons-svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let { session, supabase } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl">Work Balance</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if session}
					<a class="btn btn-sm variant-ghost-surface" href="/account">
						<span><IconUser /></span>
						<span>Account</span>
					</a>
				{:else}
					<a class="btn btn-sm variant-ghost-surface" href="/login">
						<span><IconLogin /></span>
						<span>Login</span>
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
