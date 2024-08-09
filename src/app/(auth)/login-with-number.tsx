import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Linking,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useTranslation } from "react-i18next";
import language from "@/src/assets/images/language.png";
import arrowIcon from "@/src/assets/images/arrow.png";
import selectedTickImage from "@/src/assets/images/tick_1.png";
import notSelectedTickImage from "@/src/assets/images/tick_1_notSelected.png";
import Buttons from "@/src/components/Buttons";
import Loader from "@/src/components/Loader";
import { height } from "@/src/utils/dimensions";
import { generateOtpForLogin } from "@/src//utils/apiservice";
import LanguagePicker from "@/src/components/LanguagePicker";
import { useRouter } from "expo-router";
import colors from "@/src/utils/colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Image } from "expo-image";
import NewPopUp from "@/src/components/NewPopup";
import { showToast } from "@/src/utils/showToast";
import Constants from "expo-constants";
import { usePopup } from "@/src/hooks/usePopup";

const LoginWithNumber = () => {
  const [number, setNumber] = useState("");
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [loader, showLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState(true);
  const { data: popup, setData: setPopup } = usePopup();
  const router = useRouter();
  const { t } = useTranslation();
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

  async function getOTP(OtpType: string) {
    const numberRegex = /^[6789]\d{9}$/;
    if (selectedOption === false) {
      showToast(t("strings:please_accept_terms"));
      return;
    }
    showLoader(true);
    if (number.trim().length && numberRegex.test(number.trim())) {
      try {
        const body = {
          Contact: number,
          OtpType,
        };
        const validationResponse = await generateOtpForLogin(body);
        showLoader(false);
        const validationResponseData = validationResponse.data;
        const message = validationResponseData.message;
        if (validationResponseData.entity === 1) {
          setPopup({
            visible: true,
            numberOfButtons: 2,
            button2Action: () => {
              router.push({
                pathname: "lead-form",
                params: { contact: number },
              });
            },
            button2Text: "Proceed",
            text: message,
            iconType: "Info",
            title: "Verification Failed",
          });
          return;
        }
        if (validationResponseData.code === 200) {
          setPopup({
            visible: true,
            numberOfButtons: 2,
            button2Action: () => {
              router.push({
                pathname: "login-with-otp",
                params: { contact: number },
              });
            },
            button2Text: "Proceed",
            text: message,
            iconType: "AccountVerified",
            title: "Mobile Number Verified",
          });
          return;
        } else {
          setPopup({
            visible: true,
            numberOfButtons: 1,
            text: message,
            iconType: "AccountCancel",
            title: "Verification Failed",
          });
        }
      } catch (error: any) {
        showLoader(false);
        showToast(error.response.data.message || "An error occurred.");
        console.error("Error during validation:", error);
      }
    } else {
      showLoader(false);
      showToast(t("Invalid number format"));
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NewPopUp {...popup} />
      <View style={styles.registerUser}>
        <Loader isLoading={loader} />
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
          <Image
            source={require("@/src/assets/images/ic_rishta_logo_bottom_bar.jpg")}
            style={{ height: "25%", width: "50%" }}
            contentFit="contain"
          />
          <Text style={styles.mainHeader}>{t("strings:lbl_welcome")}</Text>
          <View style={styles.formContainer}>
            <View style={styles.containter}>
              <Text style={styles.textHeader}>
                {t("strings:enter_registered_mobile_no_to_continue")}
              </Text>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.icon}
                  contentFit="contain"
                  source={require("@/src/assets/images/mobile_icon.png")}
                />
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <TextInput
                    style={styles.input}
                    placeholder={t("strings:enter_your_mobile_number")}
                    placeholderTextColor={placeholderColor}
                    value={number}
                    keyboardType="number-pad"
                    onChangeText={(text) => setNumber(text)}
                    maxLength={10}
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
            <View>
              <Buttons
                label={t("strings:send_otp")}
                variant="filled"
                onPress={() => getOTP("SMS")}
                width="100%"
                iconHeight={10}
                iconWidth={30}
                iconGap={30}
                icon={arrowIcon}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 5, marginTop: 24 }}>
              <Text style={styles.greyText}>
                {t("Already have an account?")}
              </Text>
              <TouchableOpacity onPress={() => router.push("login")}>
                <Text
                  style={{
                    color: colors.yellow,
                    fontSize: responsiveFontSize(1.7),
                    fontWeight: "600",
                  }}
                >
                  {t("Sign In")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View>
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
                source={require("@/src/assets/images/group_910.png")}
                style={styles.imageVguard}
              />
            </View>
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
  registerUser: {
    height: "100%",
    backgroundColor: colors.white,
    display: "flex",
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
  footerText: {
    textAlign: "left",
    fontSize: 10,
    color: colors.black,
  },
  versionText: {
    textAlign: "center",
    color: colors.black,
    fontSize: 15,
  },
  tick: {
    height: 15,
    width: 15,
  },
  mainWrapper: {
    padding: 24,
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
  imageVguard: {
    width: 100,
    height: 36,
  },
  formContainer: {
    width: "100%",
    padding: 16,
    flex: 2,
  },
  input: {
    color: colors.black,
    height: height / 16,
    padding: 10,
  },
  inputContainer: {
    backgroundColor: colors.white,
    marginBottom: 2,
    borderWidth: 0.1,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 10,
    width: 15,
    height: 15,
  },
  or: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 20,
    marginTop: 20,
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
  buttonLanguageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    alignSelf: "flex-end",
  },
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
  option: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  containter: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginBottom: 30,
  },
  greyText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.grey,
    fontWeight: "600",
  },
});

export default LoginWithNumber;
