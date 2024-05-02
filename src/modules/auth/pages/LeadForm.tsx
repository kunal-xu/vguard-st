import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  ToastAndroid,
} from "react-native";
import { Picker, PickerProps } from "@react-native-picker/picker";
import { height, width } from "../../../utils/dimensions";
import { Checkbox } from "react-native-paper";
import Buttons from "../../../components/Buttons";
import { addLeadForm, getBanks } from "../../../utils/apiservice";
import NeedHelp from "../../../components/NeedHelp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../../../colors";
import Loader from "../../../components/Loader";
import { useTranslation } from "react-i18next";
import { VguardRishtaUser } from "../../../utils/interfaces";
import InputField from "../../../components/InputField";
import PickerField from "../../../components/PickerField";
import ImagePickerField from "../../../components/ImagePickerField";
import DatePickerField from "../../../components/DatePickerField";
import { useFocusEffect } from "@react-navigation/native";
import Popup from "../../../components/Popup";

const LeadForm = ({ navigation, route }) => {
  const { usernumber } = route.params;
  const { t } = useTranslation();
  // const [newUserDetails, setNewUserDetails] = useState<VguardRishtaUser>();
  // const [checked, setChecked] = useState(true);
  // const [bankList, setBankList] = useState([
  //   { label: "Select", value: "Select", id: "" },
  // ]);
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [loader, showLoader] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const items = [
    { label: "Air Coolers", value: "Air Coolers", id: "" },
    { label: "Modular Switches", value: "Modular Switches", id: "" },
    { label: "Common Division", value: "Common Division", id: "" },
    { label: "SK Appliances", value: "SK Appliances", id: "" },
    { label: "Stabilizer", value: "Stabilizer", id: "" },
    { label: "Digital UPS", value: "Digital UPS", id: "" },
    { label: "UPS", value: "UPS", id: "" }
  ]

  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  async function addLead() {
    showLoader(true);
      try {
        const today = new Date();
        const formattedDate = formatDate(today);
        const body = {
          Name: name,
          DateOfLead: formattedDate,
          ContactNumber: usernumber,
          Pincode: pincode,
          ServiceCategories: selectedValue
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
    navigation.navigate("loginWithNumber");
    setIsPopupVisible(false);
  };
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "white" }}>
      {isPopupVisible && (
        <Popup isVisible={isPopupVisible} onClose={handleClose}>
          <Text>{popupMessage}</Text>
        </Popup>
      )}
        <Loader isLoading={loader} />
        <View style={{ backgroundColor: "white", margin: 25 }}>
          <View
            style={{
              backgroundColor: "transparent",
              height: height / 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
             <Image
            source={require("../../../assets/images/ac_icon.png")}
            style={styles.ac_icon}
            resizeMode="cover"
          />

            <View
              style={{
                flexDirection: "column",
                padding: 10,
                height: height / 10,
              }}
            >
              {/* <Text style={styles.userDetails}>New User</Text>
              <Text style={styles.userDetails}>Rishta ID</Text>
              <Text style={styles.userDetails}>
                Mobile No.
              </Text> */}
            </View>
          </View>
          <Text style={styles.textHeader}>
            {" "}
            {"Lead Form"}
          </Text>

          <InputField
            label={"Name"}
            value={name}
            onChangeText={(text: string) => setName(text)}
          />

          <InputField
            label={"Contact"}
            value={usernumber}
            disabled
          />
          
          <InputField
            label={"Pincode"}
            value={pincode}
            onChangeText={(text: string) => setPincode(text)}
          />

            {/* <Picker
              selectedValue={selectedValue}
              onValueChange={(value) => {
                setSelectedValue(value);
              }}
              mode = "dropdown"
              style = {
                colors: "black"
              }
                // style = {
                //   color = "black"
                //   borderWidth = 1.5
                //   borderColor = "#D3D3D3"
                // }
            >
              {items?.map((item, index) => {
                return (
                  <Picker.Item
                    label={item}
                    value={index === 0 ? "undefined" : item}
                  />
                );
              })}
            </Picker> */}
          
          
          <PickerField
            label={"Categories"}
            selectedValue={selectedValue}
            onValueChange={(text: string) =>
              setSelectedValue(text)
            }
            items={items}
          />
          {/*
          
          <ImagePickerField
            label={t("strings:lbl_upload_cancelled_cheque")}
            onImageChange={handleImageChange}
            imageRelated=""
            fileUri={chequeFileData?.uri}
          />

          <Text style={styles.textHeader}>
            {t("strings:lbl_nominee_details")}
          </Text>

          <InputField
            label={t("strings:lbl_name_of_nominee")}
            onChangeText={(text: string) =>
              onChangeUserInput(text, "bankDetail.nomineeName")
            }
            value={newUserDetails?.bankDetail?.nomineeName}
          />
          <DatePickerField
            label={t("strings:date_of_birth")}
            onDateChange={(text) =>
              onChangeUserInput(text, "bankDetail.nomineeDob")
            }
            date={newUserDetails?.bankDetail?.nomineeDob}
            maximumDate={curr_date}
          />
          <InputField
            label={t("strings:lbl_mobile_number")}
            onChangeText={(text: string) =>
              onChangeUserInput(text, "bankDetail.nomineeMobileNo")
            }
            value={newUserDetails?.bankDetail?.nomineeMobileNo}
            numeric={true}
            maxLength={10}
          />
          <InputField
            label={t("strings:lbl_email")}
            onChangeText={(text: string) =>
              onChangeUserInput(text, "bankDetail.nomineeEmail")
            }
            value={newUserDetails?.bankDetail?.nomineeEmail}
          />
          <InputField
            label={t("strings:lbl_address")}
            onChangeText={(text: string) =>
              onChangeUserInput(text, "bankDetail.nomineeAdd")
            }
            value={newUserDetails?.bankDetail?.nomineeAdd}
          />
          <InputField
            label={t("strings:lbl_relationship_with_you")}
            onChangeText={(text: string) =>
              onChangeUserInput(text, "bankDetail.nomineeRelation")
            }
            value={newUserDetails?.bankDetail?.nomineeRelation}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox.Android
              color={colors.yellow}
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(!checked)}
            />
            <Text style={{ color: "black" }}>
              {t(" I agree to terms and condition")}
            </Text>
          </View>

          <View style={{ margin: 10 }}>
            <Text style={{ color: "blue" }}>
              I have read & fully understood the{" "}
              <TouchableOpacity
                style={{ top: 5 }}
                onPress={openTermsAndConditions}
              >
                <Text
                  style={{
                    color: "blue",
                    textDecorationLine: "underline",
                    top: 5,
                  }}
                >
                  terms and conditions
                </Text>
              </TouchableOpacity>{" "}
              of V-guard Rishta Loyalty Program and abide to follow them.
            </Text>
          </View> */}
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
              icon={require("../../../assets/images/arrow.png")}
              iconHeight={10}
              iconWidth={30}
              iconGap={10}
            />
          </View>
          <View style={{ margin: 20 }}>
            <NeedHelp />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeadForm;

const styles = StyleSheet.create({
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
  labelStyles: {
    backgroundColor: "transparent",
    margin: 15,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
    
  },
});