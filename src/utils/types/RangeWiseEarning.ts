export class RangeWiseEarning {
  startDate: Date | null = null;
  endDate: Date | null = null;
  product: string | null = null;
  constructor(data?: Partial<RangeWiseEarning>) {
    Object.assign(this, data);
  }
}
