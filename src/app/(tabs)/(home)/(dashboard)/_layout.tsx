import { Stack } from 'expo-router'
import React from 'react'

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="product-wise-earning" />
      <Stack.Screen name="rewards" />
      <Stack.Screen name="scheme-wise-earning" />
    </Stack>
  )
}
