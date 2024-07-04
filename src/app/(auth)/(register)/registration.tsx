import React from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
import { RegistrationSchema } from "@/src/utils/schemas/Registration";
import { useData } from "@/src/hooks/useData";
import Field from "@/src/components/Field";
import { registrationFields } from "./fields/registrationFields";
import Buttons from "@/src/components/Buttons";
import { height, width } from "@/src/utils/dimensions";
import { Avatar } from "react-native-paper";
import { useRouter } from "expo-router";
import { showToast } from "@/src/utils/showToast";
import colors from "@/src/utils/colors";

const Registration = () => {
  const { state } = useData();
  const router = useRouter();
  function validateFields() {
    try {
      RegistrationSchema.parse(state);
      router.push("/(register)/registration-bank-details");
    } catch (error: any) {
      showToast(`${error.errors[0].message}`);
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <StatusBar backgroundColor={colors.yellow} barStyle="dark-content" />
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
              width: width,
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
            icon={require("@/src/assets/images/arrow.png")}
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
