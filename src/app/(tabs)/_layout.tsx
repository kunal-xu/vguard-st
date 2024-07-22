import { TabBarIcon } from "@/src/components/TabBarIcon";
import { useAuth } from "@/src/hooks/useAuth";
import { getNotificationCount } from "@/src/utils/apiservice";
import colors from "@/src/utils/colors";
import { Notifications } from "@/src/utils/types";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export default function TabLayout() {
  const [count, setCount] = useState<string>("0");
  const { isUserAuthenticated } = useAuth();
  useEffect(() => {
    (async () => {
      if (isUserAuthenticated) {
        try {
          const response = await getNotificationCount();
          const responseData: Notifications = response.data;
          if (responseData && (responseData.count as number) < 999) {
            setCount((responseData.count as number).toString());
          } else {
            setCount("999+");
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.yellow,
          },
          tabBarShowLabel: false,
          lazy: true,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name={focused ? "home" : "home-outline"} />
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "Notifications",
            tabBarIcon: ({ focused }) => (
              <View style={{ position: "relative" }}>
                <TabBarIcon
                  name={focused ? "notifications" : "notifications-outline"}
                />

                {count > "0" && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{count}</Text>
                  </View>
                )}
              </View>
            ),
            headerTitleAlign: "center",
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name={focused ? "person" : "person-outline"} />
            ),
          }}
        />
        <Tabs.Screen
          name="support"
          options={{
            title: "Support",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name={focused ? "call" : "call-outline"} />
            ),
            headerTitleAlign: "center",
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: colors.yellow,
    borderRadius: 50,
    width: 20,
    height: 20,
    padding: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: colors.black,
    fontSize: responsiveFontSize(1),
    fontWeight: "bold",
    textAlign: "center",
  },
});
