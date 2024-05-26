import { Stack } from 'expo-router'
import React from 'react'

export default function TrainingLayout() {
  return (
    <Stack>
      <Stack.Screen name="corporate-brochure" />
      <Stack.Screen name="self-help-videos" />
    </Stack>
  )
}
