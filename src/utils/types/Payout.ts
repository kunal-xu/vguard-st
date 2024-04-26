import { Beneficiary } from "./Beneficiary";
import { Payee } from "./Payee";

export class Payout {
	payout_ref: string | null = null;
	amount: number | null = null;
	payout_mode: string | null = null;
	transaction_note: string | null = null;
	payee: Payee | null = null;
	beneficiary: Beneficiary | null = null;
	
	constructor(data?: Partial<Payout>) {
    Object.assign(this, data);
  }
}