import React from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
import { RegistrationSchema } from "@/src/utils/schemas/Registration";
import Field from "@/src/components/Field";
import { registrationFields } from "./fields/registrationFields";
import Buttons from "@/src/components/Buttons";
import { height, width } from "@/src/utils/dimensions";
import { useRouter } from "expo-router";
import { showToast } from "@/src/utils/showToast";
import colors from "@/src/utils/colors";
import { Image } from "expo-image";
import { useRegUserData } from "@/src/hooks/useRegUserData";

const Registration = () => {
  const router = useRouter();
  const { data: regUserData } = useRegUserData();
  function validateFields() {
    try {
      RegistrationSchema.parse(regUserData);
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
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              overflow: "hidden",
              backgroundColor: colors.yellow,
            }}
          >
            <Image
              source={require("@/src/assets/images/ac_icon.png")}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              margin: 10,
              justifyContent: "space-evenly",
              height: height / 10,
              width: width,
            }}
          >
            <Text style={{ color: "black" }}>Contact: {regUserData?.Contact}</Text>
            <Text style={{ color: "black" }}>Unique ID: {regUserData?.UniqueId}</Text>
          </View>
        </View>
        {registrationFields.map((field) => (
          <Field
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
