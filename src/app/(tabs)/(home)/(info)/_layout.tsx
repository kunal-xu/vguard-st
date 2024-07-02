import colors from "@/src/utils/colors";
import { Stack } from "expo-router";
import React from "react";

export default function InfoLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.yellow,
        },
      }}
    >
      <Stack.Screen
        name="info"
        options={{
          title: "Info Desk",
        }}
      />
      <Stack.Screen
        name="downloads"
        options={{
          title: "Downloads",
        }}
      />
      <Stack.Screen
        name="product-catalouge"
        options={{
          title: "Product Catalouge",
        }}
      />
      <Stack.Screen
        name="vguard-info"
        options={{
          title: "Vguard Info",
        }}
      />
    </Stack>
  );
}
