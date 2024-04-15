import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import colors from '../../../../colors';
import { Image } from 'react-native';
const ProfileStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.yellow,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerRight: () => (
            <Image
              style={{ width: 70, height: 50 }}
              resizeMode="contain"
              source={require("../../../assets/images/group_910.png")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          headerShown: true,
          headerRight: () => (
            <Image
              style={{ width: 70, height: 50 }} 
              resizeMode="contain"
              source={require("../../../assets/images/group_910.png")}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
