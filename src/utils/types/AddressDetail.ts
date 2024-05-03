export class AddressDetail {
    currentAddressDoorNo: string | null = "";
    currentAddressLine1: string | null = "";
    currentAddressLine2: string | null = "";
    currentAddressLine3: string | null = "";
    currentPincode: string | null = "";
    currentCity: string | null = "";
    currentState: string | null = "";
    currentDistrict: string | null = "";
    constructor(data?: Partial<AddressDetail>) {
      Object.assign(this, data);
    }
  }