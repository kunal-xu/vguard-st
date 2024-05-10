import { CouponRedeemResponse } from "./CouponRedeemResponse";
import { ProductDetail } from "./ProductDetail";

export class RegisterCustomerDetails {
  nameTitle: string | null = "";
  contactNo: string | null = "";
  name: string | null = "";
  email: string | null = "";
  currAdd: string | null = null;
  alternateNo: string | null = null;
  state: string | null = "";
  district: string | null = "";
  city: string | null = null;
  landmark: string | null = null;
  pinCode: string | null = "";
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
  emptStr: string = "";
  cresp: CouponRedeemResponse = new CouponRedeemResponse();
  selectedProd: ProductDetail = new ProductDetail();
  latitude: string | null = null;
  longitude: string | null = null;
  geolocation: string | null = null;
  dealerCategory: string | null = null;

  constructor(data?: Partial<RegisterCustomerDetails>) {
    Object.assign(this, data);
    if (data && data.cresp) {
      this.cresp = new CouponRedeemResponse(data.cresp);
    }
    if (data && data.selectedProd) {
      this.selectedProd = new ProductDetail(data.selectedProd);
    }
  }
}
