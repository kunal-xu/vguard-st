export class MonthData {
  id: number | null = null;
  month: string | null = null;
  year: string | null = null;
  intuserid: string | null = null;

  constructor(data?: Partial<MonthData>) {
    Object.assign(this, data);
  }
}
