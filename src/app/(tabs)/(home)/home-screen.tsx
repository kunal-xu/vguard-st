import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomTouchableOption from "../../../components/CustomTouchableOption";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import NeedHelp from "../../../components/NeedHelp";
import { router } from "expo-router";
import colors from "@/src/utils/colors";
import CustomTabHeader from "@/src/components/CustomTabHeader";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import useProfile from "@/src/hooks/useProfile";
import { useData } from "@/src/hooks/useData";
import Constants from "expo-constants";
import { TabBarIcon } from "@/src/components/TabBarIcon";
import { useAuth } from "@/src/hooks/useAuth";
import NewPopUp from "@/src/components/NewPopup";
import OpenPopupOnOpeningApp from "@/src/components/OpenPopupOnOpeningApp";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { state } = useData();
  const { logout } = useAuth();
  const [logoutPopup, setLogoutPopup] = useState(false);
  useProfile();

  interface Item {
    type: "header" | "dashboard" | "needHelp";
  }
  const data: Item[] = [
    { type: "header" },
    { type: "dashboard" },
    { type: "needHelp" },
  ];

  const renderItem: ListRenderItem<Item> = ({ item }) => {
    switch (item.type) {
      case "header":
        return (
          <View style={styles.headerContainer}>
            <CustomTabHeader />
            <OpenPopupOnOpeningApp />
            <NewPopUp
              visible={logoutPopup}
              numberOfButtons={2}
              button1Action={() => setLogoutPopup(false)}
              button2Action={() => logout()}
              button1Text={"Dismiss"}
              button2Text={"Yes"}
              text={"Are you sure you want to Log out?"}
              iconType={"Alert"}
              title={"Logout"}
            />
            <View style={styles.profileDetails}>
              <View style={styles.ImageProfile}>
                <Image
                  source={{
                    uri: state.Selfie as string,
                  }}
                  placeholder={{
                    uri: "https://th.bing.com/th/id/OIG4.nmrti4QcluTglrqH8vtp",
                  }}
                  transition={1000}
                  style={{ width: "100%", height: "100%", borderRadius: 100 }}
                  contentFit="cover"
                />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.textDetail}>
                  {state.Name || "ST Account"}
                </Text>
                <Text style={{ fontSize: responsiveFontSize(1.7) }}>
                  Rishta ID: {state.RishtaID || "VGIL30000"}
                </Text>
              </View>
              <Pressable onPress={() => setLogoutPopup(true)}>
                <TabBarIcon name={"log-out-outline"} />
              </Pressable>
            </View>

            <View style={styles.points}>
              <Pressable
                onPress={() => router.push("/(scan)/unique-code-history")}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.5 : 10 },
                  styles.leftPoint,
                ]}
              >
                <Feather name="check-circle" size={40} color="black" />
                <Text style={styles.point}>
                  {Number(state.EarnedPoints)?.toFixed(2) || 0}
                </Text>
                <Text style={styles.greyText}>Total Earnings</Text>
              </Pressable>
              <Pressable style={styles.middlePoint}>
                <MaterialIcons name="currency-rupee" size={40} color="black" />
                <Text style={styles.point}>
                  {Number(state.RedeemablePoints)?.toFixed(2) || 0}
                </Text>
                <Text style={styles.greyText}>Redeemable Points</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/(redeem)/redemption-history")}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.5 : 10 },
                  styles.rightPoint,
                ]}
              >
                <MaterialIcons name="redeem" size={40} color="black" />
                <Text style={styles.point}>
                  {Number(state.RedeemedPoints)?.toFixed(2) || 0}
                </Text>
                <Text style={styles.greyText}>Redeemed Points</Text>
              </Pressable>
            </View>
          </View>
        );
      case "dashboard":
        return (
          <View style={styles.dashboard}>
            <View style={styles.row}>
              <CustomTouchableOption
                text="strings:scan_out"
                iconSource={require("../../../assets/images/ic_scan_code.png")}
                screenName="(scan)"
                disabled={false}
              />
              <CustomTouchableOption
                text="strings:redeem_points"
                iconSource={require("../../../assets/images/ic_redeem_points.webp")}
                screenName="(redeem)"
                disabled={false}
              />
              <CustomTouchableOption
                text="strings:dashboard"
                iconSource={require("../../../assets/images/ic_dashboard.webp")}
                screenName="(dashboard)"
                disabled={false}
              />
            </View>
            <View style={styles.row}>
              <CustomTouchableOption
                text="strings:direct_order"
                iconSource={require("../../../assets/images/Group_575.png")}
                screenName="(directorder)"
                disabled={true}
              />
              <CustomTouchableOption
                text="strings:scheme_offers"
                iconSource={require("../../../assets/images/ic_scheme_offers.png")}
                screenName="(schemes)"
                disabled={false}
              />
              <CustomTouchableOption
                text="strings:update_bank"
                iconSource={require("../../../assets/images/ic_update_kyc.webp")}
                screenName="(bank)"
                disabled={false}
              />
            </View>
            <View style={styles.row}>
              <CustomTouchableOption
                text="strings:welfare"
                iconSource={require("../../../assets/images/training_info.png")}
                screenName="(training)"
                disabled={false}
              />
              <CustomTouchableOption
                text="strings:info_desk"
                iconSource={require("../../../assets/images/ic_vguard_info.webp")}
                screenName="(info)"
                disabled={false}
              />
              <CustomTouchableOption
                text="strings:raise_ticket"
                iconSource={require("../../../assets/images/ic_raise_ticket.webp")}
                screenName="(ticket)"
                disabled={false}
              />
            </View>
          </View>
        );

      case "needHelp":
        return <NeedHelp />;

      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.yellow} barStyle="dark-content" />
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={300}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
  headerContainer: {
    backgroundColor: colors.yellow,
    paddingBottom: responsiveHeight(3),
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileText: {
    flex: 1,
  },
  profileDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    fontSize: responsiveFontSize(1.7),
    padding: 16,
  },
  ImageProfile: {
    height: responsiveHeight(8),
    width: responsiveWidth(16),
    marginLeft: 8,
  },
  textDetail: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
  },
  points: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
  },
  leftPoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(13),
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  middlePoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(13),
    backgroundColor: colors.lightYellow,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  rightPoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(13),
    backgroundColor: colors.lightYellow,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  greyText: {
    width: "100%",
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: responsiveFontSize(1.6),
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
    gap: 8,
    justifyContent: "space-evenly",
  },
  nav: {
    color: colors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
