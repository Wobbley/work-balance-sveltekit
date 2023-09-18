<script lang="ts">
	import { IconMail } from '@tabler/icons-svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center max-w-[50%] gap-x-3">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim"><IconMail /></div>
		<input type="email" placeholder="name@email.com" />
		<button class="variant-filled-secondary">Send Magic Link</button>
	</div>
</div>
