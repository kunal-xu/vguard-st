import colors from "@/src/utils/colors";
import { Stack } from "expo-router";
import React from "react";

export default function SchemesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.yellow,
        },
      }}
    >
      <Stack.Screen
        name="schemes"
        options={{
          title: "Schemes",
        }}
      />
      <Stack.Screen name="product-based-scheme" />
      <Stack.Screen name="product-wise-direct-order-base-points" />
      <Stack.Screen
        name="product-wise-scan-base-points"
        options={{
          title: "Scan Base Points",
        }}
      />
      <Stack.Screen name="special-non-product-offers" />
    </Stack>
  );
}
