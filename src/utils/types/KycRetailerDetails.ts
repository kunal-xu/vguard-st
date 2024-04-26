export class KycRetailerDetails {
  userId: number | null = null;
  panCardFront: string | null = null;
  panCardNo: string | null = null;
  source: string | null = null;

  constructor(data?: Partial<KycRetailerDetails>) {
    Object.assign(this, data);
  }
}
