import { SplashScreen, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { AuthProvider } from "../hooks/useAuth";
import { DataProvider } from "../hooks/useData";
import { RootSiblingParent } from "react-native-root-siblings";
import { View } from "react-native";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
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
        <RootSiblingParent>
          <View
            style={{
              flex: 1,
            }}
          >
            <Slot />
          </View>
        </RootSiblingParent>
      </DataProvider>
    </AuthProvider>
  );
}
