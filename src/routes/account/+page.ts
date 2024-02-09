import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	const { data: { user } } = await supabase.auth.getUser()
	if (!user) {
		throw redirect(303, '/');
	}
	const { data: profileData } = await supabase.from('profiles').select('*').limit(1).maybeSingle();

	return {
		profileData
	};
};