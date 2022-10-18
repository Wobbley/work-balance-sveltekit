<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.postcss';
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Navbar, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
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
			<NavLi href="/" active={true}>Account</NavLi>
		{:else}
			<NavLi href="login" active={true}>Login</NavLi>
		{/if}
	</NavUl>
</Navbar>

<slot />
