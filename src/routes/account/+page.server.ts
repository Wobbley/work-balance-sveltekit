import { error, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const { data: { user } } = await supabase.auth.getUser()
		if (!user) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}
		const formData = await request.formData();
		const { data, writeError } = await supabase
			.from('profiles')
			.upsert({
				id: user.id,
				workspace_id: formData.get('workspaceId'),
				api_key: formData.get('apiKey'),
				overtime_hourly_rate_post_tax: formData.get('overtimeHourlyRatePostTax'),
			})
			.select()
			.limit(1)
			.single();

		if (writeError) {
			return fail(500, {
				supabaseErrorMessage: writeError.message
			});
		}
		return {
			success: true,
			updatedProfile: data
		}
	}
};