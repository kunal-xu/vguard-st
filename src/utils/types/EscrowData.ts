import { Payout } from "./Payout";

export class EscrowData {
	escrow_id: string | null = null;
	terms_and_conditions_met: boolean | null = null;
	payouts: Payout[] | null = null;
	timestamp: string | null = null;
	signature: string | null = null;

	constructor(data?: Partial<EscrowData>) {
		Object.assign(this, data);
	}
}
