import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { useTranslation } from "react-i18next";

import colors from "../../../../colors";
import Buttons from "../../../components/Buttons";
import arrowIcon from "../../../assets/images/arrow.png";
import { generateOtpForLogin } from "../../../utils/apiservice";
import Popup from "../../../components/Popup";
import Loader from "../../../components/Loader";

const LoginWithNumber: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [preferedLanguage, setpreferedLanguage] = useState(1);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [responseCode, setResponseCode] = useState(0);
  const [responseEntity, setResponseEntity] = useState(0);
  const [loader, showLoader] = useState(false);

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
        setResponseCode(validationResponseData.code);
        if(validationResponseData.entity === 1) {
          setResponseEntity(1);
        }
        if (validationResponseData.code === 200) {
          const successMessage = validationResponseData.message;
          setIsPopupVisible(true);
          setPopupMessage(successMessage);
          return;
        } else {
          const errorMessage = validationResponseData.message;
          setIsPopupVisible(true);
          setPopupMessage(errorMessage);
        }
      } catch (error: any) {
        showLoader(false);
        setIsPopupVisible(true);
        setPopupMessage(error.response.data.message || "An error occurred.");
        console.error("Error during validation:", error);
      }
    } else {
      showLoader(false);
      ToastAndroid.show("Invalid number format.", ToastAndroid.LONG);
    }
  }

  const placeholderColor = colors.grey;

  const { t } = useTranslation();

  const handleClose = () => {
    if(responseCode === 400 && responseEntity === 1) {
      setResponseEntity(0);
      navigation.navigate("leadform", { usernumber: number });
    }
    if (responseCode === 200) {
      navigation.navigate("loginwithotp", { usernumber: number });
    }
    setIsPopupVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {isPopupVisible && (
        <Popup isVisible={isPopupVisible} onClose={handleClose}>
          <Text>{popupMessage}</Text>
        </Popup>
      )}
      <View style={styles.registerUser}>
        <Loader isLoading={loader} />
        <View style={styles.mainWrapper}>
          <Image
            source={require("../../../assets/images/ic_rishta_logo.jpg")}
            style={styles.imageSaathi}
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
                  resizeMode="contain"
                  source={require("../../../assets/images/mobile_icon.png")}
                />
                <TextInput
                  style={styles.input}
                  placeholder={t("strings:enter_your_mobile_number")}
                  placeholderTextColor={placeholderColor}
                  value={number}
                  keyboardType="number-pad"
                  onChangeText={(text) => setNumber(text)}
                  maxLength={10}
                />
              </View>
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
              <TouchableOpacity
                onPress={() => navigation.navigate("login")}
                style={styles.forgotPasswordContainer}
              >
                <Text style={[styles.forgotPassword]}>
                  {t("strings:login")}
                </Text>
              </TouchableOpacity>
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
            <TouchableOpacity
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
            </TouchableOpacity>
            
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
    padding: 16,
    flex: 2,
  },
  input: {
    color: colors.black,
    height: 40,
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
    fontSize: 14,
    color: colors.grey,
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
