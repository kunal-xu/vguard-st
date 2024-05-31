import { useAuth } from "@/src/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { isUserAuthenticated } = useAuth();
  if (!isUserAuthenticated) {
    return <Redirect href="/login-with-number" />;
  }
  return (
    <Tabs>
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="notification" />
      <Tabs.Screen name="(profile)" />
      <Tabs.Screen name="support" />
      <Tabs.Screen name="logout" />
    </Tabs>
  );
}
