import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getCategoryList, getRangeWiseEarning } from "@/src/utils/apiservice";
import { Picker } from "@react-native-picker/picker";
import NeedHelp from "@/src/components/NeedHelp";
import CustomTouchableOption from "@/src/components/CustomTouchableOption";
import { useData } from "@/src/hooks/useData";
import Buttons from "@/src/components/Buttons";
import colors from "@/src/utils/colors";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Category, PointsSummary, RangeWiseEarning } from "@/src/utils/types";
import { showToast } from "@/src/utils/showToast";
import { height } from "@/src/utils/dimensions";
import {
  DatePickerSectionProps,
  PointsSectionProps,
  ProductPickerSectionProps,
} from "@/src/utils/interfaces";

const ProductPickerSection = ({
  items,
  selectedValue,
  setSelectedValue,
}: ProductPickerSectionProps) => (
  <View style={styles.viewNew}>
    <Picker
      mode="dropdown"
      style={{
        color: "black",
        borderWidth: 2,
        borderColor: "black",
      }}
      selectedValue={selectedValue}
      onValueChange={(value) => {
        setSelectedValue(value);
      }}
    >
      {items?.map((item, index) => (
        <Picker.Item label={item} value={index === 0 ? "" : item} key={index} />
      ))}
    </Picker>
  </View>
);

const PointsSection = ({
  earnedPoints,
  redeemablePoints,
  tdsKitty,
}: PointsSectionProps) => (
  <View style={styles.points}>
    <Pressable style={styles.leftPoint}>
      <Feather name="check-circle" size={40} color="black" />
      <Text style={styles.point}>{Number(earnedPoints)?.toFixed(2) || 0}</Text>
      <Text style={styles.greyText}>Total Earnings</Text>
    </Pressable>
    <Pressable style={styles.middlePoint}>
      <MaterialIcons name="currency-rupee" size={40} color="black" />
      <Text style={styles.point}>
        {Number(redeemablePoints)?.toFixed(2) || 0}
      </Text>
      <Text style={styles.greyText}>Redeemable Points</Text>
    </Pressable>
    <Pressable style={styles.rightPoint}>
      <MaterialIcons name="account-balance-wallet" size={40} color="black" />
      <Text style={styles.point}>{Number(tdsKitty)?.toFixed(2) || 0}</Text>
      <Text style={styles.greyText}>TDS Kitty</Text>
    </Pressable>
  </View>
);

const DatePickerSection = ({
  fromDate,
  toDate,
  startDate,
  showStart,
  setShowStart,
  onChangeStartDate,
  showEnd,
  setShowEnd,
  onChangeEndDate,
}: DatePickerSectionProps) => (
  <View style={styles.calendarContainer}>
    <View style={styles.datePickerContainer}>
      <Text style={styles.label}>Date (From)</Text>
      <TouchableOpacity
        onPress={() => setShowStart(true)}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.textInput}
          placeholder="DD/MM/YYYY"
          value={(fromDate as Date).toLocaleDateString("en-GB")}
          editable={false}
        />
      </TouchableOpacity>
      {showStart && (
        <DateTimePicker
          value={fromDate as Date}
          minimumDate={startDate}
          maximumDate={new Date()}
          mode="date"
          display="default"
          onChange={(event: DateTimePickerEvent, date?: Date) => {
            if (event.type === "set") {
              onChangeStartDate(date as Date);
            } else {
              setShowStart(false);
            }
          }}
        />
      )}
    </View>
    <View style={styles.datePickerContainer}>
      <Text style={styles.label}>Date (To)</Text>
      <TouchableOpacity
        onPress={() => setShowEnd(true)}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.textInput}
          placeholder="DD/MM/YYYY"
          value={(toDate as Date).toLocaleDateString("en-GB")}
          editable={false}
        />
      </TouchableOpacity>
      {showEnd && (
        <DateTimePicker
          value={toDate as Date}
          mode="date"
          display="default"
          onChange={(event: DateTimePickerEvent, date?: Date) => {
            if (event.type === "set") {
              onChangeEndDate(date as Date);
            } else {
              setShowEnd(false);
            }
          }}
          maximumDate={new Date()}
          minimumDate={startDate}
        />
      )}
    </View>
  </View>
);

