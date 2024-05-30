import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text } from "react-native";
import { Stack } from "expo-router";
// import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Redirect } from "expo-router";
import { AuthProvider } from "../hooks/useAuth";
import { DataProvider } from "../hooks/useData";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Schemes from "./(tabs)/(home)/(schemes)/schemes";



export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const handleButton1Action = () => {
    console.log("Dismiss pressed");
    setModalVisible(false);
  };

  const handleButton2Action = () => {
    console.log("Scan Out pressed");
    setModalVisible(false);
  };

  // const [location, setLocation] = useState<Location.LocationObject | null>(null);
  // const [errorMsg, setErrorMsg] = useState<string | null>(null);
  return (
    <AuthProvider>
      <DataProvider>
        <RootSiblingParent>
          <View
            style={{
              flex: 1,
              paddingTop: insets.top,
            }}
          >
            {/* <Stack> */}
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen
                name="(register)"
                options={{ headerShown: false }}
              /> */}
            {/* <Stack.Screen name="lead-form" /> */}
            {/* <Stack.Screen
                name="login-with-number"
                options={{ headerShown: false }}
              /> */}
            {/* <Stack.Screen
                name="login-with-otp"
                options={{ headerShown: false }}
              /> */}
            {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
            {/* </Stack> */}
            <Schemes />
            <StatusBar style="dark" />
          </View>
        </RootSiblingParent>
      </DataProvider>
    </AuthProvider>
  );
}
