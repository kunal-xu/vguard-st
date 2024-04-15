import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductRegistration from '../ProductRegistration';
import ScanScreen from '../ScanScreen';

const ProductRegistrationStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="retailerCategory" component={ProductRegistration} />                                                                                         
      <Stack.Screen name="scanScreen" component={ScanScreen} />                                                                                         
    </Stack.Navigator>
  );
};

export default ProductRegistrationStack;
