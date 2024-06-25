import NewPopUp from "@/src/components/NewPopup";
import { TabBarIcon } from "@/src/components/TabBarIcon";
import { useAuth } from "@/src/hooks/useAuth";
import colors from "@/src/utils/colors";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";

export default function TabLayout() {
  const { logout } = useAuth();
  const [logoutPopup, setLogoutPopup] = useState(false);
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.yellow,
          },
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
              <TabBarIcon
                name={focused ? "notifications" : "notifications-outline"}
              />
            ),
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
          }}
        />
        <Tabs.Screen
          name="logout"
          options={{
            title: "Logout",
            tabBarButton: (props) => (
              <Pressable
                onPress={() => setLogoutPopup(true)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <TabBarIcon name={"log-out-outline"} focused={props.focused} />
                <Text style={{ color: props.focused ? "blue" : "gray" }}>
                  Logout
                </Text>
              </Pressable>
            ),
          }}
        />
      </Tabs>
      <NewPopUp
        visible={logoutPopup}
        numberOfButtons={2}
        button1Action={() => setLogoutPopup(false)}
        button2Action={() => logout()}
        button1Text={"Dismiss"}
        button2Text={"Yes"}
        text={"Are you sure you want to Log out?"}
        iconType={"Alert"}
        title={"Logout"}
      />
    </>
  );
}
