import React, { useState } from "react";
import { View, ScrollView, Text, StatusBar } from "react-native";
import { loginWithPassword, registerNewUser } from "@/src/utils/apiservice";
import { z } from "zod";
import Buttons from "@/src/components/Buttons";
import NeedHelp from "@/src/components/NeedHelp";
import Loader from "@/src/components/Loader";
import { credentialsFields } from "./fields/credentialsFIelds";
import Field from "@/src/components/Field";
import { useData } from "@/src/hooks/useData";
import { PasswordMatchSchema } from "@/src/utils/schemas/Credentials";
import { useAuth } from "@/src/hooks/useAuth";
import { showToast } from "@/src/utils/showToast";
import usePopup from "@/src/hooks/usePopup";
import NewPopUp from "@/src/components/NewPopup";
import { useTranslation } from "react-i18next";
import colors from "@/src/utils/colors";

const Credentials = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useData();
  const { login } = useAuth();
  const [loader, showLoader] = useState<boolean>(false);

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

  async function register() {
    try {
      PasswordMatchSchema.parse(state);
      showLoader(true);
      console.log(state);
      const response = await registerNewUser(state);
      const loginResponse = await loginWithPassword(
        state.Contact as string,
        state.pwd as string
      );
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
          value: 1,
        },
      });
      login(loginResponseData);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        showToast(`${error.errors[0].message}`);
      } else {
        console.log(error);
        showLoader(false);
        setPopUp(true);
        setPopUpIconType("Alert");
        setPopUpTitle(t("Server Error"));
        setPopupText(t("Something went wrong. Please try again."));
      }
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <StatusBar backgroundColor={colors.yellow} barStyle="dark-content" />
      <View>
        <View
          style={{
            backgroundColor: "transparent",
            margin: 2,
            padding: 10,
            marginLeft: 1,
          }}
        ></View>
        {loader && <Loader isLoading={loader} />}
        <NewPopUp
          visible={popUp}
          numberOfButtons={1}
          button1Action={() => cleanupPopUp()}
          button1Text={"Dismiss"}
          text={popupText}
          iconType={popUpIconType}
          title={popUpTitle}
        />
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
          <Text
            style={{
              textAlign: "center",
              width: "80%",
              color: colors.grey,
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 24,
            }}
          >
            {t("Note: Password length should be 8 characters long.")}
          </Text>
        </View>
        <View style={{ margin: 20 }}>
          <NeedHelp />
        </View>
      </View>
    </ScrollView>
  );
};

export default Credentials;
