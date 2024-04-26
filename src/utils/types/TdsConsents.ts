export class TdsConsents {
    tdsChecksCount: number | null = null;
    tdsConsent: number | null = null;
    adminApprovalStatus: number | null = null;
    constructor(data?: Partial<TdsConsents>) {
        Object.assign(this, data);
    }
}