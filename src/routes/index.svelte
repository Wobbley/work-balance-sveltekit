<script lang="ts">
	let subtitle: string = 'Helpful Links';
</script>

<div class="flex flex-col items-center">
	<div class="w-1/2 form-control space-y-1 ">
		<label class="input-group input-group-vertical input-group">
			<span class="text-primary">Workspace ID</span> 
			<input type="text" class="input">
		</label>
		<label class="input-group input-group-vertical">
			<span class="text-primary">API Key</span> 
			<input type="password" class="input">
		</label>
		<label class="input-group input-group-vertical">
			<span class="text-primary">Start Date</span> 
			<input type="date" class="input">
		</label>
		<label class="input-group input-group-vertical">
			<span class="text-primary">End Date</span> 
			<input type="date" class="input">
		</label>
		<label class="input-group input-group-vertical">
			<span class="text-primary">End Date</span> 
			<input type="date" class="input">
		</label>
		<label class="input-group input-group-vertical">
			<span class="text-primary">Hours in Workday</span> 
			<input type="number" class="input">
		</label>
		<button class="btn btn-primary btn-outline">Have I worked enough?</button> 
	</div>
</div>