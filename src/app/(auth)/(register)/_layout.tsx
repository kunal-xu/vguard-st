import colors from "@/src/utils/colors";
import { Stack } from "expo-router";

export default function RegisterLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: colors.yellow,
      },
    }}>
      <Stack.Screen
        name="registration"
        options={{
          title: "Registration",
        }}
      />
      <Stack.Screen
        name="registration-bank-details"
        options={{
          title: "Bank Details",
        }}
      />
      <Stack.Screen
        name="credentials"
        options={{
          title: "Credentials",
        }}
      />
    </Stack>
  );
}
