import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { height, width } from "../../../utils/dimensions";
import { Avatar } from "react-native-paper";
import Buttons from "../../../components/Buttons";
import Popup from "../../../components/Popup";
import Loader from "../../../components/Loader";
import { NavigationProps } from "../../../utils/interfaces";
import { newUserKycField } from "../fields/newUserKycFields";
import Field from "../../../components/Field";
import { useData } from "../../../hooks/useData";

const NewUserKyc = ({ navigation }: NavigationProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useData();

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              backgroundColor: "transparent",
              height: height / 8,
              margin: 20,
              flexDirection: "row",
              width: width / 2,
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: 20,
              marginLeft: 1,
            }}
          >
            <Avatar.Image
              size={84}
              source={require("../../../assets/images/ac_icon.png")}
            />
            <View
              style={{
                flexDirection: "column",
                padding: 8,
                height: height / 10,
                justifyContent: "center",
              }}
            >
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
          {newUserKycField.map((field) => (
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
              source={field.source}
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
              label="Next"
              onPress={() => {
                navigation.navigate("Credentials");
              }}
              variant="filled"
              width={350}
              icon={require("../../../assets/images/arrow.png")}
              iconWidth={50}
              iconHeight={20}
              iconGap={10}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewUserKyc;
