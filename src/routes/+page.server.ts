import type { DiffRequest, DiffResponse } from '$lib/types';
import { workDays } from '$lib/time-utils';

export const actions = {
	default: async ({request}) => {
		const baseUrl = 'https://reports.api.clockify.me/v1';
		const data = await request.formData()
        const clockifyRequest: DiffRequest = {
            apiKey: data.get('apiKey') as string,
            workspaceId: data.get('workspaceId') as string,
            startDate: data.get('startDate') as string,
            endDate: data.get('endDate') as string,
            workdayLength: parseFloat(data.get('workdayLength') as string)
        }
		const startDate = new Date(clockifyRequest.startDate);
		const endDate = new Date(clockifyRequest.endDate);
		endDate.setHours(23, 59, 59);

		const postBody = `{"dateRangeStart": "${startDate.toISOString()}","dateRangeEnd": "${endDate.toISOString()}","summaryFilter": {"groups": ["USER"]},"exportType": "JSON"}`;

		const headers = new Headers();
		headers.append('X-Api-Key', clockifyRequest.apiKey as string);
		headers.append('content-type', 'application/json');

		const summaryResponse = await fetch(
			`${baseUrl}/workspaces/${clockifyRequest.workspaceId}/reports/summary`,
			{
				method: 'POST',
				body: postBody,
				headers: headers
			}
		);

		const report = await summaryResponse.json();
		const workedHours = report.totals[0].totalTime / 60 / 60;
		const expectedHours = workDays(startDate, endDate) * clockifyRequest.workdayLength;
		const diffHours = workedHours - expectedHours;

		const response: DiffResponse = {
			workedHours,
			expectedHours,
			diffHours
		};

		return {
			success: true,
            diffResponse: response
		};
	}
};
