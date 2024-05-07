import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import arrowIcon from "../../../../../assets/images/arrow.png";
import { sendCustomerData } from "../../../../../utils/apiservice";
import RewardBox from "../../../../../components/ScratchCard";
import Popup from "../../../../../components/Popup";
import Loader from "../../../../../components/Loader";
import { height } from "../../../../../utils/dimensions";
import colors from "../../../../../../colors";
import Buttons from "../../../../../components/Buttons";
import { customerData } from "./fields/customerData";
import Field from "../../../../../components/Field";
import { useData } from "../../../../../hooks/useData";
import { NavigationProps } from "../../../../../utils/interfaces";

const AddWarranty = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation();
  const { customerState, customerDispatch } = useData();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [loader, showLoader] = useState(false);
  const [scratchCardProps, setScratchCardProps] = useState({
    rewardImage: {
      width: 100,
      height: 100,
      resourceLocation: require("../../../../../assets/images/ic_rewards_gift.png") /*resourceUrl:"https://www.leavesofgrassnewyork.com/cdn/shop/products/gift-card_612x.jpg?v=1614324792"*/,
    },
    rewardResultText: {
      color: "black",
      fontSize: 16,
      textContent: "YOU WON",
      fontWeight: "700",
    },
    text1: { color: "black", fontSize: 16, textContent: "", fontWeight: "700" },
    text2: {
      color: "black",
      fontSize: 16,
      textContent: "POINTS",
      fontWeight: "700",
    },
    text3: {
      color: "#9c9c9c",
      fontSize: 12,
      textContent: " ",
      fontWeight: "700",
    },
    button: {
      buttonColor: "#F0C300",
      buttonTextColor: "black",
      buttonText: "",
      buttonAction: () => {},
      fontWeight: "400",
    },
    textInput: false,
  });
  const [popupContent, setPopupContent] = useState("");
  const [scratchCard, setScratchCard] = useState(false);
  const [scratchable, setScratchable] = useState(false);

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
    showLoader(true);
    try {
      const response = await sendCustomerData(customerState);
      const responseData = response.data;
      showLoader(false);
      setPopupVisible(true);
      setPopupContent(responseData.message);
    } catch (error: any) {
      showLoader(false);
      setPopupVisible(true);
      setPopupContent(error.response.data.message);
    }
    /*
    const response = await sendCustomerData(customerState);
    const result = await response.data;
    showLoader(false);
    if (result.errorCode == 1) {
      var couponPoints = result.couponPoints;
      var basePoints = result.basePoints;
      // var couponPoints = "100";
      // var basePoints = "200";
      basePoints ? (basePoints = `Base Points: ${basePoints}`) : null;
      setScratchCardProps({
        rewardImage: {
          width: 100,
          height: 100,
          resourceLocation: require("../../../../../assets/images/ic_rewards_gift.png"),
        },
        rewardResultText: {
          color: colors.black,
          fontSize: 16,
          textContent: "YOU WON",
          fontWeight: "700",
        },
        text1: {
          color: colors.black,
          fontSize: 16,
          textContent: couponPoints,
          fontWeight: "700",
        },
        text2: {
          color: colors.black,
          fontSize: 16,
          textContent: "POINTS",
          fontWeight: "700",
        },
        text3: {
          color: colors.grey,
          fontSize: 12,
          textContent: basePoints,
          fontWeight: "700",
        },
        button: {
          buttonColor: colors.yellow,
          buttonTextColor: colors.black,
          buttonText: "Scan Again",
          buttonAction: () =>
            navigation.reset({ index: 0, routes: [{ name: "Scan Code" }] }),
          fontWeight: "400",
        },
        textInput: false,
      });
      setScratchCard(true);
    } else {
      setPopupVisible(true);
      setPopupContent(t("strings:something_wrong"));
    }
    */
  }
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {loader && <Loader isLoading={loader} />}
      <Text style={styles.heading}>Warranty Registration</Text>
      <Text style={styles.label}>Provide customer details to earn points</Text>
      {scratchCard && (
        <RewardBox
          scratchCardProps={scratchCardProps}
          visible={scratchCard}
          scratchable={scratchable}
          onClose={() =>
            navigation.reset({ index: 0, routes: [{ name: "Home" }] })
          }
        />
      )}
      {isPopupVisible && (
        <Popup
          isVisible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        >
          {popupContent}
        </Popup>
      )}
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
        <View style={styles.inputRow}>
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
