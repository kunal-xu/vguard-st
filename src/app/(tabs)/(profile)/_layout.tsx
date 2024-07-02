import colors from "@/src/utils/colors";
import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.yellow,
        },
      }}
    >
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
          headerTitleAlign: "left",
        }}
      />
    </Stack>
  );
}
