import React, { useState, useEffect } from 'react';
import HomeScreen from '../pages/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateKYC from '../pages/options/updateKyc/UpdateKYC';
import Welfare from '../pages/options/welfare/Welfare';
import Bank from '../pages/options/bank/Bank';
import TDS from '../pages/options/TDS/TDS';
import Engagement from '../pages/options/engagement/Engagement';
import Manual from '../pages/options/manual/Manual';
import ScanStack from '../pages/options/scanQR/stack/ScanStack';
import RedeemStack from '../pages/options/redeemPoints/stack/RedeemStack';
import DashboardStack from '../pages/options/dashboard/stack/DashboardStack';
import TicketStack from '../pages/options/ticket/stack/TicketStack';
import SchemesStack from '../pages/options/schemes/stack/SchemesStack';
import InfoStack from '../pages/options/info/stack/InfoStack';
import NewStack from '../pages/options/new/stack/NewStack';
import ProfileStack from '../../profile/stack/ProfileStack';
import colors from '../../../../colors';
import { CustomTabHeader } from '../../common/services/BottomTab';
import RedemptionHistory from '../pages/options/redeemPoints/RedemptionHistory';
import UniqueCodeHistory from '../pages/options/scanQR/UniqueCodeHistory';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguagePicker from '../../../components/LanguagePicker';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchStoredLanguage = async () => {
      try {
        const storedLanguage = (await AsyncStorage.getItem('language')) || i18n.language;
        setSelectedLanguage(storedLanguage);
        i18n.changeLanguage(storedLanguage);
        console.log('Language changed:', storedLanguage);
      } catch (error) {
        console.error('Error fetching language from AsyncStorage:', error);
      }
    };

    fetchStoredLanguage();
  }, [i18n]);

  const handleLanguageButtonPress = () => {
    setShowLanguagePicker(true);
  };

  const handleCloseLanguagePicker = () => {
    setShowLanguagePicker(false);
  };
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.yellow
          },
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen}
          options={({ route }) => ({
            headerTitle: () => <CustomTabHeader handleLanguageButtonPress={handleLanguageButtonPress} route={route} />,
            headerShown: true
          })}
        />
        <Stack.Screen name="Redemption History" component={RedemptionHistory}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen name="Unique Code History" component={UniqueCodeHistory}
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen name="Scan QR" component={ScanStack} />
        {/* <Stack.Screen name="Dashboard" component={DashboardStack} /> */}
        <Stack.Screen name="Redeem Products" component={RedeemStack} />
        <Stack.Screen name="Update KYC" component={UpdateKYC}
          options={{
            headerShown: true
          }} />
        <Stack.Screen name="schemes" component={SchemesStack} />
        <Stack.Screen name="info" component={InfoStack} />
        <Stack.Screen name="Welfare" component={Welfare}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen name="new" component={NewStack} />
        <Stack.Screen name="ticket" component={TicketStack} />
        <Stack.Screen name="Update Bank" component={Bank}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen name="TDS Certificate" component={TDS}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen name="Engagement" component={Engagement}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen name="Manual" component={Manual}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen name="Profile" component={ProfileStack}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLanguagePicker}
        onRequestClose={handleCloseLanguagePicker}
        style={styles.modal}
      >
        <View style={styles.languagePickerContainer}>
          <LanguagePicker onCloseModal={handleCloseLanguagePicker} />
          <TouchableOpacity onPress={handleCloseLanguagePicker}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    alignItems: 'center'
  },
  languagePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  closeText: {
    marginTop: 20,
    color: colors.black,
    backgroundColor: colors.yellow,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: 'bold'
  },
})

export default HomeStack;
