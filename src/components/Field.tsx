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
import { height } from "../utils/dimensions";
import React, { useState } from "react";
import {
  getDetailsByPinCode,
  getPincodeList,
  getVPAData,
  getTDSPercentage,
  getCustDetByMobile,
  updateProfile,
} from "../utils/apiservice";
import Buttons from "./Buttons";
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
import { showToast } from "../utils/showToast";
import { usePopup } from "../hooks/usePopup";
import { useCustomerData } from "../hooks/useCustomerData";
import { useRegUserData } from "../hooks/useRegUserData";
import { Picker, PickerProps } from "@react-native-picker/picker";

interface BaseFieldProps {
  id: string;
  type?: string;
  label?: string;
  data?: string;
  items?: string[];
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

interface TextField extends BaseFieldProps {
  properties?: StyleProp<TextStyle>;
}

type FieldProps =
  | FloatingLabelInputField
  | DropDownPickerField
  | PickerField
  | TextField;

const Field = (props: FieldProps) => {
  const { type, source } = props;
  const { t } = useTranslation();
  const {
    data: state,
    resetData: resetState,
    setData: setState,
    setField: setStateField,
  } = useRegUserData();
  const {
    data: customerState,
    resetData: resetCustomerData,
    setData: setCustomerData,
    setField: setCustomerField,
  } = useCustomerData();
  const [loader, showLoader] = useState(false);
  const { data: popup, setData: setPopup } = usePopup();

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
                  setCustomerField(text, customerField, customerSubfield)
              : (text) => setStateField(text, field, subfield)
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
        setPopup({
          visible: true,
          numberOfButtons: 2,
          button2Text: t("Proceed"),
          button2Action: () => tds(),
          iconType: "Info",
          text: t(
            "Dear User, please review your PAN & Aadhar details and provide your consent and authorize V Guard Industries Ltd. to deduct TDS under section 194R which can be credited back at the FY end if the redemption amount is less than 20000.\n\nTDS percentages can be 10% or 20% depending on PAN information (Pan Status, Aadhar & PAN Link Status, ITR Status)."
          ),
          title: "TDS Consent",
        });
      }

      async function tds() {
        showLoader(true);
        try {
          const response = await getTDSPercentage({
            UniqueId: state.UniqueId,
          });
          showLoader(false);
          const responseData = response.data;
          setPopup({
            visible: true,
            numberOfButtons: 1,
            iconType: "Info",
            text: responseData.message,
            title: "TDS Percentage",
          });
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
          setPopup({
            visible: true,
            numberOfButtons: 1,
            iconType: "Info",
            text:
              error.response.data.message ||
              "Something went wrong. Please try again",
            title: "TDS Percentage",
          });
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
          if (responseData.code === 1) {
            setPopup({
              visible: true,
              numberOfButtons: 1,
              iconType: "Check",
              text: response.data.message,
              title: "Verification Successful",
            });
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
            const payload = { ...state, Selfie: null };
            await updateProfile(payload);
          } else {
            setPopup({
              visible: true,
              numberOfButtons: 2,
              iconType: "Alert",
              button2Text: t("Verify Again"),
              button2Action: () => vpa(),
              text: response.data.message,
              title: "Verification Failed",
            });
          }
        } catch (error: any) {
          showLoader(false);
          showToast("Something went wrong. Please try again");
        }
      }
      return (
        <View style={styles.container}>
          {loader && <Loader isLoading={loader} />}
          <NewPopUp {...popup} />
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
          setPopup({
            visible: true,
            numberOfButtons: 1,
            iconType: "Alert",
            title: t("Not Found"),
            text: "Customer details not found",
          });
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
          <NewPopUp {...popup} />
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
