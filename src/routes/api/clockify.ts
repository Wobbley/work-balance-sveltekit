import Clockify, { RequestSummaryReportGroupsEnum } from "clockify-ts";
import type { RequestSummaryReportType } from "clockify-ts";

export async function get() {
const clockifyApiKey=""

console.log("I AM RUN")
const clockify = new Clockify(clockifyApiKey);

const summaryQuery: RequestSummaryReportType = {
  dateRangeStart: new Date(1577836800000), // Jan. 2020
  dateRangeEnd: new Date(1609459199000), // Jan. 2021
  summaryFilter: {
      groups: [RequestSummaryReportGroupsEnum.user],
  }
}

const report = await clockify.workspaces.withId("").reports.summary.post(summaryQuery);

console.log(report);

return {
    body: report,
  };
}