import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import React, { useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import arrowIcon from "../../../../assets/images/arrow.png";
import { bankTransfer, getUser } from "@/src/utils/apiservice";
import Popup from "@/src/components/Popup";
import Loader from "@/src/components/Loader";
import colors from "@/src/utils/colors";
import Buttons from "@/src/components/Buttons";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { height } from "@/src/utils/dimensions";
import { showToast } from "@/src/utils/showToast";
import useProfile from "@/src/hooks/useProfile";
import { useRouter } from "expo-router";
import usePopup from "@/src/hooks/usePopup";
import NewPopUp from "@/src/components/NewPopup";

const InstantBankTransfer = () => {
  const { t } = useTranslation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [points, setPoints] = useState<number>();
  const [loader, showLoader] = useState(false);
  const { profile } = useProfile();
  const router = useRouter();
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

  const handleProceed = async () => {
    if (!points) {
      showToast("Enter Amount");
      return;
    }
    if (points < 150) {
      showToast(t("Minimum 150 points required to do the bank transfer"));
      return;
    }
    if (!profile.BankDetail.bankDataPresent) {
      setPopUp(true);
      setPopUpIconType("Alert");
      setPopUpTitle(t("Bank Details"));
      setPopupText(t("Please verify your bank details."));
      setPopUpButtonCount(2);
      setPopupButton2Text(t("Verify"));
      return;
    }
    if (points > Number(profile.RedeemablePoints)) {
      showToast(t("You do not have sufficient balance in your account."));
      return;
    }
    try {
      showLoader(true);
      let payload = {
        amount: points,
        bankDetail: profile.BankDetail,
      };
      const response = await bankTransfer(payload);
      const reponseData = response.data;
      console.log(reponseData);
      showLoader(false);
      setPopUp(true);
      if (reponseData.code === 200) {
        setPopUpIconType("Check");
        setPopUpTitle(t("Bank Transfer"));
        setPopupText(reponseData.message);
      } else if (reponseData.code === 400) {
        setPopUpIconType("Alert");
        setPopUpTitle(t("Bank Transfer"));
        setPopupText(reponseData.message);
      } else {
        setPopUpIconType("Alert");
        setPopUpTitle(t("Bank Transfer"));
        setPopupText(reponseData.message || "Something went wrong");
      }
    } catch (btError) {
      showLoader(false);
      console.log("Error: ", btError);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {loader && <Loader isLoading={loader} />}
      <NewPopUp
        visible={popUp}
        numberOfButtons={popUpButtonCount}
        button1Action={() => cleanupPopUp()}
        button2Action={() => {
          cleanupPopUp();
          router.push("(home)/update-bank-details");
        }}
        button1Text={"Dismiss"}
        button2Text={popUpButton2Text}
        text={popupText}
        iconType={popUpIconType}
        title={popUpTitle}
      />
      <View style={styles.mainWrapper}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>{t("strings:bank_details")}</Text>
          <Text style={styles.textSubHeader}>
            {t("strings:for_account_tranfer_only")}
          </Text>
        </View>
        <View style={styles.form}>
          <FloatingLabelInput
            staticLabel={true}
            keyboardType="number-pad"
            containerStyles={styles.floatingContainer}
            labelStyles={styles.labelStyles}
            customLabelStyles={styles.customLabelStyles}
            inputStyles={styles.inputStyles}
            onChangeText={(text) => setPoints(text)}
            value={points}
            label={t("strings:enter_points_to_be_redeemed")}
          />

          <FloatingLabelInput
            staticLabel={true}
            editable={false}
            containerStyles={styles.floatingContainer}
            labelStyles={styles.labelStyles}
            customLabelStyles={styles.customLabelStyles}
            inputStyles={styles.inputStyles}
            value={profile.BankDetail.bankAccNo as string}
            label={t("strings:lbl_account_number")}
          />

          <FloatingLabelInput
            staticLabel={true}
            editable={false}
            containerStyles={styles.floatingContainer}
            labelStyles={styles.labelStyles}
            customLabelStyles={styles.customLabelStyles}
            inputStyles={styles.inputStyles}
            value={profile.BankDetail.bankAccHolderName as string}
            label={t("strings:lbl_account_holder_name")}
          />

          <FloatingLabelInput
            staticLabel={true}
            editable={false}
            containerStyles={styles.floatingContainer}
            labelStyles={styles.labelStyles}
            customLabelStyles={styles.customLabelStyles}
            inputStyles={styles.inputStyles}
            value={profile.BankDetail.bankNameAndBranch as string}
            label={t("strings:bank_name")}
          />

          <FloatingLabelInput
            staticLabel={true}
            editable={false}
            containerStyles={styles.floatingContainer}
            labelStyles={styles.labelStyles}
            customLabelStyles={styles.customLabelStyles}
            inputStyles={styles.inputStyles}
            value={profile.BankDetail.bankIfsc as string}
            label={t("strings:ifsc")}
          />
        </View>

        <View style={styles.button}>
          <Buttons
            label={t("strings:proceed")}
            variant="filled"
            onPress={() => handleProceed()}
            width="90%"
            iconHeight={10}
            iconWidth={30}
            iconGap={30}
            icon={arrowIcon}
          />
        </View>
      </View>
      {isPopupVisible && (
        <Popup
          isVisible={isPopupVisible}
          onClose={() => {
            setPopupVisible(false);
            if (redirect) {
              // navigation.navigate("Update Bank and UPI");
            }
          }}
        >
          {popupContent}
        </Popup>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    borderWidth: 2,
    height: height / 16,
    backgroundColor: "#fff",
    borderColor: "black",
    borderRadius: 6,
    margin: 18,
    marginTop: 4,
    borderCurve: "circular",
  },
  labelStyles: {
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  customLabelStyles: {
    colorFocused: "black",
    colorBlurred: "black",
    fontSizeFocused: 16,
  },
  inputStyles: {
    color: "black",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  mainWrapper: {
    padding: 10,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  inputImage: {
    height: responsiveHeight(2),
    width: responsiveHeight(2),
    marginRight: 5,
  },
  textHeader: {
    fontSize: responsiveFontSize(2.5),
    color: colors.black,
    fontWeight: "bold",
  },
  textSubHeader: {
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: "bold",
  },
  container: {
    height: responsiveHeight(8),
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  buttonText: {
    color: colors.white,
    width: "100%",
    textAlign: "center",
  },
  inputContainer: {
    borderColor: colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    height: responsiveHeight(5),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
    padding: 10,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    // fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    gap: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    alignItems: "center",
  },
  picker: {
    width: "90%",
    color: colors.grey,
  },
  labelPicker: {
    color: colors.grey,
    fontWeight: "bold",
  },
});
export default InstantBankTransfer;
