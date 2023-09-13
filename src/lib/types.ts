export type DiffRequest = {
	startDate: string;
	endDate: string;
	workdayLength: number;
	workspaceId: string | undefined;
	apiKey: string | undefined;
};

export type DiffResponse = {
	workedHours: number;
	expectedHours: number;
	diffHours: number;
};
