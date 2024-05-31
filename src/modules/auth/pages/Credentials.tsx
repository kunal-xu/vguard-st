import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Linking, ToastAndroid } from "react-native";
import Buttons from "../../../components/Buttons";
import NeedHelp from "../../../components/NeedHelp";
import Popup from "../../../components/Popup";
import Loader from "../../../components/Loader";
import { credentialsFields } from "../fields/credentialsFIelds";
import Field from "../../../components/Field";
import { NavigationProps } from "../../../utils/interfaces";
import { loginWithPassword, registerNewUser } from "../../../utils/apiservice";
import { useData } from "../../../hooks/useData";
import { PasswordMatchSchema } from "../../../utils/schemas/Credentials";
import { z } from "zod";
import { useAuth } from "../../../hooks/useAuth";

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
      setIsLoading(false);
      const loginResponseData = loginResponse.data;
      dispatch({
        type: "GET_ALL_FIELDS",
        payload: {
          value: loginResponseData.stUser,
        },
      });
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          field: "firstLogin",
          subfield: undefined,
          value: 1
        }
      })
      login(loginResponseData)

      // dispatch({
      //   type: "CLEAR_ALL_FIELDS",
      //   payload: {},
      // });
      // setTimeout(() => {
      //   navigation.navigate("login");
      // }, 1200);
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

export default Credentials;
