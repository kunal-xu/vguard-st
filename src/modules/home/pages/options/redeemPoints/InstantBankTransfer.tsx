import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import colors from "../../../../../../colors";
import { useTranslation } from "react-i18next";
import Buttons from "../../../../../components/Buttons";
import arrowIcon from "../../../../../assets/images/arrow.png";
import { bankTransfer, getUser } from "../../../../../utils/apiservice";
import Popup from "../../../../../components/Popup";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../../../../components/InputField";
import { useData } from "../../../../../hooks/useData";

const InstantBankTransfer = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { state, dispatch } = useData();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [points, setPoints] = useState<number>(0);
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
        let payload = {
          amount: points,
          bankDetail: state.BankDetail,
        };
        const response = await bankTransfer(payload);
        const reponseData = response.data;

        if (reponseData.code === 200) {
          setPopupContent(reponseData.message);
          setPopupVisible(true);
        } else if (reponseData.code === 400) {
          setPopupVisible(true);
          setPopupContent(reponseData.message);
        } else {
          setPopupContent(
            reponseData.message || "Something went wrong, Please try again"
          );
          setPopupVisible(true);
        }
      }
    } catch (btError) {
      console.log("Error: ", btError);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>{t("strings:bank_details")}</Text>
          <Text style={styles.textSubHeader}>
            {t("strings:for_account_tranfer_only")}
          </Text>
        </View>
        <View style={styles.form}>
          <InputField
            label={t("strings:enter_points_to_be_redeemed")}
            value={points}
            onChangeText={(num) => setPoints(num)}
            keyboardType="number-pad"
          />

          <InputField
            label={t("strings:lbl_account_number")}
            value={state.BankDetail.bankAccNo}
            disabled={true}
          />

          <InputField
            label={t("strings:lbl_account_holder_name")}
            value={state.BankDetail.bankAccHolderName}
            disabled={true}
          />
          <InputField
            label={t("strings:select_account_type")}
            disabled={true}
            value={state.BankDetail.bankAccType}
          />
          <InputField
            label={t("strings:bank_name")}
            disabled={true}
            value={state.BankDetail.bankNameAndBranch}
          />
          <InputField
            label={t("strings:ifsc")}
            disabled={true}
            value={state.BankDetail.bankIfsc}
          />

          {/* <ImagePickerField
              editable={false}
              label={t("strings:cancelled_cheque_copy")}
              initialImage={selectedImage}
              getImageRelated="CHEQUE"
            /> */}
        </View>

        <View style={styles.button}>
          <Buttons
            label={t("strings:proceed")}
            variant="filled"
            onPress={() => handleProceed()}
            width="100%"
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
          onClose={() => setPopupVisible(false)}
        >
          {popupContent}
        </Popup>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  mainWrapper: {
    padding: 15,
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
