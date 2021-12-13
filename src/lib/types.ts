export type DiffRequest = {
    startDate: string;
    endDate: string;
    workdayLength: number;
    workspaceId: string;
    apiKey: string;
}

export type DiffResponse = {
    workedHours: number
    expectedHours: number
    diffHours: number
}