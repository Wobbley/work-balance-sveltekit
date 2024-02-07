import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ url, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				shouldCreateUser: false,
				emailRedirectTo: `${url.origin}/`
			}
		});

		if (error) {
			return fail(400, {
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
