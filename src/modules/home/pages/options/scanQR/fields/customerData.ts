import { height, width } from "../../../../../../utils/dimensions";
import { styles } from "./styles";

export const customerData = [
  {
    id: "8bd5aa6e-670f-445d-bd10-f0aeef6ee7fe",
    type: "floatingLabelInput",
    label: "strings:customer_name",
    data: "name",
    source: "customer",
    properties: {
      staticLabel: true,
      keyboardType: "default",
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "364e9b75-a5d8-4809-a73b-1a2dc30cc756",
    label: "strings:customer_contact",
    type: "floatingLabelInput",
    data: "contactNo",
    source: "customer",
    properties: {
      keyboardType: "number-pad",
      staticLabel: true,
      maxLength: 10,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "763bcd60-6c2c-4e7c-976f-453384d75c74",
    type: "floatingLabelInput",
    label: "strings:customer_alternate_number",
    data: "alternateNo",
    source: "customer",
    properties: {
      staticLabel: true,
      keyboardType: "number-pad",
      maxLength: 10,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "974550f2-0f24-4798-9297-f72460548fd2",
    label: "auth:newuser:Secondpagepincode",
    type: "dropDownPicker",
    data: "pinCode",
    source: "customer",
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
    id: "0a12d80f-6047-454b-b87e-e115ed29a103",
    label: "strings:select_state",
    type: "floatingLabelInput",
    data: "state",
    source: "customer",
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
    id: "9a9de3f8-2ab6-476c-9823-4355b84b0fc6",
    label: "strings:select_district",
    type: "floatingLabelInput",
    data: "district",
    source: "customer",
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
    id: "8c99389a-de1f-46d9-8af6-9ef81edf189a",
    label: "strings:select_city",
    type: "floatingLabelInput",
    data: "city",
    source: "customer",
    properties: {
      keyboardType: "default",
      editable: false,
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "31b3125d-7238-4678-af02-fd366915cdbd",
    label: "strings:email",
    type: "floatingLabelInput",
    data: "email",
    source: "customer",
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
    id: "dbbb85ab-e87e-4265-9673-eb04e78b39dd",
    label: "strings:qr_code",
    type: "floatingLabelInput",
    data: "cresp.couponCode",
    source: "customer",
    properties: {
      staticLabel: true,
      editable: false,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "7f0b8ff5-2eee-4446-9ac9-fb9426bf1123",
    label: "strings:sku_name",
    type: "floatingLabelInput",
    data: "cresp.skuDetail",
    source: "customer",
    properties: {
      editable: false,
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
  {
    id: "2f20e841-cdfd-43b2-b4ea-410043f3ce0a",
    label: "strings:scan_date",
    type: "floatingLabelInput",
    data: "cresp.scanDate",
    source: "customer",
    properties: {
      keyboardType: "email-address",
      editable: false,
      staticLabel: true,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles
    },
  },
];
