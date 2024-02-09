import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/')
	}
	const { data: profile } = await supabase
		.from('profiles')
		.select(`workspace_id, api_key, overtime_hourly_rate_post_tax`)
		.eq('id', session.user.id)
		.single()

	console.log(profile)
	return { session, profile }
}

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {

		const session = await getSession()
		const formData = await request.formData()
		const workspaceId = formData.get('workspaceId')
		const apiKey = formData.get('apiKey')
		const overtimeHourlyRatePostTax = formData.get('overtimeHourlyRatePostTax')

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			workspace_id: workspaceId,
			api_key: apiKey,
			overtime_hourly_rate_post_tax: overtimeHourlyRatePostTax,
		})

		if (error) {
			return fail(500, {
				workspaceId,
				apiKey,
				overtimeHourlyRatePostTax,
			})
		}

		return {
			workspaceId,
			apiKey,
			overtimeHourlyRatePostTax,
		}
	}
};