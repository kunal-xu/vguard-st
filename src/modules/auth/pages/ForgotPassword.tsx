import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';
import Buttons from '../../../components/Buttons';
import arrowIcon from '../../../assets/images/arrow.png';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Popup from '../../../components/Popup';
import { forgotPassword } from '../../../utils/apiservice';
import { NavigationProps } from '../../../utils/interfaces';

const ForgotPassword = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation();
  const placeholderColor = colors.grey;
  const [number, setNumber] = useState('');

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState('');

  const handleSubmit = async () => {
    let pattern = /^[3-9][0-9]{9}$/;
    if (pattern.test(number)) {
      setPopupVisible(true);
      forgotPassword(number)
        .then((response) => response.data)
        .then((responsedata) => {
          const message = responsedata.message;
          setPopupContent(message);
          setNumber("");
          setTimeout(() => {
            setPopupVisible(false);
            navigation.navigate("login");
          }, 5000);
          // if (message == "SMS sent for new password") {
          //   setTimeout(() => {
          //     navigation.navigate("login");
          //   }, 1000);
          // } else {
          //   return;
          // }
        });
    } else {
      let msg =
        number.length != 10
          ? "Please enter 10 digit mobile number"
          : "Enter valid registered mobile no.";
      setPopupVisible(true);
      setPopupContent(msg);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.forgotPasswordScreen}>
        <View style={styles.mainWrapper}>
          <Image
            source={require("../../../assets/images/group_907.png")}
            style={styles.imageSaathi}
          />
          <Text style={styles.mainHeader}>
            {t("strings:lbl_forgot_password")}
          </Text>
          <Text style={styles.textHeader}>
            {t("strings:enter_registered_mobile_no_rishta_id")}
          </Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:lbl_registered_mobile_number_login")}
              placeholderTextColor={placeholderColor}
              value={number}
              onChangeText={(text) => setNumber(text)}
              keyboardType="numeric"
              maxLength={10}
            />
            <View style={styles.buttonContainer}>
              <Buttons
                label={t("strings:submit")}
                variant="filled"
                onPress={handleSubmit}
                width="100%"
                iconHeight={10}
                iconWidth={30}
                iconGap={30}
                icon={arrowIcon}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={styles.footerContainer}>
            <Text style={styles.footergreyText}>
              {t("strings:powered_by_v_guard")}
            </Text>
            <Image
              source={require("../../../assets/images/group_910.png")}
              style={styles.imageVguard}
            />
          </View>
        </View>
      </View>
      {isPopupVisible && (
        <Popup
          isVisible={isPopupVisible}
          onClose={() => {
            setPopupVisible(false);
            navigation.navigate("login");
          }}
        >
          {popupContent}
        </Popup>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  forgotPasswordScreen: {
    height: '100%',
    backgroundColor: colors.white,
    display: 'flex',
  },
  mainWrapper: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1
  },
  textHeader: {
    color: colors.grey,
    fontSize: 14,
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'center',
    marginTop: responsiveHeight(2)
  },
  mainHeader: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  imageSaathi: {
    width: 100,
    height: 98,
    marginBottom: 30
  },
  imageVguard: {
    width: 100,
    height: 36,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 16,
    flex: 2,
  },
  input: {
    height: 40,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: colors.black,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    elevation: 5,
  },

  footergreyText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.grey,
    paddingBottom: 5,
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    backgroundColor: colors.lightGrey,
    width: '100%',
    paddingVertical: 10
  },
  buttonContainer: {
    marginTop: responsiveHeight(10)
  }
})

export default ForgotPassword
