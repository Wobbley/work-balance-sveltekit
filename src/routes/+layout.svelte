<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	import { Navbar, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';

	export let data: LayoutData;

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

<svelte:head>
	<title>Work Balance</title>
</svelte:head>

<Navbar let:hidden let:toggle>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		{#if $page.data.session}
			<NavLi href="/account" active={true}>Account</NavLi>
		{:else}
			<NavLi href="login" active={true}>Login</NavLi>
		{/if}
	</NavUl>
</Navbar>

<slot />
