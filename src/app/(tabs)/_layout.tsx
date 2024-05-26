import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="notification" />
      <Tabs.Screen name="(profile)" />
      <Tabs.Screen name="support" />
      <Tabs.Screen name="logout" />
    </Tabs>
  )
}
