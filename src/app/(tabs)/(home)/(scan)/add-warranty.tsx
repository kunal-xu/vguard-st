import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import arrowIcon from "../../../../assets/images/arrow.png";
import { sendCustomerData } from "@/src/utils/apiservice";
import { customerData } from "./fields/customerData";
import { RegistrationCustomerDetailsSchema } from "@/src/utils/schemas/Registration";
import { z } from "zod";
import NewPopUp from "@/src/components/NewPopup";
import Loader from "@/src/components/Loader";
import { height } from "@/src/utils/dimensions";
import colors from "@/src/utils/colors";
import Buttons from "@/src/components/Buttons";
import Field from "@/src/components/Field";
import { useData } from "@/src/hooks/useData";
import { showToast } from "@/src/utils/showToast";
import usePopup from "@/src/hooks/usePopup";
import { useRouter } from "expo-router";
import { CouponRedeemResponse } from "@/src/utils/types";

export const AddWarranty = () => {
  const { t } = useTranslation();
  const { customerState, customerDispatch } = useData();
  const [loader, showLoader] = useState(false);
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

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-GB");
        customerDispatch({
          type: "UPDATE_SUB_FIELD",
          payload: {
            field: "cresp",
            subfield: "scanDate",
            value: formattedDate,
          },
        });
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    })();
  }, []);

  async function saveData() {
    try {
      RegistrationCustomerDetailsSchema.parse(customerState);
      showLoader(true);
      const response = await sendCustomerData(customerState);
      const responseData: CouponRedeemResponse = response.data;
      showLoader(false);
      if (responseData.errorCode == 1) {
        router.push({
          pathname: "success-page",
          params: { message: responseData.errorMsg },
        });
      } else {
        setPopUp(true);
        setPopUpIconType("Alert");
        setPopUpTitle(t("Warranty Registration Error"));
        setPopupText(responseData.errorMsg as string);
      }
    } catch (error: any) {
      showLoader(false);
      if (error instanceof z.ZodError) {
        showToast(`${error.errors[0].message}`);
      } else {
        showToast(t("strings:something_wrong"));
      }
    }
  }
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {loader && <Loader isLoading={loader} />}
      <View
        style={{
          padding: 15,
        }}
      >
        <NewPopUp
          visible={popUp}
          button1Action={() => cleanupPopUp()}
          button1Text={"Dismiss"}
          text={popupText}
          iconType={popUpIconType}
          title={popUpTitle}
        />
        <Text style={styles.heading}>Warranty Registration</Text>
        <Text style={styles.label}>
          Provide customer details to earn points
        </Text>
      </View>

      <View>
        {customerData.map((field) => (
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
            padding: 15,
          }}
        >
          <Buttons
            label={t("strings:submit")}
            variant="filled"
            onPress={() => saveData()}
            width="100%"
            iconHeight={10}
            iconWidth={30}
            iconGap={30}
            icon={arrowIcon}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    padding: 15,
    backgroundColor: colors.white,
  },
  heading: {
    color: colors.black,
    fontSize: responsiveFontSize(2.2),
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },
  inputArea: {
    borderColor: colors.lightGrey,
    borderRadius: 5,
    borderWidth: 1,
    width: "100%",
    color: colors.black,
    paddingHorizontal: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputRow: {
    marginTop: 15,
  },
  input: {
    color: "black",
    width: "90%",
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    width: "80%",
    alignSelf: "center",
    // height: height / 6,
    top: height / 2.8,
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  blackText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.2),
    width: "100%",
  },
  blackHeading: {
    color: colors.black,
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
  },
});

export default AddWarranty;
