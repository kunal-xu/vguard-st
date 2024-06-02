import { Stack } from 'expo-router'
import React from 'react'

export default function ScanLayout() {
  return (
    <Stack>
      <Stack.Screen name="scan-code" options={{
        title: "Scan Code"
      }}/>
      <Stack.Screen name="add-warranty" options={{
        title: "Register Warranty"
      }}/>
      <Stack.Screen name="unique-code-history" options={{
        title: "Unique Code History"
      }}/>
    </Stack>
  )
}
