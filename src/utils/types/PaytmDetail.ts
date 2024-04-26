export class PaytmDetail {
    upiId: string | null = null;
    paytmNo: string | null = null;
    upiVerified: string | null = null;
    constructor(data?: Partial<PaytmDetail>) {
      Object.assign(this, data);
    }
  }
  