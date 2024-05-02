import {
  View,
  Pressable,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import colors from "../../../../colors";
import { height, width } from "../../../utils/dimensions";
import Buttons from "../../../components/Buttons";
import { useTranslation } from "react-i18next";
import { getUser, updateProfile } from "../../../utils/apiservice";
import { editProfileFields } from "../fields/editProfileFields";
import Field from "../../../components/Field";
import { useData } from "../../../hooks/useData";
import Loader from "../../../components/Loader";
import Popup from "../../../components/Popup";

const EditProfile = ({ navigation }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { state, dispatch } = useData();

  useEffect(() => {
    (async () => {
      try {
        const response = await getUser();
        const responseData = response.data;
        dispatch({
          type: "GET_ALL_FIELDS",
          payload: {
            value: responseData,
          },
        });
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  const updateuseprofile = async () => {
    try {
      setIsLoading(true);
      const response = await updateProfile(state);
      const responseData = response.data;
      setIsLoading(false);
      if (responseData.code == 200) {
        setIsPopupVisible(true);
        setPopupMessage(responseData.message);
      }
      setIsPopupVisible(true);
      setPopupMessage(responseData.message);
    } catch (error) {
      setIsLoading(false);
      setIsPopupVisible(true);
      setPopupMessage("Error in updating user profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.mainWrapper}>
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
            {/* // <Text>ICORRECT OTP</Text> */}
          </Popup>
        )}
        {editProfileFields.map((field) => (
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
      </ScrollView>
      <View
        style={{
          padding: 10,
          backgroundColor: "#fff",
          margintop: 10,
          alignItems: "center",
        }}
      >
        <Buttons
          label="Submit"
          onPress={() => {
            updateuseprofile();
          }}
          variant="filled"
          width={width / 1.05}
          icon={require("../../../assets/images/arrow.png")}
          iconWidth={50}
          iconHeight={20}
          iconGap={10}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: "#fff",
  },
  iconButton: {
    backgroundColor: colors.yellow,
    borderRadius: 50,
  },
  datepickerview: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 5,
    backgroundColor: colors.white,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
  },
  viewProfile: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.7),
    margintop: 10,
  },
  ImageProfile: {
    height: 50,
    width: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: 100,
  },
  textDetail: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.7),
  },

  button: {
    backgroundColor: colors.yellow,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    borderRadius: 5,
  },
  flexBox: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    marginBottom: 20,
  },
  labelStyles: {
    backgroundColor: "transparent",
    margin: 14,
    color: colors.grey,
  },
  input: {
    padding: 5,
    height: height / 13.5,
    margin: 10,
    marginTop: 5,
    color: colors.black,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderColor: colors.grey,
    borderWidth: 1.8,
    borderwidth: 2,
    bottom: 0,
    borderRadius: 8,
    borderColor: "#D3D3D3",
  },
  imagepickercontainer: {
    flexDirection: "row",
    width: width / 1.18,
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 10,
    height: height / 16.5,
    margin: 10,
    justifycontent: "space-evenly",
    backgroundColor: "#fff",
  },
  noimage: {
    width: width / 8,
    height: height / 20,
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    margin: 5,
    left: width / 2.4,
  },
  noimagepicker: {
    width: width / 8,
    height: height / 20,
    backgroundColor: "#fff",
    borderRadius: 5,

    left: width / 1.4,
    // marginBottom: 150,
    bottom: 20,
  },
  imagepicker: {
    backgroundColor: colors.white,
    height: height / 20,
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 0,
    width: width / 1.75,
  },
  inputStyle: {
    paddingHorizontal: 20,
    paddingTop: 20,
    height: height / 15,
    color: colors.black,
  },
  picker: {
    backgroundColor: colors.white,
    height: height / 20,
    margin: 10,
    borderRadius: 5,
    flexDirection: "column",
    marginTop: 0,
    width: width / 1.75,
    marginTop: 5,
    paddingBottom: 5,
  },
  pickercontainer: {
    flexDirection: "row",
    width: width / 1.2,
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 10,
    height: height / 16.5,
    margin: 10,
    justifycontent: "Space-between",
  },
  imagecontainereditprofile: {
    flexDirection: "row",
    padding: 5,
    height: 65,
    marginBottom: 20,
    color: colors.black,
    borderRadius: 5,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.grey,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalcontainer: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});

export default EditProfile;
