export class STLeadInvite {
  Name: string | null = null;
  DateOfLead: string | null = null;
  ContactNumber: string | null = null;
  Pincode: string | null = null;
  ServiceCategories: string | null = null;

  constructor(data?: Partial<STLeadInvite>) {
    Object.assign(this, data);
  }
}