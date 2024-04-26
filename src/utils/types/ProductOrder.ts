import { BankDetail } from "./BankDetail";
import { ProductDetail } from "./ProductDetail";
import { ShippingAddress } from "./ShippingAddress";

export class ProductOrder {
  userId: number | null = null;
  mobileNo: string | null = null;
  points: string | null = null;
  amount: string | null = null;
  shippingAddress: ShippingAddress | null = null;
  bankDetail: BankDetail | null = null;
  productDetail: ProductDetail | null = null;
  productId: string | null = null;
  roleId: string | null = null;

  constructor(data?: Partial<ProductOrder>) {
    Object.assign(this, data);
    
  }
}
