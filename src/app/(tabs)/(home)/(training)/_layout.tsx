import colors from "@/src/utils/colors";
import { Stack } from "expo-router";
import React from "react";

export default function TrainingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="self-help-videos"
        options={{
          title: "Tutorials",
          headerStyle: {
            backgroundColor: colors.yellow
          }
        }}
      />
    </Stack>
  );
}
