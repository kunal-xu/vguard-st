import { Stack } from 'expo-router'
import React from 'react'

export default function RedeemLayout() {
  return (
    <Stack>
      <Stack.Screen name="bank-transfer" />
      <Stack.Screen name="redemption-history" />
      <Stack.Screen name="upi-transfer" />
    </Stack>
  )
}
