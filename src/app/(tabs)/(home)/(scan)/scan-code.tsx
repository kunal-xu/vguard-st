import React, { useState } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { validateCoupon } from "@/src/utils/apiservice";
import colors from "@/src/utils/colors";
import Popup from "@/src/components/Popup";
import Loader from "@/src/components/Loader";
import PopupWithOkAndCancel from "@/src/components/PopupWithOkAndCancel";
import NeedHelp from "@/src/components/NeedHelp";
import getLocation from "@/src/utils/geolocation";
import Buttons from "@/src/components/Buttons";
import { useData } from "@/src/hooks/useData";
import { Image } from "expo-image";
import { blurhash } from "@/src/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";

interface ScanCodeProps {
  navigation: any;
  route: any;
}

interface OkPopupContent {
  text: string;
  okAction: (() => void) | null;
}

const ScanCode: React.FC<ScanCodeProps> = () => {
  const { t } = useTranslation();
  const [qrCode, setQrcode] = useState<string>("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isOkPopupVisible, setOkPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [loader, showLoader] = useState(false);
  const [camera, setCamera] = useState(false);
  const [torch, setTorch] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [okPopupContent, setOkPopupContent] = useState<OkPopupContent>({
    text: "",
    okAction: null,
  });
  const [CouponData, setCouponData] = useState({
    couponCode: "",
    pin: "",
    latitude: "",
    longitude: "",
    geolocation: "",
  });
  const [isFocused, setIsFocused] = useState(false);

  const { state, customerState, customerDispatch } = useData();

  async function isValidBarcode(CouponData: any, pinFourDigit: string) {
    var result = null;
    if (pinFourDigit == "") {
      result = await validateCoupon(CouponData);
      return result;
    } else {
      CouponData.pin = pinFourDigit;
      result = await validateCoupon(CouponData);
      return result;
    }
  }

  const getUserLocation = () => {
    getLocation()
      .then((position) => {
        if (position != null) {
          setCouponData((prevData) => ({
            ...prevData,
            latitude: position.latitude.toString(),
            longitude: position.longitude.toString(),
          }));
          showLoader(false);
        } else {
          console.error("Position is undefined or null");
          showLoader(false);
        }
      })
      .catch((error) => {
        console.error("Error getting location:", error);
        showLoader(false);
      });
  };

  const handleQrText = (coupon: string) => {
    setQrcode(coupon);
    setCouponData((prevCouponData) => ({
      ...prevCouponData,
      couponCode: coupon,
    }));
  };

  async function sendBarcode() {
    getUserLocation();
    if (qrCode && qrCode != "") {
      if (qrCode.length < 16) {
        setPopupContent("Please enter valid 16 character barcode");
        setPopupVisible(true);
        return;
      }
      var apiResponse;
      try {
        apiResponse = await isValidBarcode(CouponData, "");
        const r = await apiResponse.data;

        if (r.errorCode == 1) {
          showLoader(false);
          setQrcode("");
          setOkPopupVisible(true);
          customerDispatch({
            type: "UPDATE_SUB_FIELD",
            payload: {
              field: "cresp",
              subfield: "couponCode",
              value: r.couponCode,
            },
          });
          customerDispatch({
            type: "UPDATE_SUB_FIELD",
            payload: {
              field: "cresp",
              subfield: "skuDetail",
              value: r.partName,
            },
          });
          customerDispatch({
            type: "UPDATE_SUB_FIELD",
            payload: {
              field: "cresp",
              subfield: "couponPoints",
              value: r.couponPoints,
            },
          });
          customerDispatch({
            type: "UPDATE_SUB_FIELD",
            payload: {
              field: "cresp",
              subfield: "partNumber",
              value: r.partNumber,
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "dealerNumber",
              subfield: undefined,
              value: state.Contact as string,
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "dealerAdd",
              subfield: undefined,
              value: state.AddressDetail.currentAddressLine1 as string,
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "dealerState",
              subfield: undefined,
              value: state.AddressDetail.currentState as string,
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "dealerName",
              subfield: undefined,
              value: state.Name as string,
            },
          });
          customerDispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "dealerPinCode",
              subfield: undefined,
              value: state.AddressDetail.currentPincode as string,
            },
          });

          setOkPopupContent({
            text: t("strings:valid_coupon_please_proceed_to_prod_regi"),
            okAction: () => navigation.navigate("Add Warranty"),
          });
        } else if (r.errorCode == 2) {
          showLoader(false);
        } else if (r.errorMsg && r.errorMsg != "") {
          setPopupVisible(true);
          setPopupContent(r.errorMsg);
          showLoader(false);
          // setPinPopupVisible(true);
        } else {
          setPopupVisible(true);
          setPopupContent(t("strings:something_wrong"));
          showLoader(false);
        }
      } catch (error) {
        showLoader(false);
        setPopupVisible(true);
        setPopupContent(t("strings:something_wrong"));
      }
    } else {
      setPopupVisible(true);
      setPopupContent("Please enter Coupon Code or Scan a QR");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {<Loader isLoading={loader} />}
      <View style={styles.mainWrapper}>
        <View
          style={{
            marginTop: 16,
          }}
        >
          <Text
            style={{
              color: colors.black,
              fontWeight: "bold",
              fontSize: responsiveFontSize(3),
              textAlign: "center",
            }}
          >
            Scan QR Code
          </Text>
          <Text
            style={{
              color: colors.black,
              fontWeight: "500",
              fontSize: responsiveFontSize(1.7),
              textAlign: "center",
            }}
          >
            {t(
              "Scan QR Code by clicking on QR code icon \n or \n enter the code manually"
            )}
          </Text>
        </View>
        {camera ? (
          <CameraView
            style={styles.camera}
            enableTorch={torch}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={(scanningResult: BarcodeScanningResult) => {
              setQrcode(scanningResult.data);
              setCamera(false);
            }}
            onCameraReady={() => setCameraReady(true)}
          >
            <View
              style={{
                flex: 1,
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 10,
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.3 : 1,
                  },
                ]}
                onPress={() => {
                  setTorch(false);
                  setCamera(!camera);
                }}
              >
                <MaterialIcons name="cancel" size={28} color={colors.white} />
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.3 : 1,
                  },
                ]}
                onPress={() => setTorch(!torch)}
              >
                {torch ? (
                  <MaterialIcons
                    name="flash-off"
                    size={28}
                    color={colors.white}
                  />
                ) : (
                  <MaterialIcons
                    name="flash-on"
                    size={28}
                    color={colors.white}
                  />
                )}
              </Pressable>
            </View>
          </CameraView>
        ) : (
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.3 : 1,
              },
              styles.imageContainer,
            ]}
            onPress={() => {
              setTorch(false);
              setCamera(true);
            }}
          >
            <Image
              source={require("../../../../assets/images/ic_scan_code_2-transformed.png")}
              style={{ flex: 1, width: "60%" }}
              contentFit="contain"
              contentPosition="center"
              placeholder={blurhash}
              transition={100}
            />
          </Pressable>
        )}
        <View style={styles.enterCode}>
          <TextInput
            value={qrCode}
            style={styles.input}
            placeholder={t("Enter QR Code Manually")}
            placeholderTextColor={colors.grey}
            textAlign="center"
            onChangeText={(text) => handleQrText(text)}
            keyboardType="numeric"
            maxLength={16}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            selection={
              isFocused
                ? { start: qrCode.length, end: qrCode.length }
                : { start: 0, end: 0 }
            }
          />
        </View>
        <Buttons
          label={t("strings:proceed")}
          variant="filled"
          onPress={async () => await sendBarcode()}
          width="90%"
        />
        <Buttons
          label={t("Go to History")}
          variant="outlined"
          onPress={async () => await sendBarcode()}
          width="90%"
        />
        <NeedHelp />
      </View>
      {isPopupVisible && (
        <Popup
          isVisible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        >
          {popupContent}
        </Popup>
      )}
      <PopupWithOkAndCancel
        isVisible={isOkPopupVisible}
        onClose={() => {
          setOkPopupVisible(false);
        }}
        onOk={() => {
          setOkPopupVisible(false);
          okPopupContent.okAction();
        }}
      >
        {okPopupContent.text}
      </PopupWithOkAndCancel>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  mainWrapper: {
    padding: 15,
    alignItems: "center",
    backgroundColor: colors.white,
    height: "100%",
    gap: 10,
  },
  header: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
  },
  camera: {
    height: responsiveHeight(40),
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: responsiveHeight(40),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  smallText: {
    textAlign: "center",
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
    height: responsiveHeight(5),
    fontWeight: "bold",
  },
  enterCode: {
    width: "90%",
    borderColor: colors.black,
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
  },
  topContainer: {
    borderBottomWidth: 2,
    borderColor: colors.lightGrey,
    padding: 10,
    height: responsiveHeight(5),
    flexGrow: 1,
  },
  input: {
    fontSize: responsiveHeight(2),
    textAlign: "center",
    color: colors.black,
    fontWeight: "bold",
  },
});

export default ScanCode;
