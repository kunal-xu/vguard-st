import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text } from "react-native";
import { Stack } from "expo-router";
// import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Redirect } from "expo-router";
import { AuthProvider } from "../hooks/useAuth";
import { DataProvider } from "../hooks/useData";

export default function RootLayout() {
  // const [location, setLocation] = useState<Location.LocationObject | null>(null);
  // const [errorMsg, setErrorMsg] = useState<string | null>(null);
  return (
    <AuthProvider>
      <DataProvider>
        <RootSiblingParent>
          <View
            style={{
              flex: 1,
            }}
          >
            <Stack>
              {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
              <Stack.Screen
                name="(register)"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="lead-form" />
              <Stack.Screen
                name="login-with-number"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="login-with-otp"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </View>
        </RootSiblingParent>
      </DataProvider>
    </AuthProvider>
  );
}
