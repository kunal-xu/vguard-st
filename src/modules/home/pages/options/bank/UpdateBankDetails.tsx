import React, { useState } from "react";
import { View, ScrollView, SafeAreaView, Text } from "react-native";
import Field from "../../../../../components/Field";
import { registrationBankDetails } from "../../../../auth/fields/registrationBankDetailsFields";
import { NavigationProps } from "../../../../../utils/interfaces";
import Buttons from "../../../../../components/Buttons";
import { useData } from "../../../../../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";
import { getUser, updateProfile } from "../../../../../utils/apiservice";
import { useAuth } from "../../../../../hooks/useAuth";
import Loader from "../../../../../components/Loader";
import Popup from "../../../../../components/Popup";

const UpdateBankDetails = ({ navigation }: NavigationProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useData();
  const { logout } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await getUser();
          const responseData = response.data;
          console.log(responseData.BankDetail)
          dispatch({
            type: "GET_ALL_FIELDS",
            payload: {
              value: responseData,
            },
          });
          if (responseData.hasPwdChanged || responseData.BlockStatus === 3) {
            dispatch({
              type: "CLEAR_ALL_FIELDS",
              payload: {},
            });
            logout();
          }
        } catch (error: any) {
          console.log(error.message);
        }
      };
      fetchData();
    }, [])
  );

  const handleProceed = async () => {
    try {
      setIsLoading(true);
      const response = await updateProfile(state);
      const responseData = response.data;
      setIsLoading(false);
      setIsPopupVisible(true);
      setPopupMessage(responseData.message);
    } catch (error) {
      setIsLoading(false);
      setPopupMessage("Something went wrong. Please try again.");
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ backgroundColor: "white" }}>
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
          {registrationBankDetails.map((field) => (
            <Field
              id={field.id}
              key={field.id}
              type={field.type}
              data={field.data}
              label={field.label}
              items={field.items}
              properties={field.properties}
              source={field.source}
              verifyButtonProperties={field.verifyButtonProperties}
              resetButtonProperties={field.resetButtonProperties}
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
              variant="filled"
              onPress={handleProceed}
              width={350}
              icon={require("../../../../../assets/images/arrow.png")}
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

export default UpdateBankDetails;
