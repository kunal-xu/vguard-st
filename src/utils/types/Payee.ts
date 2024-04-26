export class Payee {
	user_ref: string | null = null;
	company_name: string | undefined = "";
	user_name: string | null = null;
	user_mobile_number: string | null = null;

	constructor(data?: Partial<Payee>) {
    Object.assign(this, data);
  }
}