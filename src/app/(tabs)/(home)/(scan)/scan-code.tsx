import React, { useState, useEffect } from "react";
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
  Camera,
  CameraType,
  CameraView,
} from "expo-camera";
import { validateCoupon } from "@/src/utils/apiservice";
import colors from "@/src/utils/colors";
import Loader from "@/src/components/Loader";
import NeedHelp from "@/src/components/NeedHelp";
import Buttons from "@/src/components/Buttons";
import { useData } from "@/src/hooks/useData";
import { Image } from "expo-image";
import { blurhash } from "@/src/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import usePopup from "@/src/hooks/usePopup";
import { CouponRedeem, CouponRedeemResponse } from "@/src/utils/types";
import { getLocation } from "@/src/utils/geolocation";
import { showToast } from "@/src/utils/showToast";
import { useRouter } from "expo-router";
import NewPopUp from "@/src/components/NewPopup";
import { LocationObject, LocationObjectCoords } from "expo-location";

const ScanCode = () => {
  const { t } = useTranslation();
  const [qrCode, setQrcode] = useState<string>("");
  const [loader, showLoader] = useState(false);
  const [camera, setCamera] = useState(false);
  const [torch, setTorch] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const { state, customerDispatch } = useData();
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

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function sendBarcode() {
    const locationPermission: LocationObject | boolean = await getLocation();
    const regex = /^\d{16}$/;
    if (!locationPermission) {
      showToast(t("Please allow the location permission to continue."));
      return;
    }
    if (!regex.test(qrCode)) {
      showToast(t("Please provide a 16 digit QR Code to continue."));
      return;
    }
    const { latitude, longitude }: LocationObjectCoords =
      locationPermission.coords;
    const requestBody = {
      couponCode: qrCode,
      latitude: String(latitude),
      longitude: String(longitude),
    };
    try {
      showLoader(true);
      const response = await validateCoupon(requestBody);
      showLoader(false);
      const status: CouponRedeemResponse = new CouponRedeemResponse(
        response.data
      );
      if (status.errorCode === 1) {
        customerDispatch({
          type: "UPDATE_SUB_FIELD",
          payload: {
            field: "cresp",
            subfield: "couponCode",
            value: status.couponCode as string,
          },
        });
        customerDispatch({
          type: "UPDATE_SUB_FIELD",
          payload: {
            field: "cresp",
            subfield: "skuDetail",
            value: status.partName as string,
          },
        });
        customerDispatch({
          type: "UPDATE_SUB_FIELD",
          payload: {
            field: "cresp",
            subfield: "couponPoints",
            value: status.couponPoints as string,
          },
        });
        customerDispatch({
          type: "UPDATE_SUB_FIELD",
          payload: {
            field: "cresp",
            subfield: "partNumber",
            value: status.partNumber as string,
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
        router.push({
          pathname: "add-warranty",
        });
      } else {
        setPopUp(true);
        setPopUpIconType("Alert");
        setPopUpTitle(t("Validation Failed"));
        setPopupText(status.errorMsg as string);
      }
    } catch (error) {
      showLoader(false);
      showToast(t("strings:something_wrong"));
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {<Loader isLoading={loader} />}
      <View style={styles.mainWrapper}>
        <NewPopUp
          visible={popUp}
          button1Action={() => cleanupPopUp()}
          button1Text={"Dismiss"}
          text={popupText}
          iconType={popUpIconType}
          title={popUpTitle}
        />
        <View style={{ marginTop: 16 }}>
          <Text style={styles.title}>Scan QR Code</Text>
          <Text style={styles.subtitle}>
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
            <View style={styles.cameraControls}>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1 }]}
                onPress={() => {
                  setTorch(false);
                  setCamera(!camera);
                }}
              >
                <MaterialIcons name="cancel" size={28} color={colors.white} />
              </Pressable>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1 }]}
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
              source={require("@/src/assets/images/ic_scan_code_2-transformed.png")}
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
            onChangeText={(text: string) => setQrcode(text)}
            placeholder={t("Enter QR Code Manually")}
            placeholderTextColor={colors.grey}
            textAlign="center"
            keyboardType="numeric"
            maxLength={16}
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
          onPress={async () =>
            router.push({
              pathname: "unique-code-history",
            })
          }
          width="90%"
        />
        <NeedHelp />
      </View>
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
  title: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(3),
    textAlign: "center",
  },
  subtitle: {
    color: colors.black,
    fontWeight: "500",
    fontSize: responsiveFontSize(1.7),
    textAlign: "center",
  },
  camera: {
    height: responsiveHeight(40),
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraControls: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  imageContainer: {
    height: responsiveHeight(40),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  enterCode: {
    width: "90%",
    borderColor: colors.black,
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
  },
  input: {
    fontSize: responsiveHeight(2),
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ScanCode;
