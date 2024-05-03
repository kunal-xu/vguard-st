import React from "react";
import { View, Text, ScrollView, ToastAndroid } from "react-native";
import { height, width } from "../../../utils/dimensions";
import { Avatar } from "react-native-paper";
import Buttons from "../../../components/Buttons";
import { newUserFields } from "../fields/newUserFields";
import { NavigationProps } from "../../../utils/interfaces";
import Field from "../../../components/Field";
import { useData } from "../../../hooks/useData";
import { RegistrationSchema } from "../../../utils/schemas/Registration";

const NewUser = ({ navigation }: NavigationProps) => {
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

export default NewUser;
