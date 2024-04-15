import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RedeemPoints from '../RedeemPoints';
import InstantBankTransfer from '../InstantBankTransfer';
import PaytmTransfer from '../PaytmTransfer';
import RedeemProducts from '../RedeemProducts';
import ElectronicGiftVoucher from '../ElectronicGiftVoucher';
import TrackRedemption from '../TrackRedemption';
import RedemptionHistory from '../RedemptionHistory';
import ViewCart from '../ViewCart';
import AddAddress from '../AddAddress';
import UpiTransfer from '../UpiTransfer';
import colors from '../../../../../../../colors';

const RedeemStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: colors.yellow
          },
          headerShown: false
        }}>
      <Stack.Screen name="Redeem Points" component={RedeemPoints}
      options={{
          headerShown: true
        }} />                
      <Stack.Screen name="Bank Transfer" component={InstantBankTransfer}
      options={{
          headerShown: true
        }} />                
      <Stack.Screen name="Paytm Transfer" component={PaytmTransfer} 
        options={{
          headerShown: true
        }}
      />                
      <Stack.Screen name="redeemproducts" component={RedeemProducts} 
        options={{
          headerShown: true
        }}
      />                
      <Stack.Screen name="Gift Voucher" component={ElectronicGiftVoucher} 
        options={{
          headerShown: true
        }}
      />                
      <Stack.Screen name="Track Redemption" component={TrackRedemption} 
        options={{
          headerShown: true
        }}
      />                
      <Stack.Screen name="Redemption History" component={RedemptionHistory} 
        options={{
          headerShown: true
        }}
      />                
      <Stack.Screen name="View Cart" component={ViewCart} 
        options={{
          headerShown: true
        }}
      />                
      <Stack.Screen name="Add Address" component={AddAddress} 
        options={{
          headerShown: true
        }}
      />                
      <Stack.Screen name="UPI Transfer" component={UpiTransfer} 
        options={{
          headerShown: true
        }}
      />                
    </Stack.Navigator>
  );
};

export default RedeemStack;
