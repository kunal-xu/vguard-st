import { Stack } from 'expo-router'
import React from 'react'

export default function TicketLayout() {
  return (
    <Stack>
      <Stack.Screen name="ticket" />
      <Stack.Screen name="ticket-history" />
    </Stack>
  )
}
