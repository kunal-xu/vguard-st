import { styles } from "./styles";

export const registrationBankDetails = [
  {
    id: "16e4be6a-11dc-48c1-b9a6-d6faf8cd9f23",
    type: "floatingLabelInput",
    label: "strings:lbl_account_holder_name",
    data: "BankDetail.bankAccHolderName",
    properties: {
      staticLabel: true,
      maxLength: 30,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles,
    },
  },
  {
    id: "2566b647-b00e-403a-9de6-3c9531c778d1",
    type: "floatingLabelInput",
    label: "strings:lbl_bank_name_and_branch",
    data: "BankDetail.bankNameAndBranch",
    properties: {
      staticLabel: true,
      maxLength: 30,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles,
    },
  },
  {
    id: "55db578b-d8eb-41d2-8aaa-da32ffc4836a",
    type: "floatingLabelInput",
    label: "strings:branch_address",
    data: "BankDetail.branchAddress",
    properties: {
      staticLabel: true,
      maxLength: 30,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles,
    },
  },
  {
    id: "f2f515db-6899-44b4-ad2b-f84db2b4249c",
    label: "UPI Details",
    type: "text",
    properties: {
      color: "black",
      left: 20,
      marginBottom: 10,
    },
  },
  {
    id: "58c20488-b60c-40fe-a3ce-346fd2f15b30",
    type: "floatingLabelInputWithButton",
    label: "strings:lbl_paytm_upi",
    data: "PaytmDetail.upiId",
    source: "upi",
  },
];
