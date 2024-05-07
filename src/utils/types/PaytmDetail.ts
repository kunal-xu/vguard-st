export class PaytmDetail {
    upiId: string | undefined = undefined;
    paytmNo: string | null = null;
    upiVerified: string | null = null;
    constructor(data?: Partial<PaytmDetail>) {
      Object.assign(this, data);
    }
  }
  