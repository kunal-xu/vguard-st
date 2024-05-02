import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Linking } from "react-native";
import { height, width } from "../../../utils/dimensions";
import { Avatar } from "react-native-paper";
import Buttons from "../../../components/Buttons";
import NeedHelp from "../../../components/NeedHelp";
import Popup from "../../../components/Popup";
import Loader from "../../../components/Loader";
import { nomineePageFields } from "../fields/nomineePageFields";
import Field from "../../../components/Field";
import { NavigationProps } from "../../../utils/interfaces";
import { registerNewUser } from "../../../utils/apiservice";
import { useData } from "../../../hooks/useData";

const NomineePage = ({ navigation }: NavigationProps) => {
  const { state, dispatch } = useData();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const openTermsAndConditions = () => {
    // Add the URL of your terms and conditions page
    const termsAndConditionsURL = "https://vguardrishta.com/tnc_retailer.html";

    // Open the URL in the device's default web browser
    Linking.openURL(termsAndConditionsURL);
  };

  async function register() {
    setIsLoading(true);
    try {
      const response = await registerNewUser(state);
      const responseData = response.data;
      setIsLoading(false);
      setIsPopupVisible(true);
      setPopupMessage(responseData.message);
      dispatch({
        type: "CLEAR_ALL_FIELDS",
        payload: {},
      });
      setTimeout(() => {
        navigation.navigate("login");
      }, 1200);
    } catch (error) {
      setIsLoading(false);
      setPopupMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View>
          <View
            style={{
              backgroundColor: "transparent",
              height: height / 8,
              margin: 20,
              flexDirection: "row",
              width: width / 2.1,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={84}
              source={require("../../../assets/images/ac_icon.png")}
            />
            <View style={{ margin: 20, flexDirection: "column" }}>
              <Text style={{ color: "grey" }}>Contact: {state.Contact}</Text>
              <Text style={{ color: "grey" }}>Unique ID: {state.UniqueId}</Text>
            </View>
          </View>
          {isLoading == true ? (
            <View style={{ flex: 1 }}>
              <Loader isLoading={isLoading} />
            </View>
          ) : null}
          {isPopupVisible && (
            <Popup
              isVisible={isPopupVisible}
              onClose={() => setIsPopupVisible(false)}
            >
              <Text>{popupMessage}</Text>
            </Popup>
          )}
          {nomineePageFields.map((field) => (
            <Field
              id={field.id}
              key={field.id}
              type={field.type}
              data={field.data}
              label={field.label}
              items={field.items}
              properties={field.properties}
              rules={field.rules}
              links={field.links}
            />
          ))}
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
              onPress={() => register()}
              variant="filled"
              width={350}
              icon={require("../../../assets/images/arrow.png")}
              iconWidth={50}
              iconHeight={20}
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

export default NomineePage;
