import { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "expo-router";
import Loader from "@/src/components/Loader";
import { useAuth } from "@/src/hooks/useAuth";
import { getBankDetail, getUser, updateProfile } from "@/src/utils/apiservice";
import { useData } from "@/src/hooks/useData";
import Buttons from "@/src/components/Buttons";
import Field from "@/src/components/Field";
import { registrationBankDetails } from "@/src/app/(auth)/(register)/fields/registrationBankDetailsFields";
import {
  CustomLabelProps,
  FloatingLabelInput,
} from "react-native-floating-label-input";
import { height, width } from "@/src/utils/dimensions";
import colors from "@/src/utils/colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import {
  STUser,
  AddressDetail,
  BankDetail,
  PaytmDetail,
  WelcomeBanner,
} from "@/src/utils/types";
import { BankDetailsSchema } from "@/src/utils/schemas/BankDetails";
import { z } from "zod";
import { showToast } from "@/src/utils/showToast";
import usePopup from "@/src/hooks/usePopup";
import NewPopUp from "@/src/components/NewPopup";

const UpdateBankDetails = () => {
  const { t } = useTranslation();
  const [loader, showLoader] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();
  const [editable, setEditable] = useState<boolean>(true);
  const { state, dispatch } = useData();
  const { logout } = useAuth();
  const {
    popUp,
    setPopUp,
    popUpTitle,
    setPopUpTitle,
    popupText,
    setPopupText,
    popUpIconType,
    setPopUpIconType,
    cleanupPopUp,
  } = usePopup();

  const items: string[] = [
    "Savings",
    "Current",
    "Salary",
    "Fixed deposit",
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await getUser();
          const responseData = response.data;
          dispatch({
            type: "GET_ALL_FIELDS",
            payload: {
              value: responseData,
            },
          });
          if (responseData.hasPwdChanged || responseData.BlockStatus === 3) {
            dispatch({
              type: "CLEAR_ALL_FIELDS",
              payload: {},
            });
            logout();
          }
        } catch (error: any) {
          console.log(error.message);
        }
      };
      fetchData();
    }, [])
  );

  const handleFormInputChange = (
    field: keyof STUser,
    subfield:
      | keyof (AddressDetail | BankDetail | PaytmDetail | WelcomeBanner)
      | string
      | undefined,
    value: string | number | boolean
  ) => {
    if (subfield) {
      dispatch({
        type: "UPDATE_SUB_FIELD",
        payload: { field, subfield, value },
      });
    } else {
      dispatch({
        type: "UPDATE_FIELD",
        payload: { field, value },
      });
    }
  };

  const handleProceed = async () => {
    try {
      showLoader(true);
      const response = await updateProfile(state);
      const responseData = response.data;
      showLoader(false);
      setPopUpIconType("Info");
      setPopUpTitle(t("Update Profile"));
      setPopupText(responseData.message);
      setPopUp(true);
    } catch (error) {
      showLoader(false);
      showToast(t("Something went wrong. Please try again."));
    }
  };

  function resetBankDetails() {
    setEditable(true);
    handleFormInputChange("BankDetail", "bankAccNo", "");
    handleFormInputChange("BankDetail", "bankIfsc", "");
    handleFormInputChange("BankDetail", "bankAccHolderName", "");
    handleFormInputChange("BankDetail", "bankNameAndBranch", "");
    handleFormInputChange("BankDetail", "branchAddress", "");
    handleFormInputChange("BankDetail", "bankDataPresent", 0);
  }

  async function getBankDetails() {
    try {
      BankDetailsSchema.parse(state.BankDetail);
      showLoader(true);
      const response = await getBankDetail({
        UniqueId: state.UniqueId,
        BankDetail: {
          bankAccNo: state.BankDetail.bankAccNo,
          bankIfsc: state.BankDetail.bankIfsc,
        },
      });
      const responseData: BankDetail = response.data;
      showLoader(false);
      if (responseData.bankDataPresent === true) {
        setEditable(false);
        handleFormInputChange(
          "BankDetail",
          "bankAccHolderName",
          responseData.bankAccHolderName as string
        );
        handleFormInputChange(
          "BankDetail",
          "bankNameAndBranch",
          responseData.bankNameAndBranch as string
        );
        handleFormInputChange(
          "BankDetail",
          "branchAddress",
          responseData.branchAddress as string
        );
        handleFormInputChange("BankDetail", "bankDataPresent", true);
      } else {
        setPopUp(true);
        setPopUpIconType("Alert");
        setPopUpTitle(t("Bank Details"));
        setPopupText(response.data.errorMessage || "Bank details not found");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        showToast(`${error.errors[0].message}`);
      } else {
        console.log(error);
        showLoader(false);
        showToast(t("Something went wrong"));
      }
    }
  }
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: "transparent",
            margin: 2,
            padding: 10,
            marginLeft: 1,
          }}
        ></View>
        {loader && <Loader isLoading={loader} />}
        <NewPopUp
          visible={popUp}
          numberOfButtons={1}
          button1Action={() => cleanupPopUp()}
          button1Text={"Dismiss"}
          text={popupText}
          iconType={popUpIconType}
          title={popUpTitle}
        />
        <Text style={{ color: "black", left: 20, marginBottom: 10 }}>
          {t("Bank Details")}
        </Text>
        <FloatingLabelInput
          staticLabel={true}
          editable={editable}
          keyboardType="number-pad"
          maxLength={30}
          containerStyles={styles.floatingContainer}
          labelStyles={styles.labelStyles}
          customLabelStyles={styles.customLabelStyles as CustomLabelProps}
          inputStyles={styles.inputStyles}
          onChangeText={(text: string) =>
            handleFormInputChange("BankDetail", "bankAccNo", text)
          }
          value={state["BankDetail"]["bankAccNo"] as string}
          label={t("strings:please_enter_bank_account_number")}
        />
        <FloatingLabelInput
          staticLabel={true}
          editable={editable}
          maxLength={30}
          containerStyles={styles.floatingContainer}
          labelStyles={styles.labelStyles}
          customLabelStyles={styles.customLabelStyles as CustomLabelProps}
          inputStyles={styles.inputStyles}
          onChangeText={(text: string) =>
            handleFormInputChange("BankDetail", "bankIfsc", text)
          }
          value={state["BankDetail"]["bankIfsc"] as string}
          label={t("strings:ifsc")}
        />
        <View style={styles.viewNew}>
          <Picker
            mode="dropdown"
            style={{
              color: "black",
              borderWidth: 2,
              borderColor: "black",
            }}
            selectedValue={selectedValue}
            onValueChange={(value: string) => {
              setSelectedValue(value);
              handleFormInputChange("BankDetail", "bankAccType", value);
            }}
          >
            {items.map((item, index) => {
              return (
                <Picker.Item
                  label={item}
                  value={index === 0 ? "undefined" : item}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-evenly",
            marginBottom: 20,
          }}
        >
          {state.BankDetail.bankDataPresent ? (
            <Buttons
              variant="verified"
              label="Verified"
              width={width / 3}
              icon={require("@/src/assets/images/green_tick.jpg")}
              iconWidth={20}
              iconHeight={20}
              iconGap={8}
            />
          ) : (
            <Buttons
              label="Verify"
              variant="verifyBank"
              width={width / 3}
              onPress={getBankDetails}
            />
          )}
          <Buttons
            label="Reset"
            variant="outlined"
            width={width / 3}
            onPress={resetBankDetails}
            icon={require("@/src/assets/images/update.png")}
            iconWidth={16}
            iconHeight={16}
            iconGap={8}
          />
        </View>
        {registrationBankDetails.map((field) => (
          <Field
            id={field.id}
            key={field.id}
            type={field.type}
            data={field.data}
            label={field.label}
            properties={field.properties}
            source={field.source}
          />
        ))}
        <View
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Buttons
            label="Submit"
            variant="filled"
            onPress={handleProceed}
            width={350}
            icon={require("@/src/assets/images/arrow.png")}
            iconWidth={50}
            iconHeight={20}
            iconGap={10}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewNew: {
    backgroundColor: "white",
    height: height / 17,
    margin: 20,
    borderRadius: 5,
    flexDirection: "column",
    marginTop: 0,
    borderWidth: 2,
    borderColor: "black",
  },
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 5,
    height: height / 15,
    width: width / 1.15,
    borderWidth: 1.8,
    borderColor: "#D3D3D3",
    margin: 20,
    marginTop: 5,
    color: "black",
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  smallContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    gap: 10,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  blackDetail: {
    color: colors.black,
    fontSize: 14,
  },
  smallDetail: {
    marginLeft: 10,
    color: colors.black,
    fontSize: 14,
  },
  greyDetail: {
    color: colors.grey,
    fontSize: 14,
  },
  floatingcontainerstyle: {
    width: width / 1.05,
  },
  ac_icon: {
    borderRadius: 50,
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",
  },
  userDetails: { color: "grey" },
  textHeader: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    color: "black",
  },
});

export default UpdateBankDetails;
