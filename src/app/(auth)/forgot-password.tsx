import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import arrowIcon from "@/src/assets/images/arrow.png";
import { forgotPassword, generateOtpForLogin } from "@/src/utils/apiservice";
import Loader from "@/src/components/Loader";
import { useData } from "@/src/hooks/useData";
import colors from "@/src/utils/colors";
import Buttons from "@/src/components/Buttons";
import { height } from "@/src/utils/dimensions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { showToast } from "@/src/utils/showToast";
import NewPopUp from "@/src/components/NewPopup";
import Constants from "expo-constants";
import usePopup from "@/src/hooks/usePopup";

const LoginWithOtp = () => {
  const { contact } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [loader, showLoader] = useState(false);
  const {
    popUp,
    setPopUp,
    popUpButtonCount,
    popUpTitle,
    setPopUpTitle,
    popupText,
    setPopupText,
    popUpIconType,
    setPopUpIconType,
    popUpButton2Text,
    cleanupPopUp,
  } = usePopup();
  const { dispatch } = useData();
  const router = useRouter();
  const { t } = useTranslation();
  const placeholderColor = colors.grey;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  async function getOTP(OtpType: string) {
    showLoader(true);
    if (countdown < 1) {
      try {
        const body = {
          Contact: contact,
          OtpType,
        };
        const validationResponse = await generateOtpForLogin(body);
        showLoader(false);
        const validationResponseData = validationResponse.data;
        if (validationResponseData.code === 200) {
          const successMessage = validationResponseData.message;
          setPopUp(true);
          setPopUpIconType("Info");
          setPopUpTitle(t("Verification"));
          setPopupText(successMessage);
        } else {
          const errorMessage = validationResponseData.message;
          setPopUp(true);
          setPopUpIconType("Info");
          setPopUpTitle(t("Error"));
          setPopupText(errorMessage);
        }
        setCountdown(60);
      } catch (error: any) {
        showLoader(false);
        setPopUp(true);
        setPopUpIconType("Info");
        setPopUpTitle(t("Error"));
        setPopupText(error.message || "Something went wrong");
        console.error("Error during validation:", error);
      }
    } else {
      showLoader(false);
      setPopUpIconType("Info");
      setPopUp(true);
      setPopUpTitle(t("Error"));
      setPopupText(`Wait for ${countdown} seconds to send OTP again!`);
    }
  }

  async function validateotp() {
    showLoader(true);
    if (!otp) {
      showToast(t("Please enter the otp to proceed"));
      showLoader(false);
      return;
    }
    try {
      const body = {
        Contact: contact,
        Otp: otp,
      };
      const verificationResponse = await forgotPassword(body);
      const verificationResponseData = verificationResponse.data;
      if (verificationResponseData.code === 200) {
        showLoader(false);
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            field: "Contact",
            value: contact,
          },
        });
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            field: "hasPwdChanged",
            value: true,
          },
        });
        router.replace("(auth)/(register)/credentials");
      } else {
        showLoader(false);
        showToast(t("Wrong OTP. Please try again!"));
      }
    } catch (error: any) {
      showLoader(false);
      showToast(t("Something went wrong, Please try again"));
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {<Loader isLoading={loader} />}
      <NewPopUp
        visible={popUp}
        numberOfButtons={popUpButtonCount}
        button1Action={() => cleanupPopUp()}
        button1Text={"Dismiss"}
        button2Text={popUpButton2Text}
        text={popupText}
        iconType={popUpIconType}
        title={popUpTitle}
      />
      <View style={styles.registerUser}>
        <View style={styles.mainWrapper}>
          <Image
            source={require("@/src/assets/images/ic_rishta_logo.jpg")}
            style={styles.imageSaathi}
          />
          <Text style={styles.mainHeader}>
            {t("strings:lbl_otp_verification")}
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.containter}>
              <Text style={styles.textHeader}>
                {t("strings:enter_otp_description")}
              </Text>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require("@/src/assets/images/mobile_icon.png")}
                />
                <TextInput
                  style={styles.input}
                  value={contact as string}
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require("@/src/assets/images/lock_icon.png")}
                />
                <TextInput
                  style={styles.input}
                  placeholder={t("strings:enter_otp")}
                  placeholderTextColor={placeholderColor}
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={(text) => setOtp(text)}
                  maxLength={4}
                />
              </View>
            </View>
            <View>
              <Buttons
                label={t("strings:submit")}
                variant="filled"
                onPress={() => validateotp()}
                width="100%"
                iconHeight={10}
                iconWidth={30}
                iconGap={30}
                icon={arrowIcon}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={styles.greyText}>
                  {t("strings:otp_not_received")}
                </Text>
                <TouchableOpacity onPress={() => getOTP("SMS")}>
                  <Text style={{ color: colors.yellow }}>
                    {t("strings:resend_otp")}
                    {countdown > 0 ? (
                      <Text style={styles.greyText}>
                        in {countdown} seconds
                      </Text>
                    ) : null}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}></View>
            </View>
          </View>
        </View>
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
  mainWrapper: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  textHeader: {
    textAlign: "center",
    width: "80%",
    color: colors.grey,
    fontSize: 14,
    fontWeight: "bold",
  },
  mainHeader: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
  },
  imageSaathi: {
    width: 150,
    height: 200,
    marginBottom: 10,
  },
  imageVguard: {
    width: 100,
    height: 36,
  },
  formContainer: {
    width: "100%",
    padding: 16,
  },
  input: {
    color: colors.black,
    height: height / 16,
    padding: 10,
  },
  inputContainer: {
    backgroundColor: colors.white,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
    // marginTop: 20,
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
    alignItems: "center",
    gap: 20,
    marginBottom: 50,
  },
  phone: {
    height: 50,
    width: 50,
  },
  greyText: {
    fontSize: 14,
    color: colors.grey,
  },
  otpPhone: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 50,
    justifyContent: "center",
  },
});

export default LoginWithOtp;
