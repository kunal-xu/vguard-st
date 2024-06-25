import {
  View,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { height, width } from "../../../utils/dimensions";
import Buttons from "../../../components/Buttons";
import { useTranslation } from "react-i18next";
import { updateProfile } from "../../../utils/apiservice";
import Field from "../../../components/Field";
import Loader from "../../../components/Loader";
import { z } from "zod";
import { RegistrationSchema } from "../../../utils/schemas/Registration";
import colors from "@/src/utils/colors";
import { editProfileFields } from "./fields/editProfileFields";
import useProfile from "@/src/hooks/useProfile";
import usePopup from "@/src/hooks/usePopup";
import { showToast } from "@/src/utils/showToast";
import { Image } from "expo-image";
import NewPopUp from "@/src/components/NewPopup";
import { Ionicons } from "@expo/vector-icons";
import ImagePickerModal from "@/src/components/ImagePicker";

const EditProfile = () => {
  const { t } = useTranslation();
  const [loader, showLoader] = useState(false);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
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
  const { profile } = useProfile();

  const toggleModal = () => {
    setIsImagePickerVisible(!isImagePickerVisible);
  };

  const updateuseprofile = async () => {
    try {
      RegistrationSchema.parse(profile);
      showLoader(true);
      const response = await updateProfile(profile);
      const responseData = response.data;
      showLoader(false);
      if (responseData.code == 200) {
        setPopUp(true);
        setPopUpIconType("Info");
        setPopUpTitle(t("Profile"));
        setPopupText(responseData.message);
      } else {
        showToast(responseData.message);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        showToast(`${error.errors[0].message}`);
      } else {
        showLoader(false);
        showToast("Error in updating profile. Please try again");
      }
    } finally {
      showLoader(false);
    }
  };

  return (
    <ScrollView style={styles.mainWrapper}>
      <View style={styles.profileContainer}>
        <View style={{ position: "relative", marginBottom: 16, marginTop: 8 }}>
          <Image
            source={{
              uri: profile.Selfie,
            }}
            placeholder={{
              uri: "https://th.bing.com/th/id/OIG4.nmrti4QcluTglrqH8vtp",
            }}
            transition={1000}
            style={{ width: 100, height: 100, borderRadius: 50 }}
            contentFit="cover"
          />
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={toggleModal}
          >
            <Ionicons name="camera" size={18} color="white" />
          </TouchableOpacity>
          <ImagePickerModal
            isVisible={isImagePickerVisible}
            toggleModal={toggleModal}
            type={"Profile"}
          />
        </View>
      </View>
      {loader && <Loader isLoading={loader} />}
      <NewPopUp
        visible={popUp}
        button1Action={() => cleanupPopUp()}
        button1Text={"Dismiss"}
        text={popupText}
        iconType={popUpIconType}
        title={popUpTitle}
      />
      {editProfileFields.map((field) => (
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#e91e63",
    borderRadius: 15,
    padding: 5,
  },
  profileContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 15,
    marginTop: -20,
  },
  iconButton: {
    backgroundColor: colors.yellow,
    borderRadius: 50,
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

  noimage: {
    width: width / 8,
    height: height / 20,
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    margin: 5,
    left: width / 2.4,
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
