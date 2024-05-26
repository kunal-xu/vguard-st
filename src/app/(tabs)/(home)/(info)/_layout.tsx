import { Stack } from 'expo-router'
import React from 'react'

export default function InfoLayout() {
  return (
    <Stack>
      <Stack.Screen name="downloads" />
      <Stack.Screen name="info" />
      <Stack.Screen name="product-catalouge" />
      <Stack.Screen name="vguard-info" />
    </Stack>
  )
}
