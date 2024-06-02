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
  Pressable,
  Button,
  TextInput,
  Platform,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getMonthWiseEarning, getUser } from "@/src/utils/apiservice";
// import { getImages } from "../../../../../utils/FileUtils";
import { Picker } from "@react-native-picker/picker";
import NeedHelp from "@/src/components/NeedHelp";
import CustomTouchableOption from "@/src/components/CustomTouchableOption";
import { useData } from "@/src/hooks/useData";
import { height } from "@/src/utils/dimensions";
import Buttons from "@/src/components/Buttons";
import colors from "@/src/utils/colors";
import DatePicker from "@/src/components/DatePicker";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

/*
  API to fetch product details(user specific)
*/

const Dashboard = () => {
  const baseURL = "https://www.vguardrishta.com/img/appImages/Profile/";
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [show, setShow] = useState(false);
  const items: any[] = ["Select Product"];
  const [selectedValue, setSelectedValue] = useState<undefined>();
  const [earnedPoints, setEarnedPoints] = useState("0");
  const [redeemablePoints, setRedeemablePoints] = useState("0");
  const [redeemedPoints, setRedeemedPoints] = useState("0");
  const { state, dispatch } = useData();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [showStart, setShowStart] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showEnd, setShowEnd] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

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
  const showDatepicker = () => {
    showMode("date");
  };
  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  const showStartDatePicker = () => {
    setShowStart(true);
  };
  const showEndDatePicker = () => {
    setShowEnd(true);
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStart(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(Platform.OS === "ios");
    setEndDate(currentDate);
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
          <Pressable
            // onPress={() => navigation.navigate("Unique Code History")}
            style={styles.leftPoint}
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
            // onPress={() => navigation.navigate("Redemption History")}
            style={styles.rightPoint}
          >
            <MaterialIcons
              name="account-balance-wallet"
              size={40}
              color="black"
            />
            <Text style={styles.point}>
              {Number(state.RedeemedPoints)?.toFixed(2) || 0}
            </Text>
            <Text style={styles.greyText}>TDS Kitty</Text>
          </Pressable>
        </View>
        <View style={styles.calendarContainer}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>Date (From)</Text>
            <TouchableOpacity
              onPress={showStartDatePicker}
              style={styles.inputContainer}
            >
              <TextInput
                style={styles.textInput}
                placeholder="DD/MM/YYYY"
                value={startDate.toLocaleDateString("en-GB")}
                editable={false}
              />
            </TouchableOpacity>
            {showStart && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStartDate}
                minimumDate={state.InvitationDate}
              />
            )}
          </View>
          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>Date (To)</Text>
            <TouchableOpacity
              onPress={showEndDatePicker}
              style={styles.inputContainer}
            >
              <TextInput
                style={styles.textInput}
                placeholder="DD/MM/YYYY"
                value={endDate.toLocaleDateString("en-GB")}
                editable={false}
              />
            </TouchableOpacity>
            {showEnd && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onChangeEndDate}
                minimumDate={state.InvitationDate}
              />
            )}
          </View>
        </View>
        <View style={{ alignItems: "flex-end", marginTop: 10 }}>
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
            screenName="product-wise-earning"
            disabled={false}
          />
          <CustomTouchableOption
            text="strings:scheme_wise_earning"
            iconSource={require("../../../../assets/images/ic_paytm_transfer.webp")}
            screenName="scheme-wise-earning"
            disabled={false}
          />
          <CustomTouchableOption
            text="strings:your_rewards"
            iconSource={require("../../../../assets/images/ic_egift_cards.webp")}
            screenName="rewards"
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
  calendarContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  datePickerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "grey",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 6,
    padding: 10,
    width: 150,
    backgroundColor: "white",
  },
  textInput: {
    fontSize: 16,
    color: "black",
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

  rightPoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(13),
    backgroundColor: colors.lightYellow,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
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
