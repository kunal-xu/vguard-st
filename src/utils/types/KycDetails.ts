export class KycDetails {
  kycFlag: string | null = "0";
  userId: number | null = null;
  kycIdName: string | null = null;
  kycId: number | null = null;
  selfie: string | null = null;
  aadharOrVoterOrDLFront: string | null = null;
  aadharOrVoterOrDlBack: string | null = null;
  aadharOrVoterOrDlNo: string | null = null;
  panCardFront: string | null = null;
  panCardBack: string | null = null;
  panCardNo: string | null = null;
  gstFront: string | null = null;
  gstNo: string | null = null;
  gstYesNo: string | null = null;

  constructor(data?: Partial<KycDetails>) {
    Object.assign(this, data);
  }
}
