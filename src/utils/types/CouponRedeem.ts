export class CouponRedeem {
  userMobileNumber: string | null = null;
  couponCode: string | null = null;
  pin: string | null = null;
  smsText: string | null = null;
  from: string | null = null;
  userType: string | null = null;
  userId: number = 0;
  apmID: number = 0;
  userCode: string | null = null;
  isAirCooler: number | null = 0;
  latitude: string | null = null;
  longitude: string | null = null;
  geolocation: string | null = null;
  category: string | null = null;
  
  constructor(data?: Partial<CouponRedeem>) {
    Object.assign(this, data);
  }
}
