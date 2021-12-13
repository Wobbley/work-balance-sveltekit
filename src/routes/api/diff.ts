import Clockify, { RequestSummaryReportGroupsEnum } from "clockify-ts";
import type { RequestSummaryReportType } from "clockify-ts";
import type { EndpointOutput } from "@sveltejs/kit";
import type { DiffRequest, DiffResponse } from "$lib/types";
import { workDays } from "$lib/timeUtils";

export async function post({ body }): Promise<EndpointOutput> {
  const request = body as DiffRequest
  const startDate = new Date(request.startDate);
  const endDate = new Date(request.endDate)
  endDate.setHours(23, 59, 59)

  const clockify = new Clockify(request.apiKey);
  const summaryQuery: RequestSummaryReportType = {
    dateRangeStart: new Date(request.startDate),
    dateRangeEnd: new Date(endDate),
    summaryFilter: {
      groups: [RequestSummaryReportGroupsEnum.user],
    }
  }
  const report = await clockify.workspaces.withId(request.workspaceId).reports.summary.post(summaryQuery);

  const workedHours = report.totals[0].totalTime / 60 / 60
  const expectedHours = workDays(startDate, endDate) * request.workdayLength
  const diffHours = workedHours - expectedHours

  const response: DiffResponse = {
    workedHours,
    expectedHours,
    diffHours
  }
  
  return {
    body: response,
  };
}