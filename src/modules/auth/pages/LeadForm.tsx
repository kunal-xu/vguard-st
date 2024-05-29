import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  ToastAndroid,
} from "react-native";
import { height, width } from "../../../utils/dimensions";
import Buttons from "../../../components/Buttons";
import { addLeadForm } from "../../../utils/apiservice";
import NeedHelp from "../../../components/NeedHelp";
import colors from "../../../../colors";
import Loader from "../../../components/Loader";
import { useTranslation } from "react-i18next";
import InputField from "../../../components/InputField";
import PickerField from "../../../components/PickerField";
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
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const items = [
    { label: "AC", value: "AC", id: "" },
    { label: "TV", value: "TV", id: "" },
    { label: "Refrigerator", value: "Refrigerator", id: "" },
    { label: "Washing machine", value: "Washing machine", id: "" },
    { label: "Others", value: "Others", id: "" },
  ]

  function formatDate(date: string | number | Date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  async function addLead() {
    if(name.length === 0 || pincode.length === 0 || selectedValue.length === 0) {
      ToastAndroid.show("Please fill all the details", ToastAndroid.LONG);
      return
    }
    showLoader(true);
      try {
        const today = new Date();
        const formattedDate = formatDate(today);
        let values = "";
        selectedValue.map((item: string) => {
          values += item;
          values += ", "
        })
        values = values.substring(0, values.length - 2);
        const body = {
          Name: name,
          DateOfLead: formattedDate,
          ContactNumber: usernumber,
          Pincode: pincode,
          ServiceCategories: values
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
          {popupMessage}
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
            </View>
          </View>
          <Text style={styles.textHeader}>
            {" "}
            {"Lead Form"}
          </Text>

          <InputField
            label={"Name"}
            value={name}
            onChangeText={(text: string) => setName(text)} errorMessage={undefined} disabled={undefined} keyboardType={undefined}          />

          <InputField
            label={"Contact"}
            value={usernumber}
            disabled errorMessage={undefined} onChangeText={undefined} keyboardType={undefined}          />
          
          <InputField
            label={"Pincode"}
            value={pincode}
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={(text: string) => setPincode(text)} errorMessage={undefined} disabled={undefined} keyboardType={undefined}          />

          <PickerField
            label={"Service Categories"}
            selectedValue={selectedValue}
            onValueChange={(text: string) => setSelectedValue(text)}
            items={items} errorMessage={undefined} disabled={undefined} setIndex={undefined}/>
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