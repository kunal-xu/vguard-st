import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";

import { getMonthWiseEarning, getUser } from "@/src/utils/apiservice";
// import { getImages } from "../../../../../utils/FileUtils";
// import DatePicker from "../../../../../components/DatePicker";
import { Picker } from "@react-native-picker/picker";
import NeedHelp from "@/src/components/NeedHelp";
import CustomTouchableOption from "@/src/components/CustomTouchableOption";
import { useData } from "@/src/hooks/useData";
import { height } from "@/src/utils/dimensions";
import Buttons from "@/src/components/Buttons";
import colors from "@/src/utils/colors";
import DatePicker from "@/src/components/DatePicker";

const Dashboard = () => {
  const baseURL = "https://www.vguardrishta.com/img/appImages/Profile/";
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [show, setShow] = useState(false);
  const items: any[] = ["Select Product", "VNS 400 DIGITAL"];
  const [selectedValue, setSelectedValue] = useState<undefined>();
  const [earnedPoints, setEarnedPoints] = useState("0");
  const [redeemablePoints, setRedeemablePoints] = useState("0");
  const [redeemedPoints, setRedeemedPoints] = useState("0");
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
        setEarnedPoints(state.EarnedPoints as string);
        setRedeemablePoints(state.RedeemablePoints as string);
        setRedeemedPoints(state.RedeemedPoints as string);
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);
  const handleSearch = async () => {
    if (fromDate === "") {
      ToastAndroid.show("Please select the starting date", ToastAndroid.LONG);
      return;
    }
    if (toDate === "") {
      ToastAndroid.show("Please select the end date", ToastAndroid.LONG);
      return;
    }
    if (toDate < fromDate) {
      ToastAndroid.show(
        "Please select the correct date range",
        ToastAndroid.LONG
      );
      return;
    }
    // ToastAndroid.show("Please complete a scan to download the report", ToastAndroid.LONG);
    try {
      const response = await getMonthWiseEarning(fromDate, toDate);
      const reponseData = response.data;
      setEarnedPoints(reponseData.EarnedPoints as string);
      setRedeemablePoints(reponseData.RedeemablePoints as string);
      setRedeemedPoints(reponseData.RedeemedPoints as string);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (userData.userRole && userData.userImage) {

  //     const getImage = async () => {
  //       try {
  //         const profileImage = getImages(
  //           userData.userImage,
  //           'PROFILE',
  //         );
  //         setProfileImage(profileImage);
  //       } catch (error) {
  //         console.log('Error while fetching profile image:', error);
  //       }
  //     };

  //     getImage();
  //   }
  // }, [userData.userRole, userData.userImage]);
  // const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  // const [selectedMonth, setSelectedMonth] = useState(moment().format("MM"));
  // const [selectedDay, setSelectedDay] = useState(moment().format("DD"));
  // useEffect(() => {
  //   getMonthWiseEarning(selectedMonth, selectedYear)
  //     .then((data) => data.data)
  //     .then((data) => {
  //       console.log(data, "-------");
  //       setPointsData(data);
  //     });
  // }, []);

  return (
    <ScrollView>
      <View style={styles.mainWrapper}>
        <View style={styles.profileDetails}>
          <View style={styles.ImageProfile}>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/OIG4.nmrti4QcluTglrqH8vtp?pid=ImgGn",
              }}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.textDetail}>{state.Name}</Text>
            <Text style={styles.textDetail}>{state.RishtaID}</Text>
          </View>
        </View>
        <View style={styles.viewNew}>
          <Picker
            mode="dropdown"
            style={{
              color: "black",
              borderWidth: 2,
              borderColor: "black",
            }}
            selectedValue={selectedValue}
            onValueChange={(value, index) => {
              setSelectedValue(value);
            }}
          >
            {items?.map((item, index) => {
              return (
                <Picker.Item
                  label={item}
                  value={index === 0 ? "undefined" : item}
                />
              );
            })}
          </Picker>
        </View>

        <View style={styles.points}>
          <View style={styles.leftPoint}>
            <Text style={styles.point}>
              {Number(earnedPoints)?.toFixed(1) || 0}
            </Text>
            <Text style={styles.greyText}>{t("strings:points_earned")}</Text>
          </View>
          <View style={styles.middlePoint}>
            <Text style={styles.point}>
              {Number(redeemablePoints)?.toFixed(1) || 0}
            </Text>
            <Text style={styles.greyText}>
              {t("strings:redeemable_points")}
            </Text>
          </View>
          <View style={styles.rightPoint}>
            <Text style={styles.point}>
              {Number(redeemedPoints)?.toFixed(1) || 0}
            </Text>
            <Text style={styles.greyText}>{t("TDS Kitty")}</Text>
          </View>
        </View>

        <View style={styles.container}>

        {show && (
        <DatePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
          <DatePicker
            label="Date (From)"
            date={fromDate}
            onDateChange={(selectedDate) => setFromDate(selectedDate)}
            minDate={state.InvitationDate}
          />
          <DatePicker
            label="Date (To)"
            date={toDate}
            onDateChange={(selectedDate) => setToDate(selectedDate)}
            minDate={state.InvitationDate}
          />
        </View>
        <View style={{ alignItems: "flex-end", marginTop: 20 }}>
          <Buttons
            variant="filled"
            label="Search"
            width="30%"
            onPress={handleSearch}
          />
        </View>
        <Text
          style={{ color: colors.grey, fontStyle: "italic", marginTop: 10 }}
        >
          By default, points are shown up-to-date for all enrolled product
          categories.
        </Text>
        <View style={styles.options}>
          <CustomTouchableOption
            text="strings:product_wise_earning"
            iconSource={require("../../../../assets/images/ic_bank_transfer.webp")}
            screenName="Product Wise Earning"
            disabled={false}
          />
          <CustomTouchableOption
            text="strings:scheme_wise_earning"
            iconSource={require("../../../../assets/images/ic_paytm_transfer.webp")}
            screenName="Scheme Wise Earning"
            disabled={false}
          />
          <CustomTouchableOption
            text="strings:your_rewards"
            iconSource={require("../../../../assets/images/ic_egift_cards.webp")}
            screenName="Your Rewards"
            disabled={false}
          />
        </View>
        <NeedHelp />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    padding: 15,
    backgroundColor: "white",
  },
  viewNew: {
    backgroundColor: "#fff",
    height: height / 17,
    margin: 20,
    borderRadius: 5,
    flexDirection: "column",
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: "black",
  },
  container: {
    flexDirection: "row", // Arrange items horizontally
    justifyContent: "space-between", // Add space between items
    paddingHorizontal: 16, // Adjust padding as needed
  },
  datepicker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: responsiveHeight(2),
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
  },
  profileDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    fontSize: responsiveFontSize(1.7),
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

  middlePoint: {
    width: responsiveWidth(30),
    height: 100,
    backgroundColor: colors.lightYellow,
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
    fontSize: responsiveFontSize(1.7),
    marginBottom: 10,
  },
  point: {
    fontWeight: "bold",
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: responsiveHeight(3),
  },
});

export default Dashboard;
