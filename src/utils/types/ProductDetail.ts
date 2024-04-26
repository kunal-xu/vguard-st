export class ProductDetail {
  specs: string | null = null;
  pointsFormat: string | null = null;
  product: string | null = null;
  productName: string | null = null;
  productCategory: string | null = null;
  productCode: string | null = null;
  points: number = 0.0;
  imageUrl: string | null = null;
  userId: string | null = null;
  productId: string | null = null;
  paytmMobileNo: string | null = null;

  constructor(data?: Partial<ProductDetail>) {
    Object.assign(this, data);
  }
}
