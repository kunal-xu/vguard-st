import { Picker, PickerProps } from "@react-native-picker/picker";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
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
import { VguardRishtaUser } from "../utils/types/VguardRishtaUser";
import React from "react";
import {
  getDetailsByPinCode,
  getPincodeList,
  verifyBank,
  getVPAData
} from "../utils/apiservice";
import Buttons from "./Buttons";
import { useData } from "../hooks/useData";

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
  | BaseFieldProps;

const Field = (props: FieldProps) => {
  const { type } = props;
  const { t } = useTranslation();
  const { formState, formDispatch } = useData();
  const handleFormInputChange = (field: string, value: string | number) => {
    formDispatch({
      type: "UPDATE_FIELD",
      payload: { field, value },
    });
  };
  let properties;
  switch (type) {
    case "floatingLabelInput":
      properties = (props as FloatingLabelInputField).properties;
      return (
        <FloatingLabelInput
          {...properties}
          value={
            formState[props.data as keyof VguardRishtaUser] as string | undefined
          }
          onChangeText={(text) => handleFormInputChange(props.data as string, text)}
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
                (value: string) =>
                  handleFormInputChange(props.data as string, value);
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
      async function pinCodeDetails(text: string, pinCode: string) {
        setPincode(pinCode);
        try {
          if (text.length > 2) {
            const response = await getDetailsByPinCode(text);
            const pinCodeDetailsRes: any = response.data;
            formDispatch({
              type: "UPDATE_FIELD",
              payload: {
                field: "currentState",
                value: pinCodeDetailsRes["stateName"],
              },
            });
            formDispatch({
              type: "UPDATE_FIELD",
              payload: {
                field: "currentDistrict",
                value: pinCodeDetailsRes["distName"],
              },
            });
            formDispatch({
              type: "UPDATE_FIELD",
              payload: {
                field: "currentCity",
                value: pinCodeDetailsRes["cityName"],
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
      return (
        <DropDownPicker
          {...properties}
          loading={true}
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
            pinCodeDetails(item.id.toString() as string, item.value.toString());
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
            const response = await verifyBank({
              UniqueId: state.UniqueId,
              BankDetail: {
                bankAccNo: state.bankAccNo,
                bankIfsc: state.bankIfsc,
              },
            });
            const responseData = response.data;
            if (responseData.code === 200) {
              formDispatch({
                type: "UPDATE_FIELD",
                payload: {
                  field: "bankAccHolderName",
                  value: responseData.message,
                },
              });
              formDispatch({
                type: "UPDATE_FIELD",
                payload: {
                  field: "bankNameAndBranch",
                  value: responseData.entity,
                },
              });
              formDispatch({
                type: "UPDATE_FIELD",
                payload: {
                  field: "branchAddress",
                  value: responseData.status,
                },
              });
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
            })
            
            const responseData = response.data;
            formDispatch({
              type: "UPDATE_FIELD",
              payload: {
                field: "upiId",
                value: responseData.entity,
              },
            });
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
});
