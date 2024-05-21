import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import Buttons from "../../../components/Buttons";
import { NavigationProps } from "../../../utils/interfaces";
import { registrationBankDetails } from "../fields/registrationBankDetailsFields";
import Field from "../../../components/Field";


const RegistrationBankDetails = ({ navigation }: NavigationProps) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              backgroundColor: "transparent",
              margin: 2,
              padding: 10,
              marginLeft: 1,
            }}
          ></View>
          <View
            style={{
              display: "flex",
              width: "95%",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <Buttons
              label="Skip"
              onPress={() => {
                navigation.navigate("Credentials");
              }}
              variant="outlined"
              width={88}
              icon={require("../../../assets/images/arrow.png")}
              iconWidth={24}
              iconHeight={8}
              iconGap={1}
            />
            </View>
          {registrationBankDetails.map((field) => (
            <Field
              id={field.id}
              key={field.id}
              type={field.type}
              data={field.data}
              label={field.label}
              items={field.items}
              properties={field.properties}
              source={field.source}
              verifyButtonProperties={field.verifyButtonProperties}
              resetButtonProperties={field.resetButtonProperties}
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
                navigation.navigate("Credentials");
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
    </SafeAreaView>
  );
};

export default RegistrationBankDetails;
