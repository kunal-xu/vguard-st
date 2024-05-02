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
import DatePicker from "./DatePicker";
import { useTranslation } from "react-i18next";
import { ButtonsProps, DatePickerProps } from "../utils/interfaces";
import { height } from "../utils/dimensions";
import { useState } from "react";
import React from "react";
import {
  getDetailsByPinCode,
  getPincodeList,
  getBankDetail,
  getVPAData,
  getTDSPercentage,
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
import Popup from "./Popup";
import Loader from "./Loader";

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
  properties: FloatingLabelProps;
}

interface DropDownPickerField extends BaseFieldProps {
  properties: DropDownPickerProps<number>;
}

interface PickerField extends BaseFieldProps {
  properties: PickerProps;
}

interface DatePickerField extends BaseFieldProps {
  properties: DatePickerProps;
}

interface TextField extends BaseFieldProps {
  properties: StyleProp<TextStyle>;
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

  const handleFormInputChange = (
    field: keyof STUser,
    subfield:
      | keyof (AddressDetail | BankDetail | PaytmDetail | WelcomeBanner)
      | string
      | undefined,
    value: string | number
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
      const rules: Rules | undefined = props.rules;
      const items = props.items;
      const [selectedValue, setSelectedValue] = useState<undefined>();
      const [rule, setRule] = useState<number>(0);
      return (
        <>
          <View style={styles.viewNew}>
            <Picker
              {...properties}
              selectedValue={selectedValue}
              onValueChange={(value, index) => {
                setRule(index);
                setSelectedValue(value);
                handleFormInputChange(
                  props.data as keyof STUser,
                  undefined,
                  value
                );
              }}
            >
              {items?.map((item, index) => {
                return (
                  <Picker.Item
                    label={item}
                    value={index === 0 ? "undefined" : item}
                  />
                );
              })}
            </Picker>
          </View>
          {props.links?.map((linkItem) =>
            rules?.[rule]?.map((rule) => {
              if (rule.id === linkItem.id && rule.hasLink) {
                linkItem.properties = {
                  ...linkItem.properties,
                  editable: rule.editable,
                };
                return (
                  <Field
                    id={linkItem.id}
                    key={linkItem.id}
                    type={linkItem.type}
                    data={linkItem.data}
                    label={linkItem.label}
                    properties={linkItem.properties}
                  />
                );
              }
            })
          )}
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
            pincode === null ? "Search Pincode" : `Searched Pincode: ${pincode}`
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
    case "datePicker":
      properties = (props as DatePickerField).properties;
      return (
        <View style={styles.viewNew}>
          <DatePicker {...properties} />
        </View>
      );
    case "Button":
      properties = props.properties;
      const type = props.label;
      if (type === "bank") {
        async function getBankDetails() {
          try {
            const response = await getBankDetail({
              UniqueId: state.UniqueId,
              BankDetail: {
                bankAccNo: state.BankDetail.bankAccNo,
                bankIfsc: state.BankDetail.bankIfsc,
              },
            });
            const responseData: BankDetail = response.data;
            if (responseData.bankDataPresent === 1) {
              handleFormInputChange(
                "BankDetail",
                "bankAccHolderName",
                responseData.bankAccHolderName as string
              );
              handleFormInputChange(
                "BankDetail",
                "bankNameAndBranch",
                responseData.bankNameAndBranch as string
              );
              handleFormInputChange(
                "BankDetail",
                "branchAddress",
                responseData.branchAddress as string
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
        return (
          <View
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Buttons {...properties} onPress={getBankDetails} />
          </View>
        );
      }
      if (type === "upi") {
        async function getVPA() {
          try {
            const response = await getVPAData({
              UniqueId: state.UniqueId,
            });

            const responseData: PaytmDetail = response.data;
            handleFormInputChange(
              "PaytmDetail",
              "upiId",
              responseData.upiId as string
            );
          } catch (error) {
            console.log(error);
          }
        }
        return (
          <View
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Buttons {...properties} onPress={getVPA} />
          </View>
        );
      }
    case "floatingLabelInputWithButton":
      const [isPopupVisible, setIsPopupVisible] = useState(false);
      const [loader, showLoader] = useState(false);
      const [popupContent, setPopupContent] = useState("");
      const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
      };
    
      async function tds() {
        showLoader(true);
        try {
          const response = await getTDSPercentage({
            UniqueId: state.UniqueId
          });
          showLoader(false);
          const responseData = response.data;
          setIsPopupVisible(true);
          setPopupContent(responseData.message);
          dispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "TDSSlab",
              subfield: undefined,
              value: responseData.code === 1 ? 10 : 20
            }
          })
        } catch (error: any) {
          showLoader(false);
          setIsPopupVisible(true);
          setPopupContent(error.response.data.message)
        }
      }

      async function vpa() {
        showLoader(true);
        try {
          const response = await getVPAData({
            UniqueId: state.UniqueId
          });
          showLoader(false);
          const responseData = response.data;
          setIsPopupVisible(true);
          setPopupContent(responseData.message);
          dispatch({
            type: "UPDATE_SUB_FIELD",
            payload: {
              field: "PaytmDetail",
              subfield: "upiId",
              value: responseData.entity
            }
          })
        } catch (error: any) {
          showLoader(false);
          setIsPopupVisible(true);
          setPopupContent(error.response.data.message)
        }
      }

      return (
        <View style={styles.container}>
          {loader && <Loader isLoading={loader} />}
          {isPopupVisible && (
          <Popup isVisible={isPopupVisible} onClose={togglePopup}>
            <Text style={{ fontWeight: "bold" }}>
              {popupContent || "Incorrect Username or Password"}
            </Text>
          </Popup>
        )}
          <Text style={styles.label}>{t(props.label || "")}</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={source === "tds" ? (state.TDSSlab as string) : (state.PaytmDetail.upiId as string)} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                source === "tds" ? tds() : vpa();
              }}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    default:
      return null;
  }
};

export default Field;

const styles = StyleSheet.create({
  viewNew: {
    backgroundColor: "#fff",
    height: height / 17,
    margin: 20,
    borderRadius: 5,
    flexDirection: "column",
    marginTop: 0,
    borderWidth: 1.5,
    borderColor: "#D3D3D3",
  },
  container: {
    padding: 5,
    margin: 20,
    marginTop: 5,
    color: "#D3D3D3",
    borderRadius: 5,
    borderColor: "#D3D3D3",
    borderWidth: 1.5,
    bottom: -5,
  },
  label: {
    backgroundColor: "transparent",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    // backgroundColor: "yellow"
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: "black",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
