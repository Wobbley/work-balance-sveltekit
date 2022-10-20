import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, invalid } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}
		const formData = await request.formData();
		const { data, writeError } = await supabaseClient
			.from('profiles')
			.upsert({
				id: session.user.id,
				workspace_id: formData.get('workspaceId'),
				api_key: formData.get('apiKey')
			})
			.select()
			.limit(1)
			.single();

		console.log(data)

		if (writeError) {
			return invalid(500, {
				supabaseErrorMessage: writeError.message
			});
		}
        return {
            success: true,
			updatedProfile: data
        }
	}
};
