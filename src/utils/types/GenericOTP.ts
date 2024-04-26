export class GenericOtp {
  mobile: string | null = null;
  otp: string | null = null;
  eventType: string | null = null;

  constructor(data?: Partial<GenericOtp>) {
    Object.assign(this, data);
  }
}
