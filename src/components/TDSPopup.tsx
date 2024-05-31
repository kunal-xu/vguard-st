import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import Buttons from "./Buttons";
import { TDS_CONSENT_MESSAGE } from "../utils/constants";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import React from "react";
import colors from "../utils/colors";

interface TDSPopupProps {
  popupContent: string;
  onClose: () => void;
  onSubmit: () => void;
}
const TDSPopup = ({
  popupContent = TDS_CONSENT_MESSAGE?.EMPTY,
  onClose,
  onSubmit,
}: TDSPopupProps) => {
  const { t } = useTranslation();
  const [RenderingPopup, setRenderingPopup] = useState<string>(popupContent);
  const [tdsState, setTdsState] = useState({
    visible: true,
    tdsContent: "",
    tdsSubmit: false,
    internalNavigation: false,
  });
  const [loader, showLoader] = useState(false);


  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={tdsState.visible}
        onRequestClose={() => undefined}
      >
        <TouchableOpacity style={styles.container} activeOpacity={1}>
          <View style={styles.contentContainer}>
            {(RenderingPopup == TDS_CONSENT_MESSAGE?.EMPTY ||
              RenderingPopup == TDS_CONSENT_MESSAGE?.YES ||
              RenderingPopup == TDS_CONSENT_MESSAGE?.PREVIEW ||
              RenderingPopup == TDS_CONSENT_MESSAGE?.UPLOADED) && (
              <View>
                <Text style={styles.header}>{t("TDS Consent")}</Text>
              </View>
            )}

            {RenderingPopup == TDS_CONSENT_MESSAGE?.UPLOADED && (
              <View style={styles.selectiveLayout}>
                <Text style={styles.uploadedMessage}>
                  {t(
                    "Dear User, please review your PAN & Aadhar details and provide your consent and authorize V Guard Industries Ltd. to deduct TDS under section 194R which can be credited back at the FY end if the redemption amount is less than 20000.\n\nTDS percentages can be 10% or 20% depending on PAN information (Pan Status, Aadhar & PAN Link Status, ITR Status)."
                  )}
                </Text>
              </View>
            )}

            {(RenderingPopup == TDS_CONSENT_MESSAGE?.UPLOADED ||
              RenderingPopup == TDS_CONSENT_MESSAGE?.EMPTY) && (
              <Text
                style={{
                  color: colors?.black,
                  fontSize: 12,
                  textAlign: "center",
                  alignSelf: "center",
                  fontStyle: "italic",
                  width: "90%",
                  marginTop: 10,
                }}
              >
                {t(
                  "*It will be applicable for both new earnings and existing point balance"
                )}
              </Text>
            )}

            <View style={styles.buttonWrapper}>
              {RenderingPopup == TDS_CONSENT_MESSAGE?.UPLOADED && (
                <View>
                  <Buttons
                    label={t("Submit")}
                    variant="filled"
                    onPress={onSubmit}
                    // width={100}
                    fontSize={17}
                    wrapperCustomStyle={styles.customButton}
                  />
                  <Buttons
                    label={t("Go Back")}
                    variant="filled"
                    onPress={onClose}
                    // width={100}
                    fontSize={17}
                    wrapperCustomStyle={styles.customButton}
                  />
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Loader isLoading={loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "white",
    borderRadius: 10,
    width: responsiveScreenWidth(90),
    minHeight: responsiveScreenHeight(20),
  },
  header: {
    color: "black",
    fontSize: 20,
    fontWeight: "800",
    fontStyle: "italic",
    alignSelf: "center",
  },
  selectiveContent: {
    width: "100%",
    color: "black",
    flexWrap: "wrap",
  },
  selectiveText: {
    color: "black",
    flexWrap: "wrap",
    marginTop: 5,
    marginRight: 20,
    width: responsiveScreenWidth(90) - responsiveScreenWidth(15),
    fontSize: 15,
    // width:"85%"
  },
  selectiveLayout: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  tac: {
    color: "#2852fa",
    textDecorationLine: "underline",
    fontSize: 14,
    marginTop: 20,
  },
  customButton: {
    borderRadius: 20,
    marginVertical: 10,
    width: 140,
  },
  confirmMessage: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: "10%",
    marginTop: 20,
    marginBottom: 50,
    // alignSelf:"center"
  },
  acceptMessage: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: "15%",
    marginTop: 20,
    marginBottom: 20,
  },
  uploadedMessage: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  verifiedMessage: {
    color: "black",
    fontSize: 17,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  invalidMessage: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 5,
  },
});

export default TDSPopup;