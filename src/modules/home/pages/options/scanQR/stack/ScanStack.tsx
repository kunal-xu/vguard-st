import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../../../../../../../colors';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScanCode from '../ScanCode';
import UniqueCodeHistory from '../UniqueCodeHistory';
import AddWarranty from '../AddWarranty';


const ScanStack: React.FC = () => {
  type ScanStackParams = {
    'Scan Code': undefined;
    'Unique Code History': undefined;
    'Add Warranty': undefined;
  };

  const Stack = createNativeStackNavigator<ScanStackParams>();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.yellow,
          },
          headerShown: false,
        }}>
        <Stack.Screen
          name="Scan Code"
          component={ScanCode}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Unique Code History"
          component={UniqueCodeHistory}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Add Warranty"
          component={AddWarranty}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languagePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  closeText: {
    marginTop: 20,
    color: colors.black,
    backgroundColor: colors.yellow,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
});

export default ScanStack;
