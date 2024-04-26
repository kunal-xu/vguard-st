export class BankDetail {
  errorMessage: string | null = null;
  bankId: string | null = null;
  bankAccNo: string | null = null;
  bankAccHolderName: string | null = null;
  bankAccType: string | null = null;
  bankAccTypePos: string | null = null;
  bankNameAndBranch: string | null = null;
  branchAddress: string | null = null;
  bankIfsc: string | null = null;
  nomineeName: string | null = null;
  nomineeDob: string | null = null;
  checkPhoto: string | null = null;
  nomineeMobileNo: string | null = null;
  nomineeEmail: string | null = null;
  nomineeAdd: string | null = null;
  nomineeRelation: string | null = null;
  nomineeAccNo: string | null = null;
  bankDataPresent: number | null = null;

  constructor(data?: Partial<BankDetail>) {
    Object.assign(this, data);
  }
}
