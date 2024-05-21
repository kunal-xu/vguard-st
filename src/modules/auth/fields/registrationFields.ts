import { height, width } from "../../../utils/dimensions";
import { styles } from "./styles";

export const registrationFields = [
  // {
  //   id: "e57905fd-95a3-4642-9129-09012b98e6a1",
  //   type: "ImagePicker",
  //   data: "Selfie",
  //   label: "Profile Picture",
  //   properties: {
  //     imageRelated: "Profile"
  //   }
  // },
  {
    id: "2af107a0-af3f-4c05-bf43-add3e85f73d1",
    type: "floatingLabelInput",
    label: "strings:name",
    data: "Name",
    properties: {
      staticLabel: true,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    }
  },
  
  {
    id: "c445af89-753c-4956-b490-51b3c29a8e84",
    type: "floatingLabelInput",
    label: "strings:lbl_date_of_birth",
    data: "DOB",
    properties: {
      staticLabel: true,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "30f0a95f-5b0d-4dac-ae4d-c4f07fdbfcb9",
    label: "strings:contact_no",
    type: "floatingLabelInput",
    data: "Contact",
    properties: {
      keyboardType: "number-pad",
      staticLabel: true,
      maxLength: 10,
      editable: false,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "049f8efa-7f43-40ec-a6cf-6ce25e1012cc",
    type: "floatingLabelInput",
    label: "strings:update_aadhar_voter_id_dl_manually",
    data: "Aadhar",
    properties: {
      staticLabel: true,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "81f1d65a-d34b-4367-897d-e3bb83e012b5",
    type: "floatingLabelInput",
    label: "strings:pan_card",
    data: "PAN",
    properties: {
      staticLabel: true,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "07bfda04-2a1c-44f8-b569-9896945fb718",
    type: "picker",
    items: ["Select Gender", "Male", "Female", "Other"],
    data: "Gender",
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
    type: "floatingLabelInputWithButton",
    label: "strings:tds_slab",
    data: "TDSSlab",
    source: "tds",
  },
  {
    id: "080be0ca-e6b6-4c2d-ba4b-96e328228f0f",
    label: "strings:email",
    type: "floatingLabelInput",
    data: "EmailId",
    properties: {
      keyboardType: "default",
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "85935fdc-d4ae-4648-aa53-eac776e462f2",
    type: "floatingLabelInput",
    label: "strings:alternate_contact_number",
    data: "AlternateNumber",
    properties: {
      staticLabel: true,
      maxLength: 10,
      keyboardType: "number-pad",
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
    id: "0ac5e100-97a8-4890-9afd-b27151ba30fa",
    label: "strings:lbl_current_address_line_1",
    type: "floatingLabelInput",
    data: "AddressDetail.currentAddressLine1",
    properties: {
      keyboardType: "default",
      maxLength: 20,
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "102e7726-0ec0-42d6-b8b3-04244b0516fc",
    label: "strings:lbl_current_address_line_2",
    type: "floatingLabelInput",
    data: "AddressDetail.currentAddressLine2",
    properties: {
      keyboardType: "default",
      maxLength: 20,
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "158b7a97-8fd2-44b5-8c2c-5a38321f6dfc",
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
    id: "020f953a-39fb-4d54-96bc-f54975c3672f",
    label: "auth:newuser:Secondpagepincode",
    type: "dropDownPicker",
    data: "AddressDetail.currentPincode",
    properties: {
      loading: true,
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
    id: "71e4532e-bb97-4894-bbc4-fcee343a5963",
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
    id: "9a5af1b0-428c-4709-9e57-4d14eafd18c0",
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
    id: "b7ac4223-344b-4a90-a801-1d496aeccc7c",
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
];
