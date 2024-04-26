export class RaiseTicket {
  userId: number | null = null;
  issueTypeId: string | null = null;
  imagePath: string | null = null;
  description: string | null = null;
  
  constructor(data?: Partial<RaiseTicket>) {
    Object.assign(this, data);
  }
}
