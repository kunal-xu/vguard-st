import React, { useState } from "react";
import { View, ScrollView, SafeAreaView, Text } from "react-native";
import { NavigationProps } from "@/src/utils/interfaces";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "@/src/components/Loader";
import Popup from "@/src/components/Popup";
import { useAuth } from "@/src/hooks/useAuth";
import { getUser, updateProfile } from "@/src/utils/apiservice";
import { useData } from "@/src/hooks/useData";
import Buttons from "@/src/components/Buttons";
import { registrationBankDetails } from "@/src/app/(register)/fields/registrationBankDetailsFields";
import Field from "@/src/components/Field";

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
              icon={require("../../../../assets/images/arrow.png")}
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
