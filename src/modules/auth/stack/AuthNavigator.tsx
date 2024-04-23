import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import SplashScreen from '../pages/SplashScreen';
import RegisterUser from '../pages/RegisterUser';
import CategorySelection from '../pages/CategorySelection';
import LoginWithOtp from '../pages/LoginWithOtp';
import NewUser from '../pages/NewUser';
import NewUserKyc from '../pages/NewUserKyc';
import NomineePage from '../pages/NomineePage';
import ForgotPassword from '../pages/ForgotPassword';
import LoginWithNumber from '../pages/LoginWithNumber';
import HomeStack from '../../home/stack/HomeStack';
import PreviewUserRegistration from '../pages/PreviewUserRegistration';
import RegisterWithOtp from '../pages/RegisterWithOtp';
import ReUpdateKycOTP from '../pages/ReUpdateKycOTP';
import ReUpdateKyc from '../pages/ReUpdateKyc';
import PreviewReUpdateKyc from '../pages/PreviewReUpdateKyc';
import LeadForm from '../pages/LeadForm';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="category" component={CategorySelection} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeStack} />
      {/* <Stack.Screen name="register" component={RegisterUser} /> */}
      <Stack.Screen name="loginwithotp" component={LoginWithOtp} />
      {/* <Stack.Screen name="registerwithotp" component={RegisterWithOtp} /> */}
      <Stack.Screen name="Kyc" component={Kyc} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="loginWithNumber" component={LoginWithNumber} />
      <Stack.Screen name="leadform" component={LeadForm} />
      {/* <Stack.Screen name="newUser" component={NewUser} /> */}
      {/* <Stack.Screen name="NewUserKyc" component={NewUserKyc} /> */}
      {/* <Stack.Screen name='NomineePage' component={NomineePage} /> */}
      {/* <Stack.Screen name='PreviewSummary' component={PreviewUserRegistration} /> */}
      {/* <Stack.Screen name='ReUpdateKycOTP' component={ReUpdateKycOTP} /> */}
      {/* <Stack.Screen name='ReUpdateKyc' component={ReUpdateKyc} /> */}
      {/* <Stack.Screen name='PreviewReUpdateKyc' component={PreviewReUpdateKyc} /> */}
    </Stack.Navigator>
  );
};

const Kyc = () => {
  const kycStack = createNativeStackNavigator();
  return (
    <kycStack.Navigator screenOptions={{ headerShown: true }}>
      <kycStack.Screen name="Registration" component={NewUser} />
      <kycStack.Screen name="Bank Details" component={NewUserKyc} />
      <kycStack.Screen name='Credentials' component={NomineePage} />
    </kycStack.Navigator>
  );
};

export default AuthNavigator;
