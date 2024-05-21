import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import SplashScreen from '../pages/SplashScreen';
import LoginWithOtp from '../pages/LoginWithOtp';
import ForgotPassword from '../pages/ForgotPassword';
import LoginWithNumber from '../pages/LoginWithNumber';
import HomeStack from '../../home/stack/HomeStack';
import PreviewUserRegistration from '../pages/PreviewUserRegistration';
import LeadForm from '../pages/LeadForm';
import Registration from '../pages/Registration';
import RegistrationBankDetails from '../pages/RegistrationBankDetails';
import Credentials from '../pages/Credentials';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeStack} />
      <Stack.Screen name="loginwithotp" component={LoginWithOtp} />
      <Stack.Screen name="RegistrationPage" component={Kyc} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="loginWithNumber" component={LoginWithNumber} />
      <Stack.Screen name="leadform" component={LeadForm} />
      <Stack.Screen name='Credentials' component={Credentials} />
      {/* <Stack.Screen name='PreviewSummary' component={PreviewUserRegistration} /> */}
    </Stack.Navigator>
  );
};

const Kyc = () => {
  const kycStack = createNativeStackNavigator();
  return (
    <kycStack.Navigator screenOptions={{ headerShown: true }}>
      <kycStack.Screen name="Registration" component={Registration} />
      <kycStack.Screen name="Bank Details" component={RegistrationBankDetails} />
      <kycStack.Screen name='Credentials' component={Credentials} />
    </kycStack.Navigator>
  );
};

export default AuthNavigator;


