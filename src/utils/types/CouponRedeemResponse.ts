export class CouponRedeemResponse {
  custIdForProdInstall: string | null = null;
  modelForProdInstall: string | null = null;
  errorCode: number | null = -1;
  errorMsg: string | null = null;
  statusType: number = -1;
  balance: String = "0";
  currentPoints: String = "0";
  couponPoints: string | null = "0";
  promotionPoints: string | null = "0";
  transactId: string | null = null;
  schemePoints: string | null = "0";
  basePoints: string | null = "0";
  clubPoints: string | null = "0";
  scanDate: string | null = null;
  scanStatus: string | null = null;
  copuonCode: string | null = "";
  bitEligibleScratchCard: boolean | null = false;
  partId: string | null = null;
  partNumber: string | null = null;
  partName: string | null = null;
  couponCode: string | null = null;
  skuDetail: string | null = null;
  purchaseDate: string | null = null;
  categoryId: string | null = null;
  category: string | null = null;
  anomaly: number = -1;
  warranty: string | null = "";

  constructor(data?: Partial<CouponRedeemResponse>) {
    Object.assign(this, data);
  }
}