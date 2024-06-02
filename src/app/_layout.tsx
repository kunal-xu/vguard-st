import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text } from "react-native";
import { Stack, SplashScreen, Slot } from "expo-router";
// import * as Location from "expo-location";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
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

  return (
    <AuthProvider>
      <DataProvider>
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
          }}
        >
          <Slot />
        </View>
      </DataProvider>
    </AuthProvider>
  );
}
