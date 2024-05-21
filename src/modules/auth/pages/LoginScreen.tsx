import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import colors from "../../../../colors";
import arrowIcon from "../../../assets/images/arrow.png";
import Popup from "../../../components/Popup";
import { Linking } from "react-native";
import selectedTickImage from "../../../assets/images/tick_1.png";
import notSelectedTickImage from "../../../assets/images/tick_1_notSelected.png";
import language from "../../../assets/images/language.png";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { loginWithPassword } from "../../../utils/apiservice";
import { NavigationProps } from "../../../utils/interfaces";
import React from "react";
import Buttons from "../../../components/Buttons";
import { useAuth } from "../../../hooks/useAuth";
import Loader from "../../../components/Loader";
import LanguagePicker from "../../../components/LanguagePicker";
import { useData } from "../../../hooks/useData";

const LoginScreen = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [loader, showLoader] = useState(false);
  const placeholderColor = colors.grey;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState(true);
  const [popupContent, setPopupContent] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { login } = useAuth();
  const { dispatch } = useData();

  const pkg = require("../../../../package.json");
  const version = pkg.version;

  const handleLanguageButtonPress = () => {
    setShowLanguagePicker(true);
  };

  const handleCloseLanguagePicker = () => {
    setShowLanguagePicker(false);
  };

  const handleTermsPress = () => {
    setSelectedOption(!selectedOption);
  };

  const openTermsAndConditions = () => {
    const url = "https://vguardrishta.com/tnc_retailer.html";
    Linking.openURL(url).catch((error) =>
      console.error("Error opening URL:", error)
    );
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleLogin = async () => {
    if (!username.trim().length || !password.trim().length) {
      ToastAndroid.show(
        "Please enter a username and password.",
        ToastAndroid.SHORT
      );
      return;
    }

    if (selectedOption === false) {
      ToastAndroid.show(t("strings:please_accept_terms"), ToastAndroid.SHORT);
      return;
    }

    showLoader(true);

    try {
      const response = await loginWithPassword(username, password);
      showLoader(false);
      const responseData = response.data;
      dispatch({
        type: "GET_ALL_FIELDS",
        payload: {
          value: responseData.stUser,
        },
      });
      login(responseData);
    } catch (error: any) {
      showLoader(false);
      setIsPopupVisible(!isPopupVisible);
      setPopupContent(error.response.data.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.loginScreen}>
        <View style={styles.mainWrapper}>
          <View style={styles.buttonLanguageContainer}>
            <Buttons
              style={styles.button}
              label=""
              variant="outlined"
              onPress={handleLanguageButtonPress}
              iconHeight={30}
              iconWidth={30}
              iconGap={0}
              icon={language}
            />
          </View>
          {loader && <Loader isLoading={loader} />}
          <Image
            source={require("../../../assets/images/ic_rishta_logo.jpg")}
            style={styles.imageSaathi}
          />
          <Text style={styles.mainHeader}>{t("strings:lbl_welcome")}</Text>

          <Text style={styles.textHeader}>
            {t("strings:lbl_login_or_register")}
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                source={require("../../../assets/images/mobile_icon.png")}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder={t("strings:lbl_registered_mobile_number_login")}
                placeholderTextColor={placeholderColor}
                value={username}
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                source={require("../../../assets/images/lock_icon.png")}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder={t("strings:password")}
                placeholderTextColor={placeholderColor}
                maxLength={8}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View style={styles.updateAndForgot}>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("ReUpdateKycOTP")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {t("strings:update_kyc_capslock")}
                </Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("forgotPassword")}
                style={styles.forgotPasswordContainer}
              >
                <Text style={[styles.forgotPassword]}>
                  {t("strings:forgot_password_question")}
                </Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.buttonContainer}>
              <Buttons
                style={styles.button}
                label={t("strings:log_in")}
                variant="filled"
                onPress={handleLogin}
                width="100%"
                iconHeight={10}
                iconWidth={30}
                iconGap={30}
                icon={arrowIcon}
              />
              {/* <Buttons
                style={styles.button}
                label={t("strings:login_with_otp")}
                variant="filled"
                onPress={() => navigation.navigate("loginWithNumber")}
                width="100%"
              />
              {professionId === Constants.ELECTRICAL_AND_PLUMBING_EXPERT_PID && (
                <Buttons
                  style={styles.button}
                  label={t("strings:new_user_registration")}
                  variant="blackButton"
                  onPress={() => navigation.navigate("register")}
                  width="100%"
                />
              )} */}
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => handleTermsPress()}
            style={styles.footerTextContainer}
          >
            <Image
              source={
                selectedOption === true
                  ? selectedTickImage
                  : notSelectedTickImage
              }
              style={styles.tick}
            />

            <TouchableOpacity onPress={() => openTermsAndConditions()}>
              <Text style={styles.footerText}>
                {t("strings:lbl_accept_terms")}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.versionText}>V {version}</Text>
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
        {isPopupVisible && (
          <Popup isVisible={isPopupVisible} onClose={togglePopup}>
              {popupContent}
          </Popup>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showLanguagePicker}
          onRequestClose={handleCloseLanguagePicker}
        >
          <View style={styles.languagePickerContainer}>
            <LanguagePicker onCloseModal={handleCloseLanguagePicker} />
            <TouchableOpacity onPress={handleCloseLanguagePicker}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  loginScreen: {
    height: "100%",
    backgroundColor: colors.white,
    display: "flex",
  },
  mainWrapper: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  textHeader: {
    color: colors.grey,
    fontSize: 14,
    fontWeight: "bold",
  },
  mainHeader: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageSaathi: {
    width: 216,
    height: 116,
    marginBottom: 30,
  },
  imageVguard: {
    width: 100,
    height: 36,
  },
  formContainer: {
    width: "100%",
    justifyContent: "center",
    padding: 16,
    flex: 2,
  },
  validationMessage: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },

  input: {
    color: colors.black,
    flex: 1,
  },
  inputContainer: {
    shadowColor: "rgba(0, 0, 0, 0.8)",
    marginBottom: 20,
    elevation: 5,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    // padding: 5,
  },
  icon: {
    marginHorizontal: 10,
    width: 20,
    height: 20,
  },
  forgotPasswordContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    color: colors.grey,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "right",
  },
  or: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 20,
  },
  footer: {},
  footerText: {
    textAlign: "left",
    fontSize: 10,
    color: colors.black,
  },
  footerTextContainer: {
    paddingBottom: 5,
    paddingHorizontal: 80,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tick: {
    height: 15,
    width: 15,
  },
  footergreyText: {
    textAlign: "center",
    fontSize: 12,
    color: colors.grey,
    paddingBottom: 5,
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    backgroundColor: colors.lightGrey,
    width: "100%",
    paddingVertical: 10,
  },
  versionText: {
    textAlign: "center",
    color: colors.black,
    fontSize: responsiveFontSize(1.3),
  },
  updateAndForgot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: "bold",
  },
  buttonLanguageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  // button: {
  //   alignSelf: 'right',
  // },
  languagePickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  closeText: {
    marginTop: 20,
    color: colors.black,
    backgroundColor: colors.yellow,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: "bold",
  },
});

export default LoginScreen;
