export class VPAOrder {
	userId: number | null = null;
	mobileNo: string | null = null;
	amount: string = "";
	upi: string = "";
	userName: string | null = null;
	userCode: string | null = null;
	roleId: string | null = null;

	constructor(data?: Partial<VPAOrder>) {
		Object.assign(this, data);
	}
}