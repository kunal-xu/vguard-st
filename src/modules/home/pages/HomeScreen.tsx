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
  Alert,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
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
import { useFocusEffect } from "@react-navigation/native";
import { getImages } from "../../../utils/FileUtils";
// import { checkAppVersion } from "../../common/services/AppUpdate";
// import { APP_URL } from "../../../utils/constants";

const HomeScreen = ({ navigation }) => {
  const baseURL = "https://www.vguardrishta.com/img/appImages/Profile/";

  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState("");
  const [userData, setUserData] = useState({
    userName: null,
    userCode: null,
    totalPointsEarned: 0,
    redeemablePoints: 0,
    redeemedPoints: 0,
    tdsKitty: 0,
    userImage: null,
    userRole: 10,
  });
  const [LoggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (!LoggedInUser) {
      AsyncStorage.getItem("USER").then((r) => {
        const value = JSON.parse(r);
        setLoggedInUser(value);
        const user = {
          userName: value.Name,
          userCode: value.RishtaID,
          
          userRole: 10,
          totalPointsEarned: 0,
          redeemablePoints: 0,
          redeemedPoints: 0,
          tdsKitty: 0,
        };
        setUserData(user);
      });
    }
  }, [LoggedInUser]);

  // const getUser1 = () => {
  //   getUser().then((res) => {
  //     setUserData((prev) => ({
  //       ...prev,
  //       totalPointsEarned: res.otalPointsEarned,
  //       redeemablePoints: res?.pointsSummary?.redeemablePoints,
  //       redeemedPoints: res?.pointsSummary?.redeemedPoints,
  //       tdsKitty:res?.pointsSummary?.tdsKitty,
  //       userImage: res?.kycDetails?.selfie,
  //     }));
  //   });
  // };

  // async function checkApp(){
  //   const result = await checkAppVersion()
  //   if(!result)  Alert.alert(
  //     "Update Required",
  //     t("strings:update"),
  //     [
  //       {
  //         text: "Update Now",
  //         onPress: () => {
  //           BackHandler.exitApp()
  //           Linking.openURL(
  //             APP_URL
  //           );
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );

  // }

  // useFocusEffect(
  //   React.useCallback(() => {
  //     //checkApp();
  //     getUser1();
  //   }, [])
  // );

  // useEffect(() => {
  //   if (userData.userRole && userData.userImage) {
  //     // const getImage = async () => {
  //     //   try {
  //     //     const profileImage = getImages(userData.userImage, "PROFILE");
  //     //     setProfileImage(profileImage);
  //     //   } catch (error) {
  //     //     console.log("Error while fetching profile image:", error);
  //     //   }
  //     // };
  //     // getImage();
  //   }
  // // }, [userData.userRole, userData.userImage]);

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
                source={{ uri: profileImage }}
                style={{ width: "100%", height: "100%", borderRadius: 100 }}
                resizeMode="contain"
              />
            </ImageBackground>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.textDetail}>{userData.userName}</Text>
            <Text style={styles.textDetail}>{userData.userCode}</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
            >
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
            disabled
          >
            <Text style={styles.greyText}>{t("strings:points_earned")}</Text>

            <Text style={styles.point}>
              {Number(userData.totalPointsEarned)?.toFixed(1) || 0}
            </Text>
          </Pressable>
          <Pressable style={styles.middlePoint} disabled>
            <Text style={styles.greyText}>
              {t("strings:redeemable_points")}
            </Text>
            <Text style={styles.point}>
              {Number(userData.redeemablePoints)?.toFixed(1) || 0}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Redemption History")}
            style={styles.middlePoint}
            disabled
          >
            <Text style={styles.greyText}>{t("strings:points_redeemed")}</Text>
            <Text style={styles.point}>
              {Number(userData.redeemedPoints)?.toFixed(1) || 0}
            </Text>
          </Pressable>
          <Pressable disabled style={styles.rightPoint}>
            <Text style={styles.greyText}>{"TDS \nKitty"}</Text>
            <Text style={styles.point}>
              {Number(userData.tdsKitty)?.toFixed(1) || 0}
            </Text>
          </Pressable>
        </View>
        <View style={styles.dashboard}>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:scan_code"
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
              disabled={true}
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
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:info_desk"
              iconSource={require("../../../assets/images/ic_vguard_info.webp")}
              screenName="info"
              disabled={true}
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:welfare"
              iconSource={require("../../../assets/images/ic_welfare.webp")}
              screenName="Welfare"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:what_s_new"
              iconSource={require("../../../assets/images/ic_whats_new.webp")}
              screenName="new"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:raise_ticket"
              iconSource={require("../../../assets/images/ic_raise_ticket.webp")}
              screenName="ticket"
              disabled={true}
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:update_bank"
              iconSource={require("../../../assets/images/ic_raise_ticket.webp")}
              screenName="Update Bank"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:tds_certificate"
              iconSource={require("../../../assets/images/tds_ic.png")}
              screenName="TDS Certificate"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:engagement"
              iconSource={require("../../../assets/images/elink.png")}
              screenName="Engagement"
              disabled={true}
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
            {/* <CustomTouchableOption
              text="dashboard:options:manual"
              iconSource={require('../../../assets/images/ic_instruction_manual.jpeg')}
              screenName="manual"
            /> */}
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
    color: colors.lightBlack,
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
    marginLeft: 5,
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
