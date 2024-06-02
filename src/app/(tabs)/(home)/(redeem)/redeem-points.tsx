import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  responsiveFontSize,
  responsiveHeight,
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
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

const RedeemPoints = () => {
  const { t } = useTranslation();
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
      <View
        style={{
          justifyContent: "center",
          height: "30%",
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <PagerView
          style={{
            flex: 1,
          }}
          initialPage={0}
          useNext={false}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            key="1"
          >
            <Image
              source={require("../../../../assets/images/redemption-screen.jpeg")}
              style={{ height: "100%", width: "90%" }}
            />
          </View>
        </PagerView>
      </View>
      <View style={styles.mainWrapper}>
        <View style={styles.carousel}>
        </View>
        <View style={styles.points}>
          <Pressable
            // onPress={() => navigation.navigate("Unique Code History")}
            style={styles.leftPoint}
          >
            <MaterialIcons name="currency-rupee" size={40} color="black" />
            <Text style={styles.point}>
              {Number(state.RedeemablePoints)?.toFixed(2) || 0}
            </Text>
            <Text style={styles.greyText}>Redeemable Points</Text>
          </Pressable>
          <Pressable style={styles.middlePoint}>
            <MaterialIcons name="redeem" size={40} color="black" />
            <Text style={styles.point}>
              {Number(state.RedeemedPoints)?.toFixed(2) || 0}
            </Text>
            <Text style={styles.greyText}>Redeemed Points</Text>
          </Pressable>
          <Pressable
            // onPress={() => navigation.navigate("Redemption History")}
            style={styles.rightPoint}
          >
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={40}
              color="black"
            />
            <Text style={styles.point}>
              {Number(state.DeductedTDS)?.toFixed(2) || 0}
            </Text>
            <Text style={styles.greyText}>Deducted TDS</Text>
          </Pressable>
        </View>
        <View style={styles.dashboard}>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:bank_transfer"
              iconSource={require("../../../../assets/images/ic_bank_transfer.webp")}
              screenName="bank-transfer"
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
              screenName="redemption-history"
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
