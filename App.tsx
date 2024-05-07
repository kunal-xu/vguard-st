import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Alert,
  PermissionsAndroid,
  View
} from 'react-native';
import AppNavigator from './src/components/AppNavigator';
import notificationListener from './src/modules/notifications/pages/push_notification';
import { AuthProvider } from './src/hooks/useAuth';
import { DataProvider } from './src/hooks/useData';



async function requestAllPermissions() {
  try {
    const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
    const contactPermission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
    const locationPermission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    const notificationPermission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS

    const granted = await PermissionsAndroid.requestMultiple([
      cameraPermission,
      contactPermission,
      locationPermission,
      notificationPermission
    ]);

    if (
      granted[cameraPermission] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[contactPermission] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[locationPermission] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[notificationPermission] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera, contact, and location permissions granted.');
    } else {
      Alert.alert(
        'Permission denied',
        'You must grant camera, contact, and location permissions to use this feature.',
      );
    }
  } catch (error) {
    console.error('Permission request error:', error);
  }
}

const App = () => {

  useEffect(() => {
    requestAllPermissions();
    notificationListener();
  }, []);

  return (
    <AuthProvider>
      <DataProvider>
        <AppNavigator />
      </DataProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
});

export default App;
