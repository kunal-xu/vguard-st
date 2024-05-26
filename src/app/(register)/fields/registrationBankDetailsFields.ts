import { height, width } from "../../../utils/dimensions";
import { styles } from "./styles";

export const registrationBankDetails = [
  {
    id: "47a15dd6-0e2f-421a-bda7-f6335a3d690e",
    label: "Bank Details",
    type: "text",
    properties: {
      color: "black",
      left: 20,
      marginBottom: 10,
    },
  },
  {
    id: "284a95c8-84e1-418c-8d38-f8a6ebb72423",
    type: "floatingLabelInput",
		label: "strings:please_enter_bank_account_number",
		data: "BankDetail.bankAccNo",
		properties: {
      staticLabel: true,
      maxLength: 30,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
	{
    id: "faf8b98e-a52f-4697-8f74-924e75343ee7",
    type: "floatingLabelInput",
		label: "strings:ifsc",
		data: "BankDetail.bankIfsc",
		properties: {
      staticLabel: true,
      maxLength: 30,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
	{
    id: "89ae9dd3-9a36-41bb-87b7-6121a0975fa7",
    type: "picker",
    items: ["Savings", "Current", "Salary", "Fixed deposit"],
    data: "BankDetail.bankAccType",
    properties: {
      mode: "dropdown",
      style: {
        color: "black",
        borderWidth: 2,
        borderColor: "black",
      },
    },
  },
  {
    id: "c322d6ac-cfeb-46d4-a977-01d8c65b90da",
    type: "BankSimulButton",
    verifyButtonProperties: {
      label: "Verify",
      variant: "verifyBank",
      width: width / 3
    },
    resetButtonProperties: {
      label: "Reset",
      variant: "outlined",
      width: width / 3,
    }
  },
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
      inputStyles: styles.inputStyles
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
      inputStyles: styles.inputStyles
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
      inputStyles: styles.inputStyles
    },
  },
	// {
  //   id: "7a24f8e3-5211-47a8-8423-b34b5b50009d",
  //   label: "strings:lbl_nominee_details",
  //   type: "text",
  //   properties: {
  //     color: "black",
  //     left: 20,
  //     marginBottom: 2,
  //   },
  // },
	// {
  //   id: "5dd21f70-cc69-4574-9245-4807b9a9121c",
  //   type: "floatingLabelInput",
  //   label: "strings:lbl_name_of_nominee",
  //   data: "BankDetail.nomineeName",
  //   properties: {
  //     staticLabel: true,
  //     maxLength: 30,
  //     keyboardType: "default",
  //     containerStyles: styles.container,
  //     labelStyles: styles.labelStyles,
  //     customLabelStyles: styles.customLabelStyles,
  //     inputStyles: styles.inputStyles
  //   },
  // },
	// // {
  // //   id: "b3baa45d-b688-4519-b65f-2120cf6353db",
  // //   type: "floatingLabelInput",
  // //   label: "strings:branch_address",
  // //   data: "name",
  // //   properties: {
  // //     staticLabel: true,
  // //     maxLength: 30,
  // //     editable: false,
  // //     keyboardType: "default",
  // //     containerStyles: styles.input,
  // //     labelStyles: styles.labelStyles,
  // //     inputStyles: {
  // //       color: "black",
  // //       paddingHorizontal: 10,
  // //       paddingVertical: 10,
  // //     },
  // //   },
  // // },
	// {
  //   id: "9a13e446-5fa8-4e75-8710-6fd8eb3baeb6",
  //   type: "floatingLabelInput",
  //   label: "strings:lbl_mobile_number",
  //   data: "BankDetail.nomineeMobileNo",
  //   properties: {
  //     staticLabel: true,
  //     maxLength: 30,
  //     keyboardType: "default",
  //     containerStyles: styles.container,
  //     labelStyles: styles.labelStyles,
  //     customLabelStyles: styles.customLabelStyles,
  //     inputStyles: styles.inputStyles
  //   },
  // },
	// {
  //   id: "d374b415-879d-45d3-9a62-52f7e6f3e036",
  //   type: "floatingLabelInput",
  //   label: "strings:lbl_email",
  //   data: "BankDetail.nomineeEmail",
  //   properties: {
  //     staticLabel: true,
  //     maxLength: 30,
  //     keyboardType: "default",
  //     containerStyles: styles.container,
  //     labelStyles: styles.labelStyles,
  //     customLabelStyles: styles.customLabelStyles,
  //     inputStyles: styles.inputStyles
  //   },
  // },
	// {
  //   id: "53603564-15f0-44a2-b85f-764027c5b984",
  //   type: "floatingLabelInput",
  //   label: "strings:lbl_address",
  //   data: "BankDetail.nomineeAdd",
  //   properties: {
  //     staticLabel: true,
  //     maxLength: 30,
  //     keyboardType: "default",
  //     containerStyles: styles.container,
  //     labelStyles: styles.labelStyles,
  //     customLabelStyles: styles.customLabelStyles,
  //     inputStyles: styles.inputStyles
  //   },
  // },
	// {
  //   id: "a422a4ba-1694-4fa7-b7af-afe68bff7488",
  //   type: "floatingLabelInput",
  //   label: "strings:lbl_relationship_with_you",
  //   data: "BankDetail.nomineeRelation",
  //   properties: {
  //     staticLabel: true,
  //     maxLength: 30,
  //     keyboardType: "default",
  //     containerStyles: styles.container,
  //     labelStyles: styles.labelStyles,
  //     customLabelStyles: styles.customLabelStyles,
  //     inputStyles: styles.inputStyles
  //   },
  // },
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
	// {
  //   id: "697d05ef-aadf-4074-8f25-658a937c18ae",
  //   type: "floatingLabelInput",
  //   label: "strings:lbl_paytm_number",
  //   data: "paytmNo",
  //   properties: {
  //     staticLabel: true,
  //     maxLength: 30,
  //     keyboardType: "default",
  //     containerStyles: styles.input,
  //     labelStyles: styles.labelStyles,
  //     inputStyles: {
  //       color: "black",
  //       paddingHorizontal: 10,
  //       paddingVertical: 10,
  //     },
  //   },
  // },
  {
    id: "58c20488-b60c-40fe-a3ce-346fd2f15b30",
    type: "floatingLabelInputWithButton",
    label: "strings:lbl_paytm_upi",
    data: "PaytmDetail.upiId",
    source: "upi",
  },
  // {
  //   id: "85935fdc-d4ae-4648-aa53-eac776e462f2",
  //   type: "floatingLabelInput",
  //   label: "strings:alternate_contact_number",
  //   data: "AlternateNumber",
  //   properties: {
  //     staticLabel: true,
  //     maxLength: 30,
  //     keyboardType: "number-pad",
  //     containerStyles: styles.container,
  //     labelStyles: styles.labelStyles,
  //     customLabelStyles: styles.customLabelStyles,
  //     inputStyles: styles.inputStyles
  //   },
  // },
];
