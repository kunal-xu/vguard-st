import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Modal,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import language from "../../assets/images/language.png";
import arrowIcon from "../../assets/images/arrow.png";
import selectedTickImage from "../../assets/images/tick_1.png";
import notSelectedTickImage from "../../assets/images/tick_1_notSelected.png";
import Buttons from "@/src/components/Buttons";

import Loader from "@/src/components/Loader";
import { height } from "@/src/utils/dimensions";
import { generateOtpForLogin } from "@/src//utils/apiservice";
import LanguagePicker from "@/src/components/LanguagePicker";
import { useNavigation, useRouter } from "expo-router";
import colors from "@/src/utils/colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Image } from "expo-image";
import Toast from "react-native-root-toast";
import NewPopUp from "@/src/components/NewPopup";

const LoginWithNumber = () => {
  const [number, setNumber] = useState("");
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const [popUp, setPopUp] = useState(false);
  const [popUpButtonCount, setPopUpButtonCount] = useState(1);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popupText, setPopupText] = useState("");
  const [popUpIconType, setPopUpIconType] = useState("");
  const [popUpButton2Text, setPopupButton2Text] = useState("");

  const [responseCode, setResponseCode] = useState(0);
  const [responseEntity, setResponseEntity] = useState(0);
  const [loader, showLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState(true);

  const pkg = require("../../../package.json");
  const version = pkg.version;
  const navigation = useNavigation();
  const router = useRouter();

  const handleTermsPress = () => {
    setSelectedOption(!selectedOption);
  };

  function cleanupPopUp() {
    setPopUp(false);
    setPopUpButtonCount(1);
    setPopUpTitle("");
    setPopupText("");
    setPopUpIconType("");
    setPopupButton2Text("");
  }

  const openTermsAndConditions = () => {
    const url = "https://vguardrishta.com/tnc_retailer.html";
    Linking.openURL(url).catch((error) =>
      console.error("Error opening URL:", error)
    );
  };

  async function getOTP(OtpType: string) {
    const numberRegex = /^[6789]\d{9}$/;
    if (selectedOption === false) {
      ToastAndroid.show(t("strings:please_accept_terms"), ToastAndroid.SHORT);
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
        setResponseCode(validationResponseData.code);
        if (validationResponseData.entity === 1) {
          setResponseEntity(1);
          setPopUpTitle(t("Verification Failed"));
          setPopupButton2Text(t("Proceed"));
          setPopUpIconType("Alert");
          setPopUpButtonCount(2);
        }
        if (validationResponseData.code === 200) {
          const successMessage = validationResponseData.message;
          setPopUp(true);
          setPopUpButtonCount(2);
          setPopUpTitle(t("Mobile Number Verified"));
          setPopupButton2Text(t("Proceed"));
          setPopUpIconType("AccountVerified");
          setPopupText(successMessage);
          return;
        } else {
          const errorMessage = validationResponseData.message;
          setPopUp(true);
          setPopUpTitle(t("Verification Failed"));
          setPopUpIconType("AccountCancel");
          setPopupText(errorMessage);
        }
      } catch (error: any) {
        showLoader(false);
        setPopUp(true);
        setPopupText(error.response.data.message || "An error occurred.");
        console.error("Error during validation:", error);
      }
    } else {
      showLoader(false);
      Toast.show("Invalid number format", {
        containerStyle: {
          backgroundColor: "black",
          borderRadius: 20,
          paddingHorizontal: 24,
          paddingVertical: 12,
          marginHorizontal: 20,
          marginBottom: 50,
        },
        textStyle: {
          color: "#fff",
          fontSize: 14,
        },
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }

  const placeholderColor = colors.grey;

  const { t } = useTranslation();

  const handleLanguageButtonPress = () => {
    setShowLanguagePicker(true);
  };

  const handleCloseLanguagePicker = () => {
    setShowLanguagePicker(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <NewPopUp
        visible={popUp}
        numberOfButtons={popUpButtonCount}
        button1Action={() => cleanupPopUp()}
        button2Action={() => {
          if (responseEntity === 1) {
            setResponseEntity(0);
            cleanupPopUp();
            navigation.navigate("lead-form" as never);
          } else {
            cleanupPopUp();
            router.push({
              pathname: "login-with-otp",
              params: { contact: number },
            });
          }
        }}
        button1Text={"Dismiss"}
        button2Text={popUpButton2Text}
        text={popupText}
        iconType={popUpIconType}
        title={popUpTitle}
      />
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
            source={require("../../assets/images/ic_rishta_logo_bottom_bar.jpg")}
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
                  source={require("../../assets/images/mobile_icon.png")}
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
              <TouchableOpacity
                onPress={() => navigation.navigate("login" as never)}
              >
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

            {/* <TouchableOpacity
              style={styles.otpPhone}
              onPress={() => getOTP("Voice")}
            >
              <Image
                source={require("../../../assets/images/group_501.png")}
                style={styles.phone}
              />
              <Text style={styles.greyText}>
                {t("strings:lbl_otp_through_phone_call")}
              </Text>
            </TouchableOpacity> */}
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
                source={require("../../assets/images/group_910.png")}
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
    marginTop: 10,
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
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  updateAndForgot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
  radioButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
  },
  containter: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginBottom: 30,
  },
  phone: {
    height: 50,
    width: 50,
  },
  greyText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.grey,
    fontWeight: "600",
  },
  otpPhone: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

export default LoginWithNumber;
