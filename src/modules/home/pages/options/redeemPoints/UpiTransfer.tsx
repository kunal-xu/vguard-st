import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../../../../../colors";
import { useTranslation } from "react-i18next";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Buttons from "../../../../../components/Buttons";
import arrowIcon from "../../../../../assets/images/arrow.png";
import PopupWithButton from "../../../../../components/PopupWithButton";
import { getUser, upiTransfer } from "../../../../../utils/apiservice";
import Loader from "../../../../../components/Loader";
import Popup from "../../../../../components/Popup";
import { useData } from "../../../../../hooks/useData";
import { NavigationProps } from "../../../../../utils/interfaces";

const UpiTransfer = ({ navigation }) => {
  const { t } = useTranslation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [upiCheck, setUpiCheck] = useState(true);
  const [points, setPoints] = useState(0);
  const [wallet, isWallet] = useState(false);

  const handleProceed = async () => {
    if (!points) {
      ToastAndroid.show(
        t("strings:please_enter_points_toredeem"),
        ToastAndroid.SHORT
      );
    } 
    // else if (!upiCheck) {
    //   ToastAndroid.show("Please check the wallet option", ToastAndroid.SHORT);
    else {
      try {
        setIsLoading(true);
        const payload = {
          amount: points,
        };
        setIsLoading(false);
        const response = await upiTransfer(payload);
        const responseData = response.data
        if (responseData.code === 1) {    
          setPopupVisible(true);  
          setPopupContent(responseData.message);
        } else {
          setPopupVisible(true);
          setPopupContent(responseData.message);
        }
      } catch (e) {
        setIsLoading(false);
      }
    }
  };

  const { state, dispatch } = useData();

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

  
  const redirectRedeemPoints = () => {
    navigation.pop();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Loader isLoading={isLoading} />
      <View style={styles.mainWrapper}>
        <View style={styles.points}>
          <View style={styles.leftPoint}>
            <Text style={styles.greyText}>{t("strings:points_balance")}</Text>
            <Text style={styles.point}>
              {state.BalancePoints ? state.BalancePoints : 0}
            </Text>
          </View>
          <View style={styles.rightPoint}>
            <Text style={styles.greyText}>{t("strings:points_redeemed")}</Text>
            <Text style={styles.point}>
              {state.RedeemedPoints ? state.RedeemedPoints : 0}
            </Text>
          </View>
        </View>
        <View style={styles.rightTextView}>
          <Text style={styles.rightText}>* 1 Point = 1 INR</Text>
        </View>
        <View style={styles.enterCode}>
          <View style={styles.topContainer}>
            <Text style={styles.smallText}>
              UPI ID Linked with your mobile number
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              style={styles.input}
              placeholder="UPI ID"
              placeholderTextColor={colors.grey}
              textAlign="center"
              editable={false}
              value={state.PaytmDetail.upiId}
            />
          </View>
        </View>
        <View style={styles.enterCode}>
          <View style={styles.topContainer}>
            <Text style={styles.smallText}>
              {t("strings:enter_points_to_be_redeemed")}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("strings:enter_points")}
              placeholderTextColor={colors.grey}
              textAlign="center"
              value={points}
              onChangeText={(txt) =>
                setPoints(txt)
              }
              keyboardType="numeric"
            />
          </View>
        </View>
        <Text style={styles.chooseWallet}>{t("strings:choose_wallet")}</Text>
        <TouchableOpacity>
          <View style={styles.wallet}>
            <Image
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                flex: 1,
                alignSelf: "center",
              }}
              source={require("../../../../../assets/images/upi_transfer.webp")}
            />
            {isWallet && (
              <Image
                resizeMode="contain"
                style={styles.check}
                source={require("../../../../../assets/images/tick_1.png")}
              />
            )}
            {!isWallet && (
              <Image
                resizeMode="contain"
                style={styles.check}
                source={require("../../../../../assets/images/tick_1_notSelected.png")}
              />
            )}
          </View>
        </TouchableOpacity>
        <Buttons
          style={styles.button}
          label={t("strings:proceed")}
          variant={isWallet ? "filled" : "reduceOpacity"}
          onPress={() => handleProceed()}
          width="100%"
          iconHeight={10}
          iconWidth={30}
          iconGap={30}
          icon={arrowIcon}
        />
      </View>
      <PopupWithButton
        buttonText="Find UPI ID"
        isVisible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        
      >
        <Text style={styles.popupText}>
          Please click on find to get UPI ID linked with your registered mobile
          number.
        </Text>
      </PopupWithButton>
      <PopupWithButton
        buttonText="Proceed"
      >
        <Text style={styles.popupText}>Below UPI-VPA found linked. {"\n"}</Text>
        <Text style={styles.italics}>testvguardrishta@okhdfcbank</Text>
      </PopupWithButton>
      <PopupWithButton
        buttonText="Ok"
      >
        <Text style={styles.popupText}>No UPI-VPA linked found.</Text>
      </PopupWithButton>
      {/* {isUpiTransfer && (
        <Popup isVisible={isUpiTransfer} onClose={() => redirectRedeemPoints()}>
          {popupContent}
        </Popup>
      )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  italics: {
    fontWeight: 200,
    fontStyle: "italic",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  mainWrapper: {
    padding: 15,
  },
  points: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 30,
  },
  leftPoint: {
    width: "50%",
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  rightPoint: {
    width: "50%",
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  greyText: {
    width: "90%",
    color: colors.grey,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: responsiveFontSize(1.7),
    marginBottom: 10,
  },
  point: {
    fontWeight: "bold",
    color: "black",
    fontSize: responsiveFontSize(1.7),
    textAlign: "center",
  },
  rightText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.5),
  },
  rightTextView: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
    marginTop: 5,
  },
  smallText: {
    textAlign: "center",
    color: colors.black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
  },
  enterCode: {
    marginTop: 20,
    width: "100%",
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    height: 100,
    display: "flex",
    flexDirection: "column",
  },
  chooseWallet: {
    marginTop: 20,
    color: colors.black,
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    fontWeight: "bold",
  },
  wallet: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  check: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 20,
  },
  topContainer: {
    borderBottomWidth: 2,
    borderColor: colors.lightGrey,
    padding: 10,
    height: 50,
    flexGrow: 1,
  },
  bottomContainer: {
    flexGrow: 1,
    height: 50,
  },
  input: {
    padding: 10,
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    color: colors.black,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: "30%",
    width: "80%",
    padding: 30,
    backgroundColor: colors.yellow,
    borderRadius: 10,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: responsiveHeight(8),
    height: responsiveHeight(8),
  },
  closeButtonText: {
    color: "blue",
  },
  popupText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.2),
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: responsiveHeight(3),
    width: "70%",
  },
  buttonText: {
    color: colors.black,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 20,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 25,
    elevation: 10,
  },
  popupText: {
    color: colors.black,
    fontWeight: "bold",
  },
});

export default UpiTransfer;
