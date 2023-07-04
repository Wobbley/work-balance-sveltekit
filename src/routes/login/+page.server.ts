import { fail } from '@sveltejs/kit';

export const actions = {
	async default({ event, locals: { supabase, getSession } }) {
		const { request, url } = event;
		const session = await getSession()

		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
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