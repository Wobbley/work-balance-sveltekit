import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent }) => {
	const { supabase, session } = await parent()
	if (!session) {
		return null
	}
	const { data: profileData } = await supabase.from('profiles').select('*').limit(1).maybeSingle();

	return {
		profileData
	};
};
