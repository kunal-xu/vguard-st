import { Stack } from "expo-router";
import React from "react";

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
      <Stack.Screen
        name="product-wise-earning"
        options={{
          title: "Product Wise Earning",
        }}
      />
      <Stack.Screen name="rewards" options={{
        title: "Rewards"
      }}/>
      <Stack.Screen name="scheme-wise-earning" 
      options={{
        title: "Scheme Wise Earning"
      }}/>
    </Stack>
  );
}
