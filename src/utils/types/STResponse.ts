export class STFailure {
	UniqueId: string | null = null;
	missingFields: string[] | null = null;
	message: string | null = null;
}

export class STResponse {
	code: number | null = null;
	message: string | null = null;
	success: string | null = null;
	failure: string | null = null;
	successfulOperationsIdList: string[] | null = []
	error: STFailure[] | null = [];
}