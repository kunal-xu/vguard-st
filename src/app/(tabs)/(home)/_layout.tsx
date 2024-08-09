import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home-screen" />
      <Stack.Screen name="(bank)" />
      <Stack.Screen name="(dashboard)" />
      <Stack.Screen name="(directorder)" />
      <Stack.Screen name="(info)" />
      <Stack.Screen name="(new)" />
      <Stack.Screen name="(redeem)" />
      <Stack.Screen name="(scan)" />
      <Stack.Screen name="(schemes)" />
      <Stack.Screen name="(ticket)" />
      <Stack.Screen name="(training)" />
    </Stack>
  );
}
