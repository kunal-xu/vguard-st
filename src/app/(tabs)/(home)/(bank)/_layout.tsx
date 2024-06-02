import { Stack } from 'expo-router'
import React from 'react'

export default function BankLayout() {
  return (
    <Stack>
      <Stack.Screen name="update-bank-details" options={{
        title: "Update Bank and UPI details"
      }}/>
    </Stack>
  )
}
