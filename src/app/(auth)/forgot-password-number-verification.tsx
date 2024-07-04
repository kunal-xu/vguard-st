import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import arrowIcon from "@/src/assets/images/arrow.png";
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
import usePopup from "@/src/hooks/usePopup";

const ForgotPasswordNumberVerification = () => {
  const [number, setNumber] = useState("");
  const [responseEntity, setResponseEntity] = useState(0);
  const [loader, showLoader] = useState(false);
  const {
    popUp,
    setPopUp,
    popUpButtonCount,
    setPopUpButtonCount,
    popUpTitle,
    setPopUpTitle,
    popupText,
    setPopupText,
    popUpIconType,
    setPopUpIconType,
    popUpButton2Text,
    setPopupButton2Text,
    cleanupPopUp,
  } = usePopup();
  const router = useRouter();
  const { t } = useTranslation();

  async function getOTP(OtpType: string) {
    const numberRegex = /^[6789]\d{9}$/;
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
        if (validationResponseData.entity === 1) {
          setPopUp(true);
          setPopUpIconType("Info");
          setResponseEntity(1);
          setPopUpTitle(t("Verification Failed"));
          setPopupButton2Text(t("Proceed"));
          setPopUpButtonCount(2);
        }
        if (validationResponseData.code === 200) {
          const successMessage = validationResponseData.message;
          setPopUp(true);
          setPopUpIconType(t("AccountVerified"));
          setPopUpButtonCount(2);
          setPopUpTitle(t("Mobile Number Verified"));
          setPopupButton2Text(t("Proceed"));
          setPopupText(successMessage);
          return;
        } else {
          const errorMessage = validationResponseData.message;
          setPopUp(true);
          setPopUpIconType("AccountCancel");
          setPopUpTitle(t("Verification Failed"));
          setPopupText(errorMessage);
        }
      } catch (error: any) {
        showLoader(false);
        setPopUp(true);
        setPopUpIconType("Alert");
        setPopUpTitle(t("Verification Failed"));
        setPopupText(error.response.data.message || "An error occurred.");
        console.error("Error during validation:", error);
      }
    } else {
      showLoader(false);
      showToast(t("Invalid number format"));
    }
  }

  const placeholderColor = colors.grey;

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
            router.push({
              pathname: "lead-form",
              params: { contact: number },
            });
          } else {
            cleanupPopUp();
            router.push({
              pathname: "forgot-password",
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
          <Image
            source={require("@/src/assets/images/ic_rishta_logo_bottom_bar.jpg")}
            style={{ height: "25%", width: "50%" }}
            contentFit="contain"
          />
          <View style={styles.formContainer}>
            <View style={styles.containter}>
              <Text style={styles.textHeader}>
                {t("Enter your mobile number to generate OTP")}
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
          </View>
        </View>
        <View>
          <View>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: Constants.statusBarHeight,
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

export default ForgotPasswordNumberVerification;
