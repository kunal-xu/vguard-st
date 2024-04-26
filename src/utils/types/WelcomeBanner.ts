export class WelcomeBanner {
  code: number | null = null;
  textMessage: string | null = null;
  videoPath: string | null = null;
  imgPath: string | null = null;
  vdoText: string | null = null;

  constructor(data?: Partial<WelcomeBanner>) {
    Object.assign(this, data);
  }
}
