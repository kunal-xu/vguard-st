export class AddressDetail {
  currentAddressDoorNo: string | null = null;
  currentAddressLine1: string | null = null;
  currentAddressLine2: string | null = null;
  currentAddressLine3: string | null = null;
  currentPincode: string | null = null;
  currentCity: string | null = null;
  currentState: string | null = null;
  currentDistrict: string | null = null;
  constructor(data?: Partial<AddressDetail>) {
    Object.assign(this, data);
  }
}