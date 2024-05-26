import { Stack } from 'expo-router'
import React from 'react'

export default function SchemesLayout() {
  return (
    <Stack>
      <Stack.Screen name="product" />
      <Stack.Screen name="product-wise-earning" />
      <Stack.Screen name="rewards" />
      <Stack.Screen name="scheme-wise-earning" />
    </Stack>
  )
}
