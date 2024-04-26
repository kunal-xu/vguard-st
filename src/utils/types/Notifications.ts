export class Notifications {
  notificationId: number | null = null;
  readCheck: boolean | null = null;
  alertDate: string | null = null;
  alertDesc: string | null = null;
  count: number | null = null;
  userId: number | null = null;

  constructor(data?: Partial<Notifications>) {
    Object.assign(this, data);
  }
}
