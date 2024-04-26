export class STDetailsByTimeAndDate {
    Date: string | null = null;
    StartTime: string | null = null;
    EndTime: string | null = null;
    constructor(data?: Partial<STDetailsByTimeAndDate>) {
        Object.assign(this, data);
    }
}