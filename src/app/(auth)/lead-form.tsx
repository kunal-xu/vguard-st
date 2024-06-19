import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import Popup from "@/src/components/Popup";
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
import { useLocalSearchParams, useNavigation } from "expo-router";
import { showToast } from "@/src/utils/showToast";
import MultiSelectPicker from "@/src/components/MultiSelectPicker";

const LeadForm = () => {
  const { contact } = useLocalSearchParams();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [loader, showLoader] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const navigation = useNavigation();

  const items = [
    { label: "AC", value: "AC", id: "" },
    { label: "TV", value: "TV", id: "" },
    { label: "Refrigerator", value: "Refrigerator", id: "" },
    { label: "Washing machine", value: "Washing machine", id: "" },
    { label: "Others", value: "Others", id: "" },
  ];

  function formatDate(date: string | number | Date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  }

  async function addLead() {
    if (
      name.length === 0 ||
      pincode.length === 0 ||
      selectedValue.length === 0
    ) {
      showToast(t("Please fill all the details"));
      return;
    }
    showLoader(true);
    try {
      const today = new Date();
      const formattedDate = formatDate(today);
      let values = "";
      selectedValue.map((item: string) => {
        values += item;
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
        setIsPopupVisible(true);
        setPopupMessage(successMessage);
      } else {
        const errorMessage = validationResponseData.message;
        setIsPopupVisible(true);
        setPopupMessage(errorMessage);
      }
    } catch (error: any) {
      showLoader(false);
      setIsPopupVisible(true);
      setPopupMessage(error.response.data.message || "An error occurred.");
      console.error("Error during validation:", error);
    }
  }

  const handleClose = () => {
    navigation.navigate("loginWithNumber" as never);
    setIsPopupVisible(false);
  };

  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {isPopupVisible && (
        <Popup isVisible={isPopupVisible} onClose={handleClose}>
          {popupMessage}
        </Popup>
      )}
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
          value={pincode}
          label={t("Pincode")}
        />

        <View style={styles.container}>
          <Text>
            Selected Items: {selectedItems.map((item) => item.label).join(", ")}
          </Text>
          <MultiSelectPicker
            items={items}
            selectedItems={selectedItems}
            onValueChange={setSelectedItems}
          />
        </View>

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
