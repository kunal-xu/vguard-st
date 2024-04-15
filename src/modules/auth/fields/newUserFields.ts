import { height, width } from "../../../utils/dimensions";
import { styles } from "./styles";

export const newUserFields = [
  {
    id: "6a615c7e-1c90-462f-a133-b6ca3200ab26",
    type: "floatingLabelInput",
    label: "strings:name",
    data: "name",
    properties: {
      staticLabel: true,
      maxLength: 30,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "black",
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
    },
  },
  {
    id: "ccdc3f5a-50a6-4ead-9164-8372b1dea148",
    type: "text",
    label: "strings:lbl_gender_mandatory",
    properties: {
      color: "black",
      marginLeft: 24,
      marginBottom: 2,
    },
  },
  {
    id: "89ae9dd3-9a36-41bb-87b7-6121a0975fa7",
    type: "picker",
    items: ["Select Gender*", "Male", "Female", "Other"],
    data: "genderPos",
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
    id: "eb764633-0acc-4458-92b2-66bc38a2ac88",
    type: "floatingLabelInput",
    label: "strings:lbl_date_of_birth",
    data: "dob",
    properties: {
      staticLabel: true,
      maxLength: 30,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "black",
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
    },
  },
  {
    id: "0098ec68-1e52-4c7b-a741-e303eea8e84c",
    label: "strings:contact_no",
    type: "floatingLabelInput",
    data: "mobileNo",
    properties: {
      keyboardType: "number-pad",
      staticLabel: true,
      maxLength: 10,
      editable: false,
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "black",
        paddingHorizontal: 10,
      },
    },
  },
  // {
  //   id: "1b4a9653-afde-4c60-825c-75186a3fabcf",
  //   label: "strings:_is_what_s_app_contact_same_as_above",
  //   type: "text",
  //   properties: {
  //     color: "black",
  //     marginLeft: 20,
  //     bottom: 5,
  //   },
  // },
  // {
  //   id: "367da2c5-03a8-43f5-8775-dc96d8c56427",
  //   type: "picker",
  //   items: ["Select WhatsApp contact same as above?", "Yes", "No"],
  //   data: "isWhatsAppSame",
  //   properties: {
  //     mode: "dropdown",
  //     style: {
  //       color: "black",
  //       borderWidth: 1.5,
  //       borderColor: "#D3D3D3",
  //     },
  //   },
  //   rules: {
  //     0: [
  //       {
  //         id: 0,
  //         hasLink: false,
  //       }
  //     ],
  //     1: [
  //       {
  //         id: 0,
  //         hasLink: true,
  //         editable: false,
  //       }
  //     ],
  //     2: [
  //       {
  //         id: 0,
  //         hasLink: true,
  //         editable: true,
  //       }
  //     ]
  //   },
  //   links: [
  //     {
  //       id: 0,
  //       label: "strings:lbl_whats_app_number",
  //       type: "floatingLabelInput",
  //       data: "whatsappNo",
  //       properties: {
  //         keyboardType: "number-pad",
  //         staticLabel: true,
  //         maxLength: 10,
  //         containerStyles: styles.input,
  //         labelStyles: styles.labelStyles,
  //         inputStyles: {
  //           color: "black",
  //           paddingHorizontal: 10,
  //         },
  //       },
  //     },
  //   ]
  // },
  {
    id: "284a95c8-84e1-418c-8d38-f8a6ebb72423",
    type: "floatingLabelInput",
    label: "strings:update_aadhar_voter_id_dl_manually",
    data: "",
    properties: {
      staticLabel: true,
      maxLength: 30,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "black",
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
    },
  },

  {
    id: "faf8b98e-a52f-4697-8f74-924e75343ee7",
    type: "floatingLabelInput",
    label: "strings:pan_card",
    data: "",
    properties: {
      staticLabel: true,
      maxLength: 30,
      editable: false,
      keyboardType: "default",
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "black",
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
    },
  },
  {
    id: "080be0ca-e6b6-4c2d-ba4b-96e328228f0f",
    label: "strings:email",
    type: "floatingLabelInput",
    data: "emailId",
    properties: {
      keyboardType: "email-address",
      staticLabel: true,
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "black",
        paddingHorizontal: 10,
      },
    },
  },
  {
    id: "32975062-9d16-46c6-b009-2e350f5e3146",
    label: "strings:lbl_permanent_address_mandatory",
    type: "floatingLabelInput",
    data: "currAddress",
    properties: {
      keyboardType: "default",
      maxLength: 128,
      staticLabel: true,
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "black",
        paddingHorizontal: 10,
      },
    },
  },
  {
    id: "96f46ac3-c2a6-4863-86b0-bb73c5ebb6b9",
    label: "strings:lbl_street_locality",
    type: "floatingLabelInput",
    data: "currStreetAndLocality",
    properties: {
      keyboardType: "default",
      maxLength: 128,
      staticLabel: true,
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "black",
        paddingHorizontal: 10,
      },
    },
  },
  {
    id: "f515df31-b3c7-4c22-be1b-955d86b0e474",
    label: "strings:lbl_landmark",
    type: "floatingLabelInput",
    data: "currLandmark",
    properties: {
      keyboardType: "default",
      maxLength: 60,
      staticLabel: true,
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "black",
        paddingHorizontal: 10,
      },
    },
  },
  {
    id: "97fbf4f6-65e2-4209-881e-664e7b64b391",
    label: "auth:newuser:Secondpagepincode",
    type: "dropDownPicker",
    data: "pinCode",
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
    data: "state",
    properties: {
      keyboardType: "default",
      staticLabel: true,
      editable: false,
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "grey",
        paddingHorizontal: 10,
      },
    },
  },
  {
    id: "e5f652db-1c60-42cf-a990-b9e15b3b2e34",
    label: "strings:select_district",
    type: "floatingLabelInput",
    data: "dist",
    properties: {
      keyboardType: "default",
      staticLabel: true,
      editable: false,
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "grey",
        paddingHorizontal: 10,
      },
    },
  },
  // {
  //   id: "8e135577-2ee3-40af-aeab-a423d24abee5",
  //   label: "strings:select_city",
  //   type: "text",
  //   properties: {
  //     color: "black",
  //     left: 20,
  //     marginBottom: 2,
  //   },
  // },
  // {
  //   id: "0d664fe1-f053-4848-ae5b-a9e86d74161f",
  //   type: "picker",
  //   items: [],
  //   data: "city",
  //   properties: {
  //     mode: "model",
  //     style: {
  //       color: "black",
  //       borderWidth: 1.5,
  //       borderColor: "#D3D3D3",
  //     },
  //   },
  //   links: [
  //     {
  //       id: "a1de071a-9874-4fc1-bfb9-22b81125567b",
  //       label: "strings:lbl_city_mandatory",
  //       type: "floatingLabelInput",
  //       data: "otherCity",
  //       properties: {
  //         keyboardType: "default",
  //         maxLength: 128,
  //         staticLabel: true,
  //         containerStyles: styles.input,
  //         labelStyles: styles.labelStyles,
  //         inputStyles: {
  //           color: "black",
  //           paddingHorizontal: 10,
  //         },
  //       },
  //     },
  //   ],
  // },
  {
    id: "645354b2-fc70-4b66-858c-3e852c5f9c9f ",
    label: "strings:select_city",
    type: "floatingLabelInput",
    data: "dist",
    properties: {
      keyboardType: "default",
      staticLabel: true,
      editable: false,
      containerStyles: styles.input,
      labelStyles: styles.labelStyles,
      inputStyles: {
        color: "grey",
        paddingHorizontal: 10,
      },
    },
  },
];
