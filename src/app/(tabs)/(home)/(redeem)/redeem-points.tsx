import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useFocusEffect } from "@react-navigation/native";
import NeedHelp from "@/src/components/NeedHelp";
import ReusableCarousel from "@/src/components/ReusableCarousel";
import { getUser } from "@/src/utils/apiservice";
import { useData } from "@/src/hooks/useData";
import CustomTouchableOption from "@/src/components/CustomTouchableOption";
import colors from "@/src/utils/colors";
import PagerView from "react-native-pager-view";

const RedeemPoints = ({ navigation }) => {
  const { t } = useTranslation();
  // const carouselData = [
  //   {
  //     imageUrl: require("../../../../../../../../assets/images/banner_redeem_ppoints.webp"),
  //   },
  //   { imageUrl: require("../../../../../assets/images/banner.webp") },
  //   {
  //     imageUrl: require("../../../../../assets/images/banner_redeem_ppoints.webp"),
  //   },
  // ];

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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <PagerView
        style={{
          flex: 1,
        }}
        initialPage={0}
        useNext={false}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          key="1"
        >
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          key="2"
        >
          <Text>Second page</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          key="3"
        >
          <Text>Third page</Text>
        </View>
      </PagerView>

      <View style={styles.mainWrapper}>
        <View style={styles.carousel}>
          {/* <ReusableCarousel data={carouselData} /> */}
        </View>
        <View style={styles.points}>
          <View style={styles.leftPoint}>
            <Text style={styles.greyText}>
              {t("strings:redeemable_points")}
            </Text>

            <Text style={styles.point}>
              {Number(state.RedeemablePoints)?.toFixed(1) || 0}
            </Text>
          </View>
          <View style={styles.middlePoint}>
            <Text style={styles.greyText}>{t("strings:points_redeemed")}</Text>
            <Text style={styles.point}>
              {Number(state.RedeemedPoints)?.toFixed(1) || 0}
            </Text>
          </View>
          <View style={styles.rightPoint}>
            <Text style={styles.greyText}>{t("strings:tds_deducted")}</Text>
            <Text style={styles.point}>
              {Number(state.DeductedTDS)?.toFixed(1) || 0}
            </Text>
          </View>
        </View>
        <View style={styles.dashboard}>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:bank_transfer"
              iconSource={require("../../../../assets/images/ic_bank_transfer.webp")}
              screenName="Bank Transfer"
              disabled={false}
            />
            <CustomTouchableOption
              text="UPI Transfer"
              iconSource={require("../../../../assets/images/upi_transfer.webp")}
              screenName="UPI Transfer"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:redemption_history"
              iconSource={require("../../../../assets/images/ic_redemption_history.webp")}
              screenName="Redemption History"
              disabled={false}
            />
          </View>
          {/* <View style={styles.row}>
            <CustomTouchableOption
              text="strings:e_gift_cards"
              iconSource={require('../../../../../assets/images/ic_egift_cards.webp')}
              screenName="Gift Voucher"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:track_your_redemption"
              iconSource={require('../../../../../assets/images/ic_track_your_redemption.webp')}
              screenName="Track Redemption"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:redemption_history"
              iconSource={require('../../../../../assets/images/ic_redemption_history.webp')}
              screenName="Redemption History"
            />
          </View> */}
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
    paddingTop: 0,
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
    backgroundColor: colors.lightGrey,
    borderRadius: 100,
  },
  textDetail: {
    color: colors.black,
    fontWeight: "bold",
  },
  carousel: {
    backgroundColor: colors.white,
    marginLeft: -15,
  },
  points: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 5,
    // marginTop: 30,
  },
  leftPoint: {
    width: responsiveWidth(30),
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 20,
  },
  middlePoint: {
    width: responsiveWidth(30),
    height: 100,
    backgroundColor: colors.lightYellow,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 20,
  },
  rightPoint: {
    width: responsiveWidth(30),
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 20,
  },
  greyText: {
    width: "80%",
    color: colors.grey,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: responsiveFontSize(1.5),
    marginBottom: 10,
  },
  point: {
    fontWeight: "bold",
    color: colors.black,
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
});

export default RedeemPoints;
