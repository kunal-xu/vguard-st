import { AddressDetail } from "./AddressDetail";
import { BankDetail } from "./BankDetail";
import { PaytmDetail } from "./PaytmDetail";
import { WelcomeBanner } from "./WelcomeBanner";

export class STUser {
  Name: string | null = null;
  DOB: Date | null = null;
  UniqueId: string | null = null;
  RishtaID: string | null = null;
  UserId: number | null = null;
  Contact: string | null = null;
  MappedParentName: string | null = null;
  MappedParentId: string | null = null;
  STType: string | null = null;
  SEorPICCode: string | null = null;
  SEorPICName: string | null = null;
  SalesOffice: string | null = null;
  ResendInviteLinkFlag: boolean | null = null;
  ResendSMS: boolean | null = null
  ActivationStatus: number | null = null;
  LoggedInDate: Date | null = null;
  BlockStatus: number | null = null;
  Aadhar: string | null = null;
  PAN: string | null = null;
  AddressDetail: AddressDetail = new AddressDetail();
  BankDetail: BankDetail = new BankDetail();
  PaytmDetail: PaytmDetail = new PaytmDetail();
  WelcomeBanner: WelcomeBanner = new WelcomeBanner();
  EmailId: string | null = "";
  Gender: string = "";
  AlternateNumber: string | null = null;
  Selfie: string | null = null;
  EarnedPoints: string | null = null;
  RedeemedPoints: string | null = null;
  BalancePoints: string | null = null;
  RedeemablePoints: string | null = null;
  DeductedTDS: string | null = null;
  TDSSlab: string | null = null;
  TDSKitty: string | null = null;
  NumberOfScans: string | null = null;
  InvitationDate: string | undefined = "";
  UpdatedOn: string | null = null;
  OtpType: string | null = null;
  Otp: string | null = null;
  pwd: string | null = "";
  confirmPwd: string | null = "";
  hasPwdChanged: boolean | null = null;

  constructor(data?: Partial<STUser>) {
    Object.assign(this, data);
    if (data && data.BankDetail) {
      this.BankDetail = new BankDetail(data.BankDetail);
    }
    if (data && data.PaytmDetail) {
      this.PaytmDetail = new PaytmDetail(data.PaytmDetail);
    }
    if (data && data.AddressDetail) {
      this.AddressDetail = new AddressDetail(data.AddressDetail);
    }
    if(data && data.WelcomeBanner) {
      this.WelcomeBanner = new WelcomeBanner(data.WelcomeBanner);
    }
  }
}
