import { height, width } from "../../../utils/dimensions";
import { styles } from "./styles";

export const editProfileFields = [
  {
    id: "080be0ca-e6b6-4c2d-ba4b-96e328228f0f",
    label: "strings:email",
    type: "floatingLabelInput",
    data: "EmailId",
    properties: {
      keyboardType: "email-address",
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "32975062-9d16-46c6-b009-2e350f5e3146",
    label: "strings:lbl_current_address_mandatory",
    type: "floatingLabelInput",
    data: "AddressDetail.currentAddressDoorNo",
    properties: {
      keyboardType: "default",
      maxLength: 10,
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "96f46ac3-c2a6-4863-86b0-bb73c5ebb6b9",
    label: "strings:lbl_current_address_line_1",
    type: "floatingLabelInput",
    data: "AddressDetail.currentAddressLine1",
    properties: {
      keyboardType: "default",
      maxLength: 128,
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "f515df31-b3c7-4c22-be1b-955d86b0e474",
    label: "strings:lbl_current_address_line_2",
    type: "floatingLabelInput",
    data: "AddressDetail.currentAddressLine2",
    properties: {
      keyboardType: "default",
      maxLength: 60,
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "e482c9f2-e595-4d62-a22e-45b0fcd4ed1f",
    label: "strings:lbl_current_address_line_3",
    type: "floatingLabelInput",
    data: "AddressDetail.currentAddressLine3",
    properties: {
      keyboardType: "default",
      maxLength: 60,
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "97fbf4f6-65e2-4209-881e-664e7b64b391",
    label: "auth:newuser:Secondpagepincode",
    type: "dropDownPicker",
    data: "AddressDetail.currentPincode",
    properties: {
      mode: "BADGE",
      showBadgeDot: true,
      searchable: true,
      disableLocalSearch: true,
      searchPlaceholder: "Search Your Pincode",
      searchablePlaceholder: "Search Pincode",
      searchTextInputProps: {
        maxLength: 6,
        keyboardType: "number-pad",
      },
      listMode: "SCROLLVIEW",
      scrollViewProps: {
        nestedScrollEnabled: true,
        decelerationRate: "fast",
      },
      badgeStyle: (item: any) => ({
        padding: 5,
        backgroundColor: item.value? 'red': 'grey',
      }),
      badgeProps: {
        activeOpacity: 1.5
      },
      badgeSeparatorStyle: {
        width: 30
      },
      badgeColors: ['red'],
      badgeDotColors: ['red'],
      dropDownContainerStyle: {
        width: width / 1.1,
        height: height / 5,
        padding: 10,
        left: 18,
        top: 60,
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderColor: "#D3D3D3",
        justifyContent: "center",
        elevation: 0,
        backgroundColor: "#D3D3D3",
      },
      style: {
        backgroundColor: "white",
        margin: 20,
        elevation: 50,
        opacity: 0.9,
        borderWidth: 0.6,
        width: width / 1.1,
        height: height / 15,
        alignSelf: "center",
        bottom: 10,
        margintop: 50,
        borderColor: "#D3D3D3",
      },
    },
  },
  {
    id: "579d9086-9d29-4ae4-8583-494b497d0af8",
    label: "strings:select_state",
    type: "floatingLabelInput",
    data: "AddressDetail.currentState",
    properties: {
      keyboardType: "default",
      staticLabel: true,
      editable: false,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "e5f652db-1c60-42cf-a990-b9e15b3b2e34",
    label: "strings:select_district",
    type: "floatingLabelInput",
    data: "AddressDetail.currentDistrict",
    properties: {
      keyboardType: "default",
      staticLabel: true,
      editable: false,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "645354b2-fc70-4b66-858c-3e852c5f9c9f ",
    label: "strings:select_city",
    type: "floatingLabelInput",
    data: "AddressDetail.currentCity",
    properties: {
      keyboardType: "default",
      staticLabel: true,
      editable: false,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "f2f515db-6899-44b4-ad2b-f84db2b4249c",
    label: "strings:lbl_bank_details",
    type: "text",
    properties: {
      color: "black",
      left: 20,
      marginBottom: 2,
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
        borderWidth: 1.5,
        borderColor: "#D3D3D3",
      },
    },
  },
  {
    id: "c322d6ac-cfeb-46d4-a977-01d8c65b90da",
    type: "Button",
    label: "bank",
    properties: {
      label: "Get bank details",
      variant: "outlined",
      width: 350,
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
      maxLength: 40,
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
	{
    id: "7a24f8e3-5211-47a8-8423-b34b5b50009d",
    label: "strings:lbl_nominee_details",
    type: "text",
    properties: {
      color: "black",
      left: 20,
      marginBottom: 2,
    },
  },
	{
    id: "5dd21f70-cc69-4574-9245-4807b9a9121c",
    type: "floatingLabelInput",
    label: "strings:lbl_name_of_nominee",
    data: "BankDetail.nomineeName",
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
	// {
  //   id: "b3baa45d-b688-4519-b65f-2120cf6353db",
  //   type: "floatingLabelInput",
  //   label: "strings:branch_address",
  //   data: "name",
  //   properties: {
  //     staticLabel: true,
  //     maxLength: 30,
  //     editable: false,
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
    id: "9a13e446-5fa8-4e75-8710-6fd8eb3baeb6",
    type: "floatingLabelInput",
    label: "strings:lbl_mobile_number",
    data: "BankDetail.nomineeMobileNo",
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
    id: "d374b415-879d-45d3-9a62-52f7e6f3e036",
    type: "floatingLabelInput",
    label: "strings:lbl_email",
    data: "BankDetail.nomineeEmail",
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
    id: "53603564-15f0-44a2-b85f-764027c5b984",
    type: "floatingLabelInput",
    label: "strings:lbl_address",
    data: "BankDetail.nomineeAdd",
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
    id: "a422a4ba-1694-4fa7-b7af-afe68bff7488",
    type: "floatingLabelInput",
    label: "strings:lbl_relationship_with_you",
    data: "BankDetail.nomineeRelation",
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
    id: "eb537727-02bb-403f-89b6-e2a2552006c2",
    label: "strings:lbl_upi_details",
    type: "text",
    properties: {
      color: "black",
      left: 20,
      marginBottom: 2,
    },
  },
  {
    id: "9387f5d0-6538-4d6e-af3f-c336f4f0bf6f",
    type: "Button",
    label: "UPI",
    properties: {
      label: "Verify UPI ID",
      variant: "outlined",
      width: 350,
    }
  },
];





