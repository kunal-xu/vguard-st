export class Beneficiary {
  vpa: string | null = null;
  
  constructor(data?: Partial<Beneficiary>) {
    Object.assign(this, data);
  }
}