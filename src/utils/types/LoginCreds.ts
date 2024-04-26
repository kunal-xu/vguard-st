export class LoginCreds {
  Contact: string = "";
  Password: string = "";
  Otp: string = "";

  constructor(data?: Partial<LoginCreds>) {
    Object.assign(this, data);
  }
}
