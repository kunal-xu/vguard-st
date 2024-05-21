import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";

import colors from "../../../../colors";
import { useTranslation } from "react-i18next";
import AuthNavigator from "../../auth/stack/AuthNavigator";
import CustomTouchableOption from "../../../components/CustomTouchableOption";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import NeedHelp from "../../../components/NeedHelp";
import { getFile, getUser } from "../../../utils/apiservice";
import { getImages } from "../../../utils/FileUtils";
import { useData } from "../../../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../hooks/useAuth";

// import { checkAppVersion } from "../../common/services/AppUpdate";
// import { APP_URL } from "../../../utils/constants";

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { state, dispatch, customerDispatch } = useData();
  const { logout } = useAuth();
  useFocusEffect(
    React.useCallback(() => {
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
          customerDispatch({
            type: "CLEAR_ALL_FIELDS",
            payload: {},
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
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.profileDetails}>
          <View style={styles.ImageProfile}>
            <ImageBackground
              source={require("../../../assets/images/ic_v_guards_user.png")}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
              resizeMode="contain"
            >
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/OIG4.nmrti4QcluTglrqH8vtp?pid=ImgGn",
                }}
                style={{ width: "100%", height: "100%", borderRadius: 100 }}
                resizeMode="contain"
              />
            </ImageBackground>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.textDetail}>{state.Name}</Text>
            <Text style={styles.textDetail}>{state.RishtaID}</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Text style={styles.viewProfile}>
                {t("strings:view_profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.points}>
          <Pressable
            onPress={() => navigation.navigate("Unique Code History")}
            style={styles.leftPoint}
          >
            <Text style={styles.greyText}>{t("strings:points_earned")}</Text>

            <Text style={styles.point}>
              {Number(state.EarnedPoints)?.toFixed(1) || 0}
            </Text>
          </Pressable>
          <Pressable style={styles.middlePoint}>
            <Text style={styles.greyText}>
              {t("strings:redeemable_points")}
            </Text>
            <Text style={styles.point}>
              {Number(state.RedeemablePoints)?.toFixed(1) || 0}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Redemption History")}
            style={styles.middlePoint}
          >
            <Text style={styles.greyText}>{t("strings:points_redeemed")}</Text>
            <Text style={styles.point}>
              {Number(state.RedeemedPoints)?.toFixed(1) || 0}
            </Text>
          </Pressable>
          <Pressable style={styles.rightPoint}>
            <Text style={styles.greyText}>{"TDS \nKitty"}</Text>
            <Text style={styles.point}>
              {Number(state.TDSKitty)?.toFixed(1) || 0}
            </Text>
          </Pressable>
        </View>
        <View style={styles.dashboard}>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:scan_out"
              iconSource={require("../../../assets/images/ic_scan_code.png")}
              screenName="Scan QR"
              disabled={false}
            />

            <CustomTouchableOption
              text="strings:redeem_points"
              iconSource={require("../../../assets/images/ic_redeem_points.webp")}
              screenName="Redeem Products"
              disabled={false}
            />
            <CustomTouchableOption
              text="strings:dashboard"
              iconSource={require("../../../assets/images/ic_dashboard.webp")}
              screenName="Dashboard"
              disabled={false}
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:direct_order"
              iconSource={require("../../../assets/images/Group_575.png")}
              screenName="Update KYC"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:scheme_offers"
              iconSource={require("../../../assets/images/ic_scheme_offers.png")}
              screenName="schemes"
              disabled={false}
            />
            <CustomTouchableOption
              text="strings:update_bank"
              iconSource={require("../../../assets/images/ic_update_kyc.webp")}
              screenName="Update Bank and UPI"
              disabled={false}
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:welfare"
              iconSource={require("../../../assets/images/training_info.png")}
              screenName="App Tutorials"
              disabled={false}
            />
            <CustomTouchableOption
              text="strings:what_s_new"
              iconSource={require("../../../assets/images/ic_whats_new.webp")}
              screenName="new"
              disabled={false}
            />
            <CustomTouchableOption
              text="strings:raise_ticket"
              iconSource={require("../../../assets/images/ic_raise_ticket.webp")}
              screenName="ticket"
              disabled={false}
            />
          </View>
          <View style={styles.lastrow}>
            <TouchableOpacity
              style={[styles.oval]}
              onPress={() =>
                Linking.openURL(
                  "https://www.vguardrishta.com/img/appImages/Instructionmanual.pdf"
                )
              }
            >
              <View style={[styles.optionIcon]}>
                <Image
                  source={require("../../../assets/images/ic_instruction_manual.jpeg")}
                  style={[{ flex: 1, width: "100%", height: "100%" }]}
                  resizeMode="contain"
                />
              </View>

              <Text style={[styles.nav]}>Instruction Manual</Text>
            </TouchableOpacity>
            <CustomTouchableOption
              text="strings:info_desk"
              iconSource={require("../../../assets/images/ic_vguard_info.webp")}
              screenName="info"
              disabled={false}
            />
          </View>
        </View>
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
  },
  profileDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    fontSize: responsiveFontSize(1.7),
  },
  viewProfile: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.7),
  },
  ImageProfile: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  textDetail: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.7),
  },
  points: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 30,
    marginLeft: -5,
  },
  leftPoint: {
    width: responsiveWidth(22.5),
    height: responsiveHeight(13),
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 20,
  },
  middlePoint: {
    width: responsiveWidth(22.5),
    height: responsiveHeight(13),
    backgroundColor: colors.lightYellow,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 20,
  },
  rightPoint: {
    width: responsiveWidth(22.5),
    height: responsiveHeight(13),
    backgroundColor: colors.lightYellow,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 20,
  },
  greyText: {
    width: "90%",
    color: colors.grey,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: responsiveFontSize(1.6),
    marginBottom: 10,
  },
  point: {
    fontWeight: "bold",
    color: "black",
    fontSize: responsiveFontSize(2),
    textAlign: "center",
  },
  dashboard: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    marginTop: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-around",
  },
  lastrow: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
    justifyContent: "flex-start",
  },
  oval: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(18),
    width: responsiveWidth(25),
    maxWidth: responsiveWidth(25),
    flexGrow: 1,
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    borderRadius: 100,
  },
  optionIcon: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    marginBottom: 20,
  },
  nav: {
    color: colors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
