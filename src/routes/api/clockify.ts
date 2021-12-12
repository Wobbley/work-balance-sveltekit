import Clockify, { RequestSummaryReportGroupsEnum } from "clockify-ts";
import type { RequestSummaryReportType } from "clockify-ts";
import type { EndpointOutput } from "@sveltejs/kit";
import type { DiffRequest } from "$lib/types";
import { getBusinessDaysCount } from "$lib/timeUtils";
import { DateTime } from "luxon";

export async function post({body}): Promise<EndpointOutput> {
  let request = body as DiffRequest
  const clockify = new Clockify(request.apiKey);
  let endDate = new Date(request.endDate)
  endDate.setHours(23, 59, 59)

  console.log(new Date(request.startDate))
  const summaryQuery: RequestSummaryReportType = {
    dateRangeStart: new Date(request.startDate),
    dateRangeEnd: new Date(endDate),
    summaryFilter: {
        groups: [RequestSummaryReportGroupsEnum.user],
    }
  }

  const report = await clockify.workspaces.withId(request.workspaceId).reports.summary.post(summaryQuery);

  console.log(report);
  let workedInHours = report.totals[0].totalTime / 60 / 60  
  let expectedHours= getBusinessDaysCount(DateTime.fromISO(request.startDate), DateTime.fromISO(request.endDate)) * request.workdayLength
  let diffHours = workedInHours - expectedHours

  let response = {
    workedInHours,
    expectedHours,
    diffHours
  }

  console.log(response)
  return {
      body: response,
    };
}