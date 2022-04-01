import Clockify, { RequestSummaryReportGroupsEnum } from 'clockify-ts';
import type { RequestSummaryReportType } from 'clockify-ts';
import type { DiffRequest, DiffResponse } from '$lib/types';
import { workDays } from '$lib/timeUtils';

export async function post({ request }) {
	const clockifyRequest = await request.json() as DiffRequest;
	const startDate = new Date(clockifyRequest.startDate);
	const endDate = new Date(clockifyRequest.endDate);
	endDate.setHours(23, 59, 59);

	const clockify = new Clockify(clockifyRequest.apiKey);
	const summaryQuery: RequestSummaryReportType = {
		dateRangeStart: new Date(clockifyRequest.startDate),
		dateRangeEnd: new Date(endDate),
		summaryFilter: {
			groups: [RequestSummaryReportGroupsEnum.user]
		}
	};
	const report = await clockify.workspaces
		.withId(clockifyRequest.workspaceId)
		.reports.summary.post(summaryQuery);

	const workedHours = report.totals[0].totalTime / 60 / 60;
	const expectedHours = workDays(startDate, endDate) * clockifyRequest.workdayLength;
	const diffHours = workedHours - expectedHours;

	const response: DiffResponse = {
		workedHours,
		expectedHours,
		diffHours
	};

	return {
		body: response
	};
}
