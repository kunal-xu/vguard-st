import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
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

const AddWarranty = () => {
  const { t } = useTranslation();
  const { customerState, customerDispatch } = useData();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [loader, showLoader] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-US");
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
      const responseData = response.data;
      showLoader(false);
      if (responseData.errorCode == 1) {
        var couponPoints = responseData.couponPoints;
      } else {
        setPopupVisible(true);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        ToastAndroid.show(`${error.errors[0].message}`, ToastAndroid.LONG);
      } else {
        showLoader(false);
        setPopupVisible(true);
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
        <Text style={styles.heading}>Warranty Registration</Text>
        <Text style={styles.label}>
          Provide customer details to earn points
        </Text>
      </View>
      {isPopupVisible && <NewPopUp />}
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
