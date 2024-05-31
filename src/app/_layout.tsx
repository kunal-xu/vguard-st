import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text } from "react-native";
import { Stack, SplashScreen } from "expo-router";
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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Check token and fetch account details
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

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
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(register)"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="lead-form" />
              <Stack.Screen
                name="login-with-otp"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="login-with-number"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="dark" />
          </View>
        </RootSiblingParent>
      </DataProvider>
    </AuthProvider>
  );
}
