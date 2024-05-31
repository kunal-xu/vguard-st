import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Linking, ToastAndroid } from "react-native";
import { NavigationProps } from "@/src/utils/interfaces"
import { loginWithPassword, registerNewUser } from "../../utils/apiservice";
import { z } from "zod";
import Buttons from "@/src/components/Buttons";
import NeedHelp from "@/src/components/NeedHelp";
import Popup from "@/src/components/Popup";
import Loader from "@/src/components/Loader";
import { credentialsFields } from "./fields/credentialsFIelds";
import Field from "@/src/components/Field";
import { useData } from "@/src/hooks/useData";
import { PasswordMatchSchema } from "@/src/utils/schemas/Credentials";
import { useAuth } from "@/src/hooks/useAuth";

const Credentials = ({ navigation }: NavigationProps) => {
  const { state, dispatch } = useData();
  const { login } = useAuth();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function register() {
    try {
      PasswordMatchSchema.parse(state);
      setIsLoading(true);
      const response = await registerNewUser(state);
      const loginResponse = await loginWithPassword(state.Contact as string, state.pwd as string)
      const loginResponseData = loginResponse.data;
      dispatch({
        type: "GET_ALL_FIELDS",
        payload: {
          value: loginResponseData.stUser,
        },
      });
      login(loginResponseData)
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        ToastAndroid.show(`${error.errors[0].message}`, ToastAndroid.LONG);
      } else {
        setIsLoading(false);
        setPopupMessage("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View>
          <View
            style={{
              backgroundColor: "transparent",
              margin: 2,
              padding: 10,
              marginLeft: 1,
            }}
          ></View>
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
              {popupMessage}
            </Popup>
          )}
          {credentialsFields.map((field) => (
            <Field
              id={field.id}
              key={field.id}
              type={field.type}
              data={field.data}
              label={field.label}
              properties={field.properties}
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
              icon={require("../../assets/images/arrow.png")}
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

export default Credentials;
