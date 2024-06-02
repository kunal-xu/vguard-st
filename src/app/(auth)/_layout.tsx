import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(register)" />
      <Stack.Screen name="lead-form" />
      <Stack.Screen name="login-with-number" />
      <Stack.Screen name="login-with-otp" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
