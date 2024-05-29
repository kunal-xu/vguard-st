import { Picker, PickerProps } from "@react-native-picker/picker";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  ToastAndroid,
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
import { height, width } from "../utils/dimensions";
import { useState } from "react";
import React from "react";
import {
  getDetailsByPinCode,
  getPincodeList,
  getBankDetail,
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
import Popup from "./Popup";
import Loader from "./Loader";
import { BankDetailsSchema } from "../utils/schemas/BankDetails";
import { z } from "zod";
import TDSPopup from "./TDSPopup";
import { TDS_CONSENT_MESSAGE } from "../utils/constants";
import ImagePickerField from "./ImagePickerField";
import Icon from "react-native-vector-icons/FontAwesome";
import { ButtonProps } from "react-native-paper";

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

interface SimulButton extends BaseFieldProps {
  verifyButtonProperties: ButtonProps;
  resetButtonProperties: ButtonProps;
}

type FieldProps =
  | FloatingLabelInputField
  | DropDownPickerField
  | PickerField
  | DatePickerField
  | TextField
  | BaseFieldProps
  | ButtonsProps
  | SimulButton;

const Field = (props: FieldProps) => {
  const { type, source } = props;
  const { t } = useTranslation();
  const { state, dispatch, customerState, customerDispatch } = useData();
  const [loader, showLoader] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

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
    case "datePicker":
      properties = (props as DatePickerField).properties;
      return (
        <View style={styles.viewNew}>
          <DatePicker {...properties} />
        </View>
      );

    case "floatingLabelInputWithButton":
      const [tdsConsent, setTdsConsent] = useState(false);

      async function tds() {
        setTdsConsent(false);
        showLoader(true);
        try {
          const response = await getTDSPercentage({
            UniqueId: state.UniqueId,
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
              value: responseData.entity,
            },
          });
        } catch (error: any) {
          showLoader(false);
          setIsPopupVisible(true);
          setPopupContent(error.response.data.message);
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
          setIsPopupVisible(true);
          setPopupContent(responseData.message);
          if (responseData.code === 1) {
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
          }
        } catch (error: any) {
          showLoader(false);
          setIsPopupVisible(true);
          setPopupContent(error.response.data.message);
        }
      }
      return (
        <View style={styles.container}>
          {loader && <Loader isLoading={loader} />}
          {isPopupVisible && (
            <Popup isVisible={isPopupVisible} onClose={togglePopup}>
              {popupContent}
            </Popup>
          )}
          {tdsConsent && (
            <TDSPopup
              popupContent={TDS_CONSENT_MESSAGE.UPLOADED}
              onClose={() => setTdsConsent(false)}
              onSubmit={tds}
            />
          )}
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
                onPress={state.TDSSlab ? () => {} : () => setTdsConsent(true)}
                activeOpacity={state.TDSSlab ? 1 : 0.7}
                disabled={Boolean(state.TDSSlab)}
              >
                {state.TDSSlab ? (
                  <Icon name="check" size={24} color="green" />
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
                  <Icon name="check" size={24} color="green" />
                ) : (
                  <Text style={styles.buttonText}>Verify</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      );

    case "ImagePicker":
      properties = props.properties;
      const [fileData, setFileData] = useState({
        uri: "",
        name: "",
        type: "",
      });
      const handleImageChange = async (
        image: string,
        type: string,
        imageName: string,
        label: string
      ) => {
        try {
          setFileData({
            uri: image,
            name: imageName,
            type: type,
          });
        } catch (error) {
          console.error("Error handling image change in Raise Ticket:", error);
        }
      };
      return (
        <ImagePickerField
          label={props.label as string}
          onImageChange={handleImageChange}
          {...properties}
        />
      );

    case "CustomerButton":
      async function getCustomerData() {
        try {
          showLoader(true);
          const response = await getCustDetByMobile(
            customerState.contactNo as string
          );
          showLoader(false);
          const responseData = response.data;
          if (responseData.name !== null) {
            customerDispatch({
              type: "GET_ALL_FIELDS",
              payload: {
                value: responseData,
              },
            });
          } else {
            throw new Error("Details not found");
          }
        } catch (error: any) {
          showLoader(false);
          setIsPopupVisible(true);
          customerDispatch({
            type: "CLEAR_ALL_FIELDS",
            payload: {},
          });
          setPopupContent("Customer details not found");
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
          {isPopupVisible && (
            <Popup isVisible={isPopupVisible} onClose={togglePopup}>
              {popupContent}
            </Popup>
          )}
          <Buttons
            label={t("Get Customer Details")}
            variant="filled"
            onPress={() => getCustomerData()}
            width="100%"
            iconHeight={10}
            iconWidth={30}
            iconGap={30}
          />
        </View>
      );

    case "BankSimulButton":
      const verifyButtonproperties = (props as SimulButton)
        .verifyButtonProperties;
      const resetButtonProperties = (props as SimulButton)
        .resetButtonProperties;
      async function getBankDetails() {
        try {
          BankDetailsSchema.parse(state.BankDetail);
          showLoader(true);
          const response = await getBankDetail({
            UniqueId: state.UniqueId,
            BankDetail: {
              bankAccNo: state.BankDetail.bankAccNo,
              bankIfsc: state.BankDetail.bankIfsc,
            },
          });
          const responseData: BankDetail = response.data;
          showLoader(false);
          if (responseData.bankDataPresent === true) {
            //todo lock bankaccount number and ifsc
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
            handleFormInputChange("BankDetail", "bankDataPresent", true);
          } else {
            setIsPopupVisible(true);
            setPopupContent(
              response.data.errorMessage || "Bank details not found"
            );
          }
        } catch (error: any) {
          if (error instanceof z.ZodError) {
            ToastAndroid.show(`${error.errors[0].message}`, ToastAndroid.LONG);
          } else {
            console.log(error);
            showLoader(false);
            setIsPopupVisible(true);
            setPopupContent("Something went wrong");
          }
        }
      }
      function resetBankDetails() {
        handleFormInputChange("BankDetail", "bankAccNo", "");
        handleFormInputChange("BankDetail", "bankIfsc", "");
        handleFormInputChange("BankDetail", "bankAccHolderName", "");
        handleFormInputChange("BankDetail", "bankNameAndBranch", "");
        handleFormInputChange("BankDetail", "branchAddress", "");
        handleFormInputChange("BankDetail", "bankDataPresent", 0);
      }

      return (
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-evenly",
            marginBottom: 20,
          }}
        >
          {loader && <Loader isLoading={loader} />}
          {isPopupVisible && (
            <Popup isVisible={isPopupVisible} onClose={togglePopup}>
              {popupContent}
            </Popup>
          )}
          {state.BankDetail.bankDataPresent ? (
            <Buttons variant="disabled" label="Verified" width={width / 3} />
          ) : (
            <Buttons {...verifyButtonproperties} onPress={getBankDetails} />
          )}
          <Buttons
            {...resetButtonProperties}
            onPress={resetBankDetails}
            icon={require("../assets/images/update.png")}
            iconWidth={16}
            iconHeight={16}
            iconGap={8}
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
    borderRadius: 5,
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
