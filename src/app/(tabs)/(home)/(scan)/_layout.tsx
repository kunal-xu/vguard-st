import { Stack } from 'expo-router'
import React from 'react'

export default function ScanLayout() {
  return (
    <Stack>
      <Stack.Screen name="add-warranty" />
      <Stack.Screen name="scan-code" />
      <Stack.Screen name="unique-code-history" />
    </Stack>
  )
}
