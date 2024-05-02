import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { height, width } from "../../../utils/dimensions";
import { Avatar } from "react-native-paper";
import Buttons from "../../../components/Buttons";
import Loader from "../../../components/Loader";
import Popup from "../../../components/Popup";
import { newUserFields } from "../fields/newUserFields";
import { NavigationProps } from "../../../utils/interfaces";
import React from "react";
import Field from "../../../components/Field";
import { ContextProps, useData } from "../../../hooks/useData";
import { RegistrationSchema } from "../../../utils/schemas/Registration";
const NewUser = ({ navigation }: NavigationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { state } = useData() as ContextProps;

  // function validateFields() {
  //   try {
  //     const validatedData = RegistrationSchema.parse(state);
  //     navigation.navigate("Bank Details");
  //     return validatedData;
  //   } catch (error: any) {
  //     const firstError = error.errors[0];
  //     if (firstError) {
  //       const firstError = error.errors[0];
  //       if (firstError) {
  //         const { path, message } = firstError;
  //         const field = path.join('.');
  //         ToastAndroid.show(`${field}: ${message}`, ToastAndroid.SHORT);
  //       }
  //     }
  //     return null;
  //   }
  // }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: "transparent",
            height: height / 8,
            margin: 20,
            flexDirection: "row",
            width: width / 2.1,
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: 20,
          }}
        >
          {isLoading == true ? (
            <View style={{ flex: 1 }}>
              <Loader isLoading={isLoading} />
            </View>
          ) : null}
          {isPopupVisible && (
            <Popup
              isVisible={isPopupVisible}
              onClose={() => setIsPopupVisible(false)}
            >
              <Text>{popupMessage}</Text>
            </Popup>
          )}
          <Avatar.Image
            size={84}
            source={require("../../../assets/images/ac_icon.png")}
          />
          <View
            style={{
              margin: 20,
              flexDirection: "column",
              padding: 10,
              height: height / 10,
            }}
          >
            <Text style={{ color: "grey" }}>Contact: {state.Contact}</Text>
            <Text style={{ color: "grey" }}>Unique ID: {state.UniqueId}</Text>
          </View>
        </View>
        {newUserFields.map((field) => (
          <Field
            id={field.id}
            key={field.id}
            type={field.type}
            data={field.data}
            label={field.label}
            items={field.items}
            properties={field.properties}
            rules={field.rules}
            links={field.links}
            source={field.source}
          />
        ))}
        <View
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Buttons
            label="Next"
            onPress={() => {
              // validateFields();
              navigation.navigate("Bank Details");
            }}
            variant="filled"
            width={350}
            icon={require("../../../assets/images/arrow.png")}
            iconWidth={50}
            iconHeight={20}
            iconGap={10}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewUser;
