import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import arrowIcon from "@/src/assets/images/arrow.png";
import { Linking } from "react-native";
import selectedTickImage from "@/src/assets/images/tick_1.png";
import notSelectedTickImage from "@/src/assets/images/tick_1_notSelected.png";
import language from "@/src/assets/images/language.png";
import { loginWithPassword } from "@/src/utils/apiservice";
import React from "react";
import Buttons from "@/src/components/Buttons";
import { useAuth } from "@/src/hooks/useAuth";
import Loader from "@/src/components/Loader";
import LanguagePicker from "@/src/components/LanguagePicker";
import { useData } from "@/src/hooks/useData";
import colors from "@/src/utils/colors";
import { height } from "@/src/utils/dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Image } from "expo-image";
import { showToast } from "@/src/utils/showToast";
import NewPopUp from "@/src/components/NewPopup";
import { useRouter } from "expo-router";
import Constants from "expo-constants";

const LoginScreen = () => {
  const { t } = useTranslation();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [loader, showLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [popUpButtonCount, setPopUpButtonCount] = useState(1);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popupText, setPopupText] = useState("");
  const [popUpIconType, setPopUpIconType] = useState("");
  const { login } = useAuth();
  const { dispatch } = useData();
  const router = useRouter();

  const placeholderColor = colors.grey;
  const pkg = require("../../../package.json");
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

  function cleanupPopUp() {
    setPopUp(false);
    setPopUpButtonCount(1);
    setPopUpTitle("");
    setPopupText("");
    setPopUpIconType("");
  }

  const handleLogin = async () => {
    if (!username.trim().length || !password.trim().length) {
      showToast(t("Please enter a username and password."));
      return;
    }

    if (selectedOption === false) {
      showToast(t("strings:please_accept_terms"));
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
      setPopUp(true);
      setPopUpTitle(t("Verification Failed"));
      setPopupText(
        error.response.data.message ||
          "Internal Server Error. Please try again."
      );
      setPopUpIconType("Alert");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NewPopUp
        visible={popUp}
        numberOfButtons={popUpButtonCount}
        button1Action={() => cleanupPopUp()}
        button1Text={"Dismiss"}
        text={popupText}
        iconType={popUpIconType}
        title={popUpTitle}
      />
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
            source={require("@/src/assets/images/ic_rishta_logo_bottom_bar.jpg")}
            style={{ height: "25%", width: "50%" }}
            contentFit="contain"
          />
          <Text style={styles.mainHeader}>{t("strings:lbl_welcome")}</Text>

          <Text style={styles.textHeader}>{t("Login to continue")}</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                source={require("@/src/assets/images/mobile_icon.png")}
                contentFit="contain"
              />
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <TextInput
                  style={styles.input}
                  placeholder={t("strings:lbl_registered_mobile_number_login")}
                  placeholderTextColor={placeholderColor}
                  value={username}
                  keyboardType="number-pad"
                  maxLength={10}
                  onChangeText={(text) => setUsername(text)}
                />
              </KeyboardAvoidingView>
            </View>
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                source={require("@/src/assets/images/lock_icon.png")}
                contentFit="contain"
              />
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <TextInput
                  style={styles.input}
                  placeholder={t("strings:password")}
                  placeholderTextColor={placeholderColor}
                  maxLength={8}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </KeyboardAvoidingView>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                marginTop: 12,
                marginBottom: 16,
              }}
            >
              <Text style={styles.greyText}>{t("Forgot Password?")}</Text>
              <TouchableOpacity
                onPress={() =>
                  router.push("forgot-password-number-verification" as never)
                }
              >
                <Text
                  style={{
                    color: colors.yellow,
                    fontSize: responsiveFontSize(1.7),
                    fontWeight: "600",
                  }}
                >
                  {t("Click here")}
                </Text>
              </TouchableOpacity>
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
              source={require("../../assets/images/group_910.png")}
              style={styles.imageVguard}
            />
          </View>
        </View>
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
    paddingTop: Constants.statusBarHeight,
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
    fontSize: responsiveFontSize(2.2),
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
  },
  greyText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.grey,
    fontWeight: "600",
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
    marginTop: 32,
  },
  validationMessage: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },

  input: {
    color: colors.black,
    height: height / 16,
    padding: 10,
  },
  inputContainer: {
    shadowColor: "rgba(0, 0, 0, 0.8)",
    marginBottom: 20,
    elevation: 5,
    height: height / 16,
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
    fontSize: 15,
  },
  updateAndForgot: {
    display: "flex",
    flexDirection: "row",

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
