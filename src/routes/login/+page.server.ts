import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { invalid } from '@sveltejs/kit';

export const actions  = {
	async default(event) {
		const { request, url } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { error } = await supabaseClient.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${url.origin}/`
			}
		});

		if (error) {
			return invalid(400, {
				error: error.message,
				values: { email }
			});
		}

		return {
			success: true,
			message: 'Success! Magic link sent, check your email.'
		};
	}
};