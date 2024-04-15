import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Schemes from '../Schemes';
import ProductWise from '../ProductWise';
import ActiveScheme from '../ActiveScheme';
import SpecialCombo from '../SpecialCombo';
import ProductWiseOfferTable from '../ProductWiseOfferTable';
import colors from '../../../../../../../colors';
import Progress from '../progress';
const SchemesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: colors.yellow
          },
          headerShown: false
        }}>
      <Stack.Screen name="Schemes/Offers" component={Schemes} 
        options={{
          headerShown: true
        }}
      />                                             
      <Stack.Screen name="Product Wise Offers" component={ProductWise} 
        options={{
          headerShown: true
        }}
      />                                             
      <Stack.Screen name="Active Schemes/Offers" component={ActiveScheme} 
        options={{
          headerShown: true
        }}
      />                                             
      <Stack.Screen name="Special Combo Offers" component={SpecialCombo} 
        options={{
          headerShown: true
        }}
      />       
      <Stack.Screen name="Product Wise Offers Table" component={ProductWiseOfferTable}
        options={{
          headerShown: true
        }}
      />
      <Stack.Screen name="Progress" component={Progress}
        options={{
          headerShown: true
        }}
      />
                                      
    </Stack.Navigator>
  );
};

export default SchemesStack;
