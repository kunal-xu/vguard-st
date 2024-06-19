import colors from '@/src/utils/colors'
import { Stack } from 'expo-router'
import React from 'react'

export default function BankLayout() {
  
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: colors.yellow,
      }
    }}>
      <Stack.Screen name="direct-order" options={{
        title: "Direct Order"
      }}/>
    </Stack>
  )
}
