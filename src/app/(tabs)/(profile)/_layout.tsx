import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="profile" options={{headerShown: false}}/>
      <Stack.Screen name="edit-profile" />
    </Stack>
  );
}
