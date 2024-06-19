import colors from '@/src/utils/colors'
import { Stack } from 'expo-router'
import React from 'react'

export default function RedeemLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: colors.yellow,
      }
    }}>
      <Stack.Screen name="redeem-points" options={{
        title: "Redeem Points"
      }}/>
      <Stack.Screen name="bank-transfer" options={{
        title: "Bank Transfer"
      }}/>
      <Stack.Screen name="redemption-history" options={{
        title: "Redemption History"
      }}/>
      <Stack.Screen name="upi-transfer" />
    </Stack>
  )
}
