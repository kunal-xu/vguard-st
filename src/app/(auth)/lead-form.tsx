import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useTranslation } from "react-i18next";
import { height, width } from "@/src/utils/dimensions";
import Loader from "@/src//components/Loader";
import Buttons from "@/src//components/Buttons";
import { addLeadForm } from "@/src//utils/apiservice";
import NeedHelp from "@/src/components/NeedHelp";
import colors from "@/src//utils/colors";
import { Avatar } from "react-native-paper";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import {
  CustomLabelProps,
  FloatingLabelInput,
} from "react-native-floating-label-input";
import { useLocalSearchParams, useRouter } from "expo-router";
import { showToast } from "@/src/utils/showToast";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import NewPopUp from "@/src/components/NewPopup";
import usePopup from "@/src/hooks/usePopup";
import Constants from "expo-constants";

const LeadForm = () => {
  const { contact } = useLocalSearchParams();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [loader, showLoader] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState([]);
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

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const data = [
    { label: "AC", value: "AC", id: "1" },
    { label: "TV", value: "TV", id: "2" },
    { label: "Refrigerator", value: "Refrigerator", id: "3" },
    { label: "Washing machine", value: "Washing machine", id: "4" },
    { label: "Others", value: "Others", id: "5" },
  ];

  function formatDate(date: string | number | Date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  }

  async function addLead() {
    if (name.length === 0 || pincode.length === 0 || selected.length === 0) {
      showToast(t("Please fill all the details"));
      return;
    }
    showLoader(true);
    try {
      const today = new Date();
      const formattedDate = formatDate(today);
      let values = "";
      selected.map((item: object) => {
        values += item.value;
        values += ", ";
      });
      values = values.substring(0, values.length - 2);
      const body = {
        Name: name,
        DateOfLead: formattedDate,
        ContactNumber: contact,
        Pincode: pincode,
        ServiceCategories: values,
      };
      const validationResponse = await addLeadForm(body);
      showLoader(false);
      const validationResponseData = validationResponse.data;
      if (validationResponseData.code === 200) {
        const successMessage = validationResponseData.message;
        setPopUp(true);
        setPopUpIconType("Check");
        setPopUpTitle("Lead Form");
        setPopupText(successMessage);
      } else {
        const errorMessage = validationResponseData.message;
        setPopUp(true);
        setPopUpIconType("Alert");
        setPopUpTitle("Lead Form");
        setPopupText(errorMessage);
      }
    } catch (error: any) {
      showLoader(false);
      setPopUp(true);
      setPopUpIconType("Alert");
      setPopUpTitle("Lead Form");
      setPopupText(error.response.data.message || "An error occurred.");
      console.error("Error during validation:", error);
    }
  }

  const handleSelectItem = (item) => {
    if (
      selected.find((selectedItem: { id: any }) => selectedItem.id === item.id)
    ) {
      setSelected(selected.filter((i: { id: any }) => i.id !== item.id));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        paddingTop: Constants.statusBarHeight,
      }}
    >
      {loader && <Loader isLoading={loader} />}
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NewPopUp
        visible={popUp}
        button1Action={() => {
          cleanupPopUp();
          router.replace("(auth)/login-with-number");
        }}
        button1Text={"Dismiss"}
        text={popupText}
        iconType={popUpIconType}
        title={popUpTitle}
      />
      <Loader isLoading={loader} />
      <View style={{ backgroundColor: "white", margin: 25 }}>
        <View
          style={{
            backgroundColor: "white",
            height: height / 8,
            margin: 10,
            flexDirection: "row",
            width: width,
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Avatar.Image
            size={80}
            source={require("../../assets/images/ac_icon.png")}
          />
          <View
            style={{
              marginLeft: 10,
              width: width / 2,
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                fontWeight: "bold",
                color: "black",
              }}
            >
              {t("Lead Form")}
            </Text>
          </View>
        </View>
        <FloatingLabelInput
          staticLabel={true}
          containerStyles={styles.floatingContainer}
          labelStyles={styles.labelStyles}
          customLabelStyles={styles.customLabelStyles as CustomLabelProps}
          inputStyles={styles.inputStyles}
          onChangeText={(text: string) => setName(text)}
          value={name}
          label={t("Name")}
        />

        <FloatingLabelInput
          staticLabel={true}
          editable={false}
          containerStyles={styles.floatingContainer}
          labelStyles={styles.labelStyles}
          customLabelStyles={styles.customLabelStyles as CustomLabelProps}
          inputStyles={styles.inputStyles}
          value={contact as string}
          label={t("Contact")}
        />

        <FloatingLabelInput
          staticLabel={true}
          keyboardType="number-pad"
          containerStyles={styles.floatingContainer}
          labelStyles={styles.labelStyles}
          customLabelStyles={styles.customLabelStyles as CustomLabelProps}
          inputStyles={styles.inputStyles}
          onChangeText={(text: string) => setPincode(text)}
          maxLength={6}
          value={pincode}
          label={t("Pincode")}
        />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
            <Text style={styles.itemText}>Categories</Text>
            {isExpanded ? (
              <Ionicons
                name="arrow-up-circle"
                size={24}
                color={colors.yellow}
              />
            ) : (
              <Ionicons
                name="arrow-down-circle"
                size={24}
                color={colors.yellow}
              />
            )}
          </TouchableOpacity>
        </View>
        {isExpanded && (
          <View
            style={{
              paddingHorizontal: 15,
            }}
          >
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <Checkbox
                    style={{
                      margin: 8,
                    }}
                    value={selected.some((i) => i.id === item.id)}
                    onValueChange={() => handleSelectItem(item)}
                  />
                  <TouchableOpacity onPress={() => handleSelectItem(item)}>
                    <Text style={styles.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}

        <View
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Buttons
            label="Submit"
            onPress={() => addLead()}
            variant="filled"
            width="100%"
            icon={require("../../assets/images/arrow.png")}
            iconHeight={10}
            iconWidth={30}
            iconGap={10}
          />
        </View>
        <NeedHelp />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    borderWidth: 2,
    height: height / 16,
    backgroundColor: "#fff",
    borderColor: "black",
    borderRadius: 6,
    margin: 18,
    marginTop: 4,
    borderCurve: "circular",
  },
  labelStyles: {
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  customLabelStyles: {
    colorFocused: "black",
    colorBlurred: "black",
    fontSizeFocused: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    width: "90%",
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  inputStyles: {
    color: "black",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 5,
    height: height / 15,
    width: width / 1.15,
    borderWidth: 1.8,
    borderColor: "#D3D3D3",
    margin: 20,
    marginTop: 5,
    color: "black",
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  smallContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    gap: 10,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  blackDetail: {
    color: colors.black,
    fontSize: 14,
  },
  smallDetail: {
    marginLeft: 10,
    color: colors.black,
    fontSize: 14,
  },
  greyDetail: {
    color: colors.grey,
    fontSize: 14,
  },
  floatingcontainerstyle: {
    width: width / 1.05,
  },
  ac_icon: {
    borderRadius: 50,
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",
  },
  userDetails: { color: "grey" },
  textHeader: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    color: "black",
  },
});

export default LeadForm;
