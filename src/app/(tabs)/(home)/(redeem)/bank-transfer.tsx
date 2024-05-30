import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import arrowIcon from "../../../../assets/images/arrow.png";
import { bankTransfer, getUser } from "@/src/utils/apiservice";
import Popup from "@/src/components/Popup";
import { useNavigation } from "@react-navigation/native";
import { useData } from "@/src/hooks/useData";
import Loader from "@/src/components/Loader";
import colors from "@/src/utils/colors";
import Buttons from "@/src/components/Buttons";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { height } from "@/src/utils/dimensions";

const InstantBankTransfer = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { state, dispatch } = useData();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [points, setPoints] = useState<string>();
  const [loader, showLoader] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUser();
        const responseData = response.data;
        dispatch({
          type: "GET_ALL_FIELDS",
          payload: {
            value: responseData,
          },
        });
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  const handleProceed = async () => {
    try {
      if (!points) {
        ToastAndroid.show("Enter Amount", ToastAndroid.SHORT);
      } else {
        showLoader(true);
        let payload = {
          amount: points,
          bankDetail: state.BankDetail,
        };
        const response = await bankTransfer(payload);
        const reponseData = response.data;
        showLoader(false);
        if (reponseData.code === 200) {
          setPopupContent(reponseData.message);
          setPopupVisible(true);
        } else if (reponseData.code === 400) {
          setPopupVisible(true);
          setPopupContent(reponseData.message);
          setRedirect(true);
        } else {
          setPopupVisible(true);
          setPopupContent(
            reponseData.message || "Something went wrong, Please try again"
          );
        }
      }
    } catch (btError) {
      showLoader(false);
      console.log("Error: ", btError);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {loader && <Loader isLoading={loader} />}
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
            value={state.BankDetail.bankAccNo as string}
            label={t("strings:lbl_account_number")}
          />

          <FloatingLabelInput
            staticLabel={true}
            editable={false}
            containerStyles={styles.floatingContainer}
            labelStyles={styles.labelStyles}
            customLabelStyles={styles.customLabelStyles}
            inputStyles={styles.inputStyles}
            value={state.BankDetail.bankAccHolderName as string}
            label={t("strings:lbl_account_holder_name")}
          />

          <FloatingLabelInput
            staticLabel={true}
            editable={false}
            containerStyles={styles.floatingContainer}
            labelStyles={styles.labelStyles}
            customLabelStyles={styles.customLabelStyles}
            inputStyles={styles.inputStyles}
            value={state.BankDetail.bankNameAndBranch as string}
            label={t("strings:bank_name")}
          />

          <FloatingLabelInput
            staticLabel={true}
            editable={false}
            containerStyles={styles.floatingContainer}
            labelStyles={styles.labelStyles}
            customLabelStyles={styles.customLabelStyles}
            inputStyles={styles.inputStyles}
            value={state.BankDetail.bankIfsc as string}
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