const SearchButtonSection = ({
  handleSearch,
}: {
  handleSearch: () => void;
}) => (
  <View>
    <View style={{ alignItems: "flex-end", marginTop: 10 }}>
      <Buttons
        variant="filled"
        label="Search"
        width="30%"
        onPress={handleSearch}
      />
    </View>
    <Text style={{ color: colors.grey, fontStyle: "italic", marginTop: 10 }}>
      By default, points are shown up-to-date for all enrolled product
      categories.
    </Text>
  </View>
);

const OptionsSection = () => (
  <View>
    <View style={styles.options}>
      <CustomTouchableOption
        text="strings:product_wise_earning"
        iconSource={require("@/src/assets/images/ic_bank_transfer.webp")}
        screenName="product-wise-earning"
        disabled={false}
      />
      <CustomTouchableOption
        text="strings:scheme_wise_earning"
        iconSource={require("@/src/assets/images/ic_paytm_transfer.webp")}
        screenName="scheme-wise-earning"
        disabled={true}
      />
      <CustomTouchableOption
        text="strings:your_rewards"
        iconSource={require("@/src/assets/images/ic_egift_cards.webp")}
        screenName="rewards"
        disabled={false}
      />
    </View>
    <NeedHelp />
  </View>
);

const Dashboard = () => {
  const { t } = useTranslation();
  const { state } = useData();
  const [items, setItems] = useState<(string | null)[]>(["All Products"]);
  const [selectedValue, setSelectedValue] = useState<string>("All Products");
  const [earnedPoints, setEarnedPoints] = useState("0");
  const [redeemablePoints, setRedeemablePoints] = useState("0");
  const [tdsKitty, setTdsKitty] = useState("0");
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [fromDate, setFromDate] = useState<Date>(
    new Date(state.InvitationDate as string)
  );
  const [toDate, setToDate] = useState<Date>(new Date());

  const startDate = new Date(state.InvitationDate as string);
  const endDate = new Date();

  useEffect(() => {
    (async () => {
      try {
        const response = await getCategoryList();
        const responseData: Category[] = response.data;
        setItems((prevItems) => [
          ...prevItems,
          ...responseData.map((category: Category) => category.prodCatName),
        ]);
      } catch (error) {
        console.log(error);
        showToast(t("Error fetching data. Please try again"));
      }
    })();
  }, []);

  useEffect(() => {
    setEarnedPoints(state.EarnedPoints as string);
    setRedeemablePoints(state.RedeemablePoints as string);
    setTdsKitty(state.TDSKitty as string);
  }, []);

  const data = [
    { type: "productPicker" },
    { type: "pointsSection" },
    { type: "datePicker" },
    { type: "search" },
    { type: "options" },
  ];

  const onChangeStartDate = (selectedDate: Date) => {
    setFromDate(selectedDate);
    setShowStart(false);
  };

  const onChangeEndDate = (selectedDate: Date) => {
    setToDate(selectedDate);
    setShowEnd(false);
  };

  const renderItem: ListRenderItem<(typeof data)[0]> = ({ item }) => {
    switch (item.type) {
      case "productPicker":
        return (
          <ProductPickerSection
            items={items as string[]}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        );
      case "pointsSection":
        return (
          <PointsSection
            earnedPoints={earnedPoints}
            redeemablePoints={redeemablePoints}
            tdsKitty={tdsKitty}
          />
        );
      case "datePicker":
        return (
          <DatePickerSection
            fromDate={fromDate}
            toDate={toDate}
            startDate={startDate}
            showStart={showStart}
            setShowStart={setShowStart}
            onChangeStartDate={onChangeStartDate}
            showEnd={showEnd}
            setShowEnd={setShowEnd}
            onChangeEndDate={onChangeEndDate}
          />
        );
      case "search":
        return <SearchButtonSection handleSearch={handleSearch} />;
      case "options":
        return <OptionsSection />;
      default:
        return null;
    }
  };

  const handleSearch = async () => {
    if (toDate < fromDate) {
      showToast("Please select the correct date range");
      return;
    }
    try {
      const payload = new RangeWiseEarning();
      payload.startDate = fromDate;
      payload.endDate = toDate;
      payload.product = selectedValue;
      const response = await getRangeWiseEarning(payload);
      const reponseData: PointsSummary = response.data;
      setEarnedPoints(reponseData.EarnedPoints as string);
      setRedeemablePoints(reponseData.RedeemablePoints as string);
      setTdsKitty(reponseData.RedeemedPoints as string);
    } catch (error) {
      console.log(error);
      showToast(t("Error fetching data. Please try again"));
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
