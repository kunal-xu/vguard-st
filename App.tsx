import React from "react";
import { View, ScrollView } from "react-native";
import GenerateOTP from "./src/pages/auth/GenerateOTP";
import ValidateOTP from "./src/pages/auth/ValidateOTP";
import LoginScreen from "./src/pages/auth/LoginScreen";
import RegisterUser from "./src/pages/auth/RegisterUser";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import InputField from "./src/components/InputField";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        mode="margin"
        style={{ flex: 1}}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}
        >
          <View>
            <StatusBar style="dark" hidden/>
            <GenerateOTP />
            {/* <ValidateOTP /> */}
            {/* <LoginScreen /> */}
            {/* <RegisterUser /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
