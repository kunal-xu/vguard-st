import { SplashScreen, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { View, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { AuthProvider } from "../hooks/useAuth";
import Registration from "./(auth)/(register)/registration";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useReactQueryDevTools(queryClient);

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootSiblingParent>
          <View style={styles.container}>
            {/* <Slot /> */}
            <Registration />
          </View>
        </RootSiblingParent>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
