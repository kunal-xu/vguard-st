import { Image } from "expo-image";
import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen />
      <View style={styles.container}>
        <Image
          source={require("@/assets/splash.png")}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
