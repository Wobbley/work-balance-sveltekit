import type { PageLoad } from './$types'
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
	const { supabase, session } = await parent()
	if (!session) {
		throw redirect(303, '/');
	}
	const { data: profileData } = await supabase.from('profiles').select('*').limit(1).maybeSingle();

	return {
		profileData
	};
};
