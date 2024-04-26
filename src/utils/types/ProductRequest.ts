export class ProductRequest {
  keyword: string | null = "";
  categoryId: string = "";
  sortId: string | null = null;
  type: string | null = null;

  constructor(data?: Partial<ProductRequest>) {
    Object.assign(this, data);
  }
}
