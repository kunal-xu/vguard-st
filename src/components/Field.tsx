import { Picker, PickerProps } from "@react-native-picker/picker";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";
import {
  FloatingLabelProps,
  FloatingLabelInput,
} from "react-native-floating-label-input";
import { useTranslation } from "react-i18next";
import { ButtonsProps } from "../utils/interfaces";
import { height, width } from "../utils/dimensions";
import { useState } from "react";
import React from "react";
import {
  getDetailsByPinCode,
  getPincodeList,
  getVPAData,
  getTDSPercentage,
  getCustDetByMobile,
} from "../utils/apiservice";
import Buttons from "./Buttons";
import { useData } from "../hooks/useData";
import {
  AddressDetail,
  BankDetail,
  CouponRedeemResponse,
  PaytmDetail,
  ProductDetail,
  RegisterCustomerDetails,
  STUser,
  WelcomeBanner,
} from "../utils/types";
import Loader from "./Loader";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewPopUp from "./NewPopup";
import usePopup from "../hooks/usePopup";
import { showToast } from "../utils/showToast";

interface RuleItem {
  id: number;
  hasLink: boolean;
  editable?: boolean;
}

interface Rules {
  [key: number]: RuleItem[];
}

interface BaseFieldProps {
  id: string | number;
  type?: string;
  label?: string;
  data?: string;
  items?: string[];
  hasLink?: boolean;
  links?: BaseFieldProps[];
  rules?: Rules;
  source?: string;
}

interface FloatingLabelInputField extends BaseFieldProps {
  properties?: FloatingLabelProps;
}

interface DropDownPickerField extends BaseFieldProps {
  properties?: DropDownPickerProps<number>;
}

interface PickerField extends BaseFieldProps {
  properties?: PickerProps;
}

interface DatePickerField extends BaseFieldProps {
  properties?: DatePickerProps;
}

interface TextField extends BaseFieldProps {
  properties?: StyleProp<TextStyle>;
}

type FieldProps =
  | FloatingLabelInputField
  | DropDownPickerField
  | PickerField
  | DatePickerField
  | TextField
  | BaseFieldProps
  | ButtonsProps;

