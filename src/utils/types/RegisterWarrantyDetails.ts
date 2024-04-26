import { CouponRedeemResponse } from "./CouponRedeemResponse";
import { ProductDetail } from "./ProductDetail";

export class RegisterWarrantyDetails {
  otp: string | null = null;
  nameTitle: string | null = "";
  contactNo: string | null = null;
  name: string | null = null;
  email: string | null = null;
  currAdd: string | null = null;
  alternateNo: string | null = null;
  state: string | null = null;
  district: string | null = null;
  city: string | null = null;
  landmark: string | null = null;
  pinCode: string | null = null;
  dealerName: string | null = null;
  dealerAdd: string | null = null;
  dealerState: string | null = null;
  dealerDist: string | null = null;
  dealerCity: string | null = null;
  dealerPinCode: string | null = null;
  dealerNumber: string | null = null;
  addedBy: number | null = null;
  billDetails: string | null = null;
  warrantyPhoto: string | null = null;
  sellingPrice: string | null = null;
  emptStr = "";
  cresp: CouponRedeemResponse = new CouponRedeemResponse();
  selectedProd: ProductDetail = new ProductDetail();
  latitude: string | null = null;
  longitude: string | null = null;
  geolocation: string | null = null;
  dealerCategory: string | null = null;

  constructor(data?: Partial<RegisterWarrantyDetails>) {
    Object.assign(this, data);
    if (data && data.cresp) {
      this.cresp = new CouponRedeemResponse(data.cresp);
    }
    if (data && data.selectedProd) {
      this.selectedProd = new ProductDetail(data.selectedProd);
    }
  }
}
