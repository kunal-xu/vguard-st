export class ErrorCoupon {
  couponCode: string | null = null;
  userCode: string | null = null;
  errorCouponPath: string | null = null;
  remarks: string | null = null;

  constructor(data?: Partial<ErrorCoupon>) {
    Object.assign(this, data);
  }
}