const Field = (props: FieldProps) => {
  const { type, source } = props;
  const { t } = useTranslation();
  const { state, dispatch, customerState, customerDispatch } = useData();
  const [loader, showLoader] = useState(false);
  const {
    popUp,
    setPopUp,
    popUpButtonCount,
    setPopUpButtonCount,
    popUpTitle,
    setPopUpTitle,
    popupText,
    setPopupText,
    popUpIconType,
    setPopUpIconType,
    popUpButton2Text,
    setPopupButton2Text,
    cleanupPopUp,
  } = usePopup();

  const handleFormInputChange = (
    field: keyof STUser,
    subfield:
      | keyof (AddressDetail | BankDetail | PaytmDetail | WelcomeBanner)
      | string
      | undefined,
    value: string | number | boolean
  ) => {
    if (subfield) {
      dispatch({
        type: "UPDATE_SUB_FIELD",
        payload: { field, subfield, value },
      });
    } else {
      dispatch({
        type: "UPDATE_FIELD",
        payload: { field, value },
      });
    }
  };

  const handleCustomerInputChange = (
    field: keyof RegisterCustomerDetails,
    subfield: keyof (CouponRedeemResponse | ProductDetail) | string | undefined,
    value: string | number
  ) => {
    if (subfield) {
      customerDispatch({
        type: "UPDATE_SUB_FIELD",
        payload: { field, subfield, value },
      });
    } else {
      customerDispatch({
        type: "UPDATE_FIELD",
        payload: { field, value },
      });
    }
  };

  let properties;
  switch (type) {
    case "floatingLabelInput":
      properties = (props as FloatingLabelInputField).properties;
      const [field, subfield] = props.data?.split(".") as [
        keyof STUser,
        keyof (AddressDetail | BankDetail | PaytmDetail | WelcomeBanner)
      ];

      const [customerField, customerSubfield] = props.data?.split(".") as [
        keyof RegisterCustomerDetails,
        keyof (CouponRedeemResponse | ProductDetail)
      ];
      return (
        <FloatingLabelInput
          {...properties}
          value={
            source && source === "customer"
              ? customerState[customerField] && customerSubfield
                ? (customerState[customerField][customerSubfield] as string)
                : (customerState[customerField] as string)
              : state[field] && subfield
              ? (state[field][subfield] as string)
              : (state[field] as string)
          }
          onChangeText={
            source && source === "customer"
              ? (text) =>
                  handleCustomerInputChange(
                    customerField,
                    customerSubfield,
                    text
                  )
              : (text) => handleFormInputChange(field, subfield, text)
          }
          label={t(props.label || "")}
        />
      );
    case "text":
      properties = (props as TextField).properties;
      return <Text style={properties}>{t(props.label as string)}</Text>;
    case "picker":
      properties = (props as PickerField).properties;
      const items = props.items;
      const [selectedValue, setSelectedValue] = useState<undefined>();
      return (
        <>
          <View style={styles.viewNew}>
            <Picker
              {...properties}
              selectedValue={selectedValue}
              onValueChange={(value, index) => {
                setSelectedValue(value);
                handleFormInputChange(
                  props.data as keyof STUser,
                  undefined,
                  value as string
                );
              }}
            >
              {items?.map((item: string, index: number) => {
                return (
                  <Picker.Item
                    label={item}
                    value={index === 0 ? "undefined" : item}
                  />
                );
              })}
            </Picker>
          </View>
        </>
      );
    case "dropDownPicker":
      properties = (props as DropDownPickerField).properties;
      const [pincode, setPincode] = useState("");
      const [open, setOpen] = useState(false);
      const [suggestions, setSuggestions] = useState([]);
      async function pincodeOptions(text: string) {
        try {
          if (text.length > 2) {
            const response = await getPincodeList(text);
            const pinCodeRes = response.data;
            if (pinCodeRes.length > 0) setSuggestions(pinCodeRes);
          }
        } catch (error) {
          console.log(error);
        }
      }
      async function pinCodeDetails(
        text: string,
        pinCode: string,
        source?: string
      ) {
        setPincode(pinCode);
        try {
          if (text.length > 2) {
            const response = await getDetailsByPinCode(text);
            const pinCodeDetailsRes: any = response.data;
            const stateName: string = pinCodeDetailsRes["stateName"];
            const distName: string = pinCodeDetailsRes["distName"];
            const cityName: string = pinCodeDetailsRes["cityName"];
            if (source && source === "customer") {
              handleCustomerInputChange("state", undefined, stateName);
              handleCustomerInputChange("district", undefined, distName);
              handleCustomerInputChange("city", undefined, cityName);
            } else {
              handleFormInputChange("AddressDetail", "currentState", stateName);
              handleFormInputChange(
                "AddressDetail",
                "currentDistrict",
                distName
              );
              handleFormInputChange("AddressDetail", "currentCity", cityName);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      return (
        <DropDownPicker
          {...properties}
          placeholder={
            source && source === "customer"
              ? customerState.pinCode === null
                ? "Search Pincode"
                : `Pincode: ${customerState.pinCode}`
              : state.AddressDetail.currentPincode === null
              ? "Search Pincode"
              : `Pincode: ${state.AddressDetail.currentPincode}`
          }
          open={open}
          setOpen={setOpen}
          items={suggestions.map((item: any) => ({
            label: item.pinCode,
            value: item.pinCode,
            id: item.pinCodeId,
          }))}
          onChangeSearchText={(text) => {
            pincodeOptions(text);
          }}
          onSelectItem={(item: any) => {
            pinCodeDetails(
              item.id.toString() as string,
              item.value.toString(),
              source
            );
            if (source && source === "customer") {
              handleCustomerInputChange(
                "pinCode",
                undefined,
                item.value.toString()
              );
            } else {
              handleFormInputChange(
                "AddressDetail",
                "currentPincode",
                item.value.toString()
              );
            }
          }}
        />
      );

    case "floatingLabelInputWithButton":
      function tdsPopUp() {
        setPopUp(true);
        setPopUpTitle(t("TDS Consent"));
        setPopUpButtonCount(2);
        setPopupButton2Text(t("Proceed"));
        setPopUpIconType("Info");
        setPopupText(
          t(
            "Dear User, please review your PAN & Aadhar details and provide your consent and authorize V Guard Industries Ltd. to deduct TDS under section 194R which can be credited back at the FY end if the redemption amount is less than 20000.\n\nTDS percentages can be 10% or 20% depending on PAN information (Pan Status, Aadhar & PAN Link Status, ITR Status)."
          )
        );
      }

      async function tds() {
        showLoader(true);
        try {
          const response = await getTDSPercentage({
            UniqueId: state.UniqueId,
          });
          showLoader(false);
          const responseData = response.data;
          setPopUp(true);
          setPopUpIconType("Info");
          setPopUpTitle(t("TDS Percentage"));
          setPopupText(responseData.message);
          dispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "TDSSlab",
              subfield: undefined,
              value: responseData.entity,
            },
          });
        } catch (error: any) {
          showLoader(false);
          setPopUp(true);
          setPopUpIconType("Info");
          setPopUpTitle(t("TDS Percentage"));
          setPopupText(error.response.data.message || "Something went wrong. Please try again");
        }
      }

      async function vpa() {
        showLoader(true);
        try {
          const response = await getVPAData({
            UniqueId: state.UniqueId,
          });
          showLoader(false);
          const responseData = response.data;
          setPopUp(true);
          if (responseData.code === 1) {
            setPopUpIconType("Check");
            setPopUpButtonCount(1);
            setPopUpTitle(t("Verification Successful"));
            setPopupText(response.data.message);
            dispatch({
              type: "UPDATE_SUB_FIELD",
              payload: {
                field: "PaytmDetail",
                subfield: "upiId",
                value: responseData.entity,
              },
            });
            dispatch({
              type: "UPDATE_SUB_FIELD",
              payload: {
                field: "PaytmDetail",
                subfield: "upiVerified",
                value: "true",
              },
            });
          } else {
            setPopUpIconType("Alert");
            setPopUpButtonCount(2);
            setPopUpTitle(t("Verification Failed"));
            setPopupText(response.data.message);
            setPopupButton2Text(t("Verify Again"));
          }
        } catch (error: any) {
          showLoader(false);
          showToast("Something went wrong. Please try again");
          console.log(error);
        }
      }
      return (
        <View style={styles.container}>
          {loader && <Loader isLoading={loader} />}
          <NewPopUp
            visible={popUp}
            numberOfButtons={popUpButtonCount}
            button1Action={() => cleanupPopUp()}
            button2Action={() => {
              cleanupPopUp();
              source && source === "upi" ? vpa() : tds();
            }}
            button1Text={"Dismiss"}
            button2Text={popUpButton2Text}
            text={popupText}
            iconType={popUpIconType}
            title={popUpTitle}
          />
          <Text style={styles.label}>{t(props.label || "")}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              editable={false}
              value={
                source === "tds"
                  ? (state.TDSSlab as string)
                  : (state.PaytmDetail.upiId as string)
              }
            />
            {source === "tds" ? (
              <TouchableOpacity
                style={state.TDSSlab ? styles.greenButton : styles.button}
                onPress={state.TDSSlab ? () => {} : () => tdsPopUp()}
                activeOpacity={state.TDSSlab ? 1 : 0.7}
                disabled={Boolean(state.TDSSlab)}
              >
                {state.TDSSlab ? (
                  <MaterialCommunityIcons
                    name="check"
                    size={24}
                    color="green"
                  />
                ) : (
                  <Text style={styles.buttonText}>Verify</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={
                  state.PaytmDetail.upiVerified
                    ? styles.greenButton
                    : styles.button
                }
                onPress={state.PaytmDetail.upiVerified ? () => {} : () => vpa()}
                activeOpacity={state.PaytmDetail.upiVerified ? 1 : 0.7}
                disabled={Boolean(state.PaytmDetail.upiVerified)}
              >
                {state.PaytmDetail.upiVerified ? (
                  <MaterialCommunityIcons
                    name="check"
                    size={24}
                    color="green"
                  />
                ) : (
                  <Text style={styles.buttonText}>Verify</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    case "CustomerButton":
      async function getCustomerData() {
        try {
          showLoader(true);
          const payload = {
            mobileNo: customerState.contactNo,
          };
          const response = await getCustDetByMobile(payload);
          showLoader(false);
          const responseData = response.data;
          if (responseData.name !== null) {
            customerDispatch({
              type: "UPDATE_FIELD",
              payload: {
                field: "name",
                value: responseData.name,
              },
            });
            customerDispatch({
              type: "UPDATE_FIELD",
              payload: {
                field: "pinCode",
                value: responseData.pinCode,
              },
            });
            customerDispatch({
              type: "UPDATE_FIELD",
              payload: {
                field: "state",
                value: responseData.state,
              },
            });
            customerDispatch({
              type: "UPDATE_FIELD",
              payload: {
                field: "district",
                value: responseData.district,
              },
            });
            customerDispatch({
              type: "UPDATE_FIELD",
              payload: {
                field: "city",
                value: responseData.city,
              },
            });
          } else {
            throw new Error("Details not found");
          }
        } catch (error: any) {
          showLoader(false);
          setPopUp(true);
          setPopUpIconType("Alert");
          setPopUpTitle(t("Not Found"));
          setPopupText("Customer details not found");
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "name",
              value: "",
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "pinCode",
              value: "",
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "state",
              value: "",
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "district",
              value: "",
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "city",
              value: "",
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "alternateNo",
              value: "",
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "email",
              value: "",
            },
          });
          console.log(error.message);
        }
      }

      return (
        <View
          style={{
            width: "90%",
            margin: 20,
            marginTop: 4,
          }}
        >
          {loader && <Loader isLoading={loader} />}
          <NewPopUp
            visible={popUp}
            numberOfButtons={popUpButtonCount}
            button1Action={() => cleanupPopUp()}
            button2Action={() => {}}
            button1Text={"Dismiss"}
            button2Text={popUpButton2Text}
            text={popupText}
            iconType={popUpIconType}
            title={popUpTitle}
          />
          <Buttons
            label={t("Get Customer Details")}
            variant="filled"
            onPress={() => getCustomerData()}
            width="100%"
          />
        </View>
      );

    default:
      return null;
  }
};

export default Field;

const styles = StyleSheet.create({
  viewNew: {
    backgroundColor: "white",
    height: height / 17,
    margin: 20,
    borderRadius: 5,
    flexDirection: "column",
    marginTop: 0,
    borderWidth: 2,
    borderColor: "black",
  },
  container: {
    padding: 6,
    margin: 18,
    marginTop: 4,
    color: "black",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 2,
    // bottom: -5,
  },
  label: {
    backgroundColor: "white",
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: "black",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  greenButton: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: "green",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
