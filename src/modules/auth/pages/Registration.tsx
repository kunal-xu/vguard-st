import React from "react";
import { View, Text, ScrollView, ToastAndroid } from "react-native";
import { height, width } from "../../../utils/dimensions";
import { Avatar } from "react-native-paper";
import Buttons from "../../../components/Buttons";
import { registrationFields } from "../fields/registrationFields";
import { NavigationProps } from "../../../utils/interfaces";
import Field from "../../../components/Field";
import { useData } from "../../../hooks/useData";
import { RegistrationSchema } from "../../../utils/schemas/Registration";

const Registration = ({ navigation }: NavigationProps) => {
  const { state } = useData();

  function validateFields() {
    try {
      RegistrationSchema.parse(state);
      navigation.navigate("Bank Details");
    } catch (error: any) {
      ToastAndroid.show(`${error.errors[0].path[0]} : ${error.errors[0].message}`, ToastAndroid.LONG);
    }
  }
  

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: "white",
            height: height / 8,
            margin: 10,
            flexDirection: "row",
            width: width,
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Avatar.Image
            size={80}
            source={require("../../../assets/images/ac_icon.png")}
          />
          <View
            style={{
              backgroundColor: "white",
              margin: 10,
              justifyContent: "space-evenly",
              height: height / 10,
              width: width
            }}
          >
            <Text style={{ color: "black" }}>Contact: {state.Contact}</Text>
            <Text style={{ color: "black" }}>Unique ID: {state.UniqueId}</Text>
          </View>
        </View>
        {registrationFields.map((field) => (
          <Field
            id={field.id}
            key={field.id}
            type={field.type}
            data={field.data}
            label={field.label}
            items={field.items}
            properties={field.properties}
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
              validateFields();
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

export default Registration;
