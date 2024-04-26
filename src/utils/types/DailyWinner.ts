export class DailyWinner {
  profile: string | null = null;
  name: string | null = null;
  branch: string | null = null;
  district: string | null = null;
  date: string | null = "";

  constructor(data?: Partial<DailyWinner>) {
    Object.assign(this, data);
  }
}