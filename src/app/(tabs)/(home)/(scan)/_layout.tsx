import colors from "@/src/utils/colors";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ScanLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.yellow,
        },
      }}
    >
      <Stack.Screen
        name="scan-code"
        options={{
          title: "Scan Code",
        }}
      />
      <Stack.Screen
        name="add-warranty"
        options={{
          title: "Register Warranty",
        }}
      />
      <Stack.Screen
        name="unique-code-history"
        options={{
          title: "Unique Code History",
        }}
      />
      <Stack.Screen
        name="success-page"
        options={{
          title: "Scan Result",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss(2)}>
              <Ionicons name="arrow-back" size={22} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
