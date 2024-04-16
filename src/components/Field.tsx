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
import { DatePickerProps } from "../utils/interfaces";
import { height } from "../utils/dimensions";
import { useState } from "react";
import { useForm } from "./FormContext";
import { VguardRishtaUser } from "../utils/types/VguardRishtaUser";
import React from "react";
import { getDetails, getDetailsByPinCode, getPincodeList } from "../utils/apiservice";

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
  const { state, dispatch } = useForm();
  const handleInputChange = (field: string, value: string | number) => {
    dispatch({
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
            state[props.data as keyof VguardRishtaUser] as string | undefined
          }
          onChangeText={(text) => handleInputChange(props.data as string, text)}
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
								(value: string) => handleInputChange(props.data as string, value)
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
                console.log(linkItem.properties);
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
			const [pincode, setPincode] = useState('');
			const [open, setOpen] = useState(false);
			const [suggestions, setSuggestions] = useState([]);
			async function pincodeOptions(text: string) {
				try {
					if(text.length > 2) {
						const response = await getPincodeList(text);
						const pinCodeRes = response.data;
						if(pinCodeRes.length > 0) setSuggestions(pinCodeRes);
					}
				} catch (error) {
					console.log(error)
				}
			}
			async function pinCodeDetails(text: string, pinCode: string) {
				setPincode(pinCode);
				try {
					if(text.length > 2) {
						const response = await getDetailsByPinCode(text);
						const pinCodeDetailsRes: any = response.data;
						dispatch({
							type: "UPDATE_FIELD",
							payload: {
								field: "currentState",
								value: pinCodeDetailsRes["stateName"]
							}
						})
						dispatch({
							type: "UPDATE_FIELD",
							payload: {
								field: "currentDistrict",
								value: pinCodeDetailsRes["distName"]
							}
						})
						dispatch({
							type: "UPDATE_FIELD",
							payload: {
								field: "currentCity",
								value: pinCodeDetailsRes["cityName"]
							}
						})
					}
				} catch (error) {
					console.log(error)
				}
			}
      return (
        <DropDownPicker
          {...properties}
          loading={true}
					placeholder={pincode === null ? 'Search Pincode' : `Searched Pincode: ${pincode}`}
          open={open}
					setOpen={setOpen}
          items={suggestions.map((item: any) => ({
            label: item.pinCode,
            value: item.pinCode,
						id: item.pinCodeId
          }))}
          onChangeSearchText={(text) => {
						pincodeOptions(text)
          }}
					onSelectItem={(item: any) => {
						pinCodeDetails(item.id.toString() as string, item.value.toString())
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
