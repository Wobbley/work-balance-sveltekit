import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		return null
	}
	const { data: profileData } = await supabaseClient.from('profiles').select('*').limit(1).maybeSingle();

	return {
		profileData
	};
};
